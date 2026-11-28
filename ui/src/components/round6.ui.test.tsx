/** Round 6 UI: the reasoning run bar (P10) and the save, write and read
 * approval cards (P7, P9), in English and Traditional Chinese. */
import React, { act } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Settings } from '../state/settings';
import { newConversation } from '../state/conversations';
import { translate } from '../i18n';
import type { MessageKey } from '../i18n';
import type { FileApprovalRequest } from '../agent/tools/types';

vi.mock('../agent/loop', () => ({ runTurn: vi.fn() }));
vi.mock('../state/conversations', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../state/conversations')>();
  return { ...actual, saveConversation: vi.fn() };
});

import { runTurn } from '../agent/loop';
import type { RunTurnOpts, TurnCallbacks } from '../agent/loop';
import { ChatView } from './ChatView';
import { FileApprovalCard } from './FileApprovalCard';

const SETTINGS: Settings = { provider: 'openai', models: { openai: 'gpt-x' }, apiKeys: { openai: 'sk' }, customBaseUrl: '' };
const api = {
  apiVersion: 7, pluginId: 'graph-copilot', ui: { addFloatingWidget: vi.fn(), toast: vi.fn() },
  graph: { getGraph: vi.fn(() => ({ nodes: [], edges: [] })), getNodeDefinitions: vi.fn(() => []), applyOperations: vi.fn(), onGraphChanged: vi.fn(() => () => {}) },
  http: { fetch: vi.fn() }, storage: { get: vi.fn(() => null), set: vi.fn(), remove: vi.fn() },
} as unknown as CodefyUIPluginAPI;

function Harness() {
  const [conversation, setConversation] = React.useState(() => newConversation('openai', 'gpt-x'));
  return <ChatView api={api} settings={SETTINGS} codexLoggedIn={false} conversation={conversation}
    onConversationChange={setConversation} onOpenSettings={vi.fn()} onOpenHistory={vi.fn()} />;
}

async function startRun(): Promise<TurnCallbacks> {
  let cbs: TurnCallbacks | null = null;
  vi.mocked(runTurn).mockImplementation((opts: RunTurnOpts) => { cbs = opts.callbacks; return new Promise(() => {}); });
  render(<Harness />);
  const textarea = screen.getByRole('combobox', { name: /message input/i });
  await userEvent.type(textarea, 'go');
  fireEvent.keyDown(textarea, { key: 'Enter', shiftKey: false });
  await waitFor(() => expect(runTurn).toHaveBeenCalledTimes(1));
  return cbs!;
}

const runbar = () => screen.getByRole('status', { name: /agent activity/i });

beforeEach(() => vi.clearAllMocks());
afterEach(() => { document.documentElement.lang = 'en'; vi.useRealTimers(); });

describe('P10: reasoning in the run bar', () => {
  it('shows "Reasoning" with seconds while the host streams reasoning, then the reply', async () => {
    const cbs = await startRun();
    expect(runbar().textContent).toContain('Thinking');
    act(() => cbs.onReasoning!());
    expect(runbar().textContent).toMatch(/Reasoning · \d+s/);
    act(() => cbs.onTextDelta('Answer'));
    expect(runbar().textContent).not.toMatch(/Reasoning/);
    expect(runbar().textContent).toContain('Writing reply');
  });

  it('never shows reasoning text (none is passed on)', async () => {
    const cbs = await startRun();
    act(() => cbs.onReasoning!());
    expect(document.body.textContent).not.toMatch(/secret thought/);
  });

  it('has a zh-TW label', () => {
    expect(translate('zh-TW', 'phase.reasoning', { seconds: 12 })).toBe('推理中 · 12 秒');
  });

  it('shows a file card through onFileApproval and resolves it from the buttons', async () => {
    const cbs = await startRun();
    let decided: boolean | undefined;
    act(() => { void cbs.onFileApproval!({ action: 'save_graph', name: 'iris-mlp', inPlace: false, overwrites: null, tab: 'Iris' }).then((value) => { decided = value; }); });
    expect(await screen.findByRole('heading', { name: 'Save as iris-mlp?' })).toBeInTheDocument();
    expect(runbar().textContent).toContain('Waiting for approval');
    await userEvent.click(screen.getByRole('button', { name: 'Save' }));
    await waitFor(() => expect(decided).toBe(true));
  });
});

