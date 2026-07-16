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
  reasoningEfforts: {},
  providerCapabilities: {},
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
  const capability = s.providerCapabilities?.[s.provider];
  if (
    capability?.reasoningEffort !== true
    || capability.reasoningModel !== s.models[s.provider]
  ) {
    return undefined;
  }
  return s.reasoningEfforts?.[s.provider];
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
  const selectedModel = s.models[provider] ?? '';
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

/**
 * Returns true when the current settings are sufficient to make a chat request.
 * - openai / openrouter / anthropic / custom (with optional key): need the relevant apiKey.
 *   custom additionally needs customBaseUrl.
 * - openai-codex: needs codexLoggedIn.
 */
export function providerReady(s: Settings, codexLoggedIn: boolean): boolean {
  switch (s.provider) {
    case 'openai':
      return Boolean(s.apiKeys.openai);
    case 'openrouter':
      return Boolean(s.apiKeys.openrouter);
    case 'anthropic':
      return Boolean(s.apiKeys.anthropic);
    case 'openai-codex':
      return codexLoggedIn;
    case 'custom':
      return Boolean(s.customBaseUrl);
    default:
      return false;
  }
}
