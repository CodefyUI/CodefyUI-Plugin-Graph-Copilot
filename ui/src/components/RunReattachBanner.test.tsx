/**
 * Tests for RunReattachBanner (#22 — Task 10).
 *
 * Cases:
 * 1. No pointer -> renders null, zero requests.
 * 2. Stale pointer (fetchRun 404) -> clears the pointer, renders null.
 * 3. Terminal row at mount -> finished card; "Ask the agent to summarize"
 *    prefills the composer and clears the pointer.
 * 4. Active row -> live card, followed via followRun to a terminal result;
 *    notifyRunFinished fires once with the final status.
 * 5. Stop run -> POSTs /cancel; button becomes disabled "Stopping…", then
 *    re-enables if the cancel call fails instead of stranding it disabled.
 * 6. Dismiss (live) -> aborts the follower, clears the pointer, hides;
 *    never hits /cancel.
 * Plus metricsSummary unit cases (integers, floats, duration formatting,
 * the 3-entry cap).
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import { DEFAULT_SETTINGS } from '../state/settings';
import { resetRunHistoryProbeForTests } from '../agent/runHistory';
import type { RunRow } from '../agent/runHistory';
import { readActiveRun, writeActiveRun } from '../agent/runPointer';

vi.mock('./notify', () => ({ notifyRunFinished: vi.fn() }));

import { notifyRunFinished } from './notify';
import { RunReattachBanner, metricsSummary } from './RunReattachBanner';

// ---------------------------------------------------------------------------
// Fake API — Map-backed storage (runPointer.test.ts) + URL-routed http.fetch
// (runHistory.test.ts), combined into one full CodefyUIPluginAPI shape.
// ---------------------------------------------------------------------------

function makeApi(fetchImpl: (url: string, init?: RequestInit) => Promise<Response>) {
  const store = new Map<string, string>();
  const fetchMock = vi.fn(fetchImpl);
  const api = {
    apiVersion: 1,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn(),
      getNodeDefinitions: vi.fn(),
      applyOperations: vi.fn(),
      onGraphChanged: vi.fn().mockReturnValue(() => {}),
    },
    http: { fetch: fetchMock },
    storage: {
      get: (k: string) => store.get(k) ?? null,
      set: (k: string, v: string) => { store.set(k, v); },
      remove: (k: string) => { store.delete(k); },
    },
  } as unknown as CodefyUIPluginAPI;
  return { api, store, fetchMock };
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } });

/** A promise plus its own resolver, so a test can hold a mock response open
 * until it has asserted an intermediate render (see the live-run test). */
function deferred<T>() {
  let resolve!: (value: T) => void;
  const promise = new Promise<T>((res) => { resolve = res; });
  return { promise, resolve };
}

/** Raw (snake_case) run payload as the host's REST endpoints return it. */
function runPayload(overrides: Partial<{
  status: string; active: boolean; final_metrics: Record<string, number>;
  error: string | null; started_at: string | null; finished_at: string | null;
}> = {}) {
  return {
    id: 'run-1', name: 'training', status: 'running', active: true,
    queue_position: null, error: null, final_metrics: {},
    created_at: '2026-08-12T00:00:00Z', started_at: '2026-08-12T00:00:00Z', finished_at: null,
    ...overrides,
  };
}

const POINTER = { runId: 'run-1', reason: 'train it', submittedAt: 100, timeoutMinutes: 360 };

/** A followRun /events page: one node_status progress event carrying a loss value. */
const nodeEvent = (cursor: number, progress: Record<string, number>) => ({
  cursor, type: 'node_status', ts: 't',
  payload: { node_id: 'n1', status: 'progress', outputs: [{ output_kind: 'progress', progress }] },
});

beforeEach(() => {
  resetRunHistoryProbeForTests();
  vi.mocked(notifyRunFinished).mockClear();
});

