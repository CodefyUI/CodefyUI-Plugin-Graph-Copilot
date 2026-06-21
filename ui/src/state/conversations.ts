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
import type { Attachment } from './attachments';

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
  /** Files attached to a user turn (images/pdf/text). Persisted for display
   *  and re-sent to the model on later turns within the history window. */
  attachments?: Attachment[];
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

/** Strip large base64 image blobs from a conversation (keep text + metadata),
 *  used as a last resort when stored data overflows the storage quota. */
function stripAttachmentBlobs(c: Conversation): Conversation {
  if (!c.messages.some((m) => m.attachments?.some((a) => a.dataUrl))) return c;
  return {
    ...c,
    messages: c.messages.map((m) =>
      m.attachments
        ? {
            ...m,
            attachments: m.attachments.map((a) =>
              a.dataUrl ? { ...a, dataUrl: undefined } : a,
            ),
          }
        : m,
    ),
  };
}

function trySet(api: StrictApi, list: Conversation[]): boolean {
  try {
    api.storage.set(STORAGE_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false; // most likely a quota overflow from large image data URLs
  }
}

/**
 * Persist the (newest-first) conversation list, degrading gracefully when it
 * overflows the storage quota — large pasted/attached images can blow past
 * localStorage's ~5 MB cap. Strategy: drop the oldest conversations until it
 * fits; if still too big, strip image blobs (keeping text + history). This
 * never throws, so a send is never stranded by a failed save.
 */
function writeAll(api: StrictApi, list: Conversation[]): void {
  if (trySet(api, list)) return;

  const trimmed = [...list];
  while (trimmed.length > 1) {
    trimmed.pop(); // list is newest-first, so this drops the oldest
    if (trySet(api, trimmed)) return;
  }

  if (trySet(api, list.map(stripAttachmentBlobs))) return;
  trySet(api, list.slice(0, 1).map(stripAttachmentBlobs)); // last resort
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
