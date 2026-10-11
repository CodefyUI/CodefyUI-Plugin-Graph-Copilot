/**
 * LLM client — SSE consumer for /api/llm/chat and wrappers for the other
 * LLM proxy endpoints exposed by CodefyUI (PR #56).
 *
 * All network calls go through `api.http.fetch` so they carry the session
 * token managed by CodefyUI's auth middleware.
 */

import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Attachment } from '../state/attachments';
import { langFromName } from '../state/attachments';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Provider = 'openai' | 'openai-codex' | 'openrouter' | 'anthropic' | 'custom';

export interface WireToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

/** A multimodal content part (OpenAI chat-completions shape). The unified LLM
 *  proxy normalizes these per provider. Only used for user messages that carry
 *  images; text-only messages stay plain strings. */
export type ContentPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } };

export interface WireMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string | ContentPart[];
  tool_calls?: WireToolCall[];
  tool_call_id?: string;
}

// ---------------------------------------------------------------------------
// composeUserContent — build outgoing user-message content from text + files
// ---------------------------------------------------------------------------

/** Providers whose models can accept image parts. (custom is included
 *  best-effort: it's usually an OpenAI-compatible endpoint chosen by the user.) */
const IMAGE_CAPABLE: ReadonlySet<Provider> = new Set<Provider>([
  'openai', 'openai-codex', 'openrouter', 'anthropic', 'custom',
]);

/**
 * Compose the `content` for a user wire message:
 *  - text/pdf attachments are inlined as labeled fenced blocks appended to the
 *    user's text (works on every provider, including text-only local models);
 *  - image attachments become image_url parts and the result is a ContentPart[]
 *    for image-capable providers;
 *  - with no attachments the original string is returned verbatim (backward
 *    compatible — existing wire-message shape is unchanged).
 */
export function composeUserContent(
  text: string,
  attachments: Attachment[] | undefined,
  provider: Provider,
): string | ContentPart[] {
  const atts = attachments ?? [];

  // 1. Combined text = user text + inlined text/pdf files.
  const blocks: string[] = [];
  if (text.trim()) blocks.push(text);
  for (const a of atts) {
    if ((a.kind === 'text' || a.kind === 'pdf') && a.text) {
      const lang = a.kind === 'pdf' ? '' : langFromName(a.name);
      blocks.push(`Attached file "${a.name}":\n\`\`\`${lang}\n${a.text}\n\`\`\``);
    }
  }
  const combined = blocks.join('\n\n');

  // 2. Images -> multimodal parts (capable providers only).
  const images = atts.filter((a) => a.kind === 'image' && a.dataUrl);
  if (images.length > 0 && IMAGE_CAPABLE.has(provider)) {
    const parts: ContentPart[] = [
      { type: 'text', text: combined || '(see attached image)' },
      ...images.map((a): ContentPart => ({ type: 'image_url', image_url: { url: a.dataUrl! } })),
    ];
    return parts;
  }

  // 3. No sendable images -> plain string. If images exist but the provider
  //    can't take them, note their names so the model isn't left guessing.
  if (images.length > 0) {
    const note = images.map((a) => `[image attached (not sent to this provider): ${a.name}]`).join('\n');
    return [combined, note].filter(Boolean).join('\n\n');
  }
  return combined;
}

export interface DoneEvent {
  message: { role: 'assistant'; content: string; tool_calls: WireToolCall[] };
  stop_reason: 'tool_use' | 'end';
  usage: Record<string, number>;
}

export interface StreamHandlers {
  onText(text: string): void;
  onDone(done: DoneEvent): void;
  onError(message: string): void;
}

export interface ChatBody {
  provider: Provider;
  model: string;
  messages: WireMessage[];
  tools?: { name: string; description: string; input_schema: Record<string, unknown> }[];
  api_key?: string;
  base_url?: string;
  max_tokens?: number;
  temperature?: number;
}

