/** A small translation layer: one dictionary per language and `t()`.
 *
 * The language is the host page's: CodefyUI sets `<html lang>` to its UI
 * language and updates it when the user switches, so `useLocale` watches that
 * attribute. Anything that is not Chinese reads English. */
import { useSyncExternalStore } from 'react';
import { en, type MessageKey } from './i18n/en';
import { zhTW } from './i18n/zh-TW';

export type Locale = 'en' | 'zh-TW';
export type { MessageKey };

const DICTIONARIES: Record<Locale, Partial<Record<MessageKey, string>>> = { en, 'zh-TW': zhTW };

export function localeFrom(lang: string | null | undefined): Locale {
  return lang && /^zh/i.test(lang) ? 'zh-TW' : 'en';
}

export function currentLocale(): Locale {
  return typeof document === 'undefined' ? 'en' : localeFrom(document.documentElement.lang);
}

/** `{name}` placeholders are replaced from `vars`. */
export function translate(locale: Locale, key: MessageKey, vars: Record<string, string | number> = {}): string {
  const template = DICTIONARIES[locale][key] ?? en[key];
  return template.replace(/\{(\w+)\}/g, (match, name: string) => (name in vars ? String(vars[name]) : match));
}

export function t(key: MessageKey, vars?: Record<string, string | number>): string {
  return translate(currentLocale(), key, vars);
}

function subscribe(onChange: () => void): () => void {
  if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return () => {};
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang'] });
  return () => observer.disconnect();
}

/** Re-render when the host switches language. */
export function useLocale(): Locale {
  return useSyncExternalStore(subscribe, currentLocale, () => 'en' as Locale);
}

/** `t` bound to the current locale, re-rendering on a language switch. */
export function useT(): (key: MessageKey, vars?: Record<string, string | number>) => string {
  const locale = useLocale();
  return (key, vars) => translate(locale, key, vars);
}
