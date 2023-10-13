import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import express from 'express';
import { JSDOM } from 'jsdom';
import { createServer as createViteServer } from 'vite';
import createClientAndConnect from './db';

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
    const IS_DEV = isDev();

    const sequelize = await createClientAndConnect();

    const app = express();
    app.use(cors());

    const distPath = path.dirname(require.resolve('client/dist/index.html'));
    const srcPath = path.dirname(require.resolve('client'));
    const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');
    const entryPath = path.resolve(IS_DEV ? srcPath : distPath, 'index.html');

    const vite = await createViteServer({
        server: { middlewareMode: true },
        root: srcPath,
        appType: 'custom',
    });

    if (IS_DEV) {
        app.use(vite.middlewares);
    } else {
        app.use('/assets', express.static(path.resolve(distPath, 'assets')));
    }

    app.post('/switchTheme', async (req, res) => {
        const dbName = await sequelize?.getDatabaseName();
        res.status(200).end(`${dbName} ${req}`);
    });

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl;

        try {
            let template: string = fs.readFileSync(entryPath, 'utf-8');
            let render: (req: unknown) => Promise<string>;

            if (IS_DEV) {
                template = await vite.transformIndexHtml(url, template);

                render = (await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render;
            } else {
                render = (await import(ssrClientPath)).render;
            }

            const appHtml = await render(req);

            const html = template.replace('<!--ssr-outlet-->', appHtml);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (error) {
            if (IS_DEV) {
                vite.ssrFixStacktrace(error as Error);
            }

            next(error);
        }
    });

    app.listen(port, () => {
        // eslint-disable-next-line no-console
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();
