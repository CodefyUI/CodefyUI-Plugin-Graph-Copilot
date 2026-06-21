/**
 * Tests for composeUserContent (ui/src/llm/client.ts).
 *
 * Builds the outgoing user-message content from text + attachments:
 *  - no attachments  -> the plain string, byte-identical (backward compatible)
 *  - text/pdf files  -> inlined as labeled fenced blocks in a string
 *  - images          -> a ContentPart[] (text part + image_url parts) for
 *                       image-capable providers
 */

import { describe, it, expect } from 'vitest';
import { composeUserContent } from './client';
import type { ContentPart } from './client';
import type { Attachment } from '../state/attachments';

function img(name: string, url: string): Attachment {
  return { id: name, kind: 'image', name, size: 10, mime: 'image/png', dataUrl: url };
}
function txt(name: string, text: string): Attachment {
  return { id: name, kind: 'text', name, size: text.length, mime: 'text/plain', text };
}
function pdf(name: string, text: string): Attachment {
  return { id: name, kind: 'pdf', name, size: text.length, mime: 'application/pdf', text };
}

describe('composeUserContent', () => {
  it('returns the plain string unchanged when there are no attachments', () => {
    expect(composeUserContent('hello', undefined, 'openai')).toBe('hello');
    expect(composeUserContent('hello', [], 'openai')).toBe('hello');
  });

  it('inlines a text/code file as a labeled fenced block (string result)', () => {
    const out = composeUserContent('explain this', [txt('main.py', 'print(1)')], 'openai');
    expect(typeof out).toBe('string');
    const s = out as string;
    expect(s).toContain('explain this');
    expect(s).toContain('main.py');
    expect(s).toContain('```python');
    expect(s).toContain('print(1)');
  });

  it('inlines a PDF as text (string result, no images)', () => {
    const out = composeUserContent('summarize', [pdf('paper.pdf', 'Abstract...')], 'anthropic');
    expect(typeof out).toBe('string');
    expect(out as string).toContain('paper.pdf');
    expect(out as string).toContain('Abstract...');
  });

  it('returns a ContentPart[] with text + image parts for a capable provider', () => {
    const out = composeUserContent('what is this?', [img('a.png', 'data:image/png;base64,AAA')], 'openai');
    expect(Array.isArray(out)).toBe(true);
    const parts = out as ContentPart[];
    expect(parts[0]).toEqual({ type: 'text', text: 'what is this?' });
    const imgPart = parts.find((p) => p.type === 'image_url');
    expect(imgPart).toEqual({ type: 'image_url', image_url: { url: 'data:image/png;base64,AAA' } });
  });

  it('combines an inlined text file AND an image into the parts array', () => {
    const out = composeUserContent(
      'review',
      [txt('a.ts', 'const x=1'), img('b.png', 'data:image/png;base64,BBB')],
      'openrouter',
    );
    const parts = out as ContentPart[];
    expect(Array.isArray(parts)).toBe(true);
    const textPart = parts[0] as { type: 'text'; text: string };
    expect(textPart.type).toBe('text');
    expect(textPart.text).toContain('review');
    expect(textPart.text).toContain('a.ts');
    expect(textPart.text).toContain('const x=1');
    expect(parts.some((p) => p.type === 'image_url')).toBe(true);
  });

  it('uses a non-empty placeholder text part when only an image is attached', () => {
    const out = composeUserContent('', [img('a.png', 'data:image/png;base64,CCC')], 'anthropic');
    const parts = out as ContentPart[];
    const textPart = parts[0] as { type: 'text'; text: string };
    expect(textPart.type).toBe('text');
    expect(textPart.text.length).toBeGreaterThan(0);
  });

  it('emits multiple image parts in order', () => {
    const out = composeUserContent(
      'compare',
      [img('one.png', 'data:1'), img('two.png', 'data:2')],
      'openai',
    );
    const parts = out as ContentPart[];
    const urls = parts.filter((p) => p.type === 'image_url').map((p: any) => p.image_url.url);
    expect(urls).toEqual(['data:1', 'data:2']);
  });
});
