import type { SampleGraph } from './graph';
import { validateSampleGraph } from './graph';

// Fixture credentials are deliberately public, nonfunctional strings. They are
// never sent to a native socket, real host, provider, or persisted run receipt.
export const MOCK_EXECUTION_TOKEN = 'mock-execution-token-not-a-real-credential';
export const MOCK_RUN_ID = 'mock-native-run';
export const MOCK_HISTORY_RUN_ID = 'mock-history-run';

export interface MockExecution {
  id: number;
  endpoint: '/ws/execution';
  status: 'connecting' | 'running' | 'complete' | 'cancelled' | 'closed' | 'blocked';
  runId?: string;
  messages: Record<string, unknown>[];
  emittedEvents: string[];
}

export const mockHistoryRow = () => ({
  id: MOCK_HISTORY_RUN_ID,
  name: 'Previously completed mock run',
  status: 'completed',
  active: false,
  created_at: '2026-10-11T00:00:00.000Z',
  started_at: '2026-10-11T00:00:00.000Z',
  finished_at: '2026-10-11T00:00:02.000Z',
  final_metrics: { loss: 0.25 },
  last_cursor: 4,
});

/** An entirely in-memory execution socket. The constructor never invokes the
 * browser's native WebSocket. Only an exact local endpoint, fake token, and
 * explicit native-run scenario can create one; all other sockets fail closed. */
