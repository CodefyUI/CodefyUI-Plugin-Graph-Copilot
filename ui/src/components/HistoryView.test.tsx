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

import { saveConversation } from '../state/conversations';
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

  it('explains browser-local history and its limits without adding decorative glyphs', () => {
    const { container } = render(<HistoryView api={makeFakeApiWithConvs([])} activeId="" onResume={vi.fn()} onNew={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 2, name: 'Conversations' })).toBeInTheDocument();
    expect(screen.getByText(/saved in this browser only/i)).toHaveTextContent(/does not undo graph changes or stop host runs/i);
    expect(screen.getByText('Start a new conversation to ask about or edit the current graph.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start new conversation' })).toBeEnabled();
    expect(container.textContent).not.toMatch(/[✦✕]/);
  });

  it('keeps long titles and exact model identities intact for wrapping', () => {
    const title = 'Investigate a long-running classifier with a detailed validation and training history';
    const model = 'organization/research-model-with-exact-revision-2026-10-18-and-long-context';
    const conv = makeConv({ title, model, reasoningEffort: 'max' });
    render(<HistoryView api={makeFakeApiWithConvs([conv])} activeId="" onResume={vi.fn()} onNew={vi.fn()} />);
    const resume = screen.getByRole('button', { name: `Resume conversation: ${title}` });
    expect(resume.querySelector('.gcp-history-title')).toHaveTextContent(title);
    expect(resume.querySelector('.gcp-history-meta')).toHaveTextContent(`openai/${model}`);
    expect(resume.querySelector('.gcp-history-meta')).toHaveTextContent('max effort');
    const remove = screen.getByRole('button', { name: `Delete "${title}"` });
    expect(remove.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
    expect(remove.textContent).toBe('');
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

  it('shows the explicit reasoning effort in conversation metadata', () => {
    const api = makeFakeApiWithConvs([
      makeConv({ model: 'gpt-5.6-sol', reasoningEffort: 'max' }),
    ]);
    render(
      <HistoryView
        api={api}
        activeId=""
        onResume={vi.fn()}
        onNew={vi.fn()}
      />,
    );

    expect(screen.getByText(/openai\/gpt-5\.6-sol.*max effort/i)).toBeTruthy();
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

  it('uses sibling native buttons rather than a button role containing another button', () => {
    const conv = makeConv({ title: 'Native controls' });
    render(<HistoryView api={makeFakeApiWithConvs([conv])} activeId="" onResume={vi.fn()} onNew={vi.fn()} />);
    const resume = screen.getByRole('button', { name: /resume conversation/i });
    const remove = screen.getByRole('button', { name: /^delete/i });
    expect(resume.tagName).toBe('BUTTON');
    expect(resume.contains(remove)).toBe(false);
    expect(remove.closest('[role="button"]')).toBeNull();
  });

  it('keyboard delete confirmation never resumes the conversation', async () => {
    const conv = makeConv({ title: 'Keyboard delete' });
    const onResume = vi.fn();
    render(<HistoryView api={makeFakeApiWithConvs([conv])} activeId="" onResume={onResume} onNew={vi.fn()} />);
    const user = userEvent.setup();
    screen.getByRole('button', { name: /^delete/i }).focus();
    await user.keyboard('{Enter}');
    expect(screen.getByRole('button', { name: /confirm delete/i })).toBeInTheDocument();
    expect(onResume).not.toHaveBeenCalled();
    await user.keyboard(' ');
    expect(screen.queryByText('Keyboard delete')).toBeNull();
    expect(onResume).not.toHaveBeenCalled();
  });

  it('provides an explicit cancel button and Escape cancels without deleting', async () => {
    const conv = makeConv({ title: 'Keep me' });
    const api = makeFakeApiWithConvs([conv]);
    render(<HistoryView api={api} activeId="" onResume={vi.fn()} onNew={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /^delete/i }));
    expect(screen.getByText(/delete this conversation\?/i)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /cancel delete/i }));
    expect(screen.queryByRole('button', { name: /confirm delete/i })).toBeNull();
    expect(screen.getByText('Keep me')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: /^delete/i }));
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('button', { name: /confirm delete/i })).toBeNull();
    expect(screen.getByText('Keep me')).toBeInTheDocument();
  });

  it('disables resume, new and delete while a run is settling, including armed confirmation', () => {
    const conv = makeConv({ title: 'Busy' });
    const api = makeFakeApiWithConvs([conv]);
    const onResume = vi.fn();
    const onNew = vi.fn();
    const props = { api, activeId: '', onResume, onNew };
    const { rerender } = render(<HistoryView {...props} />);
    fireEvent.click(screen.getByRole('button', { name: /^delete/i }));
    rerender(<HistoryView {...props} disabled />);
    for (const button of screen.getAllByRole('button')) {
      expect(button).toBeDisabled();
      fireEvent.click(button);
    }
    expect(onResume).not.toHaveBeenCalled();
    expect(onNew).not.toHaveBeenCalled();
    expect(screen.getByText('Busy')).toBeInTheDocument();
    rerender(<HistoryView {...props} disabled={false} />);
    expect(screen.queryByRole('button', { name: /confirm delete/i })).toBeNull();
  });

  it('keyboard activation of a resume button invokes onResume once', async () => {
    const conv = makeConv({ title: 'Resume by keyboard' });
    const onResume = vi.fn();
    render(<HistoryView api={makeFakeApiWithConvs([conv])} activeId="" onResume={onResume} onNew={vi.fn()} />);
    const button = screen.getByRole('button', { name: /resume conversation/i });
    button.focus();
    await userEvent.keyboard('{Enter}');
    expect(onResume).toHaveBeenCalledTimes(1);
    await userEvent.keyboard(' ');
    expect(onResume).toHaveBeenCalledTimes(2);
  });

  it('clears pending confirmation when starting a new conversation', () => {
    const conv = makeConv();
    render(<HistoryView api={makeFakeApiWithConvs([conv])} activeId="" onResume={vi.fn()} onNew={vi.fn()} />);
    fireEvent.click(screen.getByRole('button', { name: /^delete/i }));
    fireEvent.click(screen.getByRole('button', { name: /start new/i }));
    expect(screen.queryByRole('button', { name: /confirm delete/i })).toBeNull();
  });

  it('confirmation has a readable description and restores focus on cancel', async () => {
    const conv = makeConv({ title: 'Confirm safely' });
    const { container } = render(<HistoryView api={makeFakeApiWithConvs([conv])} activeId="" onResume={vi.fn()} onNew={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /^delete/i }));
    const confirm = screen.getByRole('button', { name: /confirm delete/i });
    const descriptionId = confirm.getAttribute('aria-describedby');
    expect(descriptionId).toBeTruthy();
    expect(container.querySelector(`[id="${descriptionId}"]`)).toHaveTextContent('Delete this conversation?');
    await userEvent.click(screen.getByRole('button', { name: /cancel delete/i }));
    expect(screen.getByRole('button', { name: /^delete/i })).toHaveFocus();
  });

  it('keeps keyboard focus in the history controls after confirming deletion', async () => {
    const first = makeConv({ title: 'Remove first' });
    const next = makeConv({ title: 'Keep next' });
    render(<HistoryView api={makeFakeApiWithConvs([first, next])} activeId="" onResume={vi.fn()} onNew={vi.fn()} />);
    await userEvent.click(screen.getByRole('button', { name: /^delete "remove first"/i }));
    await userEvent.click(screen.getByRole('button', { name: /confirm delete/i }));
    expect(screen.getByRole('button', { name: /resume conversation: keep next/i })).toHaveFocus();
  });

  it('reloads final receipts after the run settles instead of resuming a stale row snapshot', () => {
    const conv = makeConv({ title: 'Working', messages: [{ role: 'user', content: 'Request' }] });
    const api = makeFakeApiWithConvs([conv]);
    const onResume = vi.fn();
    const props = { api, activeId: conv.id, onResume, onNew: vi.fn() };
    const { rerender } = render(<HistoryView {...props} disabled />);
    const committed: Conversation = { ...conv, title: 'Final receipt', messages: [...conv.messages, { role: 'assistant', content: 'Changes applied' }] };
    saveConversation(api, committed);
    rerender(<HistoryView {...props} disabled={false} />);
    fireEvent.click(screen.getByRole('button', { name: /resume conversation: final receipt/i }));
    expect(onResume).toHaveBeenCalledWith(committed);
  });

  it('looks up the current conversation by id on resume rather than trusting a stale closure', () => {
    const conv = makeConv({ title: 'Saved' });
    const api = makeFakeApiWithConvs([conv]);
    const onResume = vi.fn();
    render(<HistoryView api={api} activeId="" onResume={onResume} onNew={vi.fn()} />);
    const committed: Conversation = { ...conv, messages: [{ role: 'assistant', content: 'new receipt' }] };
    saveConversation(api, committed);
    fireEvent.click(screen.getByRole('button', { name: /resume conversation: saved/i }));
    expect(onResume).toHaveBeenCalledWith(committed);
  });

  it('does not resume a row that was removed in storage after rendering', () => {
    const conv = makeConv({ title: 'Gone' });
    const api = makeFakeApiWithConvs([conv]);
    const onResume = vi.fn();
    render(<HistoryView api={api} activeId="" onResume={onResume} onNew={vi.fn()} />);
    api.storage.set('conversations', '[]');
    fireEvent.click(screen.getByRole('button', { name: /resume conversation: gone/i }));
    expect(onResume).not.toHaveBeenCalled();
    expect(screen.getByText(/no conversations yet/i)).toBeInTheDocument();
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
