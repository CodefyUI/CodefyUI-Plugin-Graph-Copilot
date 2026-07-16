import type { Provider } from './client';

export const KNOWN_REASONING_EFFORTS = [
  'none',
  'low',
  'medium',
  'high',
  'xhigh',
  'max',
] as const;

/** Known values retain autocomplete while safe future provider slugs remain accepted. */
export type ReasoningEffort = (typeof KNOWN_REASONING_EFFORTS)[number] | (string & {});

export interface ModelReasoningEffort {
  effort: ReasoningEffort;
  description?: string;
}

export interface ModelCatalogEntry {
  id: string;
  label: string;
  description?: string;
  defaultReasoningEffort?: ReasoningEffort;
  reasoningEfforts?: ModelReasoningEffort[];
}

export interface ModelCatalogCapabilities {
  reasoningEffort: boolean;
  richModelCatalog: boolean;
}

export interface ModelCatalogResult {
  models: ModelCatalogEntry[];
  capabilities: ModelCatalogCapabilities;
  source?: 'live' | 'cache' | 'stale' | 'fallback';
}

interface WireModelCatalogEntry {
  id?: unknown;
  label?: unknown;
  name?: unknown;
  display_name?: unknown;
  description?: unknown;
  default_reasoning_effort?: unknown;
  default_reasoning_level?: unknown;
  defaultReasoningEffort?: unknown;
  supported_reasoning_efforts?: unknown;
  supported_reasoning_levels?: unknown;
  reasoning_efforts?: unknown;
  reasoningEfforts?: unknown;
}

const OPENAI_GPT56_EFFORTS = ['none', 'low', 'medium', 'high', 'xhigh', 'max'] as const;
const CODEX_GPT56_EFFORTS = ['low', 'medium', 'high', 'xhigh', 'max'] as const;

const GPT56_MODELS = [
  {
    id: 'gpt-5.6-sol',
    label: 'GPT-5.6 Sol',
    description: 'Frontier model for complex professional work',
    codexDefault: 'low',
  },
  {
    id: 'gpt-5.6-terra',
    label: 'GPT-5.6 Terra',
    description: 'Balances intelligence and cost',
    codexDefault: 'medium',
  },
  {
    id: 'gpt-5.6-luna',
    label: 'GPT-5.6 Luna',
    description: 'Optimized for cost-sensitive workloads',
    codexDefault: 'medium',
  },
] as const;

export const MODEL_CATALOG_CACHE_TTL_MS = 5 * 60 * 1000;
export const MAX_MODEL_CATALOG_ENTRIES = 500;
const MAX_MODEL_ID_LENGTH = 256;
const MAX_MODEL_LABEL_LENGTH = 160;
const MAX_MODEL_DESCRIPTION_LENGTH = 500;
const MAX_EFFORT_DESCRIPTION_LENGTH = 300;
const CONTROL_CHARS = /[\u0000-\u001f\u007f]/;

interface ModelCatalogCacheEntry {
  expiresAt: number;
  result: ModelCatalogResult;
}

const catalogCache = new Map<string, ModelCatalogCacheEntry>();

export function isReasoningEffort(value: unknown): value is ReasoningEffort {
  return typeof value === 'string'
    && value !== 'ultra'
    && /^[a-z][a-z0-9_-]{0,63}$/.test(value);
}

function sanitizeText(value: unknown, maxLength: number): string | undefined {
  if (typeof value !== 'string' || CONTROL_CHARS.test(value)) return undefined;
  const trimmed = value.trim();
  if (trimmed === '') return undefined;
  return trimmed.slice(0, maxLength);
}

function sanitizeModelId(value: unknown): string | undefined {
  const id = sanitizeText(value, MAX_MODEL_ID_LENGTH + 1);
  return id && id.length <= MAX_MODEL_ID_LENGTH ? id : undefined;
}

