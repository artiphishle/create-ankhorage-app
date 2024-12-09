import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  splitting: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  esbuildOptions: (options) => {
    options.treeShaking = true;
  },
});
