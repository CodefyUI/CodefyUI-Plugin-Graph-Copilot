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
import type {
  ModelCatalogCapabilities,
  ModelCatalogEntry,
  ModelCatalogResult,
  ReasoningEffort,
} from '../llm/models';
import {
  catalogEntryForModel,
  isReasoningEffort,
  mergeModelCatalog,
} from '../llm/models';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Settings {
  provider: Provider;
  /** Last-used model id per provider. */
  models: Partial<Record<Provider, string>>;
  /** Stored API keys (openai-codex uses its own OAuth flow, not stored here). */
  apiKeys: Partial<Record<'openai' | 'openrouter' | 'anthropic' | 'custom', string>>;
  /** Last-used reasoning effort per provider. Optional for legacy settings objects. */
  reasoningEfforts?: Partial<Record<Provider, ReasoningEffort>>;
  /** Session-observed host capabilities; deliberately not persisted. */
  providerCapabilities?: Partial<Record<Provider, {
    reasoningEffort: boolean;
    richModelCatalog?: boolean;
    /** Model id whose selected effort is known to be supported this session. */
    reasoningModel?: string;
  }>>;
  customBaseUrl: string;
  /** Fire a browser notification when a tracked graph run finishes while the
   * tab is hidden. Default true; permission is requested lazily on the first
   * approved run. */
  notifyOnRunCompletion?: boolean;
}

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

export const DEFAULT_SETTINGS: Settings = {
  provider: 'openai',
  models: {
    openai: 'gpt-5.6-sol',
    'openai-codex': 'gpt-5.6-sol',
    openrouter: '',
    anthropic: 'claude-sonnet-4-6',
    custom: '',
  },
  apiKeys: {},
  // Codex ships pinned to GPT-5.6 Sol at max effort. The value is still sent
  // only after the host confirms reasoning-effort support for the model.
  reasoningEfforts: { 'openai-codex': 'max' },
  providerCapabilities: {},
  customBaseUrl: '',
  notifyOnRunCompletion: true,
};

const STORAGE_KEY = 'settings';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type StrictApi = Pick<CodefyUIPluginAPI, 'storage'>;

/** Persisted JSON is untrusted; missing/malformed identities are never confirmed. */
function selectedModelId(s: Settings, provider: Provider): string | undefined {
  const model: unknown = s.models?.[provider];
  return typeof model === 'string' && model.trim() ? model : undefined;
}

/**
 * Deep-merge `patch` over `base` — only one level deep (enough for Settings).
 * Sub-objects are shallow-merged; primitives are replaced.
 */
