/** SEC6: values placed in URL paths are checked, not just encoded.
 * `encodeURIComponent('..')` is `..`, and the browser normalises
 * `/api/skills/user/..` to `/api/skills` before the request leaves. */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../llm/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../llm/client')>();
  return { ...actual, streamChat: vi.fn() };
});

import { UnsafePathSegment, pathSegment, pathSegments } from './urlPath';
import { deleteSkill, getSkill } from './hostContext';
import { cancelRunById, fetchRun, fetchRunArtifacts, fetchRunStrict, followRun } from './runHistory';
import { runTurn } from './loop';
import { SETTINGS, callbacks, fakeApi, scriptModel } from '../test/agentHarness';

const BAD = ['', '.', '..', 'a/b', 'a\\b', 'a?b', 'a#b', 'a\u0000b', 'a\nb', '\u007f'];

beforeEach(() => { vi.clearAllMocks(); });

describe('SEC6: pathSegment', () => {
  it.each(BAD)('refuses %j', (value) => {
    expect(() => pathSegment(value)).toThrow(UnsafePathSegment);
  });

  it('refuses non-strings, and encodes ordinary values', () => {
    expect(() => pathSegment(undefined)).toThrow(UnsafePathSegment);
    expect(() => pathSegment(3)).toThrow(UnsafePathSegment);
    expect(pathSegment('my graph %1')).toBe('my%20graph%20%251');
    expect(pathSegment('...')).toBe('...');
  });

  it('pathSegments checks every part of a source/name id', () => {
    expect(pathSegments('builtin/build-graph')).toBe('builtin/build-graph');
    for (const id of ['user/..', '../x', 'user//x', 'user/', '/x', 'user/a?b']) expect(() => pathSegments(id)).toThrow(UnsafePathSegment);
  });
});

describe('SEC6: no request leaves with an unsafe segment', () => {
  it('getSkill and deleteSkill refuse "user/.." without a request', async () => {
    const api = fakeApi();
    expect(await getSkill(api, 'user/..')).toMatchObject({ ok: false, error: { code: 'bad_id' } });
    expect(await deleteSkill(api, 'user/..')).toMatchObject({ ok: false, error: { code: 'bad_id' } });
    expect(await deleteSkill(api, 'user/x#y')).toMatchObject({ ok: false, error: { code: 'bad_id' } });
    expect(api.fetchLog).toEqual([]);
    await getSkill(api, 'builtin/build-graph');
    expect(api.fetchLog.map((entry) => entry.url)).toEqual(['/api/skills/builtin/build-graph']);
  });

  it('run history calls with a ".." run id send nothing', async () => {
    const api = fakeApi();
    await expect(fetchRun(api, '..')).rejects.toThrow(UnsafePathSegment);
    await expect(fetchRunStrict(api, '..')).rejects.toThrow(UnsafePathSegment);
    expect(await fetchRunArtifacts(api, '..')).toEqual([]);
    expect(await cancelRunById(api, '../x')).toBe(false);
    expect(await followRun(api, { runId: '..', waitS: 0, retryDelayMs: 0 })).toMatchObject({ row: null, aborted: false });
    expect(api.fetchLog).toEqual([]);
  });

  it('open_graph refuses a graph name of ".." before any request', async () => {
    scriptModel([{ calls: [{ id: 'c1', name: 'open_graph', arguments: { name: '..' } }] }, { text: 'ok' }]);
    const workspace = { tabs: vi.fn(() => []), snapshot: vi.fn(), openGraphs: vi.fn(), onChanged: vi.fn(() => () => {}) };
    const api = fakeApi({ extra: { workspace } });
    const result = await runTurn({ api, settings: SETTINGS, history: [], userText: 'open', callbacks: callbacks() });
    expect(result.turns.find((turn) => turn.role === 'tool')!.content).toContain('is not a saved graph name');
    expect(api.fetchLog.filter((entry) => entry.url.startsWith('/api/graph/load'))).toEqual([]);
    expect(workspace.openGraphs).not.toHaveBeenCalled();
  });
});