describe('RunReattachBanner', () => {
  it('renders nothing and makes no requests when there is no pointer', () => {
    const { fetchMock, api } = makeApi(async () => {
      throw new Error('unexpected fetch call');
    });
    const { container } = render(
      <RunReattachBanner api={api} settings={DEFAULT_SETTINGS} onAskAgent={vi.fn()} />,
    );
    expect(container.firstChild).toBeNull();
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('clears a stale pointer when the run 404s and renders nothing', async () => {
    const { api, store } = makeApi(async (url) => {
      if (url.startsWith('/api/runs?limit=1')) return json({ runs: [], total: 0 });
      if (url === '/api/runs/run-1') return new Response('{"detail":"not found"}', { status: 404 });
      throw new Error(`unexpected url ${url}`);
    });
    writeActiveRun(api, POINTER);

    const { container } = render(
      <RunReattachBanner api={api} settings={DEFAULT_SETTINGS} onAskAgent={vi.fn()} />,
    );

    await waitFor(() => expect(store.has('active_run')).toBe(false));
    expect(container.firstChild).toBeNull();
  });

  it('shows a finished card for a terminal row; asking the agent clears the pointer', async () => {
    const onAskAgent = vi.fn();
    const { api, store } = makeApi(async (url) => {
      if (url.startsWith('/api/runs?limit=1')) return json({ runs: [], total: 0 });
      if (url === '/api/runs/run-1') {
        return json(runPayload({
          status: 'succeeded',
          active: false,
          final_metrics: { val_loss: 2.9536 },
          started_at: '2026-08-12T00:00:00Z',
          finished_at: '2026-08-12T00:00:45Z',
        }));
      }
      throw new Error(`unexpected url ${url}`);
    });
    writeActiveRun(api, POINTER);

    const { container } = render(
      <RunReattachBanner api={api} settings={DEFAULT_SETTINGS} onAskAgent={onAskAgent} />,
    );

    expect(await screen.findByText('Run succeeded while you were away')).toBeInTheDocument();
    expect(screen.getByText(/val_loss 2\.9536/)).toBeInTheDocument();
    expect(notifyRunFinished).not.toHaveBeenCalled();

    fireEvent.click(screen.getByText('Ask the agent to summarize'));

    expect(onAskAgent).toHaveBeenCalledTimes(1);
    expect(onAskAgent).toHaveBeenCalledWith(
      'Summarize run run-1 with get_run and report its metrics exactly.',
    );
    expect(store.has('active_run')).toBe(false);
    expect(container.firstChild).toBeNull();
  });

  it('follows a live run to completion and notifies on finish', async () => {
    // The terminal page is held behind a gate the test releases only after
    // asserting the live card: with nothing gating it, both /events pages
    // and the wrap-up fetchRun resolve within the same microtask flush and
    // the intermediate live render is never independently observable.
    const terminalPage = deferred<void>();
    const pages = [
      { status: 'running', events: [nodeEvent(1, { loss: 2.5 })], cursor: 1 },
      { status: 'succeeded', events: [], cursor: 1 },
    ];
    let eventsCall = 0;
    let runCall = 0;
    const { api } = makeApi(async (url) => {
      if (url.startsWith('/api/runs?limit=1')) return json({ runs: [], total: 0 });
      if (url.includes('/events')) {
        const index = Math.min(eventsCall, pages.length - 1);
        eventsCall += 1;
        if (index > 0) await terminalPage.promise;
        return json(pages[index]);
      }
      if (url === '/api/runs/run-1') {
        runCall += 1;
        return runCall === 1
          ? json(runPayload({ status: 'running' }))
          : json(runPayload({
              status: 'succeeded',
              active: false,
              final_metrics: { val_loss: 2.9536 },
              started_at: '2026-08-12T00:00:00Z',
              finished_at: '2026-08-12T00:00:45Z',
            }));
      }
      throw new Error(`unexpected url ${url}`);
    });
    writeActiveRun(api, POINTER);

    render(<RunReattachBanner api={api} settings={DEFAULT_SETTINGS} onAskAgent={vi.fn()} />);

    expect(await screen.findByText('Run in progress (reattached)')).toBeInTheDocument();

    terminalPage.resolve();

    expect(await screen.findByText('Run succeeded while you were away')).toBeInTheDocument();
    expect(notifyRunFinished).toHaveBeenCalledTimes(1);
    // Hand-derived, not computed via metricsSummary(): val_loss 2.9536 is a
    // float -> .toFixed(4); 45s (00:00:00 -> 00:00:45) is under 90 -> "45s".
    // Computing this from metricsSummary() itself would be a mirror
    // assertion — it would still pass if metricsSummary's own formatting
    // regressed, since both sides of the comparison would drift together.
    expect(vi.mocked(notifyRunFinished).mock.calls[0][1]).toEqual({
      runId: 'run-1',
      status: 'succeeded',
      detail: 'val_loss 2.9536 · 45s',
    });
  });

  it('clears the pointer when the host does not support run history (probe fails)', async () => {
    const { api, store } = makeApi(async (url) => {
      if (url.startsWith('/api/runs?limit=1')) return new Response('{"detail":"not found"}', { status: 404 });
      throw new Error(`unexpected url ${url}`);
    });
    writeActiveRun(api, POINTER);

    const { container } = render(
      <RunReattachBanner api={api} settings={DEFAULT_SETTINGS} onAskAgent={vi.fn()} />,
    );

    await waitFor(() => expect(store.has('active_run')).toBe(false));
    expect(container.firstChild).toBeNull();
  });

  it('clears the pointer when the followed run is deleted mid-follow (row: null)', async () => {
    let runCall = 0;
    const { api, store } = makeApi(async (url) => {
      if (url.startsWith('/api/runs?limit=1')) return json({ runs: [], total: 0 });
      if (url.includes('/events')) return json({ status: 'succeeded', events: [], cursor: 0 });
      if (url === '/api/runs/run-1') {
        runCall += 1;
        // First call (pre-follow) finds it running; the wrap-up fetch inside
        // followRun (after the terminal empty page) finds it gone.
        return runCall === 1
          ? json(runPayload({ status: 'running' }))
          : new Response('{"detail":"not found"}', { status: 404 });
      }
      throw new Error(`unexpected url ${url}`);
    });
    writeActiveRun(api, POINTER);

    const { container } = render(
      <RunReattachBanner api={api} settings={DEFAULT_SETTINGS} onAskAgent={vi.fn()} />,
    );

    await waitFor(() => expect(store.has('active_run')).toBe(false));
    expect(container.firstChild).toBeNull();
  });

  it('finished card falls back to the run error, then to a fixed message, when there are no metrics', async () => {
    const withError = makeApi(async (url) => {
      if (url.startsWith('/api/runs?limit=1')) return json({ runs: [], total: 0 });
      if (url === '/api/runs/run-1') {
        return json(runPayload({ status: 'failed', active: false, error: 'CUDA out of memory' }));
      }
      throw new Error(`unexpected url ${url}`);
    });
    writeActiveRun(withError.api, POINTER);
    const errorRender = render(
      <RunReattachBanner api={withError.api} settings={DEFAULT_SETTINGS} onAskAgent={vi.fn()} />,
    );
    expect(await errorRender.findByText('Run failed while you were away')).toBeInTheDocument();
    expect(errorRender.getByText(/CUDA out of memory/)).toBeInTheDocument();
    errorRender.unmount();

    const blank = makeApi(async (url) => {
      if (url.startsWith('/api/runs?limit=1')) return json({ runs: [], total: 0 });
      if (url === '/api/runs/run-1') {
        return json(runPayload({ status: 'cancelled', active: false, error: null }));
      }
      throw new Error(`unexpected url ${url}`);
    });
    writeActiveRun(blank.api, POINTER);
    const blankRender = render(
      <RunReattachBanner api={blank.api} settings={DEFAULT_SETTINGS} onAskAgent={vi.fn()} />,
    );
    expect(await blankRender.findByText('Run cancelled while you were away')).toBeInTheDocument();
    expect(blankRender.getByText('No recorded metrics.')).toBeInTheDocument();
  });

  it('Stop run posts /cancel and disables the button with "Stopping…"', async () => {
    const { api, fetchMock } = makeApi(async (url) => {
      if (url.startsWith('/api/runs?limit=1')) return json({ runs: [], total: 0 });
      if (url.includes('/cancel')) return json({ cancelled: true });
      if (url.includes('/events')) return new Promise<Response>(() => {}); // long poll never resolves
      if (url === '/api/runs/run-1') return json(runPayload({ status: 'running' }));
      throw new Error(`unexpected url ${url}`);
    });
    writeActiveRun(api, POINTER);

    render(<RunReattachBanner api={api} settings={DEFAULT_SETTINGS} onAskAgent={vi.fn()} />);
    await screen.findByText('Run in progress (reattached)');

    fireEvent.click(screen.getByText('Stop run'));

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledWith(
        expect.stringContaining('/cancel'),
        expect.objectContaining({ method: 'POST' }),
      );
    });
    expect(screen.getByText('Stopping…')).toBeDisabled();
  });

  it('Stop run failure re-enables the button instead of stranding it disabled', async () => {
    const { api, fetchMock } = makeApi(async (url) => {
      if (url.startsWith('/api/runs?limit=1')) return json({ runs: [], total: 0 });
      if (url.includes('/cancel')) return new Response('{"detail":"cancel failed"}', { status: 503 });
      if (url.includes('/events')) return new Promise<Response>(() => {}); // long poll never resolves
      if (url === '/api/runs/run-1') return json(runPayload({ status: 'running' }));
      throw new Error(`unexpected url ${url}`);
    });
    writeActiveRun(api, POINTER);

    render(<RunReattachBanner api={api} settings={DEFAULT_SETTINGS} onAskAgent={vi.fn()} />);
    await screen.findByText('Run in progress (reattached)');

    fireEvent.click(screen.getByText('Stop run'));

    // Assert synchronously, before any `await` yields to the microtask
    // queue: the mock's /cancel promise resolves immediately (no real
    // network delay), so an intervening await would let the failure-reset
    // `.then()` race ahead and flip the button back before this check runs.
    // `fetchMock` itself records the call synchronously too (the call
    // expression evaluates before `await` suspends inside cancelRunById).
    expect(fetchMock).toHaveBeenCalledWith(
      expect.stringContaining('/cancel'),
      expect.objectContaining({ method: 'POST' }),
    );
    expect(screen.getByText('Stopping…')).toBeDisabled();

    expect(await screen.findByText('Stop run')).not.toBeDisabled();
  });

  it('Dismiss (live) clears the pointer and hides without hitting /cancel', async () => {
    const { api, store, fetchMock } = makeApi(async (url) => {
      if (url.startsWith('/api/runs?limit=1')) return json({ runs: [], total: 0 });
      if (url.includes('/events')) return new Promise<Response>(() => {}); // long poll never resolves
      if (url === '/api/runs/run-1') return json(runPayload({ status: 'running' }));
      throw new Error(`unexpected url ${url}`);
    });
    writeActiveRun(api, POINTER);

    const { container } = render(
      <RunReattachBanner api={api} settings={DEFAULT_SETTINGS} onAskAgent={vi.fn()} />,
    );
    await screen.findByText('Run in progress (reattached)');

    fireEvent.click(screen.getByText('Dismiss'));

    expect(container.firstChild).toBeNull();
    expect(store.has('active_run')).toBe(false);
    expect(fetchMock.mock.calls.some(([callUrl]) => String(callUrl).includes('/cancel'))).toBe(false);
  });

  it('unmount aborts the follower but keeps the pointer (next mount re-offers)', async () => {
    let eventsCall = 0;
    const { api, store } = makeApi(async (url) => {
      if (url.startsWith('/api/runs?limit=1')) return json({ runs: [], total: 0 });
      if (url.includes('/events')) {
        eventsCall += 1;
        // The run is still training: the first page has a live progress
        // event (never an empty tail), and every page after that hangs, the
        // same way a real long poll would still be open when we unmount.
        // Nothing here ever resolves via a timer.
        if (eventsCall === 1) {
          return json({ status: 'running', events: [nodeEvent(1, { loss: 2.5 })], cursor: 1 });
        }
        return new Promise<Response>(() => {});
      }
      if (url === '/api/runs/run-1') return json(runPayload({ status: 'running' }));
      throw new Error(`unexpected url ${url}`);
    });
    writeActiveRun(api, POINTER);

    const { unmount } = render(
      <RunReattachBanner api={api} settings={DEFAULT_SETTINGS} onAskAgent={vi.fn()} />,
    );
    await screen.findByText('Run in progress (reattached)');

    unmount();

    expect(store.has('active_run')).toBe(true);
    expect(readActiveRun(api)).not.toBeNull();
    expect(readActiveRun(api)?.runId).toBe('run-1');
  });
});

