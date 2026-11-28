/** The round-6 agent endpoints (`/api/agent/data-files`, `/api/agent/files`)
 * and the rules the plugin applies before it shows an approval card.
 *
 * Feature detection: a host with plugin API v7 (CodefyUI 3.5.0) serves these
 * routes. An endpoint that answers 404 without one of the contract's error
 * codes is taken as missing on this host, remembered, and its tools are no
 * longer offered. Refusals are passed on in the host's own words. */
import type { CodefyUIPluginAPI } from '../types/codefyui';
import { hostError, type HostResult } from './hostContext';
import { isRecord } from './toolGuards';

export const AGENT_API_VERSION = 7;

type Endpoint = 'data-files' | 'files';
const missing = new WeakMap<CodefyUIPluginAPI, Set<Endpoint>>();

export function endpointMissing(api: CodefyUIPluginAPI, endpoint: Endpoint): boolean {
  return missing.get(api)?.has(endpoint) === true;
}
function markMissing(api: CodefyUIPluginAPI, endpoint: Endpoint): void {
  const set = missing.get(api) ?? new Set<Endpoint>();
  set.add(endpoint);
  missing.set(api, set);
}
export function resetEndpointProbesForTests(api: CodefyUIPluginAPI): void { missing.delete(api); }

/** API v7 and the endpoint not known to be missing. */
export function hostHas(api: CodefyUIPluginAPI, endpoint: Endpoint): boolean {
  return typeof api.apiVersion === 'number' && api.apiVersion >= AGENT_API_VERSION && !endpointMissing(api, endpoint);
}

/** Error codes the contract defines; a 404 carrying one is a real answer. */
const CONTRACT_CODES = new Set([
  'no_project', 'project_changed', 'invalid_path', 'path_not_found', 'path_not_readable', 'path_not_writable',
  'file_changed', 'file_too_large', 'invalid_content',
]);

async function call<T>(
  api: CodefyUIPluginAPI, endpoint: Endpoint, url: string, parse: (data: unknown) => T | null, init?: RequestInit,
): Promise<HostResult<T>> {
  let response: Response;
  try { response = await api.http.fetch(url, init); }
  catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    return { ok: false, error: { status: 0, code: null, message: 'The host could not be reached.' } };
  }
  if (!response.ok) {
    const error = await hostError(response);
    if (response.status === 404 && !(error.code && CONTRACT_CODES.has(error.code))) {
      markMissing(api, endpoint);
      return { ok: false, error: { ...error, code: 'endpoint_missing', message: `This CodefyUI host does not have ${url.split('?')[0]}.` } };
    }
    return { ok: false, error };
  }
  let data: unknown;
  try { data = await response.json(); }
  catch { return { ok: false, error: { status: response.status, code: null, message: 'The host sent an unreadable answer.' } }; }
  const value = parse(data);
  return value === null
    ? { ok: false, error: { status: response.status, code: null, message: 'The host sent an answer of an unexpected shape.' } }
    : { ok: true, value };
}

// ── data files ────────────────────────────────────────────────────────────

export interface DataFileEntry { path: string; size: number | null; kind: string; columns?: string[]; rows?: number }
export interface DataFileGroups {
  bundled: DataFileEntry[]; project: DataFileEntry[]; uploads: DataFileEntry[];
  truncated: { bundled: boolean; project: boolean; uploads: boolean };
}

function entry(value: unknown): DataFileEntry | null {
  if (!isRecord(value) || typeof value.path !== 'string') return null;
  return {
    path: value.path,
    size: typeof value.size === 'number' ? value.size : null,
    kind: typeof value.kind === 'string' ? value.kind : 'other',
    ...(Array.isArray(value.columns) ? { columns: value.columns.filter((column): column is string => typeof column === 'string').slice(0, 200) } : {}),
    ...(typeof value.rows === 'number' ? { rows: value.rows } : {}),
  };
}

