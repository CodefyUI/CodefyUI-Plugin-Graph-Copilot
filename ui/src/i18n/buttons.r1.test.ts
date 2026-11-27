/** R1: every approval card button is a verb phrase, never a question, in every language. */
import { describe, expect, it } from 'vitest';
import { en } from './en';
import { zhTW } from './zh-TW';
// Vite's ?raw import reads the file as text without Node types.
import source from '../components/ChatView.tsx?raw';

/** The dictionary keys used by any confirmLabel= or cancelLabel= prop. */
const buttonKeys: string[] = [...new Set<string>(source.split('\n')
  .filter((line: string) => /(confirmLabel|cancelLabel)=/.test(line))
  .flatMap((line: string) => line.split(/(?:confirmLabel|cancelLabel)=/).slice(1))
  .flatMap((prop: string) => [...prop.split(/\b(?:confirmLabel|cancelLabel|onDecide)\b/)[0].matchAll(/'((?:approve|common)\.[\w.]+)'/g)].map((m) => m[1])))].sort();

describe('R1: approval card buttons', () => {
  it('finds the buttons of every card (clear, remove, study, run, commit)', () => {
    expect(buttonKeys).toEqual(expect.arrayContaining([
      'approve.clear.confirm', 'approve.clear.cancel', 'approve.remove.confirm', 'approve.study.confirm',
      'approve.run.confirm', 'approve.commit.confirm.one', 'approve.commit.confirm.many', 'common.cancel',
    ]));
  });

  it.each([['en', en as Record<string, string>], ['zh-TW', zhTW as Record<string, string>]] as const)('%s: no button label is a question', (_lang, dict) => {
    const questions = buttonKeys.filter((key) => /[嗎？?]\s*$/.test(dict[key] ?? ''));
    expect(questions).toEqual([]);
  });

  it('the commit card asks in its title and acts in its button', () => {
    expect(zhTW['approve.commit.title.one']).toMatch(/嗎？$/);
    expect(zhTW['approve.commit.confirm.one']).toBe('提交 {count} 個檔案');
    expect(en['approve.commit.confirm.many']).toBe('Commit {count} files');
  });
});