function normalizeReasoningEfforts(value: unknown): ModelReasoningEffort[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const efforts = new Map<ReasoningEffort, ModelReasoningEffort>();
  for (const candidate of value) {
    const effort = typeof candidate === 'string'
      ? candidate
      : candidate && typeof candidate === 'object'
      ? (candidate as { effort?: unknown }).effort
      : undefined;
    if (!isReasoningEffort(effort) || efforts.has(effort)) continue;

    const normalized: ModelReasoningEffort = { effort };
    if (candidate && typeof candidate === 'object') {
      const description = (candidate as { description?: unknown }).description;
      const safeDescription = sanitizeText(description, MAX_EFFORT_DESCRIPTION_LENGTH);
      if (safeDescription) normalized.description = safeDescription;
    }
    efforts.set(effort, normalized);
  }
  return efforts.size > 0 ? Array.from(efforts.values()) : undefined;
}

function cloneModel(model: ModelCatalogEntry): ModelCatalogEntry {
  return {
    ...model,
    reasoningEfforts: model.reasoningEfforts?.map((effort) => ({ ...effort })),
  };
}

function cloneCatalogResult(result: ModelCatalogResult): ModelCatalogResult {
  return {
    models: result.models.map(cloneModel),
    capabilities: { ...result.capabilities },
    ...(result.source ? { source: result.source } : {}),
  };
}

/** Normalize rich catalog records while remaining compatible with legacy `{ id }` responses. */
export function normalizeModelCatalog(value: unknown): ModelCatalogEntry[] {
  if (!Array.isArray(value)) return [];

  const seen = new Set<string>();
  const models: ModelCatalogEntry[] = [];
  for (const item of value) {
    if (models.length >= MAX_MODEL_CATALOG_ENTRIES) break;
    const wire: WireModelCatalogEntry =
      typeof item === 'string' ? { id: item } : (item ?? {}) as WireModelCatalogEntry;
    const id = sanitizeModelId(wire.id);
    if (!id) continue;
    if (seen.has(id)) continue;
    seen.add(id);

    const candidateLabel = [wire.label, wire.display_name, wire.name]
      .map((label) => sanitizeText(label, MAX_MODEL_LABEL_LENGTH))
      .find(Boolean);
    const entry: ModelCatalogEntry = {
      id,
      label: candidateLabel ?? id,
    };
    const description = sanitizeText(wire.description, MAX_MODEL_DESCRIPTION_LENGTH);
    if (description) entry.description = description;

    const defaultEffort = wire.defaultReasoningEffort
      ?? wire.default_reasoning_effort
      ?? wire.default_reasoning_level;
    if (isReasoningEffort(defaultEffort)) entry.defaultReasoningEffort = defaultEffort;

    const efforts = normalizeReasoningEfforts(
      wire.reasoningEfforts
      ?? wire.supported_reasoning_efforts
      ?? wire.supported_reasoning_levels
      ?? wire.reasoning_efforts,
    );
    if (efforts) entry.reasoningEfforts = efforts;
    models.push(entry);
  }
  return models;
}

function effortOptions(efforts: readonly ReasoningEffort[]): ModelReasoningEffort[] {
  return efforts.filter((effort) => effort !== 'ultra').map((effort) => ({ effort }));
}

export function builtInModelCatalog(provider: Provider): ModelCatalogEntry[] {
  if (provider !== 'openai' && provider !== 'openai-codex') return [];
  const efforts = provider === 'openai' ? OPENAI_GPT56_EFFORTS : CODEX_GPT56_EFFORTS;
  return GPT56_MODELS.map((model) => ({
    id: model.id,
    label: model.label,
    description: model.description,
    defaultReasoningEffort: provider === 'openai' ? 'medium' : model.codexDefault,
    reasoningEfforts: effortOptions(efforts),
  }));
}

function builtInMetadataForModel(
  provider: Provider,
  modelId: string,
): ModelCatalogEntry | undefined {
  const builtIns = builtInModelCatalog(provider);
  const exact = builtIns.find((model) => model.id === modelId);
  if (exact) return exact;

  // OpenAI documents `gpt-5.6` as an alias for Sol. Keep it out of the
  // three-item fallback list, but enrich it whenever discovery or a pinned
  // setting surfaces the alias.
  if (modelId === 'gpt-5.6') {
    const sol = builtIns.find((model) => model.id === 'gpt-5.6-sol');
    if (sol) return { ...cloneModel(sol), id: modelId, label: 'GPT-5.6 (Sol alias)' };
  }
  return undefined;
}

