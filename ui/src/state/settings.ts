/**
 * Settings persistence — stores provider/model/key preferences in the
 * plugin's namespaced storage (api.storage).
 *
 * Storage key: 'settings'
 * On load, the stored object is deep-merged over DEFAULT_SETTINGS so missing
 * keys are always filled. Corrupt JSON falls back silently to defaults.
 */

import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Provider } from '../llm/client';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Settings {
  provider: Provider;
  /** Last-used model id per provider. */
  models: Partial<Record<Provider, string>>;
  /** Stored API keys (openai-codex uses its own OAuth flow, not stored here). */
  apiKeys: Partial<Record<'openai' | 'openrouter' | 'anthropic' | 'custom', string>>;
  customBaseUrl: string;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

export const DEFAULT_SETTINGS: Settings = {
  provider: 'openai',
  models: {
    openai: 'gpt-5.2',
    'openai-codex': 'gpt-5.5',
    openrouter: '',
    anthropic: 'claude-sonnet-4-6',
    custom: '',
  },
  apiKeys: {},
  customBaseUrl: '',
};

const STORAGE_KEY = 'settings';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type StrictApi = Pick<CodefyUIPluginAPI, 'storage'>;

/**
 * Deep-merge `patch` over `base` — only one level deep (enough for Settings).
 * Sub-objects are shallow-merged; primitives are replaced.
 */
function mergeSettings(base: Settings, patch: Partial<Settings>): Settings {
  return {
    provider: (patch.provider as Provider) ?? base.provider,
    models: { ...base.models, ...patch.models },
    apiKeys: { ...base.apiKeys, ...patch.apiKeys },
    customBaseUrl: patch.customBaseUrl !== undefined ? patch.customBaseUrl : base.customBaseUrl,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function loadSettings(api: StrictApi): Settings {
  const raw = api.storage.get(STORAGE_KEY);
  if (!raw) return { ...DEFAULT_SETTINGS, models: { ...DEFAULT_SETTINGS.models }, apiKeys: {} };

  try {
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return mergeSettings(DEFAULT_SETTINGS, parsed);
  } catch {
    return { ...DEFAULT_SETTINGS, models: { ...DEFAULT_SETTINGS.models }, apiKeys: {} };
  }
}

export function saveSettings(api: StrictApi, s: Settings): void {
  api.storage.set(STORAGE_KEY, JSON.stringify(s));
}

/** A concrete setup step; values are trimmed for readiness, never rewritten here. */
export function readinessReason(s: Settings, codexLoggedIn: boolean): string | null {
  const hasText = (value: unknown): value is string => typeof value === 'string' && value.trim().length > 0;
  const providers = ['openai', 'openrouter', 'anthropic', 'openai-codex', 'custom'];
  if (!providers.includes(s.provider)) return 'Select a supported provider in Settings.';
  if (!hasText(s.models?.[s.provider])) return 'Enter a model ID in Settings before sending a request.';
  switch (s.provider) {
    case 'openai':
      return hasText(s.apiKeys?.openai) ? null : 'Enter an OpenAI API key in Settings.';
    case 'openrouter':
      return hasText(s.apiKeys?.openrouter) ? null : 'Enter an OpenRouter API key in Settings.';
    case 'anthropic':
      return hasText(s.apiKeys?.anthropic) ? null : 'Enter an Anthropic API key in Settings.';
    case 'openai-codex':
      return codexLoggedIn ? null : 'Sign in with ChatGPT Codex in Settings.';
    case 'custom':
      return hasText(s.customBaseUrl) ? null : 'Enter the custom API base URL in Settings.';
  }
}

/** Model and provider credentials must be nonempty after trimming. Custom keys remain optional. */
export function providerReady(s: Settings, codexLoggedIn: boolean): boolean {
  return readinessReason(s, codexLoggedIn) === null;
}
