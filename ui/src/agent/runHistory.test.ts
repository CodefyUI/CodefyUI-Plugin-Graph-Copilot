import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  cancelRunById, fetchRun, fetchRunArtifacts, fetchRunList, followRun,
  isTerminalRunStatus, parseRunRow, probeRunHistory, resetRunHistoryProbeForTests,
} from './runHistory';

/** api.http.fetch stub routing url -> response. */
function httpApi(routes: Record<string, () => Response>) {
  return {
    http: {
      fetch: vi.fn(async (url: string) => {
        for (const [prefix, make] of Object.entries(routes)) {
          if (url.startsWith(prefix)) return make();
        }
        return new Response('{"detail":"not found"}', { status: 404 });
      }),
    },
  };
}
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

const ROW = {
  id: 'run-1', name: 'training', status: 'succeeded', error: null,
  queue_position: null, active: false,
  final_metrics: { val_loss: 2.95, bogus: 'x' },
  created_at: '2026-08-12T00:00:00Z',
  started_at: '2026-08-12T00:00:10Z', finished_at: '2026-08-12T01:01:10Z',
};

beforeEach(() => resetRunHistoryProbeForTests());

describe('isTerminalRunStatus', () => {
  it('treats queued/running as active and the rest as terminal', () => {
    expect(isTerminalRunStatus('queued')).toBe(false);
    expect(isTerminalRunStatus('running')).toBe(false);
    for (const s of ['succeeded', 'failed', 'cancelled', 'interrupted']) {
      expect(isTerminalRunStatus(s)).toBe(true);
    }
  });
});

describe('parseRunRow', () => {
  it('maps snake_case fields, filters non-numeric metrics, computes duration', () => {
    const row = parseRunRow(ROW)!;
    expect(row.runId).toBe('run-1');
    expect(row.finalMetrics).toEqual({ val_loss: 2.95 });
    expect(row.durationS).toBe(3660);
    expect(row.lastCursor).toBeNull();
  });
  it('passes through active field from host (not derived from status)', () => {
    const row = parseRunRow(ROW)!;
    expect(row.active).toBe(false);
  });
  it('preserves active: false for queued runs (active is not status-derived)', () => {
    const queuedRow = { ...ROW, id: 'run-q', status: 'queued', active: false };
    const row = parseRunRow(queuedRow)!;
    expect(row.active).toBe(false);
    expect(row.status).toBe('queued');
  });
  it('rejects rows without id or status', () => {
    expect(parseRunRow({ status: 'running' })).toBeNull();
    expect(parseRunRow({ id: 'x' })).toBeNull();
    expect(parseRunRow(null)).toBeNull();
  });
});

describe('probeRunHistory', () => {
  it('caches a positive probe (one request for two calls)', async () => {
    const api = httpApi({ '/api/runs': () => json({ runs: [], total: 0 }) });
    expect(await probeRunHistory(api)).toBe(true);
    expect(await probeRunHistory(api)).toBe(true);
    expect(api.http.fetch).toHaveBeenCalledTimes(1);
  });
  it('does not cache a failed probe (retries next call)', async () => {
    const api = httpApi({});
    expect(await probeRunHistory(api)).toBe(false);
    expect(await probeRunHistory(api)).toBe(false);
    expect(api.http.fetch).toHaveBeenCalledTimes(2);
  });
});

describe('fetchers', () => {
  it('fetchRunList parses rows and total', async () => {
    const api = httpApi({ '/api/runs?': () => json({ runs: [ROW, { junk: true }], total: 7 }) });
    const { runs, total } = await fetchRunList(api, { limit: 5 });
    expect(runs).toHaveLength(1);
    expect(total).toBe(7);
  });
  it('fetchRun returns null on 404 and a row with lastCursor on 200', async () => {
    expect(await fetchRun(httpApi({}), 'nope')).toBeNull();
    const api = httpApi({ '/api/runs/run-1': () => json({ ...ROW, last_cursor: 42 }) });
    expect((await fetchRun(api, 'run-1'))!.lastCursor).toBe(42);
  });
  it('fetchRunArtifacts tolerates failure and filters malformed entries', async () => {
    expect(await fetchRunArtifacts(httpApi({}), 'r')).toEqual([]);
    const api = httpApi({
      '/api/runs/r/artifacts': () => json({ artifacts: [
        { kind: 'checkpoint', path: 'models/a.pt', created_at: 't1' }, { path: 'no-kind' },
      ] }),
    });
    expect(await fetchRunArtifacts(api, 'r')).toEqual([
      { kind: 'checkpoint', path: 'models/a.pt', createdAt: 't1' },
    ]);
  });
  it('cancelRunById returns response.ok and never throws', async () => {
    expect(await cancelRunById(httpApi({ '/api/runs/r/cancel': () => json({ cancelled: true }) }), 'r')).toBe(true);
    expect(await cancelRunById(httpApi({}), 'r')).toBe(false);
  });
});