// ---------------------------------------------------------------------------
// Internal stream lifecycle and SSE parsing helpers
// ---------------------------------------------------------------------------

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function abortError(): DOMException {
  return new DOMException('The LLM request was cancelled.', 'AbortError');
}

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw abortError();
}

/** Transport aborts are control flow, never provider/network error callbacks. */
function rethrowAbort(error: unknown, signal?: AbortSignal): void {
  throwIfAborted(signal);
  if (isObject(error) && error.name === 'AbortError') throw error;
}

/** Best-effort cleanup must not hang a run or mask an observer's exception. */
function cancelQuietly(target: { cancel(): Promise<void> } | null): void {
  try {
    void target?.cancel().catch(() => { /* cancellation is best effort */ });
  } catch { /* custom readers can also throw synchronously */ }
}

/**
 * Race one operation, not the entire consumer, against cancellation. A new
 * listener is removed on every settlement so long streams do not accumulate
 * listeners or pending Promise.race reactions. Late results cannot dispatch
 * observers; a late fetch response can still have its body cancelled.
 */
function waitWithAbort<T>(
  operation: () => Promise<T>,
  signal?: AbortSignal,
  onLateValue?: (value: T) => void,
): Promise<T> {
  throwIfAborted(signal);
  if (!signal) return operation();

  return new Promise<T>((resolve, reject) => {
    let pending = true;
    const cleanup = () => {
      pending = false;
      signal.removeEventListener('abort', onAbort);
    };
    const onAbort = () => {
      if (!pending) return;
      cleanup();
      reject(abortError());
    };
    signal.addEventListener('abort', onAbort, { once: true });
    if (signal.aborted) { onAbort(); return; }

    try {
      void operation().then(
        (value) => {
          if (!pending) {
            try { onLateValue?.(value); } catch { /* late cleanup is best effort */ }
            return;
          }
          cleanup();
          resolve(value);
        },
        (error: unknown) => {
          if (!pending) return; // also consumes late transport rejections
          cleanup();
          reject(error);
        },
      );
    } catch (error) {
      if (!pending) return;
      cleanup();
      reject(error);
    }
  });
}

const HTTP_ERROR_SNIPPET_CHARS = 200;
const HTTP_ERROR_SNIPPET_BYTES = 1024;

/** Read only a bounded diagnostic prefix; the caller owns cancellation/release. */
async function readHttpErrorSnippet(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  signal?: AbortSignal,
): Promise<string> {
  const decoder = new TextDecoder();
  let snippet = '';
  let remainingBytes = HTTP_ERROR_SNIPPET_BYTES;
  while (remainingBytes > 0) {
    const { done, value } = await waitWithAbort(() => reader.read(), signal);
    throwIfAborted(signal);
    if (done) {
      snippet += decoder.decode();
      return snippet.length > HTTP_ERROR_SNIPPET_CHARS
        ? snippet.slice(0, HTTP_ERROR_SNIPPET_CHARS) + '...'
        : snippet;
    }
    const prefix = value.subarray(0, remainingBytes);
    remainingBytes -= prefix.byteLength;
    snippet += decoder.decode(prefix, { stream: true });
    if (snippet.length > HTTP_ERROR_SNIPPET_CHARS || remainingBytes === 0 || prefix.byteLength < value.byteLength) {
      return snippet.slice(0, HTTP_ERROR_SNIPPET_CHARS) + '...';
    }
  }
  return snippet;
}

interface SseFrame {
  event: string;
  data: string;
}

/**
 * Line-based SSE framing: CR, LF and CRLF (even across chunks) end lines;
 * only a blank line dispatches a frame. Multiple data fields join with LF.
 * Partial frames are deliberately discarded at EOF, per SSE framing rules.
 */
class SseFramer {
  private line = '';
  private data: string[] = [];
  private event = '';
  private skipLf = false;

