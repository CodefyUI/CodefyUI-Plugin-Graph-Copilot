/**
 * ChatView — interaction coverage beyond the basic send path:
 * stop-while-busy (+ abort), drag-and-drop, paste, chip removal, read errors,
 * and the welcome-screen "previous conversations" shortcut.
 */
import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import type { Conversation } from '../state/conversations';
import { newConversation } from '../state/conversations';
import type { Attachment } from '../state/attachments';

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

const READY_SETTINGS: Settings = {
  provider: 'openai',
  models: { openai: 'gpt-5.2' },
  apiKeys: { openai: 'sk-test' },
  customBaseUrl: '',
};

function makeFakeApi(stored: Record<string, string> = {}): CodefyUIPluginAPI {
  return {
    apiVersion: 1,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
    graph: {
      getGraph: vi.fn().mockReturnValue({ nodes: [], edges: [] }),
      getNodeDefinitions: vi.fn().mockReturnValue([]),
      applyOperations: vi.fn(),
      onGraphChanged: vi.fn().mockReturnValue(() => {}),
    },
    http: { fetch: vi.fn() },
    storage: { get: vi.fn((k: string) => stored[k] ?? null), set: vi.fn(), remove: vi.fn() },
  } as unknown as CodefyUIPluginAPI;
}

function readyAttachment(over: Partial<Attachment> = {}): Attachment {
  return { id: 'att', kind: 'text', name: 'f.txt', size: 5, mime: 'text/plain', text: 'hello', ...over };
}

function renderChatView(api: CodefyUIPluginAPI, over: Partial<React.ComponentProps<typeof ChatView>> = {}) {
  const props: React.ComponentProps<typeof ChatView> = {
    api,
    settings: READY_SETTINGS,
    codexLoggedIn: false,
    conversation: newConversation('openai', 'gpt-5.2'),
    onConversationChange: vi.fn(),
    onOpenSettings: vi.fn(),
    onOpenHistory: vi.fn(),
    ...over,
  };
  return render(<ChatView {...props} />);
}

describe('ChatView interactions', () => {
  beforeEach(() => vi.clearAllMocks());

  it('shows a Stop button while busy and aborts the stream on click', async () => {
    let capturedSignal: AbortSignal | undefined;
    vi.mocked(runTurn).mockImplementation((opts: RunTurnOpts) => {
      capturedSignal = opts.signal;
      return new Promise<void>(() => {}); // never resolves -> stays busy
    });
    renderChatView(makeFakeApi());
    const textarea = screen.getByRole('textbox', { name: /message input/i });
    await userEvent.type(textarea, 'hi');
    fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });

    const stopBtn = await screen.findByRole('button', { name: /stop generation/i });
    fireEvent.click(stopBtn);
    expect(capturedSignal?.aborted).toBe(true);
  });

  it('shows the drop overlay on drag enter and clears it on drag leave', () => {
    const { container } = renderChatView(makeFakeApi());
    const surface = container.querySelector('.gcp-chat') as HTMLElement;

    fireEvent.dragEnter(surface, { dataTransfer: { types: ['Files'] } });
    expect(screen.getByText(/drop files to attach/i)).toBeTruthy();
    fireEvent.dragOver(surface, { dataTransfer: { types: ['Files'] } });
    fireEvent.dragLeave(surface);
    expect(screen.queryByText(/drop files to attach/i)).toBeNull();
  });

  it('stages a dropped file', async () => {
    vi.mocked(readFileAsAttachment).mockResolvedValue(readyAttachment({ name: 'dropped.txt' }));
    const { container } = renderChatView(makeFakeApi());
    const surface = container.querySelector('.gcp-chat') as HTMLElement;
    const file = new File(['hello'], 'dropped.txt', { type: 'text/plain' });

    fireEvent.drop(surface, { dataTransfer: { types: ['Files'], files: [file] } });
    expect(await screen.findByText('dropped.txt')).toBeTruthy();
  });

  it('stages a pasted file', async () => {
    vi.mocked(readFileAsAttachment).mockResolvedValue(
      readyAttachment({ kind: 'image', name: 'p.png', mime: 'image/png', text: undefined, dataUrl: 'data:image/png;base64,AAAA' }),
    );
    renderChatView(makeFakeApi());
    const textarea = screen.getByRole('textbox', { name: /message input/i });
    const file = new File([new Uint8Array([1, 2, 3, 4])], 'p.png', { type: 'image/png' });

    fireEvent.paste(textarea, { clipboardData: { types: ['Files'], files: [file] } });
    expect(await screen.findByText('p.png')).toBeTruthy();
  });

  it('removes a staged attachment when its remove button is clicked', async () => {
    vi.mocked(readFileAsAttachment).mockResolvedValue(readyAttachment({ name: 'r.txt' }));
    renderChatView(makeFakeApi());
    const textarea = screen.getByRole('textbox', { name: /message input/i });
    const file = new File(['abc'], 'r.txt', { type: 'text/plain' });

    fireEvent.paste(textarea, { clipboardData: { types: ['Files'], files: [file] } });
    expect(await screen.findByText('r.txt')).toBeTruthy();
    fireEvent.click(screen.getByRole('button', { name: /remove r\.txt/i }));
    expect(screen.queryByText('r.txt')).toBeNull();
  });

  it('marks an attachment failed when reading rejects', async () => {
    vi.mocked(readFileAsAttachment).mockRejectedValue(new Error('too big'));
    renderChatView(makeFakeApi());
    const textarea = screen.getByRole('textbox', { name: /message input/i });
    const file = new File(['x'], 'bad.txt', { type: 'text/plain' });

    fireEvent.paste(textarea, { clipboardData: { types: ['Files'], files: [file] } });
    expect(await screen.findByText(/failed/i)).toBeTruthy();
  });

  it('offers a previous-conversations shortcut on the welcome screen', () => {
    const other: Conversation = {
      id: 'other', title: 'Earlier', createdAt: 1, updatedAt: 1,
      provider: 'openai', model: 'm', messages: [],
    };
    const api = makeFakeApi({ conversations: JSON.stringify([other]) });
    const onOpenHistory = vi.fn();
    renderChatView(api, { onOpenHistory });

    const btn = screen.getByRole('button', { name: /view previous conversations/i });
    fireEvent.click(btn);
    expect(onOpenHistory).toHaveBeenCalledTimes(1);
  });
});