describe('metricsSummary', () => {
  const baseRow: RunRow = {
    runId: 'r', name: null, status: 'succeeded', active: false,
    queuePosition: null, createdAt: null, startedAt: null, finishedAt: null,
    error: null, finalMetrics: {}, lastCursor: null, durationS: null,
  };

  it('formats an integer metric bare', () => {
    expect(metricsSummary({ ...baseRow, finalMetrics: { epoch: 5 } })).toBe('epoch 5');
  });

  it('formats a float metric to 4 decimal places', () => {
    expect(metricsSummary({ ...baseRow, finalMetrics: { val_loss: 2.95 } })).toBe('val_loss 2.9500');
  });

  it('formats a sub-90s duration as seconds', () => {
    expect(metricsSummary({ ...baseRow, durationS: 45 })).toBe('45s');
  });

  it('formats a 90s-plus duration as rounded minutes', () => {
    expect(metricsSummary({ ...baseRow, durationS: 3660 })).toBe('61 min');
  });

  it('shows duration only when there are no final metrics', () => {
    expect(metricsSummary({ ...baseRow, finalMetrics: {}, durationS: 45 })).toBe('45s');
  });

  it('caps at 3 metric entries', () => {
    expect(metricsSummary({
      ...baseRow,
      finalMetrics: { a: 1, b: 2, c: 3, d: 4 },
      durationS: null,
    })).toBe('a 1 · b 2 · c 3');
  });

  it('returns an empty string when there are no metrics and no duration', () => {
    expect(metricsSummary(baseRow)).toBe('');
  });
});