export function parseDataFiles(data: unknown): DataFileGroups | null {
  if (!isRecord(data)) return null;
  const group = (value: unknown) => (Array.isArray(value) ? value.map(entry).filter((item): item is DataFileEntry => item !== null).slice(0, 200) : []);
  const truncated = isRecord(data.truncated) ? data.truncated : {};
  // `truncated` is either one flag or one per group.
  const flag = (name: string) => truncated[name] === true || data.truncated === true;
  return {
    bundled: group(data.bundled), project: group(data.project), uploads: group(data.uploads),
    truncated: { bundled: flag('bundled'), project: flag('project'), uploads: flag('uploads') },
  };
}

export const listDataFiles = (api: CodefyUIPluginAPI, signal?: AbortSignal) =>
  call(api, 'data-files', '/api/agent/data-files', parseDataFiles, signal ? { signal } : undefined);

// ── project files ─────────────────────────────────────────────────────────

export interface DirListing { kind: 'dir'; entries: Array<{ path: string; kind: 'file' | 'dir'; size: number | null }>; truncated: boolean }
export interface FileRead {
  kind: 'file'; path: string; content: string | null; sha256: string | null; truncated: boolean; size: number | null; binary: boolean;
}

export function parseFilesAnswer(data: unknown): DirListing | FileRead | null {
  if (!isRecord(data)) return null;
  if (Array.isArray(data.entries)) {
    return {
      kind: 'dir',
      entries: data.entries.filter(isRecord).filter((item) => typeof item.path === 'string').slice(0, 500).map((item) => ({
        path: item.path as string, kind: item.kind === 'dir' ? 'dir' : 'file', size: typeof item.size === 'number' ? item.size : null,
      })),
      truncated: data.truncated === true,
    };
  }
  if (typeof data.path !== 'string') return null;
  if (data.content !== null && typeof data.content !== 'string') return null;
  return {
    kind: 'file', path: data.path, content: data.content as string | null,
    sha256: typeof data.sha256 === 'string' ? data.sha256 : null,
    truncated: data.truncated === true, size: typeof data.size === 'number' ? data.size : null,
    binary: data.binary === true,
  };
}

export function readProjectPath(api: CodefyUIPluginAPI, path: string, signal?: AbortSignal) {
  const query = path ? `?${new URLSearchParams({ path }).toString()}` : '';
  return call(api, 'files', `/api/agent/files${query}`, parseFilesAnswer, signal ? { signal } : undefined);
}

export interface WriteAnswer { path: string; sha256: string; created: boolean; modsConsentRequired: boolean; agentInstructions: boolean }

export function writeProjectFile(api: CodefyUIPluginAPI, body: { path: string; content: string; expected_sha256: string | null }, signal?: AbortSignal) {
  return call(api, 'files', '/api/agent/files', (data) => (isRecord(data) && typeof data.path === 'string' && typeof data.sha256 === 'string' ? {
    path: data.path, sha256: data.sha256, created: data.created === true,
    modsConsentRequired: data.mods_consent_required === true, agentInstructions: data.agent_instructions === true,
  } : null), { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), ...(signal ? { signal } : {}) });
}

// ── path rules (mirroring the host's; the host still decides) ─────────────

const DATA_EXT = ['.csv', '.tsv', '.json', '.jsonl', '.txt', '.md', '.yaml', '.yml'];
const DOCS_EXT = ['.md', '.txt', '.json', '.yaml', '.yml', '.csv'];

/** The write rule, in the words the tool description uses. */
export const WRITE_RULES = 'Writable paths: data/** and assets/data/** (.csv .tsv .json .jsonl .txt .md .yaml .yml); docs/** and notes/** (.md .txt .json .yaml .yml .csv); a .md file in the project root (for example README.md, AGENTS.md); mods/nodes/<name>.py and mods/presets/<name>.json (direct children only). data/samples/** and assets/data/samples/** are reserved for the built-in samples and are not writable. Everything else (graphs, codefyui.toml, .git, skills, other extensions such as .py outside mods/nodes or .pt/.pkl) is refused.';

const extension = (name: string): string => {
  const dot = name.lastIndexOf('.');
  return dot > 0 ? name.slice(dot).toLowerCase() : '';
};

/** Why this path is not writable, or null when the rule allows it. A plain
 * syntax check too: no absolute paths, backslashes, empty or dot segments. */