  push(text: string, dispatch: (frame: SseFrame) => boolean): boolean {
    let start = 0;
    if (this.skipLf && text.length) {
      this.skipLf = false;
      if (text[0] === '\n') start = 1;
    }

    for (let i = start; i < text.length; i++) {
      if (text[i] !== '\r' && text[i] !== '\n') continue;
      this.line += text.slice(start, i);
      start = i + 1;
      if (text[i] === '\r') {
        if (text[start] === '\n') { start++; i++; }
        else if (start === text.length) this.skipLf = true;
      }
      const line = this.line;
      this.line = '';
      if (this.consumeLine(line, dispatch)) return true;
    }
    this.line += text.slice(start);
    return false;
  }

  private consumeLine(line: string, dispatch: (frame: SseFrame) => boolean): boolean {
    if (!line) {
      const frame = { event: this.event || 'message', data: this.data.join('\n') };
      const hasData = this.data.length > 0;
      this.data = [];
      this.event = '';
      return hasData && dispatch(frame);
    }
    if (line.startsWith(':')) return false;
    const colon = line.indexOf(':');
    const field = colon < 0 ? line : line.slice(0, colon);
    let value = colon < 0 ? '' : line.slice(colon + 1);
    if (value.startsWith(' ')) value = value.slice(1);
    if (field === 'data') this.data.push(value);
    else if (field === 'event') this.event = value;
    return false; // id, retry and unknown fields do not affect this consumer
  }
}

class StreamProtocolError extends Error {}

type StreamEvent =
  | { type: 'text_delta'; text: string }
  | { type: 'done'; done: DoneEvent }
  | { type: 'error'; message: string };

/** Validate the entire batch before exposing any tool call to the agent. */
function parseDone(event: Record<string, unknown>): DoneEvent {
  const message = event.message;
  if (!isObject(message)) throw new StreamProtocolError('Invalid done message: expected an object.');
  if (message.role !== 'assistant') throw new StreamProtocolError('Invalid done message.role: expected assistant.');
  if (typeof message.content !== 'string') throw new StreamProtocolError('Invalid done message.content: expected a string.');
  if (event.stop_reason !== 'end' && event.stop_reason !== 'tool_use') {
    throw new StreamProtocolError('Invalid done stop_reason: expected end or tool_use.');
  }

  // Some zero-tool completions omit these optional proxy fields.
  const calls = message.tool_calls === undefined ? [] : message.tool_calls;
  if (!Array.isArray(calls)) throw new StreamProtocolError('Invalid done message.tool_calls: expected an array.');
  const ids = new Set<string>();
  const toolCalls = calls.map((call: unknown, index): WireToolCall => {
    const field = `done message.tool_calls[${index}]`;
    if (!isObject(call)) throw new StreamProtocolError(`Invalid ${field}: expected an object.`);
    if (typeof call.id !== 'string' || !call.id.trim()) {
      throw new StreamProtocolError(`Invalid ${field}.id: expected a nonempty string.`);
    }
    if (ids.has(call.id)) throw new StreamProtocolError(`Invalid ${field}.id: duplicate tool ID.`);
    ids.add(call.id);
    if (typeof call.name !== 'string' || !call.name.trim()) {
      throw new StreamProtocolError(`Invalid ${field}.name: expected a nonempty string.`);
    }
    if (!isObject(call.arguments)) throw new StreamProtocolError(`Invalid ${field}.arguments: expected an object.`);
    return { id: call.id, name: call.name, arguments: call.arguments };
  });

  const usage = event.usage === undefined ? {} : event.usage;
  if (!isObject(usage) || Object.values(usage).some((value) => typeof value !== 'number' || !Number.isFinite(value))) {
    throw new StreamProtocolError('Invalid done usage: expected finite numeric values.');
  }
  return {
    message: { role: 'assistant', content: message.content, tool_calls: toolCalls },
    stop_reason: event.stop_reason,
    usage: usage as Record<string, number>,
  };
}

