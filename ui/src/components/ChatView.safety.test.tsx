import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Conversation } from '../state/conversations';
import type { RunTurnOpts } from '../agent/loop';
import { newConversation } from '../state/conversations';
import { ChatView } from './ChatView';

vi.mock('../agent/loop', () => ({ runTurn: vi.fn() }));
vi.mock('../state/attachments', async (original) => ({
  ...await original<typeof import('../state/attachments')>(),
  readFileAsAttachment: vi.fn(),
}));
import { runTurn } from '../agent/loop';
import { readFileAsAttachment } from '../state/attachments';

const settings = {
  provider: 'openai' as const, models: { openai: 'test-model' },
  apiKeys: { openai: 'test-only' }, customBaseUrl: '',
};

function setup() {
  const storage = new Map<string, string>();
  const api = {
    graph: { getGraph: () => ({ nodes: [], edges: [] }), getNodeDefinitions: () => [] },
    storage: { get: (key: string) => storage.get(key) ?? null, set: (key: string, value: string) => storage.set(key, value) },
  } as unknown as CodefyUIPluginAPI;
  let latest: Conversation;
  function Harness() {
    const [conversation, update] = React.useState(() => newConversation('openai', 'test-model'));
    latest = conversation;
    return <ChatView api={api} settings={settings} codexLoggedIn={false} conversation={conversation}
      onConversationChange={update} onOpenSettings={vi.fn()} onOpenHistory={vi.fn()} />;
  }
  render(<Harness />);
  return { input: screen.getByRole('textbox', { name: 'Message input' }), latest: () => latest };
}

function pendingRun() {
  let opts: RunTurnOpts;
  vi.mocked(runTurn).mockImplementation((value) => {
    opts = value;
    return new Promise(() => {});
  });
  return () => opts;
}

describe('ChatView safe input and recovery', () => {
  beforeEach(() => vi.clearAllMocks());

  it('changes Ask/Edit with the keyboard and fixes the mode for the running request', () => {
    const capture = pendingRun();
    const { input } = setup();
    const edit = screen.getByRole('radio', { name: 'Edit' });
    const ask = screen.getByRole('radio', { name: 'Ask' });
    edit.focus();
    fireEvent.keyDown(edit, { key: 'ArrowLeft' });
    expect(ask).toHaveFocus();
    expect(ask).toHaveAttribute('aria-checked', 'true');
    fireEvent.change(input, { target: { value: 'Explain' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(capture().mode).toBe('ask');
    expect(ask).toBeDisabled();
    expect(edit).toBeDisabled();
  });

  it('respects scrollback and offers an explicit jump to the latest content', () => {
    const capture = pendingRun();
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Request' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    const log = screen.getByRole('log', { name: 'Conversation' });
    Object.defineProperty(log, 'scrollHeight', { configurable: true, value: 1000 });
    Object.defineProperty(log, 'clientHeight', { configurable: true, value: 200 });
    log.scrollTop = 100;
    fireEvent.scroll(log);
    act(() => capture().callbacks.onTextDelta('New output'));
    expect(log.scrollTop).toBe(100);
    fireEvent.click(screen.getByRole('button', { name: 'Jump to latest' }));
    expect(log.scrollTop).toBe(1000);
    expect(screen.queryByRole('button', { name: 'Jump to latest' })).toBeNull();
  });

  it('does not submit Enter during IME composition', () => {
    pendingRun();
    const { input } = setup();
    fireEvent.change(input, { target: { value: '建立分類模型' } });
    fireEvent.compositionStart(input);
    fireEvent.keyDown(input, { key: 'Enter', isComposing: true, keyCode: 229 });
    expect(runTurn).not.toHaveBeenCalled();
    fireEvent.compositionEnd(input);
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(runTurn).toHaveBeenCalledTimes(1);
  });

  it('uses the attachment-loading guard for Enter as well as the send button', () => {
    pendingRun();
    vi.mocked(readFileAsAttachment).mockImplementation(() => new Promise(() => {}));
    const { input } = setup();
    fireEvent.change(input, { target: { value: 'Read this' } });
    fireEvent.paste(input, { clipboardData: { files: [new File(['pending'], 'pending.txt')] } });
    fireEvent.keyDown(input, { key: 'Enter' });
    expect(runTurn).not.toHaveBeenCalled();
    expect(screen.getByText('pending.txt')).toBeInTheDocument();
    expect(input).toHaveValue('Read this');
  });

  it('stages a suggested prompt without sending it', () => {
    pendingRun();
    const { input } = setup();
    fireEvent.click(screen.getByRole('button', { name: 'Explain what my current graph does' }));
    expect(runTurn).not.toHaveBeenCalled();
    expect(input).toHaveValue('Explain what my current graph does');
    expect(input).toHaveFocus();
  });

  it('offers continuation instead of replay after an attempted graph execution', async () => {
    const capture = pendingRun();
    const { input, latest } = setup();
    fireEvent.change(input, { target: { value: 'Run the training graph' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    act(() => {
      capture().callbacks.onTurnsCommitted([{ role: 'assistant', content: 'The host run was interrupted.' }]);
      capture().callbacks.onFinished({ id: 'execution', mode: 'edit', status: 'failed', mutation: 'none',
        mutationAttempted: false, sideEffectAttempted: true, hostRunId: 'host-execution',
        appliedOps: 0, failedOps: 0, validation: { status: 'not_run', errors: [] } });
    });
    expect(screen.queryByRole('button', { name: 'Retry' })).toBeNull();
    fireEvent.click(screen.getByRole('button', { name: 'Continue from current graph' }));
    await waitFor(() => expect(runTurn).toHaveBeenCalledTimes(2));
    expect(vi.mocked(runTurn).mock.calls[1][0].userText).toContain('do not replay operations or executions already dispatched');
    expect(latest().messages.filter((turn) => turn.role === 'user')).toHaveLength(2);
    expect(latest().messages.filter((turn) => turn.content === 'Run the training graph')).toHaveLength(1);
  });

  it('retries a failed read-only attempt without duplicating the original user turn', async () => {
    const capture = pendingRun();
    const { input, latest } = setup();
    fireEvent.change(input, { target: { value: 'Describe this graph' } });
    fireEvent.keyDown(input, { key: 'Enter' });
    act(() => {
      capture().callbacks.onTurnsCommitted([]);
      capture().callbacks.onError('HTTP 503: unavailable');
      capture().callbacks.onFinished();
    });
    fireEvent.click(screen.getByRole('button', { name: 'Retry' }));
    await waitFor(() => expect(runTurn).toHaveBeenCalledTimes(2));
    expect(latest().messages.filter((turn) => turn.role === 'user')).toHaveLength(1);
    expect(vi.mocked(runTurn).mock.calls[1][0].history).toEqual([]);
  });
});
