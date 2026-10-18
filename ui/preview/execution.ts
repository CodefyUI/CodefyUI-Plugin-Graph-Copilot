import type { SampleGraph } from './graph';
import { validateSampleGraph } from './graph';

// Fixture credentials are deliberately public, nonfunctional strings. They are
// never sent to a native socket, real host, provider, or persisted run receipt.
export const MOCK_EXECUTION_TOKEN = 'mock-execution-token-not-a-real-credential';
export const MOCK_RUN_ID = 'mock-native-run';
export const MOCK_HISTORY_RUN_ID = 'mock-history-run';

export interface MockRunEvent {
  cursor: number;
  type: string;
  payload: Record<string, unknown>;
}

export interface MockRunEventPage {
  status: string;
  cursor: number;
  events: MockRunEvent[];
}

export interface MockRunRoutes {
  serverOwned: boolean;
  runEvents(runId: string, cursor: number, limit: number): MockRunEventPage | null;
  cancelRun(runId: string): boolean;
  subscribe(listener: () => void): () => void;
}

export interface MockExecution {
  id: number;
  endpoint: '/ws/execution';
  status: 'connecting' | 'running' | 'complete' | 'cancelled' | 'closed' | 'blocked';
  socketState: 'connecting' | 'open' | 'closed';
  serverOwned: boolean;
  initialIdPending: boolean;
  runId?: string;
  messages: Record<string, unknown>[];
  emittedEvents: string[];
  // Host journal is independent of delivery to the browser's execution socket.
  events: MockRunEvent[];
}

export interface MockExecutionOptions {
  serverOwned?: boolean;
  lateInitialId?: boolean;
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
 * explicit native-run scenario can create one; all other sockets fail closed.
 * Legacy runs die with their socket. Opt-in server-owned runs keep their host
 * journal and explicit event-release controls after a browser disconnect. */
export function createMockExecution(
  allowed: boolean,
  origin: string,
  graph: () => SampleGraph,
  onChange: () => void,
  recordBlocked: (reason: string) => void,
  options: MockExecutionOptions = {},
) {
  const serverOwned = allowed && options.serverOwned === true;
  const lateInitialId = serverOwned && options.lateInitialId === true;
  let nextId = 1;
  const records: MockExecution[] = [];
  const pending = new Map<number, () => void>();
  const sockets = new Map<number, MockWebSocket>();
  const listeners = new Set<() => void>();
  const changed = () => { onChange(); for (const listener of [...listeners]) listener(); };
  const hostStatus = (record: MockExecution) => record.status === 'complete' ? 'succeeded' : record.status;
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
      this.receipt = {
        id: nextId++, endpoint: '/ws/execution', status: 'connecting', socketState: 'connecting',
        serverOwned, initialIdPending: false, messages: [], emittedEvents: [], events: [],
      };
      records.push(this.receipt);
      sockets.set(this.receipt.id, this);
      changed();
      queueMicrotask(() => {
        if (this.readyState !== MockWebSocket.CONNECTING) return;
        this.readyState = MockWebSocket.OPEN;
        this.receipt.socketState = 'open';
        const event = new Event('open');
        this.onopen?.(event);
        this.dispatchEvent(event);
        changed();
      });
    }

    private emit(payload: Record<string, unknown>): void {
      this.receipt.events.push({ cursor: this.receipt.events.length + 1, type: String(payload.type), payload: structuredClone(payload) });
      if (this.readyState === MockWebSocket.OPEN) {
        this.receipt.emittedEvents.push(String(payload.type));
        const event = new MessageEvent<string>('message', { data: JSON.stringify({ run_id: MOCK_RUN_ID, ...payload }) });
        this.onmessage?.(event);
        this.dispatchEvent(event);
      }
      changed();
    }

