import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import type { CodefyUIPluginAPI, SerializedGraph } from '../types/codefyui';
import {
  DEFAULT_RUN_TIMEOUT_MINUTES,
  MAX_RUN_TIMEOUT_MINUTES,
  fetchDefaultDevice,
  formatRunStatusLine,
  runLiveGraph,
} from './runGraph';

// ---------------------------------------------------------------------------
// Fixtures
// ---------------------------------------------------------------------------

const GRAPH: SerializedGraph = {
  nodes: [
    { id: 'start', type: 'Start', position: { x: 0, y: 0 }, data: { params: {} } },
    { id: 'loop', type: 'TrainingLoop', position: { x: 100, y: 0 }, data: { params: {} } },
    { id: 'gen', type: 'TextGenerate', position: { x: 200, y: 0 }, data: { params: {} } },
    { id: 'note', type: 'note', position: { x: 0, y: 100 }, data: {} },
  ],
  edges: [
    { id: 'e1', source: 'start', target: 'loop', sourceHandle: 'trigger', targetHandle: '__trigger', type: 'trigger' },
    { id: 'e2', source: 'note', target: 'loop', sourceHandle: '', targetHandle: '' },
  ],
  presets: [],
};

type SocketBehavior = (socket: MockWebSocket, payload: Record<string, unknown>) => void;
let socketBehavior: SocketBehavior;
let sentPayloads: Record<string, unknown>[];

class MockWebSocket {
  static CONNECTING = 0;
  static OPEN = 1;
  static CLOSED = 3;
  static instances: MockWebSocket[] = [];

  readyState = MockWebSocket.CONNECTING;
  onopen: ((event: Event) => void) | null = null;
  onmessage: ((event: MessageEvent) => void) | null = null;
  onerror: ((event: Event) => void) | null = null;
  onclose: ((event: CloseEvent) => void) | null = null;

  constructor(public url: string) {
    MockWebSocket.instances.push(this);
    queueMicrotask(() => {
      if (this.readyState !== MockWebSocket.CONNECTING) return;
      this.readyState = MockWebSocket.OPEN;
      this.onopen?.(new Event('open'));
    });
  }

  send(raw: string) {
    const payload = JSON.parse(raw) as Record<string, unknown>;
    sentPayloads.push(payload);
    socketBehavior(this, payload);
  }

  close() {
    this.readyState = MockWebSocket.CLOSED;
  }

  emit(value: unknown) {
    this.onmessage?.({ data: JSON.stringify(value) } as MessageEvent);
  }

  fail() {
    this.onerror?.(new Event('error'));
  }
}

function fakeApi(defaultDevice: string | null = 'cuda'): CodefyUIPluginAPI {
  return {
    apiVersion: 1,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn(() => structuredClone(GRAPH)),
      getNodeDefinitions: vi.fn(() => []),
      applyOperations: vi.fn(),
      onGraphChanged: vi.fn(() => () => {}),
    },
    http: {
      fetch: vi.fn(async (url: string) => {
        if (url === '/api/auth/bootstrap') {
          return { ok: true, status: 200, json: async () => ({ token: 'token-123' }) };
        }
        if (url === '/api/system/devices') {
          if (defaultDevice === null) {
            return { ok: false, status: 404, json: async () => ({}) };
          }
          return {
            ok: true,
            status: 200,
            json: async () => ({ default: defaultDevice, devices: [] }),
          };
        }
        throw new Error(`unexpected URL ${url}`);
      }),
    },
    storage: { get: vi.fn(), set: vi.fn(), remove: vi.fn() },
  } as unknown as CodefyUIPluginAPI;
}

async function flushMicrotasks(times = 6): Promise<void> {
  for (let i = 0; i < times; i++) await Promise.resolve();
}

