/**
 * Exercises the DEFAULT readers in readFileAsAttachment (no injected deps),
 * which the main attachments suite skips by injecting fakes. The pdf.js CDN
 * path (extractPdfText / loadPdfjs) stays uncovered by design — it is a runtime
 * dynamic import that tests must not reach.
 */
import { describe, it, expect } from 'vitest';
import { readFileAsAttachment } from './attachments';

describe('readFileAsAttachment — default readers (jsdom)', () => {
  it('reads an image File to a base64 data URL via the default FileReader path', async () => {
    const file = new File([new Uint8Array([1, 2, 3, 4])], 'pic.png', { type: 'image/png' });
    const att = await readFileAsAttachment(file);
    expect(att.kind).toBe('image');
    expect(att.name).toBe('pic.png');
    expect(att.dataUrl).toMatch(/^data:image\/png;base64,/);
  });

  it('reads a text File via the default file.text() path', async () => {
    // jsdom's File has no .text(); provide a minimal File-like with one so the
    // default `f.text()` reader path is exercised.
    const file = {
      name: 'note.txt',
      type: 'text/plain',
      size: 11,
      text: async () => 'hello world',
    } as unknown as File;
    const att = await readFileAsAttachment(file);
    expect(att.kind).toBe('text');
    expect(att.text).toBe('hello world');
  });
});
