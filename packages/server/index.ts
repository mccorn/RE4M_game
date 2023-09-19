import dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import cors from 'cors';
import express from 'express';
import { createServer as createViteServer } from 'vite';
import type { ViteDevServer } from 'vite';
// import createClientAndConnect from './db';

dotenv.config();

// const isDev = () => process.env.NODE_ENV === 'development';
const isDev = () => false;

async function startServer() {
    const app = express();
    let vite: ViteDevServer | undefined;
    const port = Number(process.env.SERVER_PORT) || 3001;

    const distPath = path.dirname(require.resolve('client/dist/index.html'));
    const srcPath = path.dirname(require.resolve('client'));
    const ssrDistClientPath = path.dirname(require.resolve('client/ssr-dist/client.cjs'));

    // createClientAndConnect();

    app.use(cors());

    app.get('/api', (_, res) => {
        res.json('👋 Howdy from the server :)');
    });

    if (isDev()) {
        vite = await createViteServer({
            server: { middlewareMode: true },
            appType: 'custom',
        });

        app.use(vite.middlewares);
    }

    app.use('/assets', express.static(path.resolve(distPath, 'assets')));

    // app.use(express.static(distPath));

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl;
        try {
            // 1. Read index.html
            let template: string;
            let render: () => Promise<string>;

            if (isDev()) {
                template = fs.readFileSync(path.resolve(srcPath, 'index.html'), 'utf-8');
                template = await vite!.transformIndexHtml(url, template);

                render = (await vite!.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx'))).render;
            } else {
                template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');

                render = (await import(ssrDistClientPath)).render;
            }

            const appHtml = await render();
            const html = template.replace('<!--ssr-outlet-->', appHtml);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            // If an error is caught, let Vite fix the stack trace so it maps back
            // to your actual source code.

            if (isDev()) vite!.ssrFixStacktrace(e as Error);
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();
