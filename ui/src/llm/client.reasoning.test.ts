/** P10: reasoning_delta reaches the agent as a signal only, and a failed
 * proxy request shows the host's own message. */
import { describe, expect, it, vi } from 'vitest';
import { streamChat } from './client';
import type { ChatBody } from './client';

const body: ChatBody = { provider: 'openai', model: 'm', messages: [], tools: [] } as unknown as ChatBody;
const sse = (frames: string[]) => new Response(new ReadableStream<Uint8Array>({
  start(controller) { controller.enqueue(new TextEncoder().encode(frames.join(''))); controller.close(); },
}), { status: 200, headers: { 'Content-Type': 'text/event-stream' } });
const handlers = () => ({ onText: vi.fn(), onDone: vi.fn(), onError: vi.fn(), onReasoning: vi.fn() });
const DONE = `data: ${JSON.stringify({ type: 'done', message: { role: 'assistant', content: 'ok', tool_calls: [] }, stop_reason: 'end', usage: {} })}\n\n`;

describe('reasoning_delta', () => {
  it.each([
    ['as a data-only frame', `data: ${JSON.stringify({ type: 'reasoning_delta', text: 'secret thought' })}\n\n`],
    ['as a named event', `event: reasoning_delta\ndata: ${JSON.stringify({ type: 'reasoning_delta', text: 'secret thought' })}\n\n`],
  ])('signals reasoning %s and never passes its text on', async (_label, frame) => {
    const h = handlers();
    await streamChat({ http: { fetch: vi.fn().mockResolvedValue(sse([frame, frame, DONE])) } }, body, h);
    expect(h.onReasoning).toHaveBeenCalledTimes(2);
    expect(h.onReasoning.mock.calls.flat()).toEqual([]);
    expect(h.onText).not.toHaveBeenCalled();
    expect(h.onDone).toHaveBeenCalledTimes(1);
    expect(JSON.stringify(h.onDone.mock.calls)).not.toContain('secret thought');
  });

  it('is ignored by a handler set without onReasoning (older callers)', async () => {
    const h = { onText: vi.fn(), onDone: vi.fn(), onError: vi.fn() };
    const frame = `data: ${JSON.stringify({ type: 'reasoning_delta', text: 'x' })}\n\n`;
    await streamChat({ http: { fetch: vi.fn().mockResolvedValue(sse([frame, DONE])) } }, body, h);
    expect(h.onDone).toHaveBeenCalledTimes(1);
    expect(h.onError).not.toHaveBeenCalled();
  });
});

describe('a failed proxy request shows the host\'s message', () => {
  it('unwraps a FastAPI detail string', async () => {
    const h = handlers();
    const response = new Response(JSON.stringify({ detail: 'upstream request failed: ReadTimeout: the endpoint sent no data for 600 seconds' }), { status: 502 });
    await streamChat({ http: { fetch: vi.fn().mockResolvedValue(response) } }, body, h);
    expect(h.onError).toHaveBeenCalledWith('HTTP 502: upstream request failed: ReadTimeout: the endpoint sent no data for 600 seconds');
  });
  it('unwraps a {code, message} detail', async () => {
    const h = handlers();
    const response = new Response(JSON.stringify({ detail: { code: 'connect_error', message: 'ConnectError: cannot reach 127.0.0.1:11434' } }), { status: 502 });
    await streamChat({ http: { fetch: vi.fn().mockResolvedValue(response) } }, body, h);
    expect(h.onError).toHaveBeenCalledWith('HTTP 502: ConnectError: cannot reach 127.0.0.1:11434 (connect_error)');
  });
  it('passes a stream error event on whole', async () => {
    const h = handlers();
    const message = 'upstream request failed: ReadTimeout: the endpoint sent no data for 120 seconds';
    await streamChat({ http: { fetch: vi.fn().mockResolvedValue(sse([`data: ${JSON.stringify({ type: 'error', message })}\n\n`])) } }, body, h);
    expect(h.onError).toHaveBeenCalledWith(message);
  });
});
