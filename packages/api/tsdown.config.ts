import { defineConfig } from 'tsdown';
import { statsPlugin } from 'vite-bundle-explorer/plugin';

export default defineConfig({
  plugins: [statsPlugin()],
  entry: ['./src/index.ts'],
  exports: true,
  dts: {
    sourcemap: true
  }
});