/**
 * Merge provider discovery over the curated fallback without losing richer
 * fallback metadata. The user's selected model is retained even if discovery
 * omits it, so a refresh never silently changes a pinned selection.
 */
export function mergeModelCatalog(
  provider: Provider,
  discovered: readonly ModelCatalogEntry[],
  selectedModel?: string,
): ModelCatalogEntry[] {
  const result: ModelCatalogEntry[] = [];
  const indexes = new Map<string, number>();

  const add = (entry: ModelCatalogEntry) => {
    const existingIndex = indexes.get(entry.id);
    if (existingIndex === undefined) {
      indexes.set(entry.id, result.length);
      result.push(cloneModel(entry));
      return;
    }

    const existing = result[existingIndex];
    result[existingIndex] = {
      ...existing,
      ...entry,
      label: entry.label === entry.id && existing.label !== existing.id
        ? existing.label
        : entry.label,
      defaultReasoningEffort: entry.defaultReasoningEffort ?? existing.defaultReasoningEffort,
      reasoningEfforts: entry.reasoningEfforts?.length
        ? entry.reasoningEfforts.map((effort) => ({ ...effort }))
        : existing.reasoningEfforts,
    };
  };

  builtInModelCatalog(provider).forEach(add);
  discovered.forEach((entry) => {
    const fallback = builtInMetadataForModel(provider, entry.id);
    if (fallback) add(fallback);
    add(entry);
  });
  const pinned = selectedModel?.trim();
  if (pinned && !indexes.has(pinned)) {
    add(builtInMetadataForModel(provider, pinned) ?? { id: pinned, label: pinned });
  }
  return result;
}

export function catalogEntryForModel(
  provider: Provider,
  model: string,
  catalog: readonly ModelCatalogEntry[] = [],
): ModelCatalogEntry | undefined {
  const fallback = builtInMetadataForModel(provider, model);
  const discovered = catalog.find((candidate) => candidate.id === model);
  if (!discovered) return fallback;
  if (!fallback) return discovered;
  return {
    ...fallback,
    ...discovered,
    label: discovered.label === discovered.id ? fallback.label : discovered.label,
    defaultReasoningEffort:
      discovered.defaultReasoningEffort ?? fallback.defaultReasoningEffort,
    reasoningEfforts: discovered.reasoningEfforts?.length
      ? discovered.reasoningEfforts
      : fallback.reasoningEfforts,
  };
}

function fingerprintSecret(value: string): string {
  let hash = 2166136261;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return `${value.length}-${(hash >>> 0).toString(36)}`;
}

export function modelCatalogCacheKey(
  provider: Provider,
  apiKey?: string,
  baseUrl?: string,
): string {
  return `${provider}:${fingerprintSecret(apiKey ?? '')}:${baseUrl?.trim() ?? ''}`;
}

export function readCachedModelCatalog(
  key: string,
  now = Date.now(),
): ModelCatalogResult | null {
  const cached = catalogCache.get(key);
  if (!cached) return null;
  if (cached.expiresAt <= now) {
    catalogCache.delete(key);
    return null;
  }
  return cloneCatalogResult(cached.result);
}

export function writeCachedModelCatalog(
  key: string,
  result: ModelCatalogResult,
  now = Date.now(),
): void {
  catalogCache.set(key, {
    expiresAt: now + MODEL_CATALOG_CACHE_TTL_MS,
    result: {
      models: normalizeModelCatalog(result.models),
      capabilities: {
        reasoningEffort: result.capabilities.reasoningEffort === true,
        richModelCatalog: result.capabilities.richModelCatalog === true,
      },
      ...(result.source ? { source: result.source } : {}),
    },
  });
}

export function clearModelCatalogCache(provider?: Provider): void {
  if (!provider) {
    catalogCache.clear();
    return;
  }
  const prefix = `${provider}:`;
  for (const key of catalogCache.keys()) {
    if (key.startsWith(prefix)) catalogCache.delete(key);
  }
}