beforeEach(() => {
  sentPayloads = [];
  MockWebSocket.instances = [];
  socketBehavior = () => {};
  vi.stubGlobal('WebSocket', MockWebSocket);
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

// ---------------------------------------------------------------------------
// runLiveGraph
// ---------------------------------------------------------------------------

describe('runLiveGraph', () => {
  it('executes the live graph (notes stripped) and collects outputs, progress, metrics', async () => {
    socketBehavior = (socket, payload) => {
      expect(payload.action).toBe('execute');
      queueMicrotask(() => {
        socket.emit({ type: 'execution_start', run_id: 'run-9' });
        socket.emit({
          type: 'node_status', node_id: 'loop', status: 'progress', run_id: 'run-9',
          outputs: [{ output_kind: 'progress', progress: { event: 'batch', epoch: 1, loss: 2.75 } }],
        });
        socket.emit({
          type: 'node_status', node_id: 'loop', status: 'completed', run_id: 'run-9',
          outputs: [{
            output_kind: 'tensor_summary',
            tensor_summary: {
              model: { type: 'model', class: 'GraphModelModule', params: 1000, trainable: 900 },
              metrics: { type: 'scalar', value: 0.5 },
            },
          }],
        });
        socket.emit({
          type: 'node_status', node_id: 'gen', status: 'completed', run_id: 'run-9',
          outputs: [{
            output_kind: 'tensor_summary',
            tensor_summary: { text: { type: 'string', value: 'Once upon a time' } },
          }],
        });
        socket.emit({
          type: 'metric', run_id: 'run-9',
          points: [
            { name: 'loop/loss', value: 2.1, step: 10, node_id: 'loop' },
            { name: 'loop/loss', value: 1.9, step: 20, node_id: 'loop' },
          ],
        });
        socket.emit({ type: 'execution_complete', run_id: 'run-9' });
      });
    };

    const updates: string[] = [];
    const outcome = await runLiveGraph(fakeApi(), {
      timeoutMs: 60_000,
      onProgress: (update) => updates.push(update.phase),
    });

    expect(outcome.status).toBe('complete');
    expect(outcome.runId).toBe('run-9');
    expect(outcome.totalNodes).toBe(3); // note filtered
    expect(outcome.completedNodes).toBe(2);
    expect(outcome.outputs['TrainingLoop.metrics']).toBe(0.5);
    expect(outcome.outputs['TrainingLoop.model.params']).toBe(900);
    expect(outcome.outputs['TextGenerate.text']).toBe('Once upon a time');
    expect(outcome.finalProgress['TrainingLoop.loss']).toBe(2.75);
    expect(outcome.finalProgress['TrainingLoop.epoch']).toBe(1);
    expect(outcome.finalProgress['TrainingLoop.event']).toBe('batch');
    expect(outcome.metrics['loop/loss']).toBe(1.9);
    expect(updates[0]).toBe('connecting');
    expect(updates).toContain('running');

    const execute = sentPayloads[0];
    expect(execute.record_outputs).toBe(false);
    expect(execute.weights_persistent).toBe(true);
    expect(execute.device).toBe('cuda'); // host default from /api/system/devices
    expect((execute.nodes as unknown[]).length).toBe(3);
  });

  it('does not submit an unapproved graph changed during deferred bootstrap', async () => {
    const api = fakeApi();
    const approved = structuredClone(GRAPH);
    let live = structuredClone(approved);
    let release!: () => void;
    let entered!: () => void;
    const bootstrapEntered = new Promise<void>((resolve) => { entered = resolve; });
    const bootstrap = new Promise<void>((resolve) => { release = resolve; });
    vi.mocked(api.graph.getGraph).mockImplementation(() => live);
    vi.mocked(api.http.fetch).mockImplementation(async () => {
      entered(); await bootstrap;
      return { ok: true, json: async () => ({ token: 'token-123' }) } as Response;
    });
    const stale = new Error('The approved graph changed before execution.');
    socketBehavior = (socket) => queueMicrotask(() => socket.emit({ type: 'execution_complete' }));
    const pending = runLiveGraph(api, {
      timeoutMs: 60_000, device: 'cpu', approvedGraph: approved,
      beforeExecute: () => { if (JSON.stringify(live) !== JSON.stringify(approved)) throw stale; },
    } as Parameters<typeof runLiveGraph>[1]);
    // Attach the rejection expectation before releasing deferred auth.
    const rejected = expect(pending).rejects.toBe(stale);
    await bootstrapEntered;
    live.nodes[1].data!.params = { dangerous: true };
    release();
    await rejected;
    expect(sentPayloads).toEqual([]);
    expect(MockWebSocket.instances).toHaveLength(0);
  });

  it('sends an immutable approved payload and checks approval again at socket open', async () => {
    const api = fakeApi();
    const approved = structuredClone(GRAPH);
    socketBehavior = (socket) => queueMicrotask(() => socket.emit({ type: 'execution_complete' }));
    let checks = 0;
    await runLiveGraph(api, {
      timeoutMs: 60_000, device: 'cpu', approvedGraph: approved,
      beforeExecute: () => { checks++; approved.nodes[1].data!.params = { dangerous: true }; },
    } as Parameters<typeof runLiveGraph>[1]);
    expect(checks).toBe(2);
    expect((sentPayloads[0].nodes as SerializedGraph['nodes'])[1].data?.params).toEqual({});
  });

  it('fires onRunId once with the first run_id', async () => {
    socketBehavior = (socket) => {
      queueMicrotask(() => {
        socket.emit({
          type: 'node_status', node_id: 'loop', status: 'progress', run_id: 'r1',
        });
        socket.emit({
          type: 'node_status', node_id: 'loop', status: 'completed', run_id: 'r1',
        });
        socket.emit({ type: 'execution_complete', run_id: 'r1' });
      });
    };

    const seen: string[] = [];
    const outcome = await runLiveGraph(fakeApi(), {
      timeoutMs: 60_000,
      onRunId: (id) => seen.push(id),
    });

    expect(outcome.status).toBe('complete');
    expect(seen).toEqual(['r1']);
  });

  it('an explicit device overrides the host default', async () => {
    socketBehavior = (socket) => {
      queueMicrotask(() => socket.emit({ type: 'execution_complete' }));
    };
    const api = fakeApi('cuda');
    await runLiveGraph(api, { timeoutMs: 60_000, device: 'cpu' });
    expect(sentPayloads[0].device).toBe('cpu');
    const urls = (api.http.fetch as ReturnType<typeof vi.fn>).mock.calls.map((c) => c[0]);
    expect(urls).not.toContain('/api/system/devices');
  });

  it('omits the device field when the host has no devices endpoint', async () => {
    socketBehavior = (socket) => {
      queueMicrotask(() => socket.emit({ type: 'execution_complete' }));
    };
    await runLiveGraph(fakeApi(null), { timeoutMs: 60_000 });
    expect('device' in sentPayloads[0]).toBe(false);
  });

  it('collects legacy 1.3.0 output_summary / progress message fields', async () => {
    socketBehavior = (socket) => {
      queueMicrotask(() => {
        socket.emit({
          type: 'node_status', node_id: 'loop', status: 'progress',
          progress: { epoch: 3, loss: 1.25 },
        });
        socket.emit({
          type: 'node_status', node_id: 'loop', status: 'completed',
          output_summary: { metrics: { type: 'scalar', value: 0.9 } },
        });
        socket.emit({ type: 'execution_complete' });
      });
    };

    const outcome = await runLiveGraph(fakeApi(), { timeoutMs: 60_000 });
    expect(outcome.status).toBe('complete');
    expect(outcome.outputs['TrainingLoop.metrics']).toBe(0.9);
    expect(outcome.finalProgress['TrainingLoop.loss']).toBe(1.25);
  });

  it('reports node errors and scrubs the execution credential from messages', async () => {
    socketBehavior = (socket) => {
      queueMicrotask(() => {
        socket.emit({
          type: 'node_status', node_id: 'loop', status: 'error',
          error: 'CUDA exploded near token-123',
        });
        socket.emit({ type: 'execution_error', error: 'run failed with token-123' });
      });
    };

    const outcome = await runLiveGraph(fakeApi(), { timeoutMs: 60_000 });
    expect(outcome.status).toBe('error');
    expect(outcome.error).toBe('run failed with [REDACTED]');
    expect(outcome.nodeErrors.TrainingLoop).toBe('CUDA exploded near [REDACTED]');
  });

  it('treats a rejected execute as an error', async () => {
    socketBehavior = (socket) => {
      queueMicrotask(() => {
        socket.emit({ type: 'error', rejected: true, error: 'another run is active' });
      });
    };
    const outcome = await runLiveGraph(fakeApi(), { timeoutMs: 60_000 });
    expect(outcome.status).toBe('error');
    expect(outcome.error).toContain('another run is active');
  });

  it('cancels via the cancel action when the signal aborts', async () => {
    let socketRef: MockWebSocket | null = null;
    socketBehavior = (socket, payload) => {
      socketRef = socket;
      if (payload.action === 'execute') {
        queueMicrotask(() => {
          socket.emit({ type: 'execution_start', run_id: 'run-c' });
        });
      }
      if (payload.action === 'cancel') {
        // No assertions in here: a throw would be swallowed by the
        // implementation's send guard and the stop frame would never come.
        queueMicrotask(() => {
          socket.emit({ type: 'execution_stopped', reason: 'cancelled', run_id: 'run-c' });
        });
      }
    };

    const controller = new AbortController();
    const pending = runLiveGraph(fakeApi(), {
      signal: controller.signal,
      timeoutMs: 60_000,
    });
    // Flush until the execute payload is on the wire so the abort exercises
    // the running-run cancel path, not the pre-submit fast path; a few more
    // ticks let the execution_start frame deliver the run id.
    for (let i = 0; i < 40 && !sentPayloads.some((p) => p.action === 'execute'); i++) {
      await Promise.resolve();
    }
    await flushMicrotasks(4);
    controller.abort();
    const outcome = await pending;

    expect(outcome.status).toBe('cancelled');
    expect(outcome).toMatchObject({ cancelConfirmed: true });
    const cancelPayload = sentPayloads.find((p) => p.action === 'cancel');
    expect(cancelPayload).toBeDefined();
    expect(cancelPayload!.run_id).toBe('run-c');
    expect(socketRef!.readyState).toBe(MockWebSocket.CLOSED);
  });

  it('aborting before the run is submitted finishes immediately as cancelled', async () => {
    socketBehavior = () => {};
    const controller = new AbortController();
    const pending = runLiveGraph(fakeApi(), {
      signal: controller.signal,
      timeoutMs: 60_000,
    });
    controller.abort(); // before token/connect complete
    const outcome = await pending;
    expect(outcome.status).toBe('cancelled');
    expect(sentPayloads.some((p) => p.action === 'execute')).toBe(false);
  });

  it('times out a silent run: sends cancel, then resolves as timeout', async () => {
    vi.useFakeTimers();
    socketBehavior = (socket, payload) => {
      if (payload.action === 'execute') {
        queueMicrotask(() => {
          socket.emit({ type: 'execution_start', run_id: 'run-t' });
        });
      }
      // cancel is swallowed — host never answers.
    };

    const pending = runLiveGraph(fakeApi(), { timeoutMs: 10_000 });
    await flushMicrotasks();
    await vi.advanceTimersByTimeAsync(10_000); // fire the run timeout -> cancel
    expect(sentPayloads.some((p) => p.action === 'cancel')).toBe(true);
    await vi.advanceTimersByTimeAsync(5_000); // cancel grace expires
    const outcome = await pending;

    expect(outcome.status).toBe('timeout');
    expect(outcome).toMatchObject({ cancelConfirmed: false, runId: 'run-t' });
    expect(outcome.error).toContain('timed out');
    expect(outcome.error).toContain('unconfirmed');
  });

  it('resolves cancelled when the socket closes before completion after abort', async () => {
    socketBehavior = (socket, payload) => {
      if (payload.action === 'execute') {
        queueMicrotask(() => socket.emit({ type: 'execution_start', run_id: 'run-x' }));
      }
    };
    const controller = new AbortController();
    const pending = runLiveGraph(fakeApi(), { signal: controller.signal, timeoutMs: 60_000 });
    // Bootstrap now has guarded awaits; synchronize on real mocked dispatch,
    // not a fixed microtask count, to exercise socket-owned close cancellation.
    for (let i = 0; i < 80 && !sentPayloads.some((payload) => payload.action === 'execute'); i++) await Promise.resolve();
    expect(sentPayloads.some((payload) => payload.action === 'execute')).toBe(true);
    controller.abort();
    // Host never confirms; force the close handler (1.3.0 behavior).
    const socket = MockWebSocket.instances[0];
    socket.onclose?.(new CloseEvent('close'));
    const outcome = await pending;
    expect(outcome.status).toBe('cancelled');
    expect(outcome).toMatchObject({ cancelConfirmed: false });
    expect(outcome.error).toContain('unconfirmed');
  });
});

// ---------------------------------------------------------------------------
// formatRunStatusLine
// ---------------------------------------------------------------------------

describe('formatRunStatusLine', () => {
  it('names the phases', () => {
    expect(formatRunStatusLine({ phase: 'connecting', elapsedMs: 0, completedNodes: 0, totalNodes: 3 }))
      .toBe('Starting graph run…');
    expect(formatRunStatusLine({ phase: 'cancelling', elapsedMs: 5, completedNodes: 1, totalNodes: 3 }))
      .toBe('Cancelling run…');
  });

  it('prefers training fields and formats numbers compactly', () => {
    const line = formatRunStatusLine({
      phase: 'running',
      nodeType: 'TrainingLoop',
      progress: { event: 'batch', epoch: 2, loss: 1.234567, other: 9 },
      elapsedMs: 1000,
      completedNodes: 1,
      totalNodes: 4,
    });
    expect(line).toBe('Running graph 1/4 · TrainingLoop · epoch 2 · loss 1.2346');
  });

  it('falls back to the first numeric fields when no known names match', () => {
    const line = formatRunStatusLine({
      phase: 'running',
      nodeType: 'PerplexityEvaluate',
      progress: { event: 'eval', batches: 12, done: 0.5 },
      elapsedMs: 1000,
      completedNodes: 2,
      totalNodes: 4,
    });
    expect(line).toBe('Running graph 2/4 · PerplexityEvaluate · batches 12 · done 0.5000');
  });

  it('constants stay in sane bounds', () => {
    expect(DEFAULT_RUN_TIMEOUT_MINUTES).toBeLessThanOrEqual(MAX_RUN_TIMEOUT_MINUTES);
  });
});

describe('fetchDefaultDevice', () => {
  it('returns the host default and tolerates missing endpoints', async () => {
    expect(await fetchDefaultDevice(fakeApi('mps'))).toBe('mps');
    expect(await fetchDefaultDevice(fakeApi(null))).toBeUndefined();
  });
});
