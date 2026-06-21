/**
 * Tests for ui/src/state/attachments.ts
 *
 * Pure helpers (classify, formatBytes, langFromName) are tested directly.
 * readFileAsAttachment is tested with injected readers so the suite never
 * touches FileReader internals or the network (pdf.js).
 */

import { describe, it, expect, vi } from 'vitest';
import {
  classify,
  formatBytes,
  langFromName,
  readFileAsAttachment,
  MAX_IMAGE_BYTES,
  MAX_TEXT_BYTES,
  MAX_PDF_BYTES,
} from './attachments';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Make a File-like object; jsdom's File is fine but we override size when needed. */
function makeFile(name: string, type: string, content = 'x', size?: number): File {
  const f = new File([content], name, { type });
  if (size !== undefined) Object.defineProperty(f, 'size', { value: size });
  return f;
}

// ---------------------------------------------------------------------------
// classify
// ---------------------------------------------------------------------------

describe('classify', () => {
  it('classifies images by MIME', () => {
    expect(classify({ name: 'a.png', type: 'image/png' })).toBe('image');
    expect(classify({ name: 'b.jpeg', type: 'image/jpeg' })).toBe('image');
  });

  it('classifies images by extension when MIME is missing', () => {
    expect(classify({ name: 'photo.PNG', type: '' })).toBe('image');
    expect(classify({ name: 'pic.webp', type: '' })).toBe('image');
  });

  it('classifies PDFs by MIME and extension', () => {
    expect(classify({ name: 'doc.pdf', type: 'application/pdf' })).toBe('pdf');
    expect(classify({ name: 'doc.pdf', type: '' })).toBe('pdf');
  });

  it('classifies text by MIME', () => {
    expect(classify({ name: 'notes.txt', type: 'text/plain' })).toBe('text');
  });

  it('defaults unknown/code files to text', () => {
    expect(classify({ name: 'main.py', type: '' })).toBe('text');
    expect(classify({ name: 'app.tsx', type: '' })).toBe('text');
    expect(classify({ name: 'data.json', type: 'application/json' })).toBe('text');
    expect(classify({ name: 'weird.unknownext', type: '' })).toBe('text');
  });
});

// ---------------------------------------------------------------------------
// formatBytes
// ---------------------------------------------------------------------------

describe('formatBytes', () => {
  it('formats bytes, KB, MB', () => {
    expect(formatBytes(0)).toBe('0 B');
    expect(formatBytes(900)).toBe('900 B');
    expect(formatBytes(1024)).toBe('1.0 KB');
    expect(formatBytes(1536)).toBe('1.5 KB');
    expect(formatBytes(1024 * 1024)).toBe('1.0 MB');
  });
});

// ---------------------------------------------------------------------------
// langFromName
// ---------------------------------------------------------------------------

describe('langFromName', () => {
  it('maps common extensions to fence languages', () => {
    expect(langFromName('main.py')).toBe('python');
    expect(langFromName('app.ts')).toBe('ts');
    expect(langFromName('a.json')).toBe('json');
  });

  it('returns empty string for unknown extensions', () => {
    expect(langFromName('file.zzz')).toBe('');
    expect(langFromName('noext')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// readFileAsAttachment — dispatch
// ---------------------------------------------------------------------------

describe('readFileAsAttachment', () => {
  it('reads an image as a data URL', async () => {
    const file = makeFile('p.png', 'image/png');
    const readDataUrl = vi.fn().mockResolvedValue('data:image/png;base64,AAAA');
    const att = await readFileAsAttachment(file, { readDataUrl });

    expect(att.kind).toBe('image');
    expect(att.name).toBe('p.png');
    expect(att.mime).toBe('image/png');
    expect(att.dataUrl).toBe('data:image/png;base64,AAAA');
    expect(att.text).toBeUndefined();
    expect(att.id).toBeTruthy();
    expect(readDataUrl).toHaveBeenCalledWith(file);
  });

  it('reads a text file as text', async () => {
    const file = makeFile('notes.txt', 'text/plain');
    const readText = vi.fn().mockResolvedValue('hello world');
    const att = await readFileAsAttachment(file, { readText });

    expect(att.kind).toBe('text');
    expect(att.text).toBe('hello world');
    expect(att.dataUrl).toBeUndefined();
    expect(readText).toHaveBeenCalledWith(file);
  });

  it('reads a PDF via the injected loader', async () => {
    const file = makeFile('doc.pdf', 'application/pdf');
    const loadPdfText = vi.fn().mockResolvedValue('page one text');
    const att = await readFileAsAttachment(file, { loadPdfText });

    expect(att.kind).toBe('pdf');
    expect(att.text).toBe('page one text');
    expect(loadPdfText).toHaveBeenCalledWith(file);
  });

  it('rejects an oversized image', async () => {
    const file = makeFile('big.png', 'image/png', 'x', MAX_IMAGE_BYTES + 1);
    await expect(
      readFileAsAttachment(file, { readDataUrl: vi.fn() }),
    ).rejects.toThrow(/too large/i);
  });

  it('rejects an oversized text file', async () => {
    const file = makeFile('big.txt', 'text/plain', 'x', MAX_TEXT_BYTES + 1);
    await expect(
      readFileAsAttachment(file, { readText: vi.fn() }),
    ).rejects.toThrow(/too large/i);
  });

  it('rejects an oversized PDF', async () => {
    const file = makeFile('big.pdf', 'application/pdf', 'x', MAX_PDF_BYTES + 1);
    await expect(
      readFileAsAttachment(file, { loadPdfText: vi.fn() }),
    ).rejects.toThrow(/too large/i);
  });

  it('surfaces a friendly error when PDF extraction fails (e.g. offline)', async () => {
    const file = makeFile('doc.pdf', 'application/pdf');
    const loadPdfText = vi.fn().mockRejectedValue(new Error('network'));
    await expect(
      readFileAsAttachment(file, { loadPdfText }),
    ).rejects.toThrow(/pdf/i);
  });
});
