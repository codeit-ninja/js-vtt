import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    resolve: {
        alias: {
            'helpers': path.resolve(__dirname, './src/helpers.ts'),
            'utils': path.resolve(__dirname, './src/utils.ts'),
            'errors': path.resolve(__dirname, './src/errors/'),
        },
    }
})