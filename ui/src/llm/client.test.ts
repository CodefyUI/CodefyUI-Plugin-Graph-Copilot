/**
 * Tests for ui/src/llm/client.ts
 *
 * Fake api object with vi.fn() for http.fetch; ReadableStream body for SSE.
 * Node 22 + jsdom support Response/ReadableStream natively.
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  streamChat,
  fetchModelCatalog,
  fetchModels,
  codexLogin,
  codexStatus,
  codexLogout,
} from './client';
import type { ChatBody, StreamHandlers, DoneEvent, WireMessage } from './client';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const encoder = new TextEncoder();

function sseChunk(events: string[]): Uint8Array {
  return encoder.encode(events.join(''));
}

function makeTextDelta(text: string): string {
  return `data: ${JSON.stringify({ type: 'text_delta', text })}\n\n`;
}

function makeDone(toolCalls: DoneEvent['message']['tool_calls'] = []): string {
  const done: DoneEvent = {
    message: { role: 'assistant', content: '', tool_calls: toolCalls },
    stop_reason: toolCalls.length > 0 ? 'tool_use' : 'end',
    usage: { input_tokens: 10, output_tokens: 20 },
  };
  return `data: ${JSON.stringify({ type: 'done', ...done })}\n\n`;
}

function makeError(message: string): string {
  return `data: ${JSON.stringify({ type: 'error', message })}\n\n`;
}

/** Build a streaming Response from an array of chunks (each chunk is a Uint8Array). */
function makeStreamResponse(chunks: Uint8Array[]): Response {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      for (const chunk of chunks) controller.enqueue(chunk);
      controller.close();
    },
  });
  // Cast as Response — streamChat only touches ok/status/body/text
  return { ok: true, status: 200, body: stream } as unknown as Response;
}

function makeErrorResponse(status: number, body: string): Response {
  return {
    ok: false,
    status,
    text: async () => body,
  } as unknown as Response;
}

function inMemoryStorage() {
  const store: Record<string, string> = {};
  return {
    get: (k: string) => store[k] ?? null,
    set: (k: string, v: string) => { store[k] = v; },
    remove: (k: string) => { delete store[k]; },
  };
}

function makeApi(fetchImpl: ReturnType<typeof vi.fn>) {
  return {
    http: { fetch: fetchImpl },
    storage: inMemoryStorage(),
  };
}

const BASE_BODY: ChatBody = {
  provider: 'openai',
  model: 'gpt-4o',
  messages: [{ role: 'user', content: 'hello' }],
};

// ---------------------------------------------------------------------------
// streamChat tests
// ---------------------------------------------------------------------------

