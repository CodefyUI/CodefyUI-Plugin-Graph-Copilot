/**
 * Attachment model + readers for Graph Copilot.
 *
 * A user message can carry images, PDFs, and text/code files. Images become a
 * base64 data URL (sent to the model as a multimodal part); text and PDF files
 * are extracted to text and inlined into the prompt.
 *
 * pdf.js is loaded lazily from a CDN ONLY when a PDF is attached, so it stays
 * out of the committed bundle. The loader is injectable (ReadDeps) so tests
 * never touch the network or FileReader internals.
 */

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type AttachmentKind = 'image' | 'pdf' | 'text';

export interface Attachment {
  id: string;
  kind: AttachmentKind;
  name: string;
  size: number; // bytes
  mime: string;
  /** Extracted text (kind: 'text' | 'pdf'). */
  text?: string;
  /** base64 data URL (kind: 'image'). */
  dataUrl?: string;
}

// ---------------------------------------------------------------------------
// Size caps (per file)
// ---------------------------------------------------------------------------

export const MAX_IMAGE_BYTES = 8 * 1024 * 1024; // 8 MB
export const MAX_TEXT_BYTES = 2 * 1024 * 1024; // 2 MB
export const MAX_PDF_BYTES = 20 * 1024 * 1024; // 20 MB

// ---------------------------------------------------------------------------
// Classification
// ---------------------------------------------------------------------------

const IMAGE_EXTS = new Set([
  'png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'svg', 'avif', 'ico',
]);

/** Lowercased file extension without the dot, or '' if none. */
function extOf(name: string): string {
  const dot = name.lastIndexOf('.');
  return dot >= 0 ? name.slice(dot + 1).toLowerCase() : '';
}

/**
 * Decide how to handle a file: image (data URL), pdf (extract text), or text
 * (read text). MIME is preferred; extension is the fallback. Anything not
 * recognised as image/pdf is treated as text — that covers the long tail of
 * source-code extensions without an enumerated list.
 */
export function classify(file: { name: string; type: string }): AttachmentKind {
  const mime = (file.type || '').toLowerCase();
  if (mime.startsWith('image/')) return 'image';
  if (mime === 'application/pdf') return 'pdf';
  if (mime.startsWith('text/')) return 'text';

  const ext = extOf(file.name);
  if (ext === 'pdf') return 'pdf';
  if (IMAGE_EXTS.has(ext)) return 'image';
  return 'text';
}

// ---------------------------------------------------------------------------
// Display helpers
// ---------------------------------------------------------------------------

export function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`;
  return `${(n / (1024 * 1024)).toFixed(1)} MB`;
}

const LANG_BY_EXT: Record<string, string> = {
  py: 'python', ts: 'ts', tsx: 'tsx', js: 'js', jsx: 'jsx', json: 'json',
  md: 'markdown', html: 'html', css: 'css', scss: 'scss', sh: 'bash',
  bash: 'bash', yml: 'yaml', yaml: 'yaml', toml: 'toml', sql: 'sql',
  go: 'go', rs: 'rust', java: 'java', c: 'c', h: 'c', cpp: 'cpp', cc: 'cpp',
  cs: 'csharp', rb: 'ruby', php: 'php', kt: 'kotlin', swift: 'swift',
  xml: 'xml', csv: 'csv', txt: '',
};

/** Markdown fence language for a filename, or '' when unknown. */
export function langFromName(name: string): string {
  return LANG_BY_EXT[extOf(name)] ?? '';
}

// ---------------------------------------------------------------------------
// Default readers (FileReader / pdf.js) — overridable via ReadDeps for tests
// ---------------------------------------------------------------------------

export interface ReadDeps {
  readDataUrl?: (file: File) => Promise<string>;
  readText?: (file: File) => Promise<string>;
  loadPdfText?: (file: File) => Promise<string>;
}

function readDataUrlDefault(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error ?? new Error('FileReader failed'));
    reader.readAsDataURL(file);
  });
}

// pdf.js modern ESM build, loaded from CDN at runtime. The dynamic import is
// marked @vite-ignore so the bundler leaves it as a runtime fetch (keeps the
// committed bundle lean). Pinned version for reproducibility.
const PDFJS_VERSION = '4.10.38';
const PDFJS_BASE = `https://cdn.jsdelivr.net/npm/pdfjs-dist@${PDFJS_VERSION}/build`;

let pdfjsPromise: Promise<any> | null = null;

function loadPdfjs(): Promise<any> {
  if (!pdfjsPromise) {
    const url = `${PDFJS_BASE}/pdf.mjs`;
    pdfjsPromise = import(/* @vite-ignore */ url).then((mod: any) => {
      const lib = mod.default ?? mod;
      // API and worker MUST be the same version; both derive from PDFJS_BASE.
      lib.GlobalWorkerOptions.workerSrc = `${PDFJS_BASE}/pdf.worker.mjs`;
      return lib;
    });
  }
  return pdfjsPromise;
}

/** Extract concatenated text from every page of a PDF. */
export async function extractPdfText(file: File): Promise<string> {
  const pdfjs = await loadPdfjs();
  const data = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data }).promise;
  const pages: string[] = [];
  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();
    const line = content.items
      .map((it: any) => (typeof it?.str === 'string' ? it.str : ''))
      .join(' ')
      .replace(/[ \t]+/g, ' ')
      .trim();
    if (line) pages.push(line);
  }
  return pages.join('\n\n').trim();
}

// ---------------------------------------------------------------------------
// readFileAsAttachment
// ---------------------------------------------------------------------------

export async function readFileAsAttachment(
  file: File,
  deps: ReadDeps = {},
): Promise<Attachment> {
  const kind = classify(file);
  const base = {
    id: crypto.randomUUID(),
    kind,
    name: file.name,
    size: file.size,
    mime: file.type || '',
  };

  if (kind === 'image') {
    if (file.size > MAX_IMAGE_BYTES) {
      throw new Error(`Image "${file.name}" is too large (max ${formatBytes(MAX_IMAGE_BYTES)})`);
    }
    const dataUrl = await (deps.readDataUrl ?? readDataUrlDefault)(file);
    return { ...base, dataUrl };
  }

  if (kind === 'pdf') {
    if (file.size > MAX_PDF_BYTES) {
      throw new Error(`PDF "${file.name}" is too large (max ${formatBytes(MAX_PDF_BYTES)})`);
    }
    let text: string;
    try {
      text = await (deps.loadPdfText ?? extractPdfText)(file);
    } catch (err) {
      const msg = (err as Error)?.message ?? String(err);
      throw new Error(`Could not read PDF "${file.name}": ${msg}`);
    }
    return { ...base, text };
  }

  // text / code
  if (file.size > MAX_TEXT_BYTES) {
    throw new Error(`Text file "${file.name}" is too large (max ${formatBytes(MAX_TEXT_BYTES)})`);
  }
  const text = await (deps.readText ?? ((f: File) => f.text()))(file);
  return { ...base, text };
}