describe('followRun', () => {
  const nodeEvent = (cursor: number, progress: Record<string, number>) => ({
    cursor, type: 'node_status', ts: 't',
    payload: { node_id: 'n1', status: 'progress', outputs: [{ output_kind: 'progress', progress }] },
  });

  it('replays pages, emits loss points, and resolves on terminal status + drained tail', async () => {
    const pages = [
      { status: 'running', events: [nodeEvent(1, { loss: 3 }), nodeEvent(2, { loss: 2 })], cursor: 2 },
      { status: 'running', events: [{ cursor: 3, type: 'node_status', ts: 't', payload: { node_id: 'n1', status: 'completed' } }], cursor: 3 },
      { status: 'succeeded', events: [{ cursor: 4, type: 'execution_complete', ts: 't', payload: {} }], cursor: 4 },
      { status: 'succeeded', events: [], cursor: 4 },
    ];
    let call = 0;
    const api = {
      http: { fetch: vi.fn(async (url: string) => {
        if (url.includes('/events')) return json(pages[Math.min(call++, pages.length - 1)]);
        return json({ ...ROW, id: 'r', status: 'succeeded' });
      }) },
    };
    const updates: number[] = [];
    let completed = 0;
    const outcome = await followRun(api, {
      runId: 'r', waitS: 0,
      onUpdate: (u) => { if (u.lossPoint !== undefined) updates.push(u.lossPoint); completed = u.completedNodes; },
    });
    expect(updates).toEqual([3, 2]);
    expect(completed).toBe(1);
    expect(outcome.status).toBe('succeeded');
    expect(outcome.row?.runId).toBe('r');
    expect(outcome.aborted).toBe(false);
  });

  it('signals connectionLost on a failed page and recovers on the next', async () => {
    let call = 0;
    const api = {
      http: { fetch: vi.fn(async (url: string) => {
        if (url.includes('/events')) {
          call += 1;
          if (call === 1) throw new Error('network down');
          return json({ status: 'succeeded', events: [], cursor: 0 });
        }
        return json({ ...ROW, id: 'r', status: 'succeeded' });
      }) },
    };
    const flags: boolean[] = [];
    await followRun(api, { runId: 'r', waitS: 0, retryDelayMs: 1, onUpdate: (u) => flags.push(u.connectionLost) });
    expect(flags).toContain(true);
  });

  it('returns aborted when the signal fires', async () => {
    const controller = new AbortController();
    const api = {
      http: { fetch: vi.fn(async () => {
        controller.abort();
        return json({ status: 'running', events: [], cursor: 0 });
      }) },
    };
    const outcome = await followRun(api, { runId: 'r', waitS: 0, signal: controller.signal });
    expect(outcome.aborted).toBe(true);
  });

  it('returns aborted (row: null) when the signal fires during the final row fetch', async () => {
    const controller = new AbortController();
    const api = {
      http: { fetch: vi.fn(async (url: string) => {
        if (url.includes('/events')) return json({ status: 'succeeded', events: [], cursor: 0 });
        controller.abort();
        return json({ ...ROW, id: 'r', status: 'succeeded' });
      }) },
    };
    const outcome = await followRun(api, { runId: 'r', waitS: 0, signal: controller.signal });
    expect(outcome.aborted).toBe(true);
    expect(outcome.row).toBeNull();
    expect(outcome.status).toBe('succeeded');
  });

  it('resolves with row:null when the run 404s (deleted)', async () => {
    const outcome = await followRun(httpApi({}), { runId: 'gone', waitS: 0 });
    expect(outcome.row).toBeNull();
    expect(outcome.aborted).toBe(false);
  });
});