function mergeSettings(base: Settings, patch: Partial<Settings>): Settings {
  const reasoningEfforts: Partial<Record<Provider, ReasoningEffort>> = {
    ...base.reasoningEfforts,
  };
  for (const [provider, effort] of Object.entries(patch.reasoningEfforts ?? {})) {
    if (isReasoningEffort(effort)) {
      reasoningEfforts[provider as Provider] = effort;
    }
  }
  return {
    provider: (patch.provider as Provider) ?? base.provider,
    models: { ...base.models, ...patch.models },
    apiKeys: { ...base.apiKeys, ...patch.apiKeys },
    reasoningEfforts,
    // A host upgrade/downgrade must be negotiated again each browser session.
    providerCapabilities: {},
    customBaseUrl: patch.customBaseUrl !== undefined ? patch.customBaseUrl : base.customBaseUrl,
    notifyOnRunCompletion: patch.notifyOnRunCompletion !== undefined
      ? patch.notifyOnRunCompletion
      : base.notifyOnRunCompletion,
  };
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function loadSettings(api: StrictApi): Settings {
  const raw = api.storage.get(STORAGE_KEY);
  if (!raw) return {
    ...DEFAULT_SETTINGS,
    models: { ...DEFAULT_SETTINGS.models },
    apiKeys: {},
    reasoningEfforts: { ...DEFAULT_SETTINGS.reasoningEfforts },
    providerCapabilities: { ...DEFAULT_SETTINGS.providerCapabilities },
  };

  try {
    const parsed = JSON.parse(raw) as Partial<Settings>;
    return mergeSettings(DEFAULT_SETTINGS, parsed);
  } catch {
    return {
      ...DEFAULT_SETTINGS,
      models: { ...DEFAULT_SETTINGS.models },
      apiKeys: {},
      reasoningEfforts: { ...DEFAULT_SETTINGS.reasoningEfforts },
      providerCapabilities: { ...DEFAULT_SETTINGS.providerCapabilities },
    };
  }
}

export function saveSettings(api: StrictApi, s: Settings): void {
  const { providerCapabilities: _sessionCapabilities, ...persisted } = s;
  api.storage.set(STORAGE_KEY, JSON.stringify(persisted));
}

/**
 * Return the explicit reasoning effort for the active provider only after the
 * host has advertised support for the wire field. Missing capability metadata
 * is treated as unsupported for compatibility with legacy hosts.
 */
export function activeReasoningEffort(s: Settings): ReasoningEffort | undefined {
  const model = selectedModelId(s, s.provider);
  const capability = s.providerCapabilities?.[s.provider];
  if (
    model === undefined
    || capability?.reasoningEffort !== true
    || capability.reasoningModel !== model
  ) {
    return undefined;
  }
  return s.reasoningEfforts?.[s.provider];
}

/**
 * Return a settings copy with the provider's reasoning effort set ('' clears
 * it back to the model default). Marks the current model as the one whose
 * effort support this session has confirmed, mirroring the Settings flow, so
 * the choice takes effect immediately on the next send.
 */
export function withReasoningEffort(
  s: Settings,
  provider: Provider,
  effort: ReasoningEffort | '',
): Settings {
  const reasoningEfforts = { ...s.reasoningEfforts };
  if (effort === '') {
    delete reasoningEfforts[provider];
  } else {
    reasoningEfforts[provider] = effort;
  }
  const capability = s.providerCapabilities?.[provider];
  const model = selectedModelId(s, provider);
  return {
    ...s,
    reasoningEfforts,
    ...(capability ? {
      providerCapabilities: {
        ...s.providerCapabilities,
        [provider]: {
          reasoningEffort: capability.reasoningEffort,
          richModelCatalog: capability.richModelCatalog,
          ...(effort && model !== undefined ? { reasoningModel: model } : {}),
        },
      },
    } : {}),
  };
}

/**
 * Reconcile provider-advertised model metadata with a saved effort preference.
 * Preferences survive legacy, stale, and fallback catalogs, but are sent only
 * after this session has confirmed support for the selected model and effort.
 */
export function reconcileModelCatalogSettings(
  s: Settings,
  provider: Provider,
  models: readonly ModelCatalogEntry[],
  capabilities: ModelCatalogCapabilities,
  source?: ModelCatalogResult['source'],
): Settings {
  const existing = s.providerCapabilities?.[provider];
  const reasoningEfforts = { ...s.reasoningEfforts };
  const selectedEffort = reasoningEfforts[provider];
  const selectedModel = selectedModelId(s, provider) ?? '';
  const advertisedEntry = models.find((model) => model.id === selectedModel);
  const selectedEntry = catalogEntryForModel(
    provider,
    selectedModel,
    mergeModelCatalog(provider, models, selectedModel),
  );
  const effortSupported = Boolean(selectedEntry?.reasoningEfforts?.some(
    (option) => option.effort === selectedEffort,
  ));
  const shouldClearEffort = capabilities.reasoningEffort
    && capabilities.richModelCatalog
    && Boolean(advertisedEntry)
    && source !== 'fallback'
    && source !== 'stale'
    && Boolean(selectedEffort)
    && !effortSupported;
  if (shouldClearEffort) delete reasoningEfforts[provider];

  const reasoningModel = !shouldClearEffort
    && capabilities.reasoningEffort
    && Boolean(selectedEffort)
    && effortSupported
    ? selectedModel
    : undefined;
  if (
    (existing?.reasoningEffort ?? false) === capabilities.reasoningEffort
    && (existing?.richModelCatalog ?? false) === capabilities.richModelCatalog
    && existing?.reasoningModel === reasoningModel
    && !shouldClearEffort
  ) {
    return s;
  }

  return {
    ...s,
    reasoningEfforts,
    providerCapabilities: {
      ...s.providerCapabilities,
      [provider]: {
        reasoningEffort: capabilities.reasoningEffort,
        richModelCatalog: capabilities.richModelCatalog,
        ...(reasoningModel ? { reasoningModel } : {}),
      },
    },
  };
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
