/**
 * Tests for HistoryView — Task 8 coverage
 *
 * 1. Renders conversations from fake storage.
 * 2. Clicking a conversation calls onResume with the correct conversation.
 * 3. Two-click delete: first click arms confirm (button turns red); second
 *    click deletes and removes from the list.
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Conversation } from '../state/conversations';

import { HistoryView } from './HistoryView';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeConv(overrides: Partial<Conversation> = {}): Conversation {
  const now = Date.now();
  return {
    id: crypto.randomUUID(),
    title: 'Test conversation',
    createdAt: now,
    updatedAt: now,
    provider: 'openai',
    model: 'gpt-5.2',
    messages: [],
    ...overrides,
  };
}

/**
 * Create a fake api.storage backed by the given conversations array.
 * The array is serialized as newest-first (sorted by updatedAt desc).
 */
function makeFakeApiWithConvs(convs: Conversation[]): CodefyUIPluginAPI {
  const sorted = [...convs].sort((a, b) => b.updatedAt - a.updatedAt);
  const stored = new Map<string, string>();
  stored.set('conversations', JSON.stringify(sorted));

  return {
    apiVersion: 1,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn(),
      getNodeDefinitions: vi.fn(),
      applyOperations: vi.fn(),
      onGraphChanged: vi.fn().mockReturnValue(() => {}),
    },
    http: { fetch: vi.fn() },
    storage: {
      get: (key: string) => stored.get(key) ?? null,
      set: (key: string, val: string) => { stored.set(key, val); },
      remove: (key: string) => { stored.delete(key); },
    },
  } as unknown as CodefyUIPluginAPI;
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('HistoryView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders each conversation title', () => {
    const convs = [
      makeConv({ title: 'First chat', updatedAt: 1000 }),
      makeConv({ title: 'Second chat', updatedAt: 2000 }),
    ];
    const api = makeFakeApiWithConvs(convs);
    render(
      <HistoryView
        api={api}
        activeId=""
        onResume={vi.fn()}
        onNew={vi.fn()}
      />,
    );

    expect(screen.getByText('First chat')).toBeTruthy();
    expect(screen.getByText('Second chat')).toBeTruthy();
  });

  it('shows "(untitled)" for conversations without a title', () => {
    const convs = [makeConv({ title: '' })];
    const api = makeFakeApiWithConvs(convs);
    render(
      <HistoryView
        api={api}
        activeId=""
        onResume={vi.fn()}
        onNew={vi.fn()}
      />,
    );
    expect(screen.getByText('(untitled)')).toBeTruthy();
  });

  it('shows empty state when no conversations', () => {
    const api = makeFakeApiWithConvs([]);
    render(
      <HistoryView
        api={api}
        activeId=""
        onResume={vi.fn()}
        onNew={vi.fn()}
      />,
    );
    expect(screen.getByText(/no conversations yet/i)).toBeTruthy();
  });

  it('clicking a conversation calls onResume with that conversation', async () => {
    const conv = makeConv({ title: 'Resume me' });
    const api = makeFakeApiWithConvs([conv]);
    const onResume = vi.fn();
    render(
      <HistoryView
        api={api}
        activeId=""
        onResume={onResume}
        onNew={vi.fn()}
      />,
    );

    await userEvent.click(screen.getByRole('button', { name: /resume conversation: Resume me/i }));
    expect(onResume).toHaveBeenCalledTimes(1);
    expect(onResume.mock.calls[0][0].title).toBe('Resume me');
  });

  it('calls onNew when "New chat" button is clicked', async () => {
    const api = makeFakeApiWithConvs([]);
    const onNew = vi.fn();
    render(
      <HistoryView
        api={api}
        activeId=""
        onResume={vi.fn()}
        onNew={onNew}
      />,
    );
    await userEvent.click(screen.getByRole('button', { name: /start new conversation/i }));
    expect(onNew).toHaveBeenCalledTimes(1);
  });

  it('two-click delete: first click adds confirm class, second deletes', async () => {
    const conv = makeConv({ title: 'Delete me' });
    const api = makeFakeApiWithConvs([conv]);

    render(
      <HistoryView
        api={api}
        activeId=""
        onResume={vi.fn()}
        onNew={vi.fn()}
      />,
    );

    // The delete button is initially present (aria-label contains 'Delete')
    const deleteBtn = screen.getByRole('button', { name: /^Delete "Delete me"$/i });
    expect(deleteBtn).toBeTruthy();
    expect(deleteBtn.classList.contains('confirm')).toBe(false);

    // First click — arm confirm
    fireEvent.click(deleteBtn);

    // Now it should have the confirm class
    const confirmBtn = screen.getByRole('button', { name: /confirm delete "delete me"/i });
    expect(confirmBtn).toBeTruthy();
    expect(confirmBtn.classList.contains('confirm')).toBe(true);

    // Second click — actually delete
    fireEvent.click(confirmBtn);

    // The conversation should be gone from the list
    await waitFor(() => {
      expect(screen.queryByText('Delete me')).toBeNull();
    });
  });

  it('marks the active conversation', () => {
    const conv = makeConv({ title: 'Active', updatedAt: 1000 });
    const other = makeConv({ title: 'Inactive', updatedAt: 900 });
    const api = makeFakeApiWithConvs([conv, other]);

    render(
      <HistoryView
        api={api}
        activeId={conv.id}
        onResume={vi.fn()}
        onNew={vi.fn()}
      />,
    );

    // The active item should have the 'active' CSS class
    const activeBtn = screen.getByRole('button', { name: /Resume conversation: Active/i });
    expect(activeBtn.closest('.gcp-history-item')?.classList.contains('active')).toBe(true);

    const inactiveBtn = screen.getByRole('button', { name: /Resume conversation: Inactive/i });
    expect(inactiveBtn.closest('.gcp-history-item')?.classList.contains('active')).toBe(false);
  });
});
