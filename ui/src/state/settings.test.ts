/**
 * Tests for ui/src/state/settings.ts
 */

import { describe, it, expect } from 'vitest';
import {
  DEFAULT_SETTINGS,
  loadSettings,
  saveSettings,
  providerReady,
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
    const s: Settings = { ...DEFAULT_SETTINGS, provider: 'openrouter', apiKeys: {} };
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
    const s: Settings = { ...DEFAULT_SETTINGS, provider: 'custom', customBaseUrl: '' };
    expect(providerReady(s, false)).toBe(false);
    const s2: Settings = { ...s, customBaseUrl: 'http://127.0.0.1:11434/v1' };
    expect(providerReady(s2, false)).toBe(true);
  });
});
