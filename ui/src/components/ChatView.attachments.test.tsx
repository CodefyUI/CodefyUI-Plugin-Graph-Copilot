/**
 * Tests for ChatView attachment handling.
 *
 * readFileAsAttachment is mocked with a deferred promise so we can assert the
 * loading -> ready transition, send gating, removal, and that the attachment is
 * forwarded to runTurn.
 */

import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { Mock } from 'vitest';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CodefyUIPluginAPI, SerializedGraph, NodeDefinition } from '../types/codefyui';
import type { Settings } from '../state/settings';
import type { Conversation } from '../state/conversations';
import { newConversation } from '../state/conversations';
import type { Attachment } from '../state/attachments';

// ---------------------------------------------------------------------------
// Mocks — runTurn (no-op), saveConversation (no storage), readFileAsAttachment
// ---------------------------------------------------------------------------

vi.mock('../agent/loop', () => ({ runTurn: vi.fn() }));

vi.mock('../state/conversations', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../state/conversations')>();
  return { ...actual, saveConversation: vi.fn() };
});

vi.mock('../state/attachments', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../state/attachments')>();
  return { ...actual, readFileAsAttachment: vi.fn() };
});

import { runTurn } from '../agent/loop';
import type { RunTurnOpts } from '../agent/loop';
import { readFileAsAttachment } from '../state/attachments';
import { ChatView } from './ChatView';

// ---------------------------------------------------------------------------
// Fakes
// ---------------------------------------------------------------------------

const FAKE_DEFS: NodeDefinition[] = [];
const FAKE_GRAPH: SerializedGraph = { nodes: [], edges: [] };

function makeFakeApi(): CodefyUIPluginAPI {
  return {
    apiVersion: 1,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn().mockReturnValue(FAKE_GRAPH),
      getNodeDefinitions: vi.fn().mockReturnValue(FAKE_DEFS),
      applyOperations: vi.fn(),
      onGraphChanged: vi.fn().mockReturnValue(() => {}),
    },
    http: { fetch: vi.fn() },
    storage: { get: vi.fn().mockReturnValue(null), set: vi.fn(), remove: vi.fn() },
  } as unknown as CodefyUIPluginAPI;
}

const READY_SETTINGS: Settings = {
  provider: 'openai',
  models: { openai: 'gpt-5.2' },
  apiKeys: { openai: 'sk-test' },
  customBaseUrl: '',
};

function renderChatView(conversation?: Conversation) {
  const api = makeFakeApi();
  const onConversationChange = vi.fn();
  const result = render(
    <ChatView
      api={api}
      settings={READY_SETTINGS}
      codexLoggedIn={false}
      conversation={conversation ?? newConversation('openai', 'gpt-5.2')}
      onConversationChange={onConversationChange}
      onOpenSettings={vi.fn()}
    />,
  );
  return { ...result, api, onConversationChange };
}

function fileInputOf(container: HTMLElement): HTMLInputElement {
  const el = container.querySelector('.gcp-file-input');
  if (!el) throw new Error('file input not found');
  return el as HTMLInputElement;
}

function makeAtt(over: Partial<Attachment> = {}): Attachment {
  return { id: 'a1', kind: 'text', name: 'a.txt', size: 5, mime: 'text/plain', text: 'hello', ...over };
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------

describe('ChatView attachments', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (runTurn as Mock).mockImplementation(async (opts: RunTurnOpts) => {
      opts.callbacks.onTurnsCommitted([{ role: 'assistant', content: 'ok' }]);
      opts.callbacks.onFinished();
    });
  });

  it('shows a chip in loading state then ready after the read resolves', async () => {
    let resolveRead!: (a: Attachment) => void;
    (readFileAsAttachment as Mock).mockReturnValue(
      new Promise<Attachment>((r) => { resolveRead = r; }),
    );

    const { container } = renderChatView();
    const file = new File(['hello'], 'a.txt', { type: 'text/plain' });

    fireEvent.change(fileInputOf(container), { target: { files: [file] } });

    // Loading chip
    expect(await screen.findByText('a.txt')).toBeInTheDocument();
    expect(screen.getByText(/reading/i)).toBeInTheDocument();

    // Resolve the read -> ready chip (size shown)
    await act(async () => { resolveRead(makeAtt()); });
    await waitFor(() => expect(screen.queryByText(/reading/i)).not.toBeInTheDocument());
  });

  it('send is disabled while a file is still loading', async () => {
    (readFileAsAttachment as Mock).mockReturnValue(new Promise<Attachment>(() => { /* never */ }));

    const { container } = renderChatView();
    await userEvent.type(screen.getByRole('textbox', { name: /message input/i }), 'hi');

    fireEvent.change(fileInputOf(container), {
      target: { files: [new File(['x'], 'a.txt', { type: 'text/plain' })] },
    });

    await screen.findByText('a.txt');
    expect(screen.getByRole('button', { name: /send message/i })).toBeDisabled();
  });

  it('forwards the ready attachment to runTurn and clears the chip after send', async () => {
    let resolveRead!: (a: Attachment) => void;
    (readFileAsAttachment as Mock).mockReturnValue(
      new Promise<Attachment>((r) => { resolveRead = r; }),
    );

    const { container } = renderChatView();
    await userEvent.type(screen.getByRole('textbox', { name: /message input/i }), 'review this');

    fireEvent.change(fileInputOf(container), {
      target: { files: [new File(['hello'], 'a.txt', { type: 'text/plain' })] },
    });
    await screen.findByText('a.txt');
    await act(async () => { resolveRead(makeAtt()); });

    const sendBtn = screen.getByRole('button', { name: /send message/i });
    await waitFor(() => expect(sendBtn).not.toBeDisabled());
    await userEvent.click(sendBtn);

    await waitFor(() => expect(runTurn).toHaveBeenCalledTimes(1));
    const opts = (runTurn as Mock).mock.calls[0][0] as RunTurnOpts;
    expect(opts.userText).toBe('review this');
    expect(opts.attachments).toHaveLength(1);
    expect(opts.attachments![0].name).toBe('a.txt');

    // Chip cleared after send
    await waitFor(() => expect(screen.queryByText('a.txt')).not.toBeInTheDocument());
  });

  it('removing a chip drops it from the staged list', async () => {
    let resolveRead!: (a: Attachment) => void;
    (readFileAsAttachment as Mock).mockReturnValue(
      new Promise<Attachment>((r) => { resolveRead = r; }),
    );

    const { container } = renderChatView();
    fireEvent.change(fileInputOf(container), {
      target: { files: [new File(['hello'], 'a.txt', { type: 'text/plain' })] },
    });
    await screen.findByText('a.txt');
    await act(async () => { resolveRead(makeAtt()); });

    await userEvent.click(screen.getByRole('button', { name: /remove a\.txt/i }));
    expect(screen.queryByText('a.txt')).not.toBeInTheDocument();
  });

  it('shows an error chip when the read fails', async () => {
    (readFileAsAttachment as Mock).mockRejectedValue(new Error('too large'));

    const { container } = renderChatView();
    fireEvent.change(fileInputOf(container), {
      target: { files: [new File(['x'], 'big.png', { type: 'image/png' })] },
    });

    expect(await screen.findByText('big.png')).toBeInTheDocument();
    await waitFor(() => expect(screen.getByText(/failed/i)).toBeInTheDocument());
  });
});
