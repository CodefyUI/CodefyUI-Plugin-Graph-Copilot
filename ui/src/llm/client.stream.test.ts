import { afterEach, describe, expect, it, vi } from 'vitest';
import { streamChat } from './client';
import type { ChatBody, DoneEvent, StreamHandlers, WireToolCall } from './client';
import type { CodefyUIPluginAPI } from '../types/codefyui';

type HttpApi = Pick<CodefyUIPluginAPI, 'http'>;
type Reader = ReadableStreamDefaultReader<Uint8Array>;
type ReadResult = ReadableStreamReadResult<Uint8Array>;

const encoder = new TextEncoder();
const body: ChatBody = {
  provider: 'openai',
  model: 'fixture-model',
  messages: [{ role: 'user', content: 'hello' }],
};

function done(toolCalls: WireToolCall[] = []): DoneEvent {
  return {
    message: { role: 'assistant', content: '', tool_calls: toolCalls },
    stop_reason: toolCalls.length ? 'tool_use' : 'end',
    usage: {},
  };
}

function frame(event: unknown, newline = '\n'): string {
  return `data: ${JSON.stringify(event)}${newline}${newline}`;
}

function doneFrame(toolCalls: WireToolCall[] = []): string {
  return frame({ type: 'done', ...done(toolCalls) });
}

function textFrame(text: string): string {
  return frame({ type: 'text_delta', text });
}

function chunk(value: string | Uint8Array): ReadResult {
  return { done: false, value: typeof value === 'string' ? encoder.encode(value) : value };
}