describe('streamChat', () => {
  let handlers: { onText: ReturnType<typeof vi.fn>; onDone: ReturnType<typeof vi.fn>; onError: ReturnType<typeof vi.fn> };

  beforeEach(() => {
    handlers = {
      onText: vi.fn(),
      onDone: vi.fn(),
      onError: vi.fn(),
    };
  });

  it('dispatches text deltas in order', async () => {
    const chunks = [
      sseChunk([makeTextDelta('hello '), makeTextDelta('world')]),
      sseChunk([makeDone()]),
    ];
    const fetchMock = vi.fn().mockResolvedValue(makeStreamResponse(chunks));
    const api = makeApi(fetchMock);

    await streamChat(api as any, BASE_BODY, handlers);

    expect(handlers.onText).toHaveBeenCalledTimes(2);
    expect(handlers.onText).toHaveBeenNthCalledWith(1, 'hello ');
    expect(handlers.onText).toHaveBeenNthCalledWith(2, 'world');
    expect(handlers.onDone).toHaveBeenCalledTimes(1);
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('parses done event with tool_calls', async () => {
    const toolCalls = [
      { id: 'tc1', name: 'apply_graph_operations', arguments: { operations: [] } },
    ];
    const chunks = [sseChunk([makeDone(toolCalls)])];
    const fetchMock = vi.fn().mockResolvedValue(makeStreamResponse(chunks));
    const api = makeApi(fetchMock);

    await streamChat(api as any, BASE_BODY, handlers);

    expect(handlers.onDone).toHaveBeenCalledTimes(1);
    const doneArg: DoneEvent = handlers.onDone.mock.calls[0][0];
    expect(doneArg.message.tool_calls).toEqual(toolCalls);
    expect(doneArg.stop_reason).toBe('tool_use');
  });

  it('error event is terminal — stops reading and calls onError', async () => {
    const chunks = [
      sseChunk([
        makeTextDelta('partial'),
        makeError('provider quota exceeded'),
        makeTextDelta('should not appear'),
      ]),
    ];
    const fetchMock = vi.fn().mockResolvedValue(makeStreamResponse(chunks));
    const api = makeApi(fetchMock);

    await streamChat(api as any, BASE_BODY, handlers);

    expect(handlers.onError).toHaveBeenCalledWith(expect.stringContaining('provider quota exceeded'));
    // onText before the error is fine; after is not
    const textCalls: string[] = handlers.onText.mock.calls.map((c: any[]) => c[0] as string);
    expect(textCalls).not.toContain('should not appear');
    expect(handlers.onDone).not.toHaveBeenCalled();
  });

  it('reassembles events split across chunk boundaries', async () => {
    // Split a single SSE event across two chunks
    const fullEvent = makeTextDelta('assembled');
    const half = Math.floor(encoder.encode(fullEvent).length / 2);
    const fullBytes = encoder.encode(fullEvent);
    const part1 = fullBytes.slice(0, half);
    const part2 = fullBytes.slice(half);

    const chunks = [part1, part2, sseChunk([makeDone()])];
    const fetchMock = vi.fn().mockResolvedValue(makeStreamResponse(chunks));
    const api = makeApi(fetchMock);

    await streamChat(api as any, BASE_BODY, handlers);

    expect(handlers.onText).toHaveBeenCalledWith('assembled');
    expect(handlers.onDone).toHaveBeenCalledTimes(1);
  });

  it('HTTP 400 calls onError with status info', async () => {
    const fetchMock = vi.fn().mockResolvedValue(makeErrorResponse(400, 'Bad request: invalid model'));
    const api = makeApi(fetchMock);

    await streamChat(api as any, BASE_BODY, handlers);

    expect(handlers.onError).toHaveBeenCalledWith(expect.stringContaining('400'));
    expect(handlers.onDone).not.toHaveBeenCalled();
  });

  it('handles CRLF-delimited SSE events incrementally', async () => {
    // Build CRLF variants of the events
    const crlfTextDelta = (text: string) =>
      `data: ${JSON.stringify({ type: 'text_delta', text })}\r\n\r\n`;
    const crlfDone = () => {
      const done: DoneEvent = {
        message: { role: 'assistant', content: '', tool_calls: [] },
        stop_reason: 'end',
        usage: {},
      };
      return `data: ${JSON.stringify({ type: 'done', ...done })}\r\n\r\n`;
    };

    // Three events in two chunks to verify incremental dispatch during reading
    const chunk1 = encoder.encode(crlfTextDelta('alpha') + crlfTextDelta('beta'));
    const chunk2 = encoder.encode(crlfTextDelta('gamma') + crlfDone());

    const fetchMock = vi.fn().mockResolvedValue(makeStreamResponse([chunk1, chunk2]));
    const api = makeApi(fetchMock);

    // Track call counts after each chunk by using real call tracking
    await streamChat(api as any, BASE_BODY, handlers);

    // All three text deltas must have fired
    expect(handlers.onText).toHaveBeenCalledTimes(3);
    expect(handlers.onText).toHaveBeenNthCalledWith(1, 'alpha');
    expect(handlers.onText).toHaveBeenNthCalledWith(2, 'beta');
    expect(handlers.onText).toHaveBeenNthCalledWith(3, 'gamma');
    expect(handlers.onDone).toHaveBeenCalledTimes(1);
    expect(handlers.onError).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// fetchModels tests
// ---------------------------------------------------------------------------

describe('fetchModels', () => {
  it('returns model id list on success', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ models: [{ id: 'gpt-4o' }, { id: 'gpt-3.5-turbo' }] }),
    } as unknown as Response);
    const api = makeApi(fetchMock);

    const models = await fetchModels(api as any, 'openai', 'sk-test');

    expect(models).toEqual(['gpt-4o', 'gpt-3.5-turbo']);
    expect(fetchMock).toHaveBeenCalledWith(
      '/api/llm/models',
      expect.objectContaining({ method: 'POST' }),
    );
  });

  it('throws on non-OK response', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      text: async () => 'Unauthorized',
    } as unknown as Response);
    const api = makeApi(fetchMock);

    await expect(fetchModels(api as any, 'openai', 'bad-key')).rejects.toThrow('401');
  });

  it('preserves rich model metadata returned by a newer host', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        models: [{
          id: 'gpt-rich',
          label: 'GPT Rich',
          reasoning_efforts: ['low', 'max', 'ultra'],
        }],
      }),
    } as unknown as Response);

    await expect(fetchModelCatalog(makeApi(fetchMock) as any, 'openai', 'sk-test')).resolves.toEqual({
      models: [{
        id: 'gpt-rich',
        label: 'GPT Rich',
        reasoningEfforts: [{ effort: 'low' }, { effort: 'max' }],
      }],
      capabilities: { reasoningEffort: false, richModelCatalog: false },
    });
  });

  it('negotiates reasoning effort only when the host explicitly advertises it', async () => {
    const response = (capabilities?: unknown) => ({
      ok: true,
      status: 200,
      json: async () => ({ models: [{ id: 'gpt-rich' }], capabilities }),
    } as unknown as Response);

    await expect(fetchModelCatalog(makeApi(vi.fn().mockResolvedValue(response())) as any, 'openai'))
      .resolves.toMatchObject({
        capabilities: { reasoningEffort: false, richModelCatalog: false },
      });
    await expect(fetchModelCatalog(makeApi(vi.fn().mockResolvedValue(response({
      reasoning_effort: true,
      rich_model_catalog: true,
    }))) as any, 'openai')).resolves.toMatchObject({
      capabilities: { reasoningEffort: true, richModelCatalog: true },
    });
  });

  it('treats a malformed top-level model response as an empty legacy catalog', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => null,
    } as unknown as Response);

    await expect(fetchModelCatalog(makeApi(fetchMock) as any, 'openai')).resolves.toEqual({
      models: [],
      capabilities: { reasoningEffort: false, richModelCatalog: false },
    });
  });
});

// ---------------------------------------------------------------------------
// Codex endpoint tests
// ---------------------------------------------------------------------------

describe('codex endpoints', () => {
  it('codexLogin returns auth_url', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ auth_url: 'https://example.com/oauth' }),
    } as unknown as Response);
    const api = makeApi(fetchMock);

    const url = await codexLogin(api as any);
    expect(url).toBe('https://example.com/oauth');
    expect(fetchMock).toHaveBeenCalledWith('/api/llm/codex/login', expect.objectContaining({ method: 'POST' }));
  });

  it('codexStatus returns status object', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ status: 'signed_in', email: 'user@example.com' }),
    } as unknown as Response);
    const api = makeApi(fetchMock);

    const result = await codexStatus(api as any);
    expect(result).toEqual({ status: 'signed_in', email: 'user@example.com' });
    expect(fetchMock).toHaveBeenCalledWith('/api/llm/codex/status', undefined);
  });

  it('codexLogout calls the logout endpoint', async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({}),
    } as unknown as Response);
    const api = makeApi(fetchMock);

    await codexLogout(api as any);
    expect(fetchMock).toHaveBeenCalledWith('/api/llm/codex/logout', expect.objectContaining({ method: 'POST' }));
  });
});
