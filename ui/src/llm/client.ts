/**
 * LLM client — SSE consumer for /api/llm/chat and wrappers for the other
 * LLM proxy endpoints exposed by CodefyUI (PR #56).
 *
 * All network calls go through `api.http.fetch` so they carry the session
 * token managed by CodefyUI's auth middleware.
 */

import type { CodefyUIPluginAPI } from '../types/codefyui';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type Provider = 'openai' | 'openai-codex' | 'openrouter' | 'anthropic' | 'custom';

export interface WireToolCall {
  id: string;
  name: string;
  arguments: Record<string, unknown>;
}

export interface WireMessage {
  role: 'system' | 'user' | 'assistant' | 'tool';
  content: string;
  tool_calls?: WireToolCall[];
  tool_call_id?: string;
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
// Internal SSE parsing helpers
// ---------------------------------------------------------------------------

/**
 * Process a complete SSE segment (the text between two `\n\n` delimiters).
 * Returns true if an `error` event was encountered (signals the caller to stop).
 */
function processSegment(
  segment: string,
  handlers: StreamHandlers,
): boolean /* terminal */ {
  const lines = segment.split('\n');
  for (const line of lines) {
    if (!line.startsWith('data: ')) continue;
    const raw = line.slice(6).trim();
    if (!raw || raw === '[DONE]') continue;

    let event: Record<string, unknown>;
    try {
      event = JSON.parse(raw) as Record<string, unknown>;
    } catch {
      // Malformed JSON — skip
      continue;
    }

    const type = event.type as string | undefined;
    if (type === 'text_delta') {
      handlers.onText((event.text as string) ?? '');
    } else if (type === 'done') {
      const done: DoneEvent = {
        message: event.message as DoneEvent['message'],
        stop_reason: event.stop_reason as DoneEvent['stop_reason'],
        usage: (event.usage as Record<string, number>) ?? {},
      };
      handlers.onDone(done);
    } else if (type === 'error') {
      handlers.onError((event.message as string) ?? 'Unknown error from LLM proxy');
      return true; // terminal
    }
  }
  return false;
}

// ---------------------------------------------------------------------------
// streamChat
// ---------------------------------------------------------------------------

export async function streamChat(
  api: Pick<CodefyUIPluginAPI, 'http'>,
  body: ChatBody,
  handlers: StreamHandlers,
  signal?: AbortSignal,
): Promise<void> {
  let res: Response;
  try {
    res = await api.http.fetch('/api/llm/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal,
    });
  } catch (err) {
    handlers.onError(`Network error: ${String(err)}`);
    return;
  }

  if (!res.ok) {
    let snippet = '';
    try {
      snippet = await res.text();
      if (snippet.length > 200) snippet = snippet.slice(0, 200) + '...';
    } catch { /* ignore */ }
    handlers.onError(`HTTP ${res.status}: ${snippet}`);
    return;
  }

  const reader = res.body!.getReader();
  // Per-call decoder: no shared stream state across concurrent calls.
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      // Normalize CRLF -> LF before buffering so SSE delimiter split is uniform.
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n');

      // Split on the SSE event delimiter \n\n; keep the last partial segment
      const segments = buffer.split('\n\n');
      buffer = segments.pop() ?? ''; // last element may be partial

      for (const segment of segments) {
        if (!segment.trim()) continue;
        const terminal = processSegment(segment, handlers);
        if (terminal) {
          reader.cancel().catch(() => { /* ignore */ });
          return;
        }
      }
    }

    // Flush any remaining buffer after stream closes
    if (buffer.trim()) {
      processSegment(buffer, handlers);
    }
  } catch (err) {
    if ((err as Error)?.name !== 'AbortError') {
      handlers.onError(`Stream read error: ${String(err)}`);
    }
  } finally {
    reader.releaseLock();
  }
}

// ---------------------------------------------------------------------------
// fetchModels
// ---------------------------------------------------------------------------

export async function fetchModels(
  api: Pick<CodefyUIPluginAPI, 'http'>,
  provider: Provider,
  apiKey?: string,
  baseUrl?: string,
): Promise<string[]> {
  const res = await api.http.fetch('/api/llm/models', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ provider, api_key: apiKey, base_url: baseUrl }),
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
