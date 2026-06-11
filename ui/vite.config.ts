import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import { resolve } from 'path';

export default defineConfig(({ command }) => ({
  plugins: [react(), cssInjectedByJsPlugin()],
  // Only force production mode during build; tests need the dev React build
  // so that React.act (required by @testing-library/react) is available.
  define: command === 'build'
    ? { 'process.env.NODE_ENV': JSON.stringify('production') }
    : {},
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
}));