/** Unknown event types are ignorable, but malformed subscribed data is terminal. */
function parseFrame(frame: SseFrame): StreamEvent | undefined {
  if (!['message', 'text_delta', 'done', 'error'].includes(frame.event)) return;
  const raw = frame.data.trim();
  // The proxy's structured done event is authoritative, not a provider sentinel.
  if (!raw || raw === '[DONE]') return;
  let event: unknown;
  try {
    event = JSON.parse(raw);
  } catch {
    // Do not echo raw payloads: they can contain private prompts or tool data.
    throw new StreamProtocolError('Malformed JSON in LLM stream. Retry the request or check the LLM proxy.');
  }
  if (!isObject(event) || typeof event.type !== 'string' || !event.type.trim()) {
    throw new StreamProtocolError('Invalid LLM stream event: expected an object with a string type.');
  }
  if (event.type === 'text_delta') {
    if (typeof event.text !== 'string') throw new StreamProtocolError('Invalid text_delta.text: expected a string.');
    return { type: 'text_delta', text: event.text };
  }
  if (event.type === 'done') return { type: 'done', done: parseDone(event) };
  if (event.type === 'error') {
    if (event.message !== undefined && typeof event.message !== 'string') {
      throw new StreamProtocolError('Invalid error.message: expected a string.');
    }
    return { type: 'error', message: event.message ?? 'Unknown error from LLM proxy' };
  }
}

// ---------------------------------------------------------------------------
// streamChat
// ---------------------------------------------------------------------------

/**
 * Consume the unified proxy stream until exactly one done/error terminal event.
 * Network/protocol failures call onError; cancellation rejects with AbortError
 * instead. Observer exceptions propagate after cleanup and are not reclassified
 * as transport failures. No callback is dispatched by a late fetch/read result.
 */
export async function streamChat(
  api: Pick<CodefyUIPluginAPI, 'http'>,
  body: ChatBody,
  handlers: StreamHandlers,
  signal?: AbortSignal,
): Promise<void> {
  throwIfAborted(signal);
  let res: Response | undefined;
  let reader: ReadableStreamDefaultReader<Uint8Array> | undefined;
  try {
    try {
      res = await waitWithAbort(() => api.http.fetch('/api/llm/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal,
      }), signal, (late) => cancelQuietly(late.body));
      throwIfAborted(signal);
    } catch (err) {
      rethrowAbort(err, signal);
      handlers.onError(`Network error: ${String(err)}`);
      return;
    }

    const response = res;
    if (!response.ok) {
      let snippet = '';
      try {
        if (response.body) {
          // Response.text() hides its locked reader, so cancellation cannot
          // reach it when a custom fetch ignores the signal. Own every read.
          const errorReader = response.body.getReader();
          reader = errorReader;
          snippet = await readHttpErrorSnippet(errorReader, signal);
        } else {
          // Support text-only adapters/fixtures; there is no body to unlock.
          snippet = await waitWithAbort(() => response.text(), signal);
          if (snippet.length > HTTP_ERROR_SNIPPET_CHARS) snippet = snippet.slice(0, HTTP_ERROR_SNIPPET_CHARS) + '...';
        }
        throwIfAborted(signal);
      } catch (err) { rethrowAbort(err, signal); }
      handlers.onError(`HTTP ${response.status}: ${snippet}`);
      return;
    }
    if (!response.body) {
      handlers.onError('LLM response has no stream body. Retry the request or check the LLM proxy connection.');
      return;
    }
    let activeReader: ReadableStreamDefaultReader<Uint8Array>;
    try {
      activeReader = response.body.getReader();
      reader = activeReader;
    } catch (err) {
      rethrowAbort(err, signal);
      handlers.onError(`Unable to read the LLM stream: ${String(err)}`);
      return;
    }

    // Both decoder and framing state are per request, including concurrent runs.
    const decoder = new TextDecoder('utf-8', { fatal: true });
    const framer = new SseFramer();
    const dispatch = (frame: SseFrame): boolean => {
      throwIfAborted(signal);
      let event: StreamEvent | undefined;
      try {
        event = parseFrame(frame);
      } catch (err) {
        if (!(err instanceof StreamProtocolError)) throw err;
        handlers.onError(err.message);
        throwIfAborted(signal);
        return true;
      }
      if (!event) return false;
      if (event.type === 'text_delta') handlers.onText(event.text);
      else if (event.type === 'done') handlers.onDone(event.done);
      else handlers.onError(event.message);
      throwIfAborted(signal);
      return event.type !== 'text_delta';
    };

    let terminal = false;
    while (!terminal) {
      let result: ReadableStreamReadResult<Uint8Array>;
      try {
        result = await waitWithAbort(() => activeReader.read(), signal);
        throwIfAborted(signal);
      } catch (err) {
        rethrowAbort(err, signal);
        handlers.onError(`Stream read error: ${String(err)}`);
        return;
      }
      // Decode through each ASCII line ending before looking at the remaining
      // bytes. UTF-8 never uses CR/LF as continuation bytes, and a terminal
      // frame must win even over corrupt bytes later in the same read chunk.
      const bytes = result.value ?? new Uint8Array();
      let offset = 0;
      do {
        let end = offset;
        while (end < bytes.length && bytes[end] !== 0x0a && bytes[end] !== 0x0d) end++;
        if (end < bytes.length) end++;
        let text: string;
        try {
          text = decoder.decode(bytes.subarray(offset, end), {
            stream: !result.done || end < bytes.length,
          });
        } catch {
          handlers.onError('Invalid UTF-8 in LLM stream. Retry the request or check the LLM proxy.');
          return;
        }
        terminal = framer.push(text, dispatch);
        offset = end;
      } while (!terminal && offset < bytes.length);
      if (result.done && !terminal) {
        handlers.onError('Incomplete LLM stream: ended before a done event. Retry the request or check the LLM proxy connection.');
        return;
      }
    }
  } finally {
    if (reader) {
      cancelQuietly(reader);
      try { reader.releaseLock(); } catch { /* cleanup must not mask the outcome */ }
    } else if (res?.body) cancelQuietly(res.body);
    // An onDone observer can queue Stop before its caller dispatches tools.
    // Yield once, then honor that cancellation even after the terminal frame.
    await Promise.resolve();
    throwIfAborted(signal);
  }
}

