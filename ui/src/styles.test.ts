/** The stylesheet's colour rules: every literal colour is a fallback inside
 * the token region, and each status has a role token. */
import { describe, it, expect, vi } from 'vitest';

// Read as test data, the same way pluginMetadata.test.ts reads the manifest.
const { readFileSync } = await vi.importActual<{ readFileSync(path: string, encoding: 'utf8'): string }>('node:fs');
const css = readFileSync('src/styles.css', 'utf8');
const LITERAL = /#[0-9a-fA-F]{3,8}\b|\b(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\(/g;
const stripComments = (text: string) => text.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '));

describe('styles.css', () => {
  it('has exactly one token region', () => {
    expect(css.match(/\/\* tokens:begin \*\//g)).toHaveLength(1);
    expect(css.match(/\/\* tokens:end \*\//g)).toHaveLength(1);
    expect(css.indexOf('tokens:begin')).toBeLessThan(css.indexOf('tokens:end'));
  });

  it('keeps colour literals inside the token region only', () => {
    const begin = css.indexOf('/* tokens:begin */');
    const end = css.indexOf('/* tokens:end */');
    const outside = stripComments(css.slice(0, begin) + css.slice(end));
    const found = outside.split('\n').flatMap((line, index) => (line.match(LITERAL) ? [`${index + 1}: ${line.trim()}`] : []));
    expect(found).toEqual([]);
  });

  it('defines each role once, bound to host tokens', () => {
    const region = css.slice(css.indexOf('/* tokens:begin */'), css.indexOf('/* tokens:end */'));
    for (const role of ['accent', 'live', 'ok', 'attention', 'danger', 'neutral']) {
      expect(css.match(new RegExp(`--gcp-role-${role}:`, 'g'))).toHaveLength(1);
      expect(region).toContain(`--gcp-role-${role}:`);
    }
    expect(region).toMatch(/--gcp-tier-body:\s*var\(--gcp-fs-md\)/);
    expect(region).toMatch(/--gcp-fs-md:\s*var\(--fs-md/);
  });

  it('animates only the working line and in-flight spinners', () => {
    const rules = stripComments(css).match(/[^{}]+\{[^{}]*animation:[^;]*infinite[^{}]*\}/g) ?? [];
    const selectors = rules.map((rule) => rule.slice(0, rule.indexOf('{')).trim());
    expect(selectors.every((selector) => /gcp-runbar-phase|spinner/.test(selector))).toBe(true);
  });
});
