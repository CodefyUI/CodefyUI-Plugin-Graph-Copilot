import type { ChatBody } from '../src/llm/client';
import type { ChatReply, Scenario } from './scenarios';
import { replyAt } from './scenarios';
import type { SampleGraph } from './graph';
import { validateSampleGraph } from './graph';
import { MOCK_EXECUTION_TOKEN, mockHistoryRow } from './execution';

export interface MockRequest {
  id: number;
  url: string;
  method: string;
  status: 'pending' | 'complete' | 'aborted' | 'blocked';
  tools?: string[];
  messageRoles?: string[];
  toolResultIds?: string[];
}

export interface PendingResponse { id: number; url: string; kind: 'response' | 'stream' }

const encoder = new TextEncoder();
const event = (value: unknown): Uint8Array => encoder.encode(`data: ${JSON.stringify(value)}\n\n`);
const abortError = () => new DOMException('Mock request aborted', 'AbortError');
const json = (value: unknown, status = 200) => new Response(JSON.stringify(value), { status, headers: { 'Content-Type': 'application/json' } });

/** No native fetch, proxy, real key or provider URL exists in this mock. Only
 * explicit fixture routes and bounded read-only run-list queries are accepted. */
export function createMockHttp(scenario: Scenario, manual: boolean, graph: () => SampleGraph, onChange: () => void, runRows: () => Array<{ id: string }> = () => [mockHistoryRow()]) {
  let chatIndex = 0;
  let requestId = 0;
  const requests: MockRequest[] = [];
  const blocked: string[] = [];
  const pending = new Map<number, { descriptor: PendingResponse; release: () => void }>();

  const reject = (request: MockRequest, reason: string): never => {
    request.status = 'blocked';
    blocked.push(reason);
    onChange();
    throw new Error(`Mock host blocked network: ${reason}`);
  };

  const waitForRelease = (request: MockRequest, signal?: AbortSignal | null): Promise<void> => new Promise((resolve, rejectWait) => {
    if (signal?.aborted) { request.status = 'aborted'; onChange(); rejectWait(abortError()); return; }
    const cleanup = () => { pending.delete(request.id); signal?.removeEventListener('abort', abort); };
    const abort = () => { cleanup(); request.status = 'aborted'; onChange(); rejectWait(abortError()); };
    pending.set(request.id, { descriptor: { id: request.id, url: request.url, kind: 'response' }, release: () => { cleanup(); onChange(); resolve(); } });
    signal?.addEventListener('abort', abort, { once: true });
    onChange();
  });

  const stream = (request: MockRequest, reply: ChatReply, signal?: AbortSignal | null): Response => {
    const done = () => event({
      type: 'done',
      message: { role: 'assistant', content: reply.text, tool_calls: reply.tools ?? [] },
      stop_reason: reply.tools?.length ? 'tool_use' : 'end',
      usage: { input_tokens: 64, output_tokens: 32 },
    });
    let cleanup = () => {};
    const body = new ReadableStream<Uint8Array>({
      start(controller) {
        const abort = () => {
          cleanup();
          request.status = 'aborted';
          controller.error(abortError());
          onChange();
        };
        cleanup = () => { pending.delete(request.id); signal?.removeEventListener('abort', abort); };
        if (signal?.aborted) { abort(); return; }
        controller.enqueue(event({ type: 'text_delta', text: reply.text }));
        if (reply.pending) {
          pending.set(request.id, {
            descriptor: { id: request.id, url: request.url, kind: 'stream' },
            release: () => { cleanup(); controller.enqueue(done()); controller.close(); request.status = 'complete'; onChange(); },
          });
          signal?.addEventListener('abort', abort, { once: true });
          onChange();
        } else {
          controller.enqueue(done());
          controller.close();
          request.status = 'complete';
          onChange();
        }
      },
      cancel() { cleanup(); request.status = 'aborted'; onChange(); },
    });
    return new Response(body, { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
  };

  const fetch = async (url: string, init?: RequestInit): Promise<Response> => {
    const request: MockRequest = { id: ++requestId, url, method: (init?.method ?? 'GET').toUpperCase(), status: 'pending' };
    requests.push(request);
    onChange();
    const listMatch = /^\/api\/runs\?limit=([1-9]\d?)$/.exec(url);
    const runMatch = /^\/api\/runs\/(mock-history-run|mock-native-run)(\/artifacts)?$/.exec(url);
    const nativeRead = url === '/api/system/devices' || (url === '/api/auth/bootstrap' && scenario.id === 'native-run');
    const allowed = ['/api/llm/chat', '/api/graph/validate', '/api/llm/models', '/api/llm/codex/status'].includes(url)
      || nativeRead || (listMatch !== null && Number(listMatch[1]) <= 50) || runMatch !== null;
    if (!allowed) return reject(request, `unexpected URL ${url}`);
    const expectedMethod = ['/api/llm/chat', '/api/graph/validate', '/api/llm/models'].includes(url) ? 'POST' : 'GET';
    if (request.method !== expectedMethod) return reject(request, `${url} expected ${expectedMethod}, got ${request.method}`);
    if (init?.signal?.aborted) { request.status = 'aborted'; onChange(); throw abortError(); }

    let parsed: unknown;
    if (expectedMethod === 'POST') {
      try { parsed = JSON.parse(String(init?.body)); } catch { return reject(request, `${url} requires a JSON body`); }
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) return reject(request, `${url} requires a JSON object`);
    }

    if (url === '/api/llm/chat') {
      const body = parsed as ChatBody;
      if (!Array.isArray(body.messages) || typeof body.provider !== 'string' || typeof body.model !== 'string') return reject(request, 'invalid mock chat body');
      request.tools = (body.tools ?? []).map((tool) => tool.name);
      request.messageRoles = body.messages.map((message) => message.role);
      request.toolResultIds = body.messages.filter((message) => message.role === 'tool').map((message) => message.tool_call_id ?? '');
      const reply = replyAt(scenario, chatIndex++);
      if (manual) await waitForRelease(request, init?.signal);
      if (init?.signal?.aborted) { request.status = 'aborted'; onChange(); throw abortError(); }
      if (reply.httpError) { request.status = 'complete'; onChange(); return new Response(reply.text, { status: reply.httpError }); }
      return stream(request, reply, init?.signal);
    }

    if (url === '/api/graph/validate') {
      const payload = parsed as { nodes?: unknown; edges?: unknown };
      if (!Array.isArray(payload.nodes) || !Array.isArray(payload.edges)) return reject(request, 'invalid mock validation body');
      if (manual) await waitForRelease(request, init?.signal);
      const current = graph();
      if (JSON.stringify({ nodes: payload.nodes, edges: payload.edges }) !== JSON.stringify({ nodes: current.nodes, edges: current.edges })) return reject(request, 'validation did not contain the current mock graph');
      request.status = 'complete';
      onChange();
      if (scenario.validation === 'unavailable') return json({ error: 'Mock validator unavailable' }, 503);
      const result = validateSampleGraph(current);
      return json(result);
    }

    request.status = 'complete';
    onChange();
    if (url === '/api/llm/models') {
      const body = parsed as { provider?: unknown; api_key?: unknown; base_url?: unknown };
      if (!['openai', 'anthropic', 'openrouter', 'openai-codex', 'custom'].includes(String(body.provider))) return reject(request, 'invalid mock model provider');
      return json({
        source: 'live', capabilities: { reasoning_effort: true, rich_model_catalog: true },
        models: [
          { id: 'mock-graph-model', label: 'Mock graph model', description: 'In-memory scripted model; no provider network.', default_reasoning_effort: 'medium', supported_reasoning_efforts: ['low', 'medium', 'high'] },
          { id: 'mock-small-model', label: 'Mock small model', supported_reasoning_efforts: ['low', 'medium'] },
        ],
      });
    }
    if (url === '/api/llm/codex/status') return json({ status: 'logged_out' });
    if (url === '/api/system/devices') return json({ default: 'cpu', devices: ['cpu'] });
    if (url === '/api/auth/bootstrap') return json({ token: MOCK_EXECUTION_TOKEN });
    if (listMatch) {
      const rows = runRows();
      return json({ runs: rows.slice(0, Number(listMatch[1])), total: rows.length });
    }
    if (runMatch) {
      const row = runRows().find((candidate) => candidate.id === runMatch[1]);
      if (!row) return json({ error: 'Mock run not found' }, 404);
      return json(runMatch[2] ? { artifacts: [] } : row);
    }
    return reject(request, `unhandled mock URL ${url}`);
  };

  return {
    fetch,
    releaseNext() { const first = pending.values().next().value; if (!first) return false; first.release(); return true; },
    recordBlocked(reason: string) { blocked.push(reason); onChange(); },
    inspect: () => ({ requests: structuredClone(requests), blocked: [...blocked], pending: [...pending.values()].map((value) => ({ ...value.descriptor })) }),
  };
}
