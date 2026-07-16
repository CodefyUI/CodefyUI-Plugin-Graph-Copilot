/**
 * Tests for ui/src/state/conversations.ts
 */

import { describe, it, expect, vi } from 'vitest';
import {
  listConversations,
  saveConversation,
  deleteConversation,
  newConversation,
  titleFrom,
  MAX_CONVERSATIONS,
} from './conversations';
import type { Conversation } from './conversations';

// ---------------------------------------------------------------------------
// In-memory storage helper
// ---------------------------------------------------------------------------

function inMemoryStorage() {
  const store: Record<string, string> = {};
  return {
    get: (k: string) => store[k] ?? null,
    set: (k: string, v: string) => { store[k] = v; },
    remove: (k: string) => { delete store[k]; },
  };
}

function makeApi(storage = inMemoryStorage()) {
  return { storage };
}

function makeConv(overrides: Partial<Conversation> = {}): Conversation {
  return {
    id: crypto.randomUUID(),
    title: 'Test conversation',
    createdAt: Date.now(),
    updatedAt: Date.now(),
    provider: 'openai',
    model: 'gpt-4o',
    messages: [],
    ...overrides,
  };
}

// ---------------------------------------------------------------------------
// listConversations
// ---------------------------------------------------------------------------

describe('listConversations', () => {
  it('returns empty array when storage is empty', () => {
    const api = makeApi();
    expect(listConversations(api as any)).toEqual([]);
  });

  it('returns conversations newest first', () => {
    const api = makeApi();
    const older = makeConv({ updatedAt: 1000 });
    const newer = makeConv({ updatedAt: 2000 });
    saveConversation(api as any, older);
    saveConversation(api as any, newer);
    const list = listConversations(api as any);
    expect(list[0].id).toBe(newer.id);
    expect(list[1].id).toBe(older.id);
  });

  it('falls back to empty array on corrupt JSON', () => {
    const api = makeApi();
    api.storage.set('conversations', 'not valid json!!');
    expect(listConversations(api as any)).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// saveConversation
// ---------------------------------------------------------------------------

describe('saveConversation', () => {
  it('roundtrips a saved conversation', () => {
    const api = makeApi();
    const conv = makeConv({ title: 'My chat' });
    saveConversation(api as any, conv);
    const list = listConversations(api as any);
    expect(list).toHaveLength(1);
    expect(list[0].title).toBe('My chat');
  });

  it('upsert updates updatedAt and title', () => {
    const api = makeApi();
    const conv = makeConv({ title: 'Old title', updatedAt: 1000 });
    saveConversation(api as any, conv);

    const updated: Conversation = { ...conv, title: 'New title', updatedAt: 9999 };
    saveConversation(api as any, updated);

    const list = listConversations(api as any);
    expect(list).toHaveLength(1);
    expect(list[0].title).toBe('New title');
    expect(list[0].updatedAt).toBe(9999);
  });

  it('trims to MAX_CONVERSATIONS (oldest dropped)', () => {
    const api = makeApi();
    // Insert MAX_CONVERSATIONS + 1 conversations with distinct updatedAt
    for (let i = 0; i <= MAX_CONVERSATIONS; i++) {
      saveConversation(api as any, makeConv({ updatedAt: i }));
    }
    const list = listConversations(api as any);
    expect(list.length).toBe(MAX_CONVERSATIONS);
    // The oldest (updatedAt=0) should be gone; newest (updatedAt=MAX_CONVERSATIONS) should be first
    expect(list[0].updatedAt).toBe(MAX_CONVERSATIONS);
    expect(list.find(c => c.updatedAt === 0)).toBeUndefined();
  });
});

// ---------------------------------------------------------------------------
// deleteConversation
// ---------------------------------------------------------------------------

describe('deleteConversation', () => {
  it('removes the targeted conversation', () => {
    const api = makeApi();
    const a = makeConv({ title: 'A' });
    const b = makeConv({ title: 'B' });
    saveConversation(api as any, a);
    saveConversation(api as any, b);

    deleteConversation(api as any, a.id);

    const list = listConversations(api as any);
    expect(list).toHaveLength(1);
    expect(list[0].id).toBe(b.id);
  });

  it('is a no-op for an unknown id', () => {
    const api = makeApi();
    const conv = makeConv();
    saveConversation(api as any, conv);
    deleteConversation(api as any, 'does-not-exist');
    expect(listConversations(api as any)).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// newConversation
// ---------------------------------------------------------------------------

describe('newConversation', () => {
  it('creates a conversation with a UUID id and empty title', () => {
    const conv = newConversation('openai', 'gpt-4o');
    expect(conv.id).toMatch(/^[0-9a-f-]{36}$/);
    expect(conv.title).toBe('');
    expect(conv.provider).toBe('openai');
    expect(conv.model).toBe('gpt-4o');
    expect(conv.messages).toEqual([]);
  });

  it('records an optional reasoning effort', () => {
    const conv = newConversation('openai-codex', 'gpt-5.6-sol', 'low');

    expect(conv.reasoningEffort).toBe('low');
  });
});

// ---------------------------------------------------------------------------
// titleFrom
// ---------------------------------------------------------------------------

describe('titleFrom', () => {
  it('returns the first 40 chars of text', () => {
    const long = 'A'.repeat(100);
    expect(titleFrom(long)).toBe('A'.repeat(40));
  });

  it('returns short text unchanged', () => {
    expect(titleFrom('Hello world')).toBe('Hello world');
  });

  it('handles empty string', () => {
    expect(titleFrom('')).toBe('');
  });
});

// ---------------------------------------------------------------------------
// Quota-safe persistence (large image attachments)
// ---------------------------------------------------------------------------

describe('writeAll quota handling', () => {
  function quotaStorage(limit: number) {
    const store: Record<string, string> = {};
    return {
      get: (k: string) => store[k] ?? null,
      set: (k: string, v: string) => {
        if (v.length > limit) throw new Error('QuotaExceededError');
        store[k] = v;
      },
      remove: (k: string) => { delete store[k]; },
    };
  }

  it('strips image blobs (not throws) when the payload overflows quota', () => {
    const api = makeApi(quotaStorage(2000));
    const conv = makeConv({
      messages: [
        {
          role: 'user',
          content: 'look at this',
          attachments: [
            { id: '1', kind: 'image', name: 'big.png', size: 1, mime: 'image/png', dataUrl: 'data:image/png;base64,' + 'A'.repeat(5000) },
          ],
        },
      ],
    });

    expect(() => saveConversation(api as any, conv)).not.toThrow();

    const list = listConversations(api as any);
    expect(list).toHaveLength(1);
    const att = list[0].messages[0].attachments![0];
    expect(att.dataUrl).toBeUndefined(); // blob stripped to fit
    expect(att.name).toBe('big.png');    // metadata preserved
  });

  it('keeps the image blob when it comfortably fits under quota', () => {
    const api = makeApi(quotaStorage(1_000_000));
    const conv = makeConv({
      messages: [
        {
          role: 'user',
          content: 'small',
          attachments: [
            { id: '1', kind: 'image', name: 'tiny.png', size: 1, mime: 'image/png', dataUrl: 'data:image/png;base64,AAAA' },
          ],
        },
      ],
    });
    saveConversation(api as any, conv);
    const att = listConversations(api as any)[0].messages[0].attachments![0];
    expect(att.dataUrl).toBe('data:image/png;base64,AAAA');
  });
});
