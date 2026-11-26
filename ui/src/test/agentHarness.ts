/** Shared helpers for tests that drive `runTurn` with a scripted model.
 * The caller must `vi.mock('../llm/client', ...)` (relative to itself) so
 * `streamChat` is a mock; `scriptModel` programs it. */
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import type { ChatBody, DoneEvent, StreamHandlers, WireToolCall } from '../llm/client';
import { streamChat } from '../llm/client';
import type { Settings } from '../state/settings';
import type { TurnCallbacks } from '../agent/loop';
import type { ApplyResult, CodefyUIPluginAPI, GraphOp, SerializedGraph } from '../types/codefyui';

export type ModelStep = { calls?: WireToolCall[]; text?: string };

/** Each model call answers with the next step; the bodies sent are returned. */
export function scriptModel(steps: ModelStep[]): ChatBody[] {
  const bodies: ChatBody[] = [];
  let index = 0;
  (streamChat as Mock).mockImplementation(async (_api: unknown, body: ChatBody, handlers: StreamHandlers) => {
    bodies.push(JSON.parse(JSON.stringify(body)) as ChatBody);
    const step = steps[index++];
    if (!step) { handlers.onDone(done('')); return; }
    if (step.text) handlers.onText(step.text);
    handlers.onDone(done(step.text ?? '', step.calls ?? []));
  });
  return bodies;
}

export function done(content: string, calls: WireToolCall[] = []): DoneEvent {
  return {
    message: { role: 'assistant', content, tool_calls: calls },
    stop_reason: calls.length ? 'tool_use' : 'end',
    usage: {},
  };
}

export const SETTINGS: Settings = {
  provider: 'openai',
  models: { openai: 'gpt-4o' },
  apiKeys: { openai: 'sk-test-secret-key' },
} as unknown as Settings;

export function callbacks(overrides: Partial<TurnCallbacks> = {}): TurnCallbacks {
  return {
    onTextDelta: vi.fn(),
    onOpsApplied: vi.fn(),
    onTurnsCommitted: vi.fn(),
    onError: vi.fn(),
    onFinished: vi.fn(),
    ...overrides,
  };
}

export interface FakeHostOptions {
  graph?: SerializedGraph;
  /** Answers for `api.http.fetch`, by path (query included) or by prefix ending in `*`. */
  routes?: Record<string, (init?: RequestInit) => { status?: number; body: unknown }>;
  apiVersion?: number;
  extra?: Record<string, unknown>;
}

export function fakeApi(options: FakeHostOptions = {}): CodefyUIPluginAPI & { fetchLog: Array<{ url: string; init?: RequestInit }> } {
  const graph = options.graph ?? { nodes: [{ id: 'n0', type: 'Conv2d' }], edges: [] };
  const store = new Map<string, string>();
  const fetchLog: Array<{ url: string; init?: RequestInit }> = [];
  const routes = options.routes ?? {};
  const route = (url: string) => routes[url] ?? Object.entries(routes)
    .find(([key]) => key.endsWith('*') && url.startsWith(key.slice(0, -1)))?.[1];
  return {
    apiVersion: options.apiVersion ?? 5,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn(() => graph),
      getNodeDefinitions: vi.fn(() => [{
        node_name: 'Conv2d', category: 'Layer', description: '', inputs: [], outputs: [], params: [],
      }]),
      applyOperations: vi.fn((ops: GraphOp[]): ApplyResult => ({
        results: ops.map((_, index) => ({ index, ok: true })), refs: {}, node_count: 1, edge_count: 0,
      })),
      onGraphChanged: vi.fn(() => () => {}),
    },
    http: {
      fetch: vi.fn(async (url: string, init?: RequestInit) => {
        fetchLog.push({ url, init });
        const handler = route(url);
        if (handler) {
          const { status = 200, body } = handler(init);
          return { ok: status < 400, status, json: async () => body, text: async () => JSON.stringify(body) };
        }
        if (url === '/api/graph/validate') return { ok: true, status: 200, json: async () => ({ valid: true, errors: [] }) };
        return { ok: false, status: 404, json: async () => ({ detail: 'Not Found' }), text: async () => 'Not Found' };
      }),
    },
    storage: {
      get: vi.fn((key: string) => store.get(key) ?? null),
      set: vi.fn((key: string, value: string) => { store.set(key, value); }),
      remove: vi.fn((key: string) => { store.delete(key); }),
    },
    ...options.extra,
    fetchLog,
  } as unknown as CodefyUIPluginAPI & { fetchLog: Array<{ url: string; init?: RequestInit }> };
}
