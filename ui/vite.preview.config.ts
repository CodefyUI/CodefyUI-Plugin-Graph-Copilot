import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

const previewRoot = fileURLToPath(new URL('./preview/', import.meta.url));
const uiRoot = fileURLToPath(new URL('./', import.meta.url));
const bundlePath = fileURLToPath(new URL('../frontend/index.js', import.meta.url));

// Deliberately independent of vite.config.ts: this fixture is never a library
// entry, and cannot emit a production bundle or overwrite frontend/index.js.
export default defineConfig(({ command }) => {
  if (command !== 'serve') throw new Error('The mock-host preview is development-only.');
  return {
    root: previewRoot,
    publicDir: false,
    plugins: [react()],
    define: { __PREVIEW_BUNDLE_URL__: JSON.stringify(`/@fs/${bundlePath}`) },
    server: {
      host: '127.0.0.1',
      port: 4179,
      strictPort: true,
      open: false,
      fs: { strict: true, allow: [uiRoot, bundlePath] },
    },
  };
});