export function writeRefusal(path: string): string | null {
  if (!path || path.length > 1024 || path.includes('\\') || path.startsWith('/') || /^[a-zA-Z]:/.test(path)) return 'The path must be a project-relative path with "/" separators.';
  const parts = path.split('/');
  if (parts.some((part) => !part || part === '.' || part === '..' || part.includes(':'))) return 'The path has an empty, "." or ".." segment.';
  const ext = extension(parts[parts.length - 1]);
  const [top, second] = parts;
  if (parts.length === 1) return ext === '.md' ? null : `In the project root only .md files are writable. ${WRITE_RULES}`;
  if (top === 'mods') {
    if (parts.length === 3 && second === 'nodes' && ext === '.py' && parts[2] !== '__init__.py') return null;
    if (parts.length === 3 && second === 'presets' && ext === '.json') return null;
    return `Under mods/ only mods/nodes/<name>.py and mods/presets/<name>.json are writable. ${WRITE_RULES}`;
  }
  const dataTree = top === 'data' ? parts.slice(1) : top === 'assets' && second === 'data' ? parts.slice(2) : null;
  if (dataTree) {
    if (dataTree.length > 1 && dataTree[0] === 'samples') return `data/samples/ is reserved for the built-in samples. ${WRITE_RULES}`;
    return DATA_EXT.includes(ext) ? null : `Under data/ only ${DATA_EXT.join(' ')} files are writable. ${WRITE_RULES}`;
  }
  if (top === 'docs' || top === 'notes') return DOCS_EXT.includes(ext) ? null : `Under ${top}/ only ${DOCS_EXT.join(' ')} files are writable. ${WRITE_RULES}`;
  return WRITE_RULES;
}

export const isModsPath = (path: string): boolean => path.split('/')[0] === 'mods';
/** The root AGENTS.md (any case): it enters every later conversation's prompt. */
export const isAgentInstructionsPath = (path: string): boolean => path.toLowerCase() === 'agents.md';

/** Reading these sends a dataset's rows to the LLM provider: a card first. */
export function readNeedsApproval(path: string): boolean {
  const parts = path.split('/');
  if (parts[0] === 'data' || (parts[0] === 'assets' && parts[1] === 'data')) return true;
  return ['.csv', '.tsv', '.jsonl', '.parquet'].includes(extension(parts[parts.length - 1] ?? ''));
}

// ── a small line diff for the approval card ───────────────────────────────

export const DIFF_LINE_LIMIT = 4000;

/** `+`/`-`/` ` lines from a longest-common-subsequence diff, with unchanged
 * runs longer than six lines folded. Null when the inputs are too large. */
export function lineDiff(before: string, after: string): string | null {
  const a = before.replace(/\r\n?/g, '\n').split('\n');
  const b = after.replace(/\r\n?/g, '\n').split('\n');
  if (a.length > DIFF_LINE_LIMIT || b.length > DIFF_LINE_LIMIT || a.length * b.length > 4_000_000) return null;
  const n = a.length; const m = b.length;
  const table: Uint32Array[] = Array.from({ length: n + 1 }, () => new Uint32Array(m + 1));
  for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) table[i][j] = a[i] === b[j] ? table[i + 1][j + 1] + 1 : Math.max(table[i + 1][j], table[i][j + 1]);
  const lines: string[] = [];
  let i = 0; let j = 0;
  while (i < n || j < m) {
    if (i < n && j < m && a[i] === b[j]) { lines.push(`  ${a[i]}`); i++; j++; }
    // On a tie the removal comes first, as in a unified diff.
    else if (j < m && (i >= n || table[i][j + 1] > table[i + 1][j])) { lines.push(`+ ${b[j]}`); j++; }
    else { lines.push(`- ${a[i]}`); i++; }
  }
  const out: string[] = [];
  for (let k = 0; k < lines.length;) {
    if (!lines[k].startsWith('  ')) { out.push(lines[k]); k++; continue; }
    let end = k;
    while (end < lines.length && lines[end].startsWith('  ')) end++;
    const run = end - k;
    if (run > 6) {
      out.push(...lines.slice(k, k + 3), `@@ ${run - 6} unchanged lines @@`, ...lines.slice(end - 3, end));
    } else out.push(...lines.slice(k, end));
    k = end;
  }
  return out.join('\n');
}
