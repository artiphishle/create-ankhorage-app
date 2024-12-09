import { defineConfig } from 'tsup';

export default defineConfig({
  dts: true,
  entry: ['src/index.ts'],
  format: ['esm'],
  splitting: true,
  sourcemap: false,
  clean: true,
  treeshake: true,
  external: ['@/lib/ui/components/VideoPlayer', '@/lib/ui/components/List'],
  esbuildOptions: (options) => {
    options.treeShaking = true;
    options.alias = {
      ['@/lib/*']: 'src/lib/*',
      ['@/*']: 'src/*',
    };
  },
});
