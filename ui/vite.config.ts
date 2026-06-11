import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  define: { 'process.env.NODE_ENV': JSON.stringify('production') },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      formats: ['es'],
      fileName: () => 'index.js',
    },
    outDir: resolve(__dirname, '../frontend'),
    emptyOutDir: true,
    rollupOptions: { output: { inlineDynamicImports: true } },
    cssCodeSplit: false,
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['src/test/setup.ts'],
    passWithNoTests: true,
  },
});
