import { beforeEach, describe, expect, it } from 'vitest';
import {
  MODEL_CATALOG_CACHE_TTL_MS,
  MAX_MODEL_CATALOG_ENTRIES,
  builtInModelCatalog,
  clearModelCatalogCache,
  mergeModelCatalog,
  modelCatalogCacheKey,
  normalizeModelCatalog,
  readCachedModelCatalog,
  writeCachedModelCatalog,
} from './models';

describe('model catalog', () => {
  beforeEach(() => clearModelCatalogCache());

  it('provides the three GPT-5.6 fallbacks with provider-specific efforts', () => {
    const openai = builtInModelCatalog('openai');
    const codex = builtInModelCatalog('openai-codex');

    expect(openai.map((model) => model.id)).toEqual([
      'gpt-5.6-sol',
      'gpt-5.6-terra',
      'gpt-5.6-luna',
    ]);
    expect(openai[0]).toMatchObject({
      defaultReasoningEffort: 'medium',
      reasoningEfforts: [
        { effort: 'none' },
        { effort: 'low' },
        { effort: 'medium' },
        { effort: 'high' },
        { effort: 'xhigh' },
        { effort: 'max' },
      ],
    });
    expect(codex[0]).toMatchObject({
      defaultReasoningEffort: 'low',
      reasoningEfforts: [
        { effort: 'low' },
        { effort: 'medium' },
        { effort: 'high' },
        { effort: 'xhigh' },
        { effort: 'max' },
      ],
    });
    expect(codex[1].defaultReasoningEffort).toBe('medium');
    expect(codex[2].defaultReasoningEffort).toBe('medium');
  });

  it('normalizes legacy id-only and rich provider records', () => {
    expect(normalizeModelCatalog([
      { id: 'legacy-model' },
      {
        id: 'rich-model',
        display_name: 'Rich model',
        description: 'Provider metadata',
        default_reasoning_level: 'medium',
        supported_reasoning_levels: [
          'low',
          { effort: 'future_plus', description: 'Future provider mode' },
          'ultra',
          'low',
        ],
      },
      'string-model',
      { id: '' },
    ])).toEqual([
      { id: 'legacy-model', label: 'legacy-model' },
      {
        id: 'rich-model',
        label: 'Rich model',
        description: 'Provider metadata',
        defaultReasoningEffort: 'medium',
        reasoningEfforts: [
          { effort: 'low' },
          { effort: 'future_plus', description: 'Future provider mode' },
        ],
      },
      { id: 'string-model', label: 'string-model' },
    ]);
  });

  it('keeps fallback capabilities and a pinned selection missing upstream', () => {
    const merged = mergeModelCatalog(
      'openai',
      normalizeModelCatalog([{ id: 'gpt-5.6-sol' }, { id: 'gpt-other' }]),
      'pinned-private-model',
    );

    expect(merged.find((model) => model.id === 'gpt-5.6-sol')).toMatchObject({
      label: 'GPT-5.6 Sol',
      reasoningEfforts: [
        { effort: 'none' },
        { effort: 'low' },
        { effort: 'medium' },
        { effort: 'high' },
        { effort: 'xhigh' },
        { effort: 'max' },
      ],
    });
    expect(merged.at(-1)).toEqual({ id: 'pinned-private-model', label: 'pinned-private-model' });
  });

  it('enriches the official gpt-5.6 alias with Sol metadata without adding a fourth fallback', () => {
    expect(builtInModelCatalog('openai').map((model) => model.id)).not.toContain('gpt-5.6');

    const merged = mergeModelCatalog(
      'openai',
      normalizeModelCatalog([{ id: 'gpt-5.6' }]),
      'gpt-5.6',
    );
    expect(merged.find((model) => model.id === 'gpt-5.6')).toMatchObject({
      label: 'GPT-5.6 (Sol alias)',
      defaultReasoningEffort: 'medium',
      reasoningEfforts: [
        { effort: 'none' },
        { effort: 'low' },
        { effort: 'medium' },
        { effort: 'high' },
        { effort: 'xhigh' },
        { effort: 'max' },
      ],
    });
  });

  it('caches per credential identity for five minutes without exposing the key', () => {
    const firstKey = modelCatalogCacheKey('openai', 'sk-secret-one');
    const secondKey = modelCatalogCacheKey('openai', 'sk-secret-two');
    expect(firstKey).not.toBe(secondKey);
    expect(firstKey).not.toContain('sk-secret-one');

    const result = {
      models: [{ id: 'gpt-live', label: 'GPT live' }],
      capabilities: { reasoningEffort: true, richModelCatalog: true },
    };
    writeCachedModelCatalog(firstKey, result, 1000);
    expect(readCachedModelCatalog(firstKey, 1000 + MODEL_CATALOG_CACHE_TTL_MS - 1)).toEqual(result);
    expect(readCachedModelCatalog(firstKey, 1000 + MODEL_CATALOG_CACHE_TTL_MS)).toBeNull();
  });

  it('accepts a 256-character model id and rejects 257 characters', () => {
    const atLimit = 'm'.repeat(256);
    const overLimit = 'm'.repeat(257);

    expect(normalizeModelCatalog([
      { id: atLimit },
      { id: overLimit },
    ])).toEqual([{ id: atLimit, label: atLimit }]);
  });

  it('accepts a 64-character effort slug and rejects 65 characters', () => {
    const atLimit = `e${'x'.repeat(63)}`;
    const overLimit = `e${'x'.repeat(64)}`;

    expect(normalizeModelCatalog([{
      id: 'effort-boundary-model',
      supported_reasoning_efforts: [atLimit, overLimit],
    }])).toEqual([{
      id: 'effort-boundary-model',
      label: 'effort-boundary-model',
      reasoningEfforts: [{ effort: atLimit }],
    }]);
  });

  it('bounds and sanitizes untrusted provider catalog metadata', () => {
    const oversized = Array.from({ length: MAX_MODEL_CATALOG_ENTRIES + 20 }, (_, index) => ({
      id: `model-${index}`,
      label: 'L'.repeat(300),
      description: 'D'.repeat(700),
      supported_reasoning_efforts: [{ effort: 'future_mode', description: 'E'.repeat(500) }],
    }));
    oversized.unshift({ id: `bad\u0000id`, label: 'bad', description: 'bad', supported_reasoning_efforts: [] });
    oversized.unshift({ id: 'x'.repeat(257), label: 'bad', description: 'bad', supported_reasoning_efforts: [] });

    const normalized = normalizeModelCatalog(oversized);
    expect(normalized).toHaveLength(MAX_MODEL_CATALOG_ENTRIES);
    expect(normalized.some((model) => model.id.includes('\u0000'))).toBe(false);
    expect(normalized.every((model) => model.id.length <= 256)).toBe(true);
    expect(normalized[0].label).toHaveLength(160);
    expect(normalized[0].description).toHaveLength(500);
    expect(normalized[0].reasoningEfforts?.[0].description).toHaveLength(300);
  });
});
