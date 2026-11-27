/** The host's source control (`/api/git/*`), as the project tools read it.
 *
 * The agent can look (status, one file's diff, the log) and, with the user's
 * approval of a card listing every file, stage those files and commit them.
 * It cannot push, pull, check out, discard or touch ignored files: those stay
 * in the Source Control tab, by hand. */
import type { CodefyUIPluginAPI } from '../types/codefyui';
import { hostError, type HostError, type HostResult } from './hostContext';
import { isRecord } from './toolGuards';

export interface GitFileEntry { path: string; kind: string; xy: string }

export interface GitStatusSummary {
  state: string;
  branch: string | null;
  detached: boolean;
  head: string | null;
  upstream: string | null;
  ahead: number | null;
  behind: number | null;
  staged: GitFileEntry[];
  unstaged: GitFileEntry[];
  untracked: GitFileEntry[];
  conflicted: GitFileEntry[];
  mergeInProgress: boolean;
  rebaseInProgress: boolean;
}

/** The host's rule (`is_env_secret_path`), applied to every path segment:
 * `.env` and `.env.*` hold secrets; `.env.example` exists to be read. */
export function isDotenvPath(path: string): boolean {
  return path.split(/[\\/]/).some((segment) => {
    const name = segment.toLowerCase();
    return name === '.env' || (name.startsWith('.env.') && name !== '.env.example');
  });
}

const files = (value: unknown): GitFileEntry[] => (Array.isArray(value) ? value.filter(isRecord)
  .filter((file) => typeof file.path === 'string')
  .map((file) => ({ path: file.path as string, kind: typeof file.kind === 'string' ? file.kind : 'modified', xy: typeof file.xy === 'string' ? file.xy : '' })) : []);

export function parseStatus(data: unknown): GitStatusSummary | null {
  if (!isRecord(data) || !isRecord(data.repo) || typeof data.repo.state !== 'string') return null;
  const status = isRecord(data.status) ? data.status : {};
  const num = (value: unknown) => (typeof value === 'number' ? value : null);
  const str = (value: unknown) => (typeof value === 'string' ? value : null);
  return {
    state: data.repo.state,
    branch: str(status.branch), detached: status.detached === true, head: str(status.head),
    upstream: str(status.upstream), ahead: num(status.ahead), behind: num(status.behind),
    staged: files(status.staged), unstaged: files(status.unstaged), untracked: files(status.untracked), conflicted: files(status.conflicted),
    mergeInProgress: status.merge_in_progress === true, rebaseInProgress: status.rebase_in_progress === true,
  };
}

async function call<T>(api: CodefyUIPluginAPI, url: string, parse: (data: unknown) => T | null, init?: RequestInit): Promise<HostResult<T>> {
  let response: Response;
  try { response = await api.http.fetch(url, init); }
  catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    return { ok: false, error: { status: 0, code: null, message: 'The host could not be reached.' } };
  }
  if (!response.ok) return { ok: false, error: await hostError(response) };
  let data: unknown;
  try { data = await response.json(); } catch { return { ok: false, error: { status: response.status, code: null, message: 'The host sent an unreadable answer.' } }; }
  const value = parse(data);
  return value === null ? { ok: false, error: { status: response.status, code: null, message: 'The host sent an answer of an unexpected shape.' } } : { ok: true, value };
}

export const readStatus = (api: CodefyUIPluginAPI, signal?: AbortSignal) => call(api, '/api/git/status', parseStatus, signal ? { signal } : undefined);

// ── is this a git project? cached per host ─────────────────────────────────

const probes = new WeakMap<CodefyUIPluginAPI, { at: number; value: Promise<boolean> }>();

/** True when the host is in project mode and the project is a git repository. */
export function probeGitProject(api: CodefyUIPluginAPI, opts: { now?: number } = {}): Promise<boolean> {
  const now = opts.now ?? Date.now();
  const hit = probes.get(api);
  if (hit && now - hit.at < 30_000) return hit.value;
  const value = readStatus(api).then((result) => result.ok && result.value.state === 'ready').catch(() => false);
  probes.set(api, { at: now, value });
  return value;
}

// ── commit candidates ──────────────────────────────────────────────────────

export interface CommitCandidate { path: string; status: string }

/** Files that may be committed: what git status lists (ignored files are not
 * listed), minus dotenv files. Staged, then changed, then new. */
export function commitCandidates(status: GitStatusSummary): CommitCandidate[] {
  const seen = new Map<string, CommitCandidate>();
  const add = (entries: GitFileEntry[], label: (file: GitFileEntry) => string) => {
    for (const file of entries) {
      if (isDotenvPath(file.path) || seen.has(file.path)) continue;
      seen.set(file.path, { path: file.path, status: label(file) });
    }
  };
  add(status.staged, (file) => `staged ${file.kind}`);
  add(status.unstaged, (file) => file.kind);
  add(status.untracked, () => 'new');
  return [...seen.values()];
}

/** Paths with staged and unstaged changes at once (git status `MM`, `AM`…).
 * Staging one adds its whole working copy, including the part left out. */
export function partlyStaged(status: GitStatusSummary): string[] {
  const unstaged = new Set(status.unstaged.map((file) => file.path));
  return status.staged.map((file) => file.path).filter((path) => unstaged.has(path));
}

export interface LogEntry { sha: string; short: string; subject: string; author: string; authoredAt: string; refs: string[] }

export const readLog = (api: CodefyUIPluginAPI, limit: number, signal?: AbortSignal) => call(api, `/api/git/log?limit=${limit}`, (data) => {
  if (!isRecord(data) || !Array.isArray(data.commits)) return null;
  return data.commits.filter(isRecord).map((commit) => ({
    sha: String(commit.sha ?? ''), short: String(commit.short ?? ''), subject: String(commit.subject ?? ''),
    author: String(commit.author_name ?? ''),
    authoredAt: typeof commit.authored_at === 'number' ? new Date(commit.authored_at * 1000).toISOString() : '',
    refs: Array.isArray(commit.refs) ? commit.refs.map(String) : [],
  }));
}, signal ? { signal } : undefined);

export interface DiffResult { patch: string; binary: boolean; truncated: boolean }

export const readDiff = (api: CodefyUIPluginAPI, path: string, scope: 'worktree' | 'index', signal?: AbortSignal) => {
  const query = new URLSearchParams({ path, scope });
  return call(api, `/api/git/diff?${query.toString()}`, (data) => (isRecord(data) && typeof data.patch === 'string'
    ? { patch: data.patch, binary: data.binary === true, truncated: data.truncated === true } : null), signal ? { signal } : undefined);
};

const post = (body: unknown): RequestInit => ({ method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });

/** Stage exactly these paths (never `all`). */
export const stagePaths = (api: CodefyUIPluginAPI, paths: string[]) => call(api, '/api/git/stage', (data) => (isRecord(data) ? data : null), post({ paths, all: false }));

/** Commit the index (never `all`, never `amend`). */
export const commitIndex = (api: CodefyUIPluginAPI, message: string) => call(api, '/api/git/commit', (data) => (isRecord(data) ? data : null), post({ message, all: false, amend: false }));

export type { HostError };
