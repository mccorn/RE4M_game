import { defineConfig } from 'vite';
import * as path from 'path';

// dotenv.config();

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@pages': path.resolve(__dirname, './src/pages'),
            '@common': path.resolve(__dirname, './src/components/common'),
        },
    },
});
