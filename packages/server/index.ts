import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
import express from 'express';
// import createClientAndConnect from './db';

dotenv.config();

async function startServer() {
    // createClientAndConnect();

    const app = express();
    app.use(cors());
    const port = Number(process.env.SERVER_PORT) || 3001;

    const distPath = path.dirname(require.resolve('client/dist/index.html'));
    // const srcPath = path.dirname(require.resolve('client'));
    const ssrClientPath = require.resolve('client/ssr-dist/client.cjs');

    app.get('/', (_, res) => {
        res.json('👋 Howdy from the server :)');
    });

    app.use('/assets', express.static(path.resolve(distPath, 'assets')));

    app.use('*', async (_, res, next) => {
        try {
            const template = fs.readFileSync(path.resolve(distPath, 'index.html'), 'utf-8');

            const { render } = await import(ssrClientPath);

            const appHtml = await render();

            const html = template.replace('<!--ssr-outlet-->', appHtml);

            res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
        } catch (error) {
            next(error);
        }
    });

    app.listen(port, () => {
        console.log(`  ➜ 🎸 Server is listening on port: ${port}`);
    });
}

startServer();
