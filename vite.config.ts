import { defineConfig } from 'vite'
// @ts-ignore
import dts from 'vite-plugin-dts'

export default defineConfig({
    appType: "custom",
    plugins: [dts()],
    build: {
        target: "esnext",
        lib: {
            entry: './src/main.ts',
            // the proper extensions will be added
            formats: ['es', 'cjs']
        },
        rollupOptions: {
            output: {
                inlineDynamicImports: false,
                preserveModules: true,
                dir: "./dist",
                entryFileNames: ({ name: fileName }) => {
                    return `${fileName}.[format].js`
                },
            }
        }
    },
})