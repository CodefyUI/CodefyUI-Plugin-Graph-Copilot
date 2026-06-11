/**
 * Conversation persistence — stores the list of conversations in
 * api.storage under the key 'conversations'.
 *
 * Conversations are kept newest-first (by updatedAt). The list is capped at
 * MAX_CONVERSATIONS; on overflow the oldest entry is dropped.
 *
 * Corrupt JSON is handled gracefully: listConversations falls back to [].
 */

import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { WireToolCall, Provider } from '../llm/client';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ChatTurn {
  role: 'user' | 'assistant' | 'tool';
  content: string;
  tool_calls?: WireToolCall[];
  tool_call_id?: string;
  /** Human-readable applied-ops chip shown under an assistant bubble. */
  opsSummary?: string;
}

export interface Conversation {
  id: string;
  title: string;
  createdAt: number;
  updatedAt: number;
  provider: Provider;
  model: string;
  messages: ChatTurn[];
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

export const MAX_CONVERSATIONS = 50;

const STORAGE_KEY = 'conversations';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

type StrictApi = Pick<CodefyUIPluginAPI, 'storage'>;

function readAll(api: StrictApi): Conversation[] {
  const raw = api.storage.get(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Conversation[];
  } catch {
    return [];
  }
}

function writeAll(api: StrictApi, list: Conversation[]): void {
  api.storage.set(STORAGE_KEY, JSON.stringify(list));
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/** Returns all conversations sorted newest-first (by updatedAt). */
export function listConversations(api: StrictApi): Conversation[] {
  return readAll(api).sort((a, b) => b.updatedAt - a.updatedAt);
}

/**
 * Upsert a conversation.
 * If the same id already exists it is replaced in-place.
 * After upsert, the list is sorted and trimmed to MAX_CONVERSATIONS (oldest removed).
 */
export function saveConversation(api: StrictApi, c: Conversation): void {
  const list = readAll(api);
  const idx = list.findIndex((x) => x.id === c.id);
  if (idx >= 0) {
    list[idx] = c;
  } else {
    list.push(c);
  }

  // Sort newest-first then trim
  list.sort((a, b) => b.updatedAt - a.updatedAt);
  if (list.length > MAX_CONVERSATIONS) {
    list.splice(MAX_CONVERSATIONS); // drop oldest (end of sorted list)
  }

  writeAll(api, list);
}

/** Remove a conversation by id. No-op if the id doesn't exist. */
export function deleteConversation(api: StrictApi, id: string): void {
  const list = readAll(api).filter((c) => c.id !== id);
  writeAll(api, list);
}

/**
 * Create a new blank conversation. The caller is responsible for saving it
 * via saveConversation once the first message is added.
 */
export function newConversation(provider: Provider, model: string): Conversation {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    title: '',
    createdAt: now,
    updatedAt: now,
    provider,
    model,
    messages: [],
  };
}

/**
 * Derive a title from the first user message.
 * Takes the first 40 characters.
 */
export function titleFrom(text: string): string {
  return text.slice(0, 40);
}