function card(request: FileApprovalRequest, lang: 'en' | 'zh-TW' = 'en') {
  document.documentElement.lang = lang;
  const t = (key: MessageKey, vars?: Record<string, string | number>) => translate(lang, key, vars);
  return render(<FileApprovalCard request={request} active onDecide={vi.fn()} t={t} />);
}

describe('P7/P9 approval cards', () => {
  it('save as: plain card', () => {
    const { container } = card({ action: 'save_graph', name: 'iris-mlp', inPlace: false, overwrites: null, tab: 'Iris' });
    expect(screen.getByRole('heading')).toHaveTextContent('Save as iris-mlp?');
    expect(container.querySelector('.gcp-approval--danger')).toBeNull();
  });

  it('save in place: "save the changes to"', () => {
    card({ action: 'save_graph', name: 'iris', inPlace: true, overwrites: null, tab: 'iris' });
    expect(screen.getByRole('heading')).toHaveTextContent('Save the changes to iris?');
  });

  it('replacing another graph: danger style naming it', () => {
    const { container } = card({ action: 'save_graph', name: 'iris', inPlace: false, overwrites: 'iris', tab: 'Iris copy' });
    expect(container.querySelector('.gcp-approval--danger')).not.toBeNull();
    expect(screen.getByRole('heading')).toHaveTextContent('Replace the saved graph iris?');
    expect(screen.getByRole('note')).toHaveTextContent(/iris is overwritten/);
  });

  it('new file: whole content; mods warning', () => {
    card({ action: 'project_write', path: 'mods/nodes/scale.py', created: true, content: 'class Scale:\n    pass\n', bytes: 22, mods: true, agentInstructions: false });
    expect(screen.getByRole('heading')).toHaveTextContent('Create mods/nodes/scale.py?');
    expect(screen.getByLabelText('New file content')).toHaveTextContent('class Scale:');
    expect(screen.getByText(/code that runs on your computer/)).toBeInTheDocument();
  });

  it('existing file: diff lines are marked', () => {
    const { container } = card({ action: 'project_write', path: 'README.md', created: false, diff: '  one\n- two\n+ 2', bytes: 6, mods: false, agentInstructions: false });
    expect(container.querySelector('.gcp-diff-del')).toHaveTextContent('- two');
    expect(container.querySelector('.gcp-diff-add')).toHaveTextContent('+ 2');
  });

  it('AGENTS.md: danger style and the prompt warning', () => {
    const { container } = card({ action: 'project_write', path: 'AGENTS.md', created: false, diff: null, bytes: 10, mods: false, agentInstructions: true });
    expect(container.querySelector('.gcp-approval--danger')).not.toBeNull();
    expect(screen.getByText(/every later conversation/)).toBeInTheDocument();
    expect(screen.getByText(/too large to show a line diff/)).toBeInTheDocument();
  });

  it('data read: file, size and provider', () => {
    card({ action: 'data_read', path: 'data/x.csv', size: 2048, provider: 'openai (gpt-x)' });
    expect(screen.getByRole('heading')).toHaveTextContent('Send data/x.csv to the model provider?');
    expect(screen.getByText(/2(\.0)? KB/)).toBeInTheDocument();
    expect(screen.getByText(/sent to openai \(gpt-x\)/)).toBeInTheDocument();
  });

  it('zh-TW text for each card', () => {
    const save = card({ action: 'save_graph', name: 'iris-mlp', inPlace: false, overwrites: null, tab: 'Iris' }, 'zh-TW');
    expect(screen.getByRole('heading')).toHaveTextContent('存成 iris-mlp？');
    save.unmount();
    const write = card({ action: 'project_write', path: 'mods/nodes/a.py', created: true, content: 'x', bytes: 1, mods: true, agentInstructions: false }, 'zh-TW');
    expect(screen.getByText(/會在你電腦上執行的程式碼/)).toBeInTheDocument();
    write.unmount();
    card({ action: 'data_read', path: 'data/x.csv', size: null, provider: 'custom endpoint http://127.0.0.1:11434/v1' }, 'zh-TW');
    expect(screen.getByRole('heading')).toHaveTextContent('把 data/x.csv 送給模型供應商？');
  });
});
