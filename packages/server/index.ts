import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import cors from 'cors';
import express from 'express';
import { JSDOM } from 'jsdom';
import { createServer as createViteServer } from 'vite';
import createClientAndSeed from './db';

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

    const sequelize = await createClientAndSeed();

    const app = express();
    app.use(cors());

    const distPath = path.dirname(require.resolve('./client/dist/index.html'));
    const srcPath = './client';
    const ssrClientPath = require.resolve('./client/ssr-dist/client.cjs');
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

    app.put('/theme/switchTheme', async (req, res) => {
        if (!req.query.theme) {
            res.status(400).send({ error: 'theme field required' });
            return;
        }

        const themeModel = sequelize?.models.Theme;
        const themes = (await themeModel?.findAll()) as unknown as Array<{
            name: string;
            id: number;
        }>;
        const currentThemeIndex = themes?.findIndex(theme => theme.name === req.query.theme);
        if (req.query.login) {
            await sequelize?.models.User.update(
                {
                    themeId: themes[currentThemeIndex + 1]?.id || themes[0].id,
                },
                {
                    where: {
                        login: req.query.login,
                    },
                }
            );
        }
        res.status(200).send({ themeName: themes[currentThemeIndex + 1]?.name || themes[0].name });
    });

    app.use('*', async (req, res, next) => {
        const url = req.originalUrl;

        try {
            let template: string = fs.readFileSync(entryPath, 'utf-8');
            let render: (req: unknown) => Promise<string>;
            let store: unknown;

            if (IS_DEV) {
                template = await vite.transformIndexHtml(url, template);

                ({ render, store } = await vite.ssrLoadModule(path.resolve(srcPath, 'ssr.tsx')));
            } else {
                ({ render, store } = await import(ssrClientPath));
            }

            const appHtml = await render(req);

            const html = template
                .replace('<!--ssr-outlet-->', appHtml)
                .replace(
                    '// preload state',
                    `window.__PRELOADED_STATE__ = ${
                        store ? JSON.stringify(store).replace(/</g, '\\u003c') : '{}'
                    }`
                );

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
