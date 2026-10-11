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
  activeReasoningEffort,
  withReasoningEffort,
  reconcileModelCatalogSettings,
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
    expect(s.models.openai).toBe('gpt-5.6-sol');
    expect(s.models['openai-codex']).toBe('gpt-5.6-sol');
    expect(s.reasoningEfforts).toEqual({ 'openai-codex': 'max' });
    expect(s.providerCapabilities).toEqual({});
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
    expect(s.reasoningEfforts).toEqual({ 'openai-codex': 'max' });
  });

  it('keeps legacy model choices while adding reasoning defaults', () => {
    const api = makeApi();
    api.storage.set('settings', JSON.stringify({
      provider: 'openai',
      models: { openai: 'gpt-5.2' },
      apiKeys: { openai: 'sk-legacy' },
    }));

    const s = loadSettings(api as any);
    expect(s.models.openai).toBe('gpt-5.2');
    expect(s.reasoningEfforts).toEqual({ 'openai-codex': 'max' });
  });

  it('ignores invalid persisted reasoning effort values', () => {
    const api = makeApi();
    api.storage.set('settings', JSON.stringify({
      reasoningEfforts: { openai: 'ultra', 'openai-codex': 'max' },
    }));

    const s = loadSettings(api as any);
    expect(s.reasoningEfforts?.openai).toBeUndefined();
    expect(s.reasoningEfforts?.['openai-codex']).toBe('max');
  });

  it('does not persist negotiated host capabilities', () => {
    const api = makeApi();
    saveSettings(api as any, {
      ...DEFAULT_SETTINGS,
      providerCapabilities: {
        openai: { reasoningEffort: true, reasoningModel: 'gpt-5.6-sol' },
      },
    });

    expect(loadSettings(api as any).providerCapabilities).toEqual({});
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

describe('activeReasoningEffort', () => {
  it('returns the active provider effort when the host advertises support', () => {
    const s: Settings = {
      ...DEFAULT_SETTINGS,
      provider: 'openai',
      reasoningEfforts: { openai: 'max', 'openai-codex': 'low' },
      providerCapabilities: {
        openai: { reasoningEffort: true, reasoningModel: 'gpt-5.6-sol' },
      },
    };

    expect(activeReasoningEffort(s)).toBe('max');
  });

  it('omits effort for legacy or explicitly unsupported hosts', () => {
    const legacy: Settings = {
      ...DEFAULT_SETTINGS,
      provider: 'openai',
      reasoningEfforts: { openai: 'high' },
    };
    const unsupported: Settings = {
      ...legacy,
      providerCapabilities: { openai: { reasoningEffort: false } },
    };

    expect(activeReasoningEffort(legacy)).toBeUndefined();
    expect(activeReasoningEffort(unsupported)).toBeUndefined();
  });

  it('sends the seeded Codex max default once the host confirms support', () => {
    const s: Settings = {
      ...DEFAULT_SETTINGS,
      provider: 'openai-codex',
      providerCapabilities: {
        'openai-codex': { reasoningEffort: true, reasoningModel: 'gpt-5.6-sol' },
      },
    };

    expect(activeReasoningEffort(s)).toBe('max');
  });

  it('leaves model-default selections undefined', () => {
    const s: Settings = {
      ...DEFAULT_SETTINGS,
      provider: 'openai-codex',
      reasoningEfforts: {},
      providerCapabilities: { 'openai-codex': { reasoningEffort: true } },
    };

    expect(activeReasoningEffort(s)).toBeUndefined();
  });
});

describe('malformed persisted model identities', () => {
  const malformedModels: unknown[] = [123, false, null, {}, [], undefined];

  it.each(malformedModels)('reconciles %j without throwing or enabling effort', (model) => {
    const api = makeApi();
    api.storage.set('settings', JSON.stringify({
      provider: 'openai',
      models: { openai: model },
      apiKeys: { openai: 'fixture-key' },
      reasoningEfforts: { openai: 'max' },
    }));
    const s = loadSettings(api);
    // Explicitly missing entries can also occur in caller-supplied legacy Settings.
    if (model === undefined) s.models = {};
    const next = reconcileModelCatalogSettings(s, 'openai', [], {
      reasoningEffort: true,
      richModelCatalog: true,
    }, 'live');
    expect(next.models).toEqual(s.models); // do not silently migrate a pinned model
    expect(next.reasoningEfforts?.openai).toBe('max');
    expect(next.providerCapabilities?.openai?.reasoningModel).toBeUndefined();
    expect(activeReasoningEffort(next)).toBeUndefined();
    expect(providerReady(next, true)).toBe(false);
  });

  it.each(malformedModels)('keeps an effort preference for %j without stamping a malformed model', (model) => {
    const s = {
      ...DEFAULT_SETTINGS,
      models: { openai: model },
      reasoningEfforts: { openai: 'low' },
      providerCapabilities: { openai: { reasoningEffort: true } },
    } as unknown as Settings;
    const next = withReasoningEffort(s, 'openai', 'max');
    expect(next.reasoningEfforts?.openai).toBe('max');
    expect(next.providerCapabilities?.openai?.reasoningModel).toBeUndefined();
    expect(activeReasoningEffort(next)).toBeUndefined();
  });

  it('does not enable effort when both model and capability carry the same corrupt identity', () => {
    const s = {
      ...DEFAULT_SETTINGS,
      models: { openai: 123 },
      reasoningEfforts: { openai: 'max' },
      providerCapabilities: { openai: { reasoningEffort: true, reasoningModel: 123 } },
    } as unknown as Settings;
    expect(activeReasoningEffort(s)).toBeUndefined();
  });
});

describe('withReasoningEffort', () => {
  const base: Settings = {
    ...DEFAULT_SETTINGS,
    provider: 'openai',
    models: { ...DEFAULT_SETTINGS.models, openai: 'gpt-5.6-sol' },
    providerCapabilities: {
      openai: { reasoningEffort: true, richModelCatalog: true },
    },
  };

  it('sets the effort and stamps the confirmed model so it sends immediately', () => {
    const next = withReasoningEffort(base, 'openai', 'xhigh');
    expect(next.reasoningEfforts?.openai).toBe('xhigh');
    expect(next.providerCapabilities?.openai?.reasoningModel).toBe('gpt-5.6-sol');
    expect(activeReasoningEffort(next)).toBe('xhigh');
    expect(base.reasoningEfforts?.openai).toBeUndefined(); // input untouched
  });

  it('clears back to model default with an empty effort', () => {
    const chosen = withReasoningEffort(base, 'openai', 'high');
    const cleared = withReasoningEffort(chosen, 'openai', '');
    expect(cleared.reasoningEfforts?.openai).toBeUndefined();
    expect(cleared.providerCapabilities?.openai?.reasoningModel).toBeUndefined();
    expect(activeReasoningEffort(cleared)).toBeUndefined();
  });

  it('records the preference even before capability negotiation', () => {
    const legacy: Settings = { ...DEFAULT_SETTINGS, provider: 'openai' };
    const next = withReasoningEffort(legacy, 'openai', 'max');
    expect(next.reasoningEfforts?.openai).toBe('max');
    // Still gated: nothing is sent until the host confirms support.
    expect(activeReasoningEffort(next)).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// notifyOnRunCompletion
// ---------------------------------------------------------------------------

describe('notifyOnRunCompletion', () => {
  it('defaults to true', () => {
    const api = makeApi();
    expect(loadSettings(api as any).notifyOnRunCompletion).toBe(true);
  });

  it('round-trips an explicit false through save/load', () => {
    const api = makeApi();
    saveSettings(api as any, { ...loadSettings(api as any), notifyOnRunCompletion: false });
    expect(loadSettings(api as any).notifyOnRunCompletion).toBe(false);
  });

  it('keeps the stored value when a patch omits it', () => {
    const api = makeApi();
    saveSettings(api as any, { ...loadSettings(api as any), notifyOnRunCompletion: false });
    // Simulate an older persisted object being merged: store JSON without the key.
    api.storage.set('settings', JSON.stringify({ provider: 'openai' }));
    expect(loadSettings(api as any).notifyOnRunCompletion).toBe(true); // default fills missing key
  });
});