export function createMockExecution(
  allowed: boolean,
  origin: string,
  graph: () => SampleGraph,
  onChange: () => void,
  recordBlocked: (reason: string) => void,
) {
  let nextId = 1;
  const records: MockExecution[] = [];
  const pending = new Map<number, () => void>();
  const block = (reason: string): never => {
    recordBlocked(reason);
    throw new Error(`Mock host blocked network: ${reason}`);
  };

  class MockWebSocket extends EventTarget {
    static readonly CONNECTING = 0;
    static readonly OPEN = 1;
    static readonly CLOSING = 2;
    static readonly CLOSED = 3;
    readonly CONNECTING = 0;
    readonly OPEN = 1;
    readonly CLOSING = 2;
    readonly CLOSED = 3;
    readonly url: string;
    readonly protocol = '';
    readonly extensions = '';
    readonly bufferedAmount = 0;
    binaryType: BinaryType = 'blob';
    readyState: number = MockWebSocket.CONNECTING;
    onopen: ((event: Event) => void) | null = null;
    onmessage: ((event: MessageEvent<string>) => void) | null = null;
    onclose: ((event: CloseEvent) => void) | null = null;
    onerror: ((event: Event) => void) | null = null;
    private readonly receipt: MockExecution;

    constructor(rawUrl: string | URL, protocols?: string | string[]) {
      super();
      const url = new URL(String(rawUrl), origin);
      const local = new URL(origin);
      const expectedProtocol = local.protocol === 'https:' ? 'wss:' : 'ws:';
      if (!allowed || url.protocol !== expectedProtocol || url.host !== local.host || url.pathname !== '/ws/execution'
        || url.searchParams.get('token') !== MOCK_EXECUTION_TOKEN || [...url.searchParams.keys()].join(',') !== 'token'
        || url.hash || url.username || url.password || protocols !== undefined) {
        block('unexpected execution WebSocket');
      }
      this.url = url.toString();
      this.receipt = { id: nextId++, endpoint: '/ws/execution', status: 'connecting', messages: [], emittedEvents: [] };
      records.push(this.receipt);
      onChange();
      queueMicrotask(() => {
        if (this.readyState !== MockWebSocket.CONNECTING) return;
        this.readyState = MockWebSocket.OPEN;
        const event = new Event('open');
        this.onopen?.(event);
        this.dispatchEvent(event);
      });
    }

    private emit(payload: Record<string, unknown>): void {
      if (this.readyState !== MockWebSocket.OPEN) return;
      this.receipt.emittedEvents.push(String(payload.type));
      const event = new MessageEvent<string>('message', { data: JSON.stringify({ run_id: MOCK_RUN_ID, ...payload }) });
      this.onmessage?.(event);
      this.dispatchEvent(event);
      onChange();
    }

    send(raw: string): void {
      if (this.readyState !== MockWebSocket.OPEN) throw new DOMException('Mock socket is not open', 'InvalidStateError');
      let payload: Record<string, unknown>;
      try { payload = JSON.parse(raw) as Record<string, unknown>; } catch { return block('execution message is not JSON'); }
      if (!payload || typeof payload !== 'object' || Array.isArray(payload)) return block('execution message is not an object');
      const current = graph();
      if (payload.action === 'execute') {
        if (this.receipt.status !== 'connecting' || !validateSampleGraph(current).valid
          || JSON.stringify(payload.nodes) !== JSON.stringify(current.nodes)
          || JSON.stringify(payload.edges) !== JSON.stringify(current.edges)
          || JSON.stringify(payload.presets) !== JSON.stringify(current.presets ?? [])
          || payload.record_outputs !== false || payload.weights_persistent !== true || payload.device !== 'cpu'
          || Object.keys(payload).some((key) => !['action', 'nodes', 'edges', 'presets', 'record_outputs', 'weights_persistent', 'device'].includes(key))) {
          this.receipt.status = 'blocked';
          return block('execution did not contain the current validated mock graph');
        }
        this.receipt.messages.push(structuredClone(payload));
        this.receipt.status = 'running';
        this.receipt.runId = MOCK_RUN_ID;
        let step = 0;
        pending.set(this.receipt.id, () => {
          if (this.receipt.status !== 'running') return;
          if (step++ === 0) {
            this.emit({ type: 'node_status', node_id: 'sample-dataset', status: 'running', progress: { epoch: 2, loss: 0.25 } });
          } else {
            pending.delete(this.receipt.id);
            for (const node of current.nodes) this.emit({ type: 'node_status', node_id: node.id, status: 'completed' });
            this.emit({ type: 'metric', points: [{ name: 'loss', value: 0.25 }] });
            this.receipt.status = 'complete';
            this.emit({ type: 'execution_complete' });
          }
        });
        queueMicrotask(() => this.emit({ type: 'node_status', node_id: 'sample-dataset', status: 'running', progress: { epoch: 1, loss: 0.75 } }));
      } else if (payload.action === 'cancel') {
        if (this.receipt.status !== 'running' || (payload.run_id !== undefined && payload.run_id !== MOCK_RUN_ID)
          || Object.keys(payload).some((key) => !['action', 'run_id'].includes(key))) return block('unexpected execution cancel');
        this.receipt.messages.push(structuredClone(payload));
        pending.delete(this.receipt.id);
        this.receipt.status = 'cancelled';
        // Native cleanup is observable on the next microtask, not a sleep or a
        // swallowed abort. The real runner receives its terminal acknowledgement.
        queueMicrotask(() => this.emit({ type: 'execution_stopped', reason: 'cancelled' }));
      } else return block('unexpected execution action');
      onChange();
    }

    close(): void {
      if (this.readyState === MockWebSocket.CLOSED) return;
      pending.delete(this.receipt.id);
      if (this.receipt.status === 'connecting' || this.receipt.status === 'running') this.receipt.status = 'closed';
      this.readyState = MockWebSocket.CLOSED;
      queueMicrotask(() => {
        const event = new CloseEvent('close', { code: 1000, wasClean: true });
        this.onclose?.(event);
        this.dispatchEvent(event);
      });
      onChange();
    }
  }

  return {
    WebSocket: MockWebSocket as unknown as typeof WebSocket,
    releaseNext() { const release = pending.values().next().value; if (!release) return false; release(); return true; },
    inspect: () => ({ executions: structuredClone(records), executionPending: pending.size }),
    runRows: () => [mockHistoryRow(), ...records.filter((record) => record.runId).map((record) => ({
      id: record.runId!, name: 'In-memory sample execution', status: record.status === 'complete' ? 'completed' : record.status,
      active: record.status === 'running', final_metrics: record.status === 'complete' ? { loss: 0.25 } : {}, last_cursor: record.emittedEvents.length,
    }))],
  };
}