// ---------------------------------------------------------------------------
// fetchModels
// ---------------------------------------------------------------------------

/** Model-list request; the optional trailing signal supports Settings cancellation. */
export async function fetchModels(
  api: Pick<CodefyUIPluginAPI, 'http'>,
  provider: Provider,
  apiKey?: string,
  baseUrl?: string,
  signal?: AbortSignal,
): Promise<string[]> {
  const res = await api.http.fetch('/api/llm/models', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, api_key: apiKey, base_url: baseUrl }),
    signal,
  });

  if (!res.ok) {
    let snippet = '';
    try {
      snippet = await res.text();
      if (snippet.length > 200) snippet = snippet.slice(0, 200) + '...';
    } catch { /* ignore */ }
    throw new Error(`HTTP ${res.status}: ${snippet}`);
  }

  const data = await res.json() as { models: { id: string }[] };
  return data.models.map((m) => m.id);
}

// ---------------------------------------------------------------------------
// Codex auth endpoints
// ---------------------------------------------------------------------------

export async function codexLogin(
  api: Pick<CodefyUIPluginAPI, 'http'>,
): Promise<string> {
  const res = await api.http.fetch('/api/llm/codex/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
  const data = await res.json() as { auth_url: string };
  return data.auth_url;
}

export async function codexStatus(
  api: Pick<CodefyUIPluginAPI, 'http'>,
): Promise<{ status: string; email?: string }> {
  const res = await api.http.fetch('/api/llm/codex/status', undefined);
  const data = await res.json() as { status: string; email?: string };
  return data;
}

export async function codexLogout(
  api: Pick<CodefyUIPluginAPI, 'http'>,
): Promise<void> {
  await api.http.fetch('/api/llm/codex/logout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({}),
  });
}
