import { describe, expect, it, vi } from 'vitest';
import packageJson from '../package.json?raw';
import { GRAPH_COPILOT_PLUGIN_ID, GRAPH_COPILOT_PLUGIN_VERSION } from './pluginMetadata';

// The manifest is outside Vite's UI root. Read it as test data without widening
// the dev server's filesystem allowlist or adding Node types to the browser UI.
const { readFileSync } = await vi.importActual<{ readFileSync(path: string, encoding: 'utf8'): string }>('node:fs');
const manifest = readFileSync('../cdui.plugin.toml', 'utf8');

describe('published plugin metadata', () => {
  it('keeps the install manifest, UI package and study provenance version aligned', () => {
    const version = /^version\s*=\s*"([^"]+)"/m.exec(manifest)?.[1];
    expect(version).toBe(GRAPH_COPILOT_PLUGIN_VERSION);
    expect(JSON.parse(packageJson).version).toBe(GRAPH_COPILOT_PLUGIN_VERSION);
    expect(GRAPH_COPILOT_PLUGIN_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
  });

  it('publishes the same plugin identity and prebuilt entry that installations consume', () => {
    expect(/^id\s*=\s*"([^"]+)"/m.exec(manifest)?.[1]).toBe(GRAPH_COPILOT_PLUGIN_ID);
    expect(/^entry\s*=\s*"([^"]+)"/m.exec(manifest)?.[1]).toBe('frontend/index.js');
  });
});
