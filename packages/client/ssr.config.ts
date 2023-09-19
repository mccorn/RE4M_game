import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';

// dotenv.config();

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@common': path.resolve(__dirname, './src/components/common'),
        },
    },
    build: {
        lib: {
            entry: path.resolve(__dirname, 'ssr.tsx'),
            name: 'client',
            formats: ['cjs'],
        },
        rollupOptions: {
            output: {
                dir: 'ssr-dist',
            },
        },
    },
});
