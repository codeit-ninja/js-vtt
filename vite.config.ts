import { defineConfig } from 'vite'
// @ts-ignore
import dts from 'vite-plugin-dts'
import path from 'path'

export default defineConfig({
    plugins: [dts()],
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
            '@': path.resolve(__dirname, './src/'),
            '@helpers': path.resolve(__dirname, './src/helpers.ts'),
            '@utils': path.resolve(__dirname, './src/utils.ts'),
            '@errors': path.resolve(__dirname, './src/errors/'),
        },
    }
})