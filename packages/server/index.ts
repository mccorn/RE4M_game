import dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';
import cors from 'cors';
import express from 'express';
import createClientAndConnect from './db';

dotenv.config();

async function startServer() {
    const app = express();
    app.use(cors());
    const port = Number(process.env.SERVER_PORT) || 3001;
    const distPath = path.dirname(require.resolve('client/dist/index.html'));
    const ssrDistClientPath = path.dirname(require.resolve('client/ssr-dist/client.cjs'));

    createClientAndConnect();

    app.get('/api', (_, res) => {
        res.json('👋 Howdy from the server :)');
    });

    // app.use(express.static(distPath));
    app.use('/assets', express.static(path.resolve(distPath, 'assets')));

    app.use('*', async (__, res, next) => {
        try {
            // 1. Read index.html
            const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');

            const { render } = await import(ssrDistClientPath);
            const appHtml = await render();
            const html = template.replace('<!--ssr-outlet-->', appHtml);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (e) {
            // If an error is caught, let Vite fix the stack trace so it maps back
            // to your actual source code.

            // vite.ssrFixStacktrace(e as Error);
            next(e);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();
