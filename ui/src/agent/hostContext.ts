/** What the host tells the agent about where it is, and the host's skills.
 *
 * CodefyUI with Agent Skills (apiVersion 6) serves `GET /api/agent/context`
 * and `/api/skills`. An older host (CodefyUI 3.2.0, apiVersion 5) answers
 * 404, and then the whole skills feature is off: no Skills view, no skill
 * tools, no prompt sections. Nothing here retries or works around a refusal;
 * a host error is shown as the host wrote it.
 *
 * Everything read here is untrusted text from disk (a skill's body, a
 * project's AGENTS.md): it is validated for shape, capped, and later quoted
 * into the prompt inside marked blocks (see `untrusted.ts`). */
import type { CodefyUIPluginAPI } from '../types/codefyui';
import { isRecord } from './toolGuards';

export const CONTEXT_TTL_MS = 30_000;

export interface ContextSkill {
  id: string;
  name: string;
  description: string;
  source: string;
}

export interface AgentContext {
  project: { dir: string; name: string; graphs: string[] } | null;
  instructions: { path: string; content: string; truncated: boolean } | null;
  /** The skills the agent may use: enabled, valid, not shadowed. */
  skills: ContextSkill[];
}

export interface SkillIssue { level: string; code: string; message: string }

export interface SkillSummary extends ContextSkill {
  license: string | null;
  compatibility: string | null;
  allowed_tools: string[];
  enabled: boolean;
  valid: boolean;
  issues: SkillIssue[];
  shadowed_by: string | null;
  file_count: number;
  has_scripts: boolean;
}

export interface SkillFile { path: string; kind: string; size?: number }

export interface SkillDetail extends SkillSummary {
  body: string;
  files: SkillFile[];
}

export interface InstallResult {
  installed: SkillSummary[];
  skipped: Array<{ name: string; code: string; message: string }>;
}

/** A refusal or failure, carrying the host's own words. */
export interface HostError { status: number; code: string | null; message: string }

export type HostResult<T> = { ok: true; value: T } | { ok: false; error: HostError };

const str = (value: unknown, fallback = ''): string => (typeof value === 'string' ? value : fallback);
const strOrNull = (value: unknown): string | null => (typeof value === 'string' ? value : null);
const strings = (value: unknown): string[] => (Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : []);

function contextSkill(value: unknown): ContextSkill | null {
  if (!isRecord(value) || typeof value.id !== 'string' || typeof value.name !== 'string') return null;
  return { id: value.id, name: value.name, description: str(value.description), source: str(value.source) };
}

export function parseAgentContext(data: unknown): AgentContext | null {
  if (!isRecord(data) || !Array.isArray(data.skills)) return null;
  const project = isRecord(data.project) && typeof data.project.name === 'string'
    ? { dir: str(data.project.dir), name: data.project.name, graphs: strings(data.project.graphs) }
    : null;
  const instructions = isRecord(data.instructions) && typeof data.instructions.content === 'string'
    ? { path: str(data.instructions.path, 'AGENTS.md'), content: data.instructions.content, truncated: data.instructions.truncated === true }
    : null;
  const skills = data.skills.map(contextSkill).filter((skill): skill is ContextSkill => skill !== null);
  return { project, instructions, skills };
}

export function parseSkillSummary(value: unknown): SkillSummary | null {
  const base = contextSkill(value);
  if (!base || !isRecord(value)) return null;
  return {
    ...base,
    license: strOrNull(value.license),
    compatibility: strOrNull(value.compatibility),
    allowed_tools: strings(value.allowed_tools),
    enabled: value.enabled !== false,
    valid: value.valid !== false,
    issues: Array.isArray(value.issues) ? value.issues.filter(isRecord).map((issue) => ({
      level: str(issue.level), code: str(issue.code), message: str(issue.message),
    })) : [],
    shadowed_by: strOrNull(value.shadowed_by),
    file_count: typeof value.file_count === 'number' ? value.file_count : 0,
    has_scripts: value.has_scripts === true,
  };
}

export function parseSkillDetail(value: unknown): SkillDetail | null {
  const summary = parseSkillSummary(value);
  if (!summary || !isRecord(value)) return null;
  return {
    ...summary,
    body: str(value.body),
    files: Array.isArray(value.files) ? value.files.filter(isRecord).filter((file) => typeof file.path === 'string').map((file) => ({
      path: file.path as string, kind: str(file.kind, 'file'), ...(typeof file.size === 'number' ? { size: file.size } : {}),
    })) : [],
  };
}

/** The host's own message for a failed response: FastAPI's `detail`, as a
 * string or as `{code, message}`; never invented, never retried. */