function deferred<T>() {
  let resolve!: (value: T | PromiseLike<T>) => void;
  let reject!: (reason?: unknown) => void;
  const promise = new Promise<T>((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function observers() {
  return {
    onText: vi.fn<StreamHandlers['onText']>(),
    onDone: vi.fn<StreamHandlers['onDone']>(),
    onError: vi.fn<StreamHandlers['onError']>(),
  };
}

/** Deliberately ignores AbortSignal so cancellation cannot rely on native fetch. */
function transport(chunks: (string | Uint8Array)[] = []) {
  let index = 0;
  const reader = {
    read: vi.fn<Reader['read']>().mockImplementation(async () => (
      index < chunks.length ? chunk(chunks[index++]) : { done: true, value: undefined }
    )),
    cancel: vi.fn<Reader['cancel']>().mockResolvedValue(undefined),
    releaseLock: vi.fn<Reader['releaseLock']>(),
  };
  const stream = {
    getReader: vi.fn().mockReturnValue(reader),
    cancel: vi.fn<ReadableStream<Uint8Array>['cancel']>().mockResolvedValue(undefined),
  };
  const response = { ok: true, status: 200, body: stream } as unknown as Response;
  const fetch = vi.fn<HttpApi['http']['fetch']>().mockResolvedValue(response);
  const api: HttpApi = { http: { fetch } };
  return { api, fetch, response, reader, stream };
}

type Outcome = { status: 'fulfilled' } | { status: 'rejected'; error: unknown } | { status: 'pending' };

/** A hung mock must fail quickly, rather than exhaust Vitest's test timeout. */
async function settlePromptly(promise: Promise<void>): Promise<Outcome> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    return await Promise.race([
      promise.then<Outcome, Outcome>(
        () => ({ status: 'fulfilled' }),
        (error: unknown) => ({ status: 'rejected', error }),
      ),
      new Promise<Outcome>((resolve) => {
        timer = setTimeout(() => resolve({ status: 'pending' }), 100);
      }),
    ]);
  } finally {
    clearTimeout(timer);
  }
}

function expectAbort(outcome: Outcome) {
  expect(outcome).toEqual({
    status: 'rejected',
    error: expect.objectContaining({ name: 'AbortError' }),
  });
}

function trackListeners(signal: AbortSignal) {
  const added = vi.spyOn(signal, 'addEventListener');
  const removed = vi.spyOn(signal, 'removeEventListener');
  return () => {
    const adds = added.mock.calls.filter(([name]) => name === 'abort');
    const removes = removed.mock.calls.filter(([name]) => name === 'abort');
    expect(removes.map(([, listener]) => listener)).toEqual(adds.map(([, listener]) => listener));
  };
}

afterEach(() => {
  vi.restoreAllMocks();
});

describe('streamChat framing and terminal events', () => {
  it.each(['\n', '\r\n', '\r'])('decodes split UTF-8 and delimiters one byte at a time (%j)', async (newline) => {
    const text = '你好 🌳 café é';
    const bytes = encoder.encode(
      frame({ type: 'text_delta', text }, newline) + frame({ type: 'done', ...done() }, newline),
    );
    const fixture = transport(Array.from(bytes, (byte) => new Uint8Array([byte])));
    const handlers = observers();

    await streamChat(fixture.api, body, handlers);

    expect(handlers.onText).toHaveBeenCalledExactlyOnceWith(text);
    expect(handlers.onDone).toHaveBeenCalledExactlyOnceWith(done());
    expect(handlers.onError).not.toHaveBeenCalled();
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
  });

  it('can stop at the bare CR line ending of a split CRLF without waiting for the following LF', async () => {
    const fixture = transport([
      `data: ${JSON.stringify({ type: 'done', ...done() })}\r`,
      '\n',
      '\r',
      '\n',
    ]);
    const originalRead = fixture.reader.read.getMockImplementation()!;
    fixture.reader.read.mockImplementation(() => fixture.reader.read.mock.calls.length <= 4
      ? originalRead()
      : new Promise<ReadResult>(() => {}));
    const handlers = observers();
    expect(await settlePromptly(streamChat(fixture.api, body, handlers))).toEqual({ status: 'fulfilled' });
    expect(handlers.onDone).toHaveBeenCalledExactlyOnceWith(done());
    expect(handlers.onError).not.toHaveBeenCalled();
    expect(fixture.reader.read).toHaveBeenCalledTimes(3);
  });

  it('joins multi-line data, accepts data without a space, and ignores comments and metadata', async () => {
    const fixture = transport([
      ': keepalive\r\nretry: 1000\r\nid: ignored\r\nother-field: ignored\r\n' +
      'event: message\r\ndata:{"type":"text_delta",\r\ndata: "text":"multi-line"}\r\n\r\n' +
      doneFrame(),
    ]);
    const handlers = observers();

    await streamChat(fixture.api, body, handlers);

    expect(handlers.onText).toHaveBeenCalledExactlyOnceWith('multi-line');
    expect(handlers.onDone).toHaveBeenCalledOnce();
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('waits for the blank line before dispatching an event', async () => {
    const fixture = transport();
    const next = deferred<ReadResult>();
    const waiting = deferred<void>();
    fixture.reader.read
      .mockResolvedValueOnce(chunk('data: {"type":"text_delta","text":"framed"}\r'))
      .mockImplementationOnce(() => { waiting.resolve(); return next.promise; });
    const handlers = observers();
    const run = streamChat(fixture.api, body, handlers);
    await waiting.promise;
    expect(handlers.onText).not.toHaveBeenCalled();
    next.resolve(chunk('\n\r\n' + doneFrame()));
    await run;
    expect(handlers.onText).toHaveBeenCalledExactlyOnceWith('framed');
    expect(handlers.onDone).toHaveBeenCalledOnce();
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('ignores unknown JSON event types and named SSE events without executing their data', async () => {
    const fixture = transport([
      ': comment\n\n' +
      frame({ type: 'usage_delta', extra: true }) +
      'event: heartbeat\ndata: not JSON, but not a subscribed event\n\n' +
      doneFrame(),
    ]);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onDone).toHaveBeenCalledOnce();
    expect(handlers.onText).not.toHaveBeenCalled();
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it.each(['done', 'error'] as const)('%s is terminal even with extra events in this and later chunks', async (terminal) => {
    const first = terminal === 'done' ? doneFrame() : frame({ type: 'error', message: 'quota exhausted' });
    const fixture = transport([
      textFrame('partial') + first + textFrame('late') + doneFrame() + 'data: {broken}\n\n',
      textFrame('later chunk') + doneFrame(),
    ]);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onText).toHaveBeenCalledExactlyOnceWith('partial');
    expect(handlers.onDone).toHaveBeenCalledTimes(terminal === 'done' ? 1 : 0);
    expect(handlers.onError).toHaveBeenCalledTimes(terminal === 'error' ? 1 : 0);
    expect(fixture.reader.read).toHaveBeenCalledOnce();
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
  });

  it.each(['done', 'error'] as const)('does not decode corrupt trailing bytes after a terminal %s frame', async (terminal) => {
    const first = encoder.encode(terminal === 'done' ? doneFrame() : frame({ type: 'error', message: 'quota exhausted' }));
    const bytes = new Uint8Array(first.length + 1);
    bytes.set(first);
    bytes[first.length] = 0xff;
    const fixture = transport([bytes]);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onDone).toHaveBeenCalledTimes(terminal === 'done' ? 1 : 0);
    expect(handlers.onError).toHaveBeenCalledTimes(terminal === 'error' ? 1 : 0);
    if (terminal === 'error') expect(handlers.onError).toHaveBeenCalledWith('quota exhausted');
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
  });

  it('cancels and unlocks an actual stream which stays open after done', async () => {
    const cancel = vi.fn();
    const stream = new ReadableStream<Uint8Array>({
      start(controller) { controller.enqueue(encoder.encode(doneFrame())); },
      cancel,
    });
    const api: HttpApi = { http: { fetch: vi.fn().mockResolvedValue(new Response(stream)) } };
    const handlers = observers();
    const result = await settlePromptly(streamChat(api, body, handlers));
    expect(result).toEqual({ status: 'fulfilled' });
    expect(cancel).toHaveBeenCalledOnce();
    expect(stream.locked).toBe(false);
    expect(handlers.onDone).toHaveBeenCalledOnce();
  });

  it.each(['', textFrame('partial'), 'data: [DONE]\n\n'])('reports incomplete EOF without authoritative done (%j)', async (data) => {
    const fixture = transport(data ? [data] : []);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onDone).not.toHaveBeenCalled();
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(expect.stringMatching(/incomplete|ended.*done/i));
    expect(handlers.onText).toHaveBeenCalledTimes(data === textFrame('partial') ? 1 : 0);
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
  });

  it.each(['', '\n'])('does not accept an unterminated done frame at EOF (trailing %j)', async (ending) => {
    const fixture = transport([`data: ${JSON.stringify({ type: 'done', ...done() })}${ending}`]);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onDone).not.toHaveBeenCalled();
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(expect.stringMatching(/incomplete|ended.*done/i));
  });

  it.each([
    ['invalid leading byte', new Uint8Array([0xff])],
    ['truncated UTF-8 character at EOF', new Uint8Array([0xf0, 0x9f])],
  ])('rejects %s instead of substituting characters in tool data', async (_label, bytes) => {
    const fixture = transport([bytes]);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onDone).not.toHaveBeenCalled();
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(expect.stringMatching(/UTF-8/i));
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
  });

  it('keeps independent UTF-8 and framing state for concurrent streams', async () => {
    const slow = transport();
    const pending = deferred<ReadResult>();
    const waiting = deferred<void>();
    const bytes = encoder.encode(textFrame('你好'));
    const split = bytes.indexOf(0xe4) + 1;
    slow.reader.read
      .mockResolvedValueOnce(chunk(bytes.slice(0, split)))
      .mockImplementationOnce(() => { waiting.resolve(); return pending.promise; })
      .mockResolvedValueOnce(chunk(doneFrame()));
    const first = observers();
    const firstRun = streamChat(slow.api, body, first);
    await waiting.promise;
    const fast = transport([textFrame('second') + doneFrame()]);
    const second = observers();
    await streamChat(fast.api, body, second);
    pending.resolve(chunk(bytes.slice(split)));
    await firstRun;
    expect(first.onText).toHaveBeenCalledExactlyOnceWith('你好');
    expect(second.onText).toHaveBeenCalledExactlyOnceWith('second');
    expect(first.onError).not.toHaveBeenCalled();
    expect(second.onError).not.toHaveBeenCalled();
  });

  it('reports missing response bodies with retry/proxy guidance', async () => {
    const fixture = transport();
    fixture.fetch.mockResolvedValue({ ok: true, status: 200, body: null } as Response);
    const handlers = observers();
    await expect(streamChat(fixture.api, body, handlers)).resolves.toBeUndefined();
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(expect.stringMatching(/body.*(retry|proxy)|(?:retry|proxy).*body/i));
    expect(handlers.onDone).not.toHaveBeenCalled();
  });
});

describe('streamChat validates untrusted payloads before exposing tool calls', () => {
  async function expectInvalid(payload: unknown, field: RegExp) {
    const fixture = transport([frame(payload) + doneFrame()]);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onText).not.toHaveBeenCalled();
    expect(handlers.onDone).not.toHaveBeenCalled();
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(expect.stringMatching(field));
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
  }

  it('reports malformed JSON once without including raw data or dispatching later tools', async () => {
    const fixture = transport(['data: {"secret":"do-not-echo",broken}\n\n' + doneFrame()]);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(expect.stringMatching(/malformed.*JSON|invalid.*JSON/i));
    expect(handlers.onError.mock.calls[0][0]).not.toContain('do-not-echo');
    expect(handlers.onDone).not.toHaveBeenCalled();
  });

  it.each([null, [], 'text', 42, {}, { type: null }])('rejects invalid event envelopes (%j)', async (payload) => {
    await expectInvalid(payload, /event|object|type/i);
  });

  it.each([undefined, null, 1, [], {}])('rejects non-string text deltas (%j)', async (text) => {
    await expectInvalid({ type: 'text_delta', text }, /text/i);
  });

  it.each([undefined, null, [], 'assistant'])('rejects malformed done messages (%j)', async (message) => {
    await expectInvalid({ type: 'done', ...done(), message }, /message/i);
  });

  it.each([undefined, null, 42, [], {}])('rejects non-string done content (%j)', async (content) => {
    await expectInvalid({ type: 'done', ...done(), message: { ...done().message, content } }, /content/i);
  });

  it.each([undefined, null, 'tool', 'user'])('requires an assistant done message (%j)', async (role) => {
    await expectInvalid({ type: 'done', ...done(), message: { ...done().message, role } }, /role|assistant/i);
  });

  it.each([undefined, null, 'length', '', 1])('rejects illegal stop reasons (%j)', async (stop_reason) => {
    await expectInvalid({ type: 'done', ...done(), stop_reason }, /stop_reason/i);
  });

  it.each([null, {}, '[]', 42])('rejects tool_calls which are not arrays (%j)', async (tool_calls) => {
    await expectInvalid({ type: 'done', ...done(), message: { ...done().message, tool_calls } }, /tool_calls/i);
  });

  const validCall: WireToolCall = { id: 'call-1', name: 'apply_graph_operations', arguments: {} };
  const badCalls: [string, unknown, RegExp][] = [
    ['null call', null, /tool|object/i],
    ['array call', [], /tool|object/i],
    ['missing id', { name: validCall.name, arguments: {} }, /id/i],
    ['empty id', { ...validCall, id: '' }, /id/i],
    ['blank id', { ...validCall, id: ' \t' }, /id/i],
    ['non-string id', { ...validCall, id: 8 }, /id/i],
    ['null id', { ...validCall, id: null }, /id/i],
    ['missing name', { id: validCall.id, arguments: {} }, /name/i],
    ['empty name', { ...validCall, name: '' }, /name/i],
    ['blank name', { ...validCall, name: '\n ' }, /name/i],
    ['non-string name', { ...validCall, name: 8 }, /name/i],
    ['missing arguments', { id: validCall.id, name: validCall.name }, /arguments/i],
    ['stringified arguments', { ...validCall, arguments: '{"operations":[]}' }, /arguments/i],
    ['array arguments', { ...validCall, arguments: [] }, /arguments/i],
    ['null arguments', { ...validCall, arguments: null }, /arguments/i],
    ['primitive arguments', { ...validCall, arguments: 5 }, /arguments/i],
  ];

  it.each(badCalls)('fails closed on %s', async (_label, call, field) => {
    await expectInvalid({ type: 'done', ...done(), message: { ...done().message, tool_calls: [call] } }, field);
  });

  it('rejects duplicate tool IDs without exposing even the first valid call', async () => {
    await expectInvalid({ type: 'done', ...done([validCall, { ...validCall, name: 'clear_graph' }]) }, /duplicate|unique/i);
  });

  it('validates every tool in a batch before onDone', async () => {
    await expectInvalid({
      type: 'done',
      ...done(),
      stop_reason: 'tool_use',
      message: { ...done().message, tool_calls: [validCall, { ...validCall, id: 'call-2', arguments: null }] },
    }, /arguments/i);
  });

  it('allows distinct IDs for repeated calls to the same tool and preserves object arguments', async () => {
    const calls = [validCall, { ...validCall, id: 'call-2', arguments: { operations: [], nested: { flag: true } } }];
    const fixture = transport([doneFrame(calls)]);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onDone).toHaveBeenCalledExactlyOnceWith(done(calls));
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('keeps zero-tools done compatible, defaulting omitted tool_calls and usage', async () => {
    const fixture = transport([frame({
      type: 'done',
      message: { role: 'assistant', content: 'answer' },
      stop_reason: 'end',
    })]);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onDone).toHaveBeenCalledExactlyOnceWith({
      message: { role: 'assistant', content: 'answer', tool_calls: [] },
      stop_reason: 'end',
      usage: {},
    });
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it.each([null, [], { input_tokens: 'ten' }, { output_tokens: Infinity }])('rejects malformed usage when supplied (%j)', async (usage) => {
    await expectInvalid({ type: 'done', ...done(), usage }, /usage/i);
  });

  it('validates error messages and retains the fallback for omitted messages', async () => {
    await expectInvalid({ type: 'error', message: { unsafe: true } }, /message/i);
    const fixture = transport([frame({ type: 'error' })]);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith('Unknown error from LLM proxy');
  });
});

describe('streamChat aborts promptly and never emits late observer callbacks', () => {
  it('rejects pre-abort without fetching or notifying observers', async () => {
    const fixture = transport([doneFrame()]);
    const controller = new AbortController();
    controller.abort('custom cancellation reason');
    const handlers = observers();
    const balanced = trackListeners(controller.signal);
    expectAbort(await settlePromptly(streamChat(fixture.api, body, handlers, controller.signal)));
    expect(fixture.fetch).not.toHaveBeenCalled();
    expect(handlers.onError).not.toHaveBeenCalled();
    expect(handlers.onDone).not.toHaveBeenCalled();
    balanced();
  });

  it.each(['fetch', 'read'] as const)('propagates native AbortError from %s even without an explicit signal', async (at) => {
    const fixture = transport();
    const error = new DOMException('aborted by transport', 'AbortError');
    if (at === 'fetch') fixture.fetch.mockRejectedValue(error);
    else fixture.reader.read.mockRejectedValue(error);
    const handlers = observers();
    expectAbort(await settlePromptly(streamChat(fixture.api, body, handlers)));
    expect(handlers.onError).not.toHaveBeenCalled();
    expect(handlers.onDone).not.toHaveBeenCalled();
    if (at === 'read') {
      expect(fixture.reader.cancel).toHaveBeenCalledOnce();
      expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
    }
  });

  it('settles an ignored fetch abort and cancels a late response without reading or notifying', async () => {
    const fixture = transport([doneFrame()]);
    const pending = deferred<Response>();
    fixture.fetch.mockReturnValue(pending.promise);
    const controller = new AbortController();
    const balanced = trackListeners(controller.signal);
    const handlers = observers();
    const run = streamChat(fixture.api, body, handlers, controller.signal);
    controller.abort(new Error('reason need not be an AbortError'));
    const outcome = await settlePromptly(run);
    pending.resolve(fixture.response);
    await pending.promise;
    await run.catch(() => undefined);
    expectAbort(outcome);
    expect(fixture.stream.cancel).toHaveBeenCalledOnce();
    expect(fixture.stream.getReader).not.toHaveBeenCalled();
    expect(handlers.onDone).not.toHaveBeenCalled();
    expect(handlers.onText).not.toHaveBeenCalled();
    expect(handlers.onError).not.toHaveBeenCalled();
    balanced();
  });

  it('settles an ignored read abort, releases immediately, and discards a late done', async () => {
    const fixture = transport();
    const pending = deferred<ReadResult>();
    const waiting = deferred<void>();
    fixture.reader.read.mockImplementationOnce(() => { waiting.resolve(); return pending.promise; });
    fixture.reader.cancel.mockReturnValue(new Promise<void>(() => {}));
    const controller = new AbortController();
    const balanced = trackListeners(controller.signal);
    const handlers = observers();
    const run = streamChat(fixture.api, body, handlers, controller.signal);
    await waiting.promise;
    controller.abort();
    const outcome = await settlePromptly(run);
    const cancelledBeforeLateRead = fixture.reader.cancel.mock.calls.length;
    const releasedBeforeLateRead = fixture.reader.releaseLock.mock.calls.length;
    pending.resolve(chunk(doneFrame()));
    await pending.promise;
    await run.catch(() => undefined);
    expectAbort(outcome);
    expect(cancelledBeforeLateRead).toBe(1);
    expect(releasedBeforeLateRead).toBe(1);
    expect(handlers.onDone).not.toHaveBeenCalled();
    expect(handlers.onError).not.toHaveBeenCalled();
    balanced();
  });

  it('propagates a synchronous read AbortError without invoking onError', async () => {
    const fixture = transport();
    fixture.reader.read.mockImplementation(() => { throw new DOMException('aborted', 'AbortError'); });
    const controller = new AbortController();
    const balanced = trackListeners(controller.signal);
    const handlers = observers();
    expectAbort(await settlePromptly(streamChat(fixture.api, body, handlers, controller.signal)));
    expect(handlers.onError).not.toHaveBeenCalled();
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
    balanced();
  });

  it('treats fetch rejection as cancellation when the transport uses a different abort reason', async () => {
    const fixture = transport();
    const controller = new AbortController();
    fixture.fetch.mockImplementation(async () => {
      controller.abort('Stop');
      throw new TypeError('custom fetch rejection');
    });
    const handlers = observers();
    expectAbort(await settlePromptly(streamChat(fixture.api, body, handlers, controller.signal)));
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('discards and cancels a response already resolved when fetch is aborted before its continuation', async () => {
    const fixture = transport([doneFrame()]);
    const controller = new AbortController();
    fixture.fetch.mockImplementation(async () => {
      controller.abort();
      return fixture.response;
    });
    const handlers = observers();
    expectAbort(await settlePromptly(streamChat(fixture.api, body, handlers, controller.signal)));
    expect(fixture.stream.cancel).toHaveBeenCalledOnce();
    expect(fixture.stream.getReader).not.toHaveBeenCalled();
    expect(handlers.onDone).not.toHaveBeenCalled();
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('handles late fetch rejection after cancellation without an unhandled error or onError', async () => {
    const fixture = transport();
    const pending = deferred<Response>();
    fixture.fetch.mockReturnValue(pending.promise);
    const controller = new AbortController();
    const handlers = observers();
    const run = streamChat(fixture.api, body, handlers, controller.signal);
    controller.abort();
    const outcome = await settlePromptly(run);
    pending.reject(new Error('late socket failure'));
    await run.catch(() => undefined);
    expectAbort(outcome);
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('checks cancellation after read resolves but before dispatching buffered events', async () => {
    const fixture = transport();
    const controller = new AbortController();
    fixture.reader.read.mockImplementationOnce(async () => {
      controller.abort();
      return chunk(textFrame('too late') + doneFrame());
    });
    const handlers = observers();
    expectAbort(await settlePromptly(streamChat(fixture.api, body, handlers, controller.signal)));
    expect(handlers.onText).not.toHaveBeenCalled();
    expect(handlers.onDone).not.toHaveBeenCalled();
    expect(handlers.onError).not.toHaveBeenCalled();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
  });

  it('checks cancellation between callbacks from the same chunk', async () => {
    const fixture = transport([textFrame('partial') + textFrame('late') + doneFrame()]);
    const controller = new AbortController();
    const handlers = observers();
    handlers.onText.mockImplementation(() => controller.abort());
    expectAbort(await settlePromptly(streamChat(fixture.api, body, handlers, controller.signal)));
    expect(handlers.onText).toHaveBeenCalledExactlyOnceWith('partial');
    expect(handlers.onDone).not.toHaveBeenCalled();
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it.each(['synchronous', 'microtask'] as const)('rejects abort after done before caller tool dispatch (%s)', async (when) => {
    const fixture = transport([doneFrame([{ id: 'write-1', name: 'apply_graph_operations', arguments: {} }])]);
    const controller = new AbortController();
    const handlers = observers();
    const dispatch = vi.fn();
    handlers.onDone.mockImplementation(() => {
      if (when === 'synchronous') controller.abort();
      else queueMicrotask(() => controller.abort());
    });
    const run = streamChat(fixture.api, body, handlers, controller.signal).then(() => { dispatch(); });
    expectAbort(await settlePromptly(run));
    expect(dispatch).not.toHaveBeenCalled();
    expect(handlers.onDone).toHaveBeenCalledOnce();
    expect(handlers.onError).not.toHaveBeenCalled();
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
  });

  it('observes cancellation raised during terminal reader cleanup', async () => {
    const fixture = transport([doneFrame()]);
    const controller = new AbortController();
    fixture.reader.cancel.mockImplementation(async () => { controller.abort(); });
    const handlers = observers();
    expectAbort(await settlePromptly(streamChat(fixture.api, body, handlers, controller.signal)));
    expect(handlers.onDone).toHaveBeenCalledOnce();
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('cancels a pending read on a native stream and releases its lock', async () => {
    const started = deferred<void>();
    const cancel = vi.fn();
    const stream = new ReadableStream<Uint8Array>({ pull() { started.resolve(); }, cancel });
    const api: HttpApi = { http: { fetch: vi.fn().mockResolvedValue(new Response(stream)) } };
    const controller = new AbortController();
    const handlers = observers();
    const run = streamChat(api, body, handlers, controller.signal);
    // Native pull can run before getReader; give the request continuation a turn.
    await started.promise;
    await Promise.resolve();
    controller.abort();
    expectAbort(await settlePromptly(run));
    expect(cancel).toHaveBeenCalledOnce();
    expect(stream.locked).toBe(false);
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('settles cancellation while a text-only HTTP error adapter ignores abort', async () => {
    const fixture = transport();
    const pending = deferred<string>();
    const started = deferred<void>();
    fixture.fetch.mockResolvedValue({
      ok: false,
      status: 503,
      body: null,
      text: () => { started.resolve(); return pending.promise; },
    } as Response);
    const controller = new AbortController();
    const handlers = observers();
    const balanced = trackListeners(controller.signal);
    const run = streamChat(fixture.api, body, handlers, controller.signal);
    await started.promise;
    controller.abort();
    const outcome = await settlePromptly(run);
    pending.resolve('late HTTP body');
    await pending.promise;
    await run.catch(() => undefined);
    expectAbort(outcome);
    expect(handlers.onError).not.toHaveBeenCalled();
    expect(fixture.stream.cancel).not.toHaveBeenCalled();
    balanced();
  });
});

describe('streamChat bounded native HTTP error bodies', () => {
  it('cancels and unlocks a native error body still streaming when the run is aborted', async () => {
    const reading = deferred<void>();
    const cancel = vi.fn();
    let source!: ReadableStreamDefaultController<Uint8Array>;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) { source = controller; controller.enqueue(encoder.encode('error')); },
      pull() { reading.resolve(); },
      cancel,
    });
    const api: HttpApi = { http: { fetch: vi.fn().mockResolvedValue(new Response(stream, { status: 503 })) } };
    const controller = new AbortController();
    const balanced = trackListeners(controller.signal);
    const handlers = observers();
    const run = streamChat(api, body, handlers, controller.signal);
    try {
      await reading.promise;
      expect(stream.locked).toBe(true);
      controller.abort();
      expectAbort(await settlePromptly(run));
      expect(cancel).toHaveBeenCalledOnce();
      expect(stream.locked).toBe(false);
      expect(handlers.onError).not.toHaveBeenCalled();
      balanced();
    } finally {
      try { source.close(); } catch { /* already cancelled */ }
    }
  });

  it('stops after a bounded error snippet without waiting for a native error body to close', async () => {
    const cancel = vi.fn();
    let source!: ReadableStreamDefaultController<Uint8Array>;
    const stream = new ReadableStream<Uint8Array>({
      start(controller) { source = controller; controller.enqueue(encoder.encode('x'.repeat(201))); },
      cancel,
    });
    const api: HttpApi = { http: { fetch: vi.fn().mockResolvedValue(new Response(stream, { status: 502 })) } };
    const handlers = observers();
    const run = streamChat(api, body, handlers);
    try {
      expect(await settlePromptly(run)).toEqual({ status: 'fulfilled' });
      expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(`HTTP 502: ${'x'.repeat(200)}...`);
      expect(cancel).toHaveBeenCalledOnce();
      expect(stream.locked).toBe(false);
    } finally {
      try { source.close(); } catch { /* already cancelled */ }
      await run;
    }
  });

  it('owns error-body reads and bounds decoding even when a reader supplies a huge chunk', async () => {
    const fixture = transport(['x'.repeat(64 * 1024)]);
    const text = vi.fn().mockResolvedValue('x'.repeat(64 * 1024));
    fixture.fetch.mockResolvedValue({ ok: false, status: 502, body: fixture.response.body, text } as unknown as Response);
    const decode = vi.spyOn(TextDecoder.prototype, 'decode');
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(`HTTP 502: ${'x'.repeat(200)}...`);
    expect(text).not.toHaveBeenCalled();
    expect(fixture.reader.read).toHaveBeenCalledOnce();
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
    expect(decode).toHaveBeenCalled();
    for (const [bytes] of decode.mock.calls) expect(bytes?.byteLength ?? 0).toBeLessThanOrEqual(1024);
  });

  it('preserves short native HTTP error messages with split UTF-8 and releases the body', async () => {
    const message = 'Unauthorized: 模型無法使用 🌳';
    const bytes = encoder.encode(message);
    const stream = new ReadableStream<Uint8Array>({
      start(controller) {
        for (const byte of bytes) controller.enqueue(new Uint8Array([byte]));
        controller.close();
      },
    });
    const api: HttpApi = { http: { fetch: vi.fn().mockResolvedValue(new Response(stream, { status: 401 })) } };
    const handlers = observers();
    await streamChat(api, body, handlers);
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(`HTTP 401: ${message}`);
    expect(stream.locked).toBe(false);
  });
});

describe('streamChat observer failures and cleanup', () => {
  it.each(['onText', 'onDone', 'onError'] as const)('propagates %s exceptions without reporting another error and still cleans up', async (observer) => {
    const event = observer === 'onText' ? textFrame('text') : observer === 'onDone' ? doneFrame() : frame({ type: 'error', message: 'provider error' });
    const fixture = transport([event + doneFrame()]);
    const failure = new Error(`${observer} observer failed`);
    const handlers = observers();
    handlers[observer].mockImplementation(() => { throw failure; });
    const controller = new AbortController();
    const balanced = trackListeners(controller.signal);
    await expect(streamChat(fixture.api, body, handlers, controller.signal)).rejects.toBe(failure);
    expect(handlers[observer]).toHaveBeenCalledOnce();
    expect(handlers.onError).toHaveBeenCalledTimes(observer === 'onError' ? 1 : 0);
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
    balanced();
  });

  it.each(['throw', 'reject', 'never settle'] as const)('does not let reader.cancel %s mask a terminal outcome', async (kind) => {
    const fixture = transport([doneFrame()]);
    if (kind === 'throw') fixture.reader.cancel.mockImplementation(() => { throw new Error('cancel failed'); });
    if (kind === 'reject') fixture.reader.cancel.mockRejectedValue(new Error('cancel failed'));
    if (kind === 'never settle') fixture.reader.cancel.mockReturnValue(new Promise<void>(() => {}));
    fixture.reader.releaseLock.mockImplementation(() => { throw new Error('release failed'); });
    const handlers = observers();
    expect(await settlePromptly(streamChat(fixture.api, body, handlers))).toEqual({ status: 'fulfilled' });
    expect(handlers.onDone).toHaveBeenCalledOnce();
    expect(handlers.onError).not.toHaveBeenCalled();
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
  });

  it('does not mask an observer exception with a cleanup exception', async () => {
    const fixture = transport([doneFrame()]);
    const failure = new Error('observer failure');
    const handlers = observers();
    handlers.onDone.mockImplementation(() => { throw failure; });
    fixture.reader.cancel.mockImplementation(() => { throw new Error('cancel failure'); });
    fixture.reader.releaseLock.mockImplementation(() => { throw new Error('release failure'); });
    await expect(streamChat(fixture.api, body, handlers)).rejects.toBe(failure);
    expect(handlers.onError).not.toHaveBeenCalled();
  });

  it('reports genuine read errors once and cleans up', async () => {
    const fixture = transport();
    fixture.reader.read.mockRejectedValue(new Error('socket closed'));
    const controller = new AbortController();
    const balanced = trackListeners(controller.signal);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers, controller.signal);
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(expect.stringContaining('socket closed'));
    expect(handlers.onDone).not.toHaveBeenCalled();
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
    balanced();
  });

  it('does not reclassify an onError exception while reporting a network failure', async () => {
    const fixture = transport();
    fixture.fetch.mockRejectedValue(new Error('network unavailable'));
    const controller = new AbortController();
    const balanced = trackListeners(controller.signal);
    const handlers = observers();
    const failure = new Error('observer failure');
    handlers.onError.mockImplementation(() => { throw failure; });
    await expect(streamChat(fixture.api, body, handlers, controller.signal)).rejects.toBe(failure);
    expect(handlers.onError).toHaveBeenCalledOnce();
    balanced();
  });

  it('removes listeners after success and protocol errors; later aborts cause no callbacks', async () => {
    for (const data of [doneFrame(), 'data: {broken}\n\n']) {
      const fixture = transport([data]);
      const controller = new AbortController();
      const balanced = trackListeners(controller.signal);
      const handlers = observers();
      await streamChat(fixture.api, body, handlers, controller.signal);
      balanced();
      const counts = [handlers.onText.mock.calls.length, handlers.onDone.mock.calls.length, handlers.onError.mock.calls.length];
      controller.abort();
      await Promise.resolve();
      expect([handlers.onText.mock.calls.length, handlers.onDone.mock.calls.length, handlers.onError.mock.calls.length]).toEqual(counts);
    }
  });

  it('reports a reader acquisition failure and cancels the body without hiding observer exceptions', async () => {
    const fixture = transport();
    fixture.stream.getReader.mockImplementation(() => { throw new Error('stream already locked'); });
    const handlers = observers();
    const failure = new Error('observer failed');
    handlers.onError.mockImplementation(() => { throw failure; });
    await expect(streamChat(fixture.api, body, handlers)).rejects.toBe(failure);
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(expect.stringContaining('stream already locked'));
    expect(fixture.stream.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.read).not.toHaveBeenCalled();
  });

  it('reports HTTP errors once even if error-body read rejects, and cancels/releases the reader', async () => {
    const fixture = transport();
    fixture.reader.read.mockRejectedValue(new Error('error text unavailable'));
    fixture.fetch.mockResolvedValue({
      ok: false,
      status: 502,
      body: fixture.response.body,
    } as unknown as Response);
    const handlers = observers();
    await streamChat(fixture.api, body, handlers);
    expect(handlers.onError).toHaveBeenCalledExactlyOnceWith(expect.stringContaining('HTTP 502'));
    expect(fixture.reader.cancel).toHaveBeenCalledOnce();
    expect(fixture.reader.releaseLock).toHaveBeenCalledOnce();
  });

  it('does not let a long stream accumulate cancellation listeners', async () => {
    const fixture = transport(Array.from({ length: 100 }, () => textFrame('part')).concat(doneFrame()));
    const controller = new AbortController();
    const active = new Set<EventListenerOrEventListenerObject>();
    let maximumActive = 0;
    const add = controller.signal.addEventListener.bind(controller.signal);
    const remove = controller.signal.removeEventListener.bind(controller.signal);
    vi.spyOn(controller.signal, 'addEventListener').mockImplementation((type, listener, options) => {
      if (type === 'abort') {
        active.add(listener);
        maximumActive = Math.max(maximumActive, active.size);
      }
      add(type, listener, options);
    });
    vi.spyOn(controller.signal, 'removeEventListener').mockImplementation((type, listener, options) => {
      if (type === 'abort') active.delete(listener);
      remove(type, listener, options);
    });
    const handlers = observers();
    await streamChat(fixture.api, body, handlers, controller.signal);
    expect(handlers.onText).toHaveBeenCalledTimes(100);
    expect(maximumActive).toBe(1);
    expect(active.size).toBe(0);
  });

  it('forwards the request and signal unchanged without logging request keys', async () => {
    const fixture = transport([doneFrame()]);
    const handlers = observers();
    const controller = new AbortController();
    const request = { ...body, api_key: 'fixture-secret-do-not-log', base_url: 'https://fixture.invalid' };
    const logs = (['log', 'debug', 'info', 'warn', 'error'] as const).map((method) => vi.spyOn(console, method).mockImplementation(() => {}));
    await streamChat(fixture.api, request, handlers, controller.signal);
    expect(fixture.fetch).toHaveBeenCalledExactlyOnceWith('/api/llm/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(request),
      signal: controller.signal,
    });
    for (const log of logs) expect(log).not.toHaveBeenCalled();
  });
});
