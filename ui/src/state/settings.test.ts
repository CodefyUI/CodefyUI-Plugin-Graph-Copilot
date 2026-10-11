/**
 * Tests for ui/src/state/settings.ts
 */

import { describe, it, expect } from 'vitest';
import {
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  providerReady,
  readinessReason,
} from './settings';
import type { Settings } from './settings';

// ---------------------------------------------------------------------------
// In-memory storage helper
// ---------------------------------------------------------------------------

function inMemoryStorage() {
  const store: Record<string, string> = {};
  return {
    get: (k: string) => store[k] ?? null,
    set: (k: string, v: string) => { store[k] = v; },
    remove: (k: string) => { delete store[k]; },
  };
}

function makeApi(storage = inMemoryStorage()) {
  return { storage };
}

// ---------------------------------------------------------------------------
// loadSettings
// ---------------------------------------------------------------------------

describe('loadSettings', () => {
  it('returns defaults when storage is empty', () => {
    const api = makeApi();
    const s = loadSettings(api as any);
    expect(s).toEqual(DEFAULT_SETTINGS);
  });

  it('roundtrips a saved settings object', () => {
    const api = makeApi();
    const modified: Settings = {
      ...DEFAULT_SETTINGS,
      provider: 'anthropic',
      apiKeys: { anthropic: 'sk-ant-test' },
    };
    saveSettings(api as any, modified);
    const loaded = loadSettings(api as any);
    expect(loaded.provider).toBe('anthropic');
    expect(loaded.apiKeys.anthropic).toBe('sk-ant-test');
  });

  it('merges saved partial settings over defaults (missing keys filled)', () => {
    const api = makeApi();
    // Store only a partial object
    api.storage.set('settings', JSON.stringify({ provider: 'openrouter' }));
    const s = loadSettings(api as any);
    // Saved provider preserved
    expect(s.provider).toBe('openrouter');
    // Default model still present
    expect(s.models.openai).toBe(DEFAULT_SETTINGS.models.openai);
  });

  it('falls back to defaults on corrupt JSON', () => {
    const api = makeApi();
    api.storage.set('settings', '{this is not json{{{{');
    const s = loadSettings(api as any);
    expect(s).toEqual(DEFAULT_SETTINGS);
  });
});

// ---------------------------------------------------------------------------
// providerReady
// ---------------------------------------------------------------------------

describe('providerReady', () => {
  it.each(['openai', 'openrouter', 'anthropic', 'openai-codex', 'custom'] as const)('requires a trimmed model for %s', (provider) => {
    const s: Settings = {
      ...DEFAULT_SETTINGS, provider, models: { [provider]: ' \n\t ' },
      apiKeys: { openai: 'key', openrouter: 'key', anthropic: 'key' }, customBaseUrl: 'http://localhost/v1',
    };
    expect(providerReady(s, true)).toBe(false);
    expect(readinessReason(s, true)).toMatch(/model id/i);
    expect(providerReady({ ...s, models: { [provider]: ' model ' } }, true)).toBe(true);
  });

  it.each(['openai', 'openrouter', 'anthropic'] as const)('requires a non-whitespace key for %s and gives specific guidance', (provider) => {
    const s: Settings = { ...DEFAULT_SETTINGS, provider, models: { [provider]: 'model' }, apiKeys: { [provider]: ' \t ' } };
    expect(providerReady(s, false)).toBe(false);
    expect(readinessReason(s, false)).toMatch(/api key/i);
    expect(readinessReason({ ...s, apiKeys: { [provider]: ' key ' } }, false)).toBeNull();
  });

  it('requires a trimmed custom base URL but keeps the custom API key optional', () => {
    const s: Settings = { ...DEFAULT_SETTINGS, provider: 'custom', models: { custom: 'local' }, customBaseUrl: '  \n ' };
    expect(providerReady(s, false)).toBe(false);
    expect(readinessReason(s, false)).toMatch(/base url/i);
    expect(providerReady({ ...s, customBaseUrl: ' http://localhost/v1 ', apiKeys: { custom: ' ' } }, false)).toBe(true);
  });

  it('gives a sign-in reason only after a Codex model is selected', () => {
    const s: Settings = { ...DEFAULT_SETTINGS, provider: 'openai-codex' };
    expect(readinessReason(s, false)).toMatch(/sign in/i);
    expect(readinessReason(s, true)).toBeNull();
  });

  it('fails closed on unknown persisted providers and non-string required fields', () => {
    expect(providerReady({ ...DEFAULT_SETTINGS, provider: 'unknown' } as unknown as Settings, true)).toBe(false);
    expect(readinessReason({ ...DEFAULT_SETTINGS, provider: 'unknown' } as unknown as Settings, true)).toMatch(/provider/i);
    expect(providerReady({ ...DEFAULT_SETTINGS, models: { openai: 123 } } as unknown as Settings, false)).toBe(false);
    expect(providerReady({ ...DEFAULT_SETTINGS, apiKeys: { openai: {} } } as unknown as Settings, false)).toBe(false);
  });

  it('openai requires apiKeys.openai', () => {
    const s: Settings = { ...DEFAULT_SETTINGS, provider: 'openai', apiKeys: {} };
    expect(providerReady(s, false)).toBe(false);
    const s2: Settings = { ...s, apiKeys: { openai: 'sk-test' } };
    expect(providerReady(s2, false)).toBe(true);
  });

  it('anthropic requires apiKeys.anthropic', () => {
    const s: Settings = { ...DEFAULT_SETTINGS, provider: 'anthropic', apiKeys: {} };
    expect(providerReady(s, false)).toBe(false);
    const s2: Settings = { ...s, apiKeys: { anthropic: 'sk-ant' } };
    expect(providerReady(s2, false)).toBe(true);
  });

  it('openrouter requires apiKeys.openrouter', () => {
    const s: Settings = { ...DEFAULT_SETTINGS, provider: 'openrouter', models: { openrouter: 'provider/model' }, apiKeys: {} };
    expect(providerReady(s, false)).toBe(false);
    const s2: Settings = { ...s, apiKeys: { openrouter: 'sk-or-test' } };
    expect(providerReady(s2, false)).toBe(true);
  });

  it('openai-codex requires codexLoggedIn=true', () => {
    const s: Settings = { ...DEFAULT_SETTINGS, provider: 'openai-codex' };
    expect(providerReady(s, false)).toBe(false);
    expect(providerReady(s, true)).toBe(true);
  });

  it('custom requires customBaseUrl', () => {
    const s: Settings = { ...DEFAULT_SETTINGS, provider: 'custom', models: { custom: 'local-model' }, customBaseUrl: '' };
    expect(providerReady(s, false)).toBe(false);
    const s2: Settings = { ...s, customBaseUrl: 'http://127.0.0.1:11434/v1' };
    expect(providerReady(s2, false)).toBe(true);
  });
});
