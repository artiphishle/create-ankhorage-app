import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  entry: ['src/index.ts', 'src/config/ankh.ts'],
  format: ['esm'],
  splitting: false,
  sourcemap: false,
  clean: true,
});
