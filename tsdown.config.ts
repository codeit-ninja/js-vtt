import { defineConfig } from 'tsdown';

export default defineConfig({
    entry: ['src/index.ts', 'src/utils.ts', 'src/segments/*.ts'],
    format: ['esm'],
    clean: true,
    dts: true,
});
