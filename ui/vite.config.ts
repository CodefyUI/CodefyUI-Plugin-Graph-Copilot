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
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'text'],
      all: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.test.{ts,tsx}',
        'src/**/*.d.ts',
        'src/test/**',
      ],
      // High-but-not-100% gate. statements/lines sit at ~90%; functions and
      // branches are a notch lower because some defensive paths and the
      // runtime-only pdf.js CDN import are deliberately left uncovered.
      thresholds: {
        statements: 90,
        lines: 90,
        functions: 85,
        branches: 80,
      },
    },
  },
}));