export async function hostError(response: Response): Promise<HostError> {
  let detail: unknown;
  try { detail = (await response.json() as Record<string, unknown>)?.detail; } catch { /* not JSON */ }
  if (isRecord(detail) && typeof detail.message === 'string') {
    return { status: response.status, code: strOrNull(detail.code), message: detail.message };
  }
  if (typeof detail === 'string') return { status: response.status, code: null, message: detail };
  return { status: response.status, code: null, message: `The host answered HTTP ${response.status}.` };
}

async function request<T>(
  api: CodefyUIPluginAPI, url: string, parse: (data: unknown) => T | null, init?: RequestInit,
): Promise<HostResult<T>> {
  let response: Response;
  try { response = await api.http.fetch(url, init); }
  catch (error) {
    if (error instanceof DOMException && error.name === 'AbortError') throw error;
    return { ok: false, error: { status: 0, code: null, message: 'The host could not be reached.' } };
  }
  if (!response.ok) return { ok: false, error: await hostError(response) };
  let data: unknown;
  try { data = await response.json(); }
  catch { return { ok: false, error: { status: response.status, code: null, message: 'The host sent an unreadable answer.' } }; }
  const value = parse(data);
  return value === null
    ? { ok: false, error: { status: response.status, code: null, message: 'The host sent an answer of an unexpected shape.' } }
    : { ok: true, value };
}

// ── context, cached per host ──────────────────────────────────────────────

const cache = new WeakMap<CodefyUIPluginAPI, { at: number; value: Promise<AgentContext | null> }>();

/** The context, or null when this host has no Agent Skills (or could not say).
 * Cached for 30 s; `force` reads again (the Skills view's refresh). */
export function fetchAgentContext(api: CodefyUIPluginAPI, opts: { force?: boolean; now?: number } = {}): Promise<AgentContext | null> {
  const now = opts.now ?? Date.now();
  const hit = cache.get(api);
  if (hit && !opts.force && now - hit.at < CONTEXT_TTL_MS) return hit.value;
  const value = request(api, '/api/agent/context', parseAgentContext)
    .then((result) => (result.ok ? result.value : null))
    .catch(() => null);
  cache.set(api, { at: now, value });
  return value;
}

export function invalidateAgentContext(api: CodefyUIPluginAPI): void { cache.delete(api); }

// ── skills ────────────────────────────────────────────────────────────────

/** `builtin/build-graph` → `/api/skills/builtin/build-graph`, each segment encoded. */
export function skillUrl(id: string): string {
  return `/api/skills/${id.split('/').map(encodeURIComponent).join('/')}`;
}

export function listSkills(api: CodefyUIPluginAPI): Promise<HostResult<SkillSummary[]>> {
  return request(api, '/api/skills', (data) => (Array.isArray(data)
    ? data.map(parseSkillSummary).filter((skill): skill is SkillSummary => skill !== null) : null));
}

export function getSkill(api: CodefyUIPluginAPI, id: string, signal?: AbortSignal): Promise<HostResult<SkillDetail>> {
  return request(api, skillUrl(id), parseSkillDetail, signal ? { signal } : undefined);
}

export interface SkillFileContent { path: string; content: string; truncated: boolean }

/** The host checks the path (no `..`, absolute paths, links or hidden files);
 * this passes it through as a query parameter and builds no path itself. */
export function getSkillFile(api: CodefyUIPluginAPI, id: string, path: string, signal?: AbortSignal): Promise<HostResult<SkillFileContent>> {
  const query = new URLSearchParams({ id, path });
  return request(api, `/api/skills/file?${query.toString()}`, (data) => (isRecord(data) && typeof data.content === 'string'
    ? { path: str(data.path, path), content: data.content, truncated: data.truncated === true } : null), signal ? { signal } : undefined);
}

export function setSkillEnabled(api: CodefyUIPluginAPI, id: string, enabled: boolean): Promise<HostResult<SkillSummary>> {
  invalidateAgentContext(api);
  return request(api, '/api/skills/enabled', parseSkillSummary, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id, enabled }),
  });
}

export function installSkill(api: CodefyUIPluginAPI, source: string): Promise<HostResult<InstallResult>> {
  invalidateAgentContext(api);
  return request(api, '/api/skills/install', (data) => {
    if (!isRecord(data) || !Array.isArray(data.installed)) return null;
    return {
      installed: data.installed.map(parseSkillSummary).filter((skill): skill is SkillSummary => skill !== null),
      skipped: Array.isArray(data.skipped) ? data.skipped.filter(isRecord).map((item) => ({
        name: str(item.name), code: str(item.code), message: str(item.message),
      })) : [],
    };
  }, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ source }) });
}

export function deleteSkill(api: CodefyUIPluginAPI, id: string): Promise<HostResult<{ deleted: string }>> {
  invalidateAgentContext(api);
  return request(api, skillUrl(id), (data) => (isRecord(data) && typeof data.deleted === 'string' ? { deleted: data.deleted } : null), { method: 'DELETE' });
}