    stop(): void {
      pending.delete(this.receipt.id);
      this.receipt.initialIdPending = false;
      this.receipt.status = 'cancelled';
      // Native cleanup is observable on the next microtask, not a sleep or a
      // swallowed abort. The real runner receives its terminal acknowledgement.
      queueMicrotask(() => this.emit({ type: 'execution_stopped', reason: 'cancelled' }));
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
        this.receipt.initialIdPending = lateInitialId;
        const initial = () => {
          this.receipt.initialIdPending = false;
          this.emit({ type: 'node_status', node_id: 'sample-dataset', status: 'running', progress: { epoch: 1, loss: 0.75 } });
        };
        let step = lateInitialId ? -1 : 0;
        pending.set(this.receipt.id, () => {
          if (this.receipt.status !== 'running') return;
          if (step === -1) {
            step = 0;
            initial();
          } else if (step++ === 0) {
            this.emit({ type: 'node_status', node_id: 'sample-dataset', status: 'running', progress: { epoch: 2, loss: 0.25 } });
          } else {
            pending.delete(this.receipt.id);
            for (const node of current.nodes) this.emit({ type: 'node_status', node_id: node.id, status: 'completed' });
            this.emit({ type: 'metric', points: [{ name: 'loss', value: 0.25 }] });
            this.receipt.status = 'complete';
            this.emit({ type: 'execution_complete' });
          }
        });
        if (!lateInitialId) queueMicrotask(() => { if (this.receipt.status === 'running') initial(); });
      } else if (payload.action === 'cancel') {
        if (this.receipt.status !== 'running' || (payload.run_id !== undefined && payload.run_id !== MOCK_RUN_ID)
          || Object.keys(payload).some((key) => !['action', 'run_id'].includes(key))) return block('unexpected execution cancel');
        this.receipt.messages.push(structuredClone(payload));
        this.stop();
      } else return block('unexpected execution action');
      changed();
    }

    close(): void {
      if (this.readyState === MockWebSocket.CLOSED) return;
      if (!serverOwned || this.receipt.status !== 'running') {
        pending.delete(this.receipt.id);
        this.receipt.initialIdPending = false;
        if (this.receipt.status === 'connecting' || this.receipt.status === 'running') this.receipt.status = 'closed';
      }
      this.readyState = MockWebSocket.CLOSED;
      this.receipt.socketState = 'closed';
      queueMicrotask(() => {
        const event = new CloseEvent('close', { code: 1000, wasClean: true });
        this.onclose?.(event);
        this.dispatchEvent(event);
      });
      changed();
    }
  }

  return {
    WebSocket: MockWebSocket as unknown as typeof WebSocket,
    serverOwned,
    releaseNext() { const release = pending.values().next().value; if (!release) return false; release(); return true; },
    inspect: () => ({ executions: structuredClone(records), executionPending: pending.size }),
    runRows: () => [mockHistoryRow(), ...records.filter((record) => record.runId).map((record) => ({
      id: record.runId!, name: 'In-memory sample execution', status: hostStatus(record),
      active: record.status === 'running', final_metrics: record.status === 'complete' ? { loss: 0.25 } : {}, last_cursor: record.events.length,
    }))],
    runEvents(runId: string, cursor: number, limit: number): MockRunEventPage | null {
      const record = serverOwned && runId === MOCK_RUN_ID ? records.find((candidate) => candidate.runId === runId) : undefined;
      if (!record) return null;
      const events = record.events.filter((event) => event.cursor > cursor).slice(0, limit);
      return structuredClone({ status: hostStatus(record), events, cursor: events.at(-1)?.cursor ?? cursor });
    },
    cancelRun(runId: string): boolean {
      const record = serverOwned && runId === MOCK_RUN_ID ? records.find((candidate) => candidate.runId === runId) : undefined;
      if (!record) return false;
      if (record.status === 'running') sockets.get(record.id)!.stop();
      return true;
    },
    subscribe(listener: () => void): () => void { listeners.add(listener); return () => { listeners.delete(listener); }; },
  };
}
