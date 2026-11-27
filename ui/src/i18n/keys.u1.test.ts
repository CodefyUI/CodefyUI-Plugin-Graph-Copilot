/** U1: the zh-TW dictionary covers exactly the English keys, with the same placeholders. */
import { describe, expect, it } from 'vitest';
import { en } from './en';
import { zhTW } from './zh-TW';

const placeholders = (text: string) => [...text.matchAll(/\{(\w+)\}/g)].map((m) => m[1]).sort();

describe('U1: zh-TW dictionary', () => {
  it('has exactly the same key set as en', () => {
    const enKeys = Object.keys(en).sort();
    const zhKeys = Object.keys(zhTW).sort();
    expect(zhKeys.filter((key) => !(key in en))).toEqual([]);
    expect(enKeys.filter((key) => !(key in zhTW))).toEqual([]);
    expect(zhKeys).toEqual(enKeys);
  });

  it('keeps every placeholder of the English text', () => {
    const mismatched = Object.entries(en)
      .filter(([key, text]) => placeholders(text).join() !== placeholders((zhTW as Record<string, string>)[key] ?? '').join())
      .map(([key]) => key);
    expect(mismatched).toEqual([]);
  });

  it('has no empty translations', () => {
    expect(Object.entries(zhTW).filter(([, text]) => !text.trim()).map(([key]) => key)).toEqual([]);
  });
});
