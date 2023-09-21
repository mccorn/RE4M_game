import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import express from 'express';
import { JSDOM } from 'jsdom';
// import createClientAndConnect from './db';

import { createServer as createViteServer } from 'vite';

dotenv.config();

const port = Number(process.env.SERVER_PORT) || 3001;

const { window } = new JSDOM('<div id="app"></div>', { url: `http://localhost:${port}` });

global.window = window as unknown as Window & any;
global.history = window.history;
global.document = window.document;
global.navigator = window.navigator;
global.XMLHttpRequest = window.XMLHttpRequest;
global.DocumentFragment = window.DocumentFragment;
global.HTMLElement = window.HTMLElement;
global.FormData = window.FormData;
global.Image = window.Image;

const isDev = () => process.env.NODE_ENV === 'development';

async function startServer() {
    // createClientAndConnect();

    const app = express();
    app.use(cors());

    const distPath = path.dirname(require.resolve('client/dist/index.html'));
    const srcPath = path.dirname(require.resolve('client'));
    const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');

    const vite = await createViteServer({
        server: { middlewareMode: true },
        root: srcPath,
        appType: 'custom',
    });

    // app.get('/', (_, res) => {
    //     res.json('👋 Howdy from the server :)');
    // });

    if (!isDev()) {
        app.use('/assets', express.static(path.resolve(distPath, 'assets')));
    }

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl;

        try {
            let template: string;

            if (!isDev()) {
                template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');
            } else {
                template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');

                template = await vite!.transformIndexHtml(url, template);
            }

            let render: (req: unknown) => Promise<string>;

            if (!isDev()) {
                render = (await import(ssrClientPath)).render;
            } else {
                render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render;
            }

            const appHtml = await render({ url });

            const html = template.replace('<!--ssr-outlet-->', appHtml);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (error) {
            if (isDev()) {
                vite!.ssrFixStacktrace(error as Error);
            }

            next(error);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();
