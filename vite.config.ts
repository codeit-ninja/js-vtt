import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    build: {
        emptyOutDir: false,
        rollupOptions: {
            output: {
                entryFileNames: '[name].[format].js'
            }
        },
        lib: {
            entry: 'src/main.ts',
            name: 'js-vtt',
            // the proper extensions will be added
            fileName: 'converter',
            formats: ['es']
        }
    },
    resolve: {
        alias: {
            'helpers': path.resolve(__dirname, './src/helpers.ts'),
            'utils': path.resolve(__dirname, './src/utils.ts'),
            'errors': path.resolve(__dirname, './src/errors/'),
        },
    }
})