import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Conversation } from '../state/conversations';
import type { RunTurnOpts } from '../agent/loop';
import type { TurnResult } from '../agent/types';
import { newConversation } from '../state/conversations';
import { ChatView } from './ChatView';

vi.mock('../agent/loop', () => ({ runTurn: vi.fn() }));
vi.mock('../state/attachments', async (original) => ({
  ...await original<typeof import('../state/attachments')>(),
  readFileAsAttachment: vi.fn(),
}));
import { runTurn } from '../agent/loop';

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
  return { input: screen.getByRole('combobox', { name: 'Message input' }), latest: () => latest };
}

function pendingRun() {
  let opts: RunTurnOpts;
  let resolve!: (result: TurnResult) => void;
  vi.mocked(runTurn).mockImplementation((value) => {
    opts = value;
    return new Promise<TurnResult>((done) => { resolve = done; });
  });
  return Object.assign(() => opts, { settle: (result: TurnResult) => resolve(result) });
}


// Read as test data like styles.test.ts does (a CSS ?raw import is empty under
// Vitest, and Node's types are not part of this project).
const { readFileSync } = await vi.importActual<{ readFileSync(path: string, encoding: 'utf8'): string }>('node:fs');
const css = readFileSync('src/styles.css', 'utf8');
const rule = (selector: string) => css.match(new RegExp(`(^|\\n)${selector.replace(/[.]/g, '\\.')} \\{([^}]*)\\}`))?.[2] ?? '';

async function finishWith(status: TurnResult['status'], reason: string, error?: string) {
  const capture = pendingRun();
  const { input } = setup();
  fireEvent.change(input, { target: { value: 'Describe this graph' } });
  fireEvent.keyDown(input, { key: 'Enter' });
  const summary = { id: 'r1', mode: 'edit' as const, status, reason, mutation: 'none' as const, mutationAttempted: false,
    appliedOps: 0, failedOps: 0, validation: { status: 'not_run' as const, errors: [] } };
  const turns = [{ role: 'assistant' as const, content: '', runId: 'r1', runSummary: summary }];
  await act(async () => {
    capture().callbacks.onTurnsCommitted(turns);
    if (error) capture().callbacks.onError(error);
    capture().callbacks.onFinished(summary);
    capture.settle({ ...summary, turns });
  });
}

describe('U3: one failure block, neutral Stop', () => {
  beforeEach(() => vi.clearAllMocks());

  it('reads the real stylesheet (the CSS checks below would pass on an empty one)', () => {
    expect(css.length).toBeGreaterThan(10_000);
    expect(rule('.gcp-retry-btn')).toMatch(/padding/);
  });

  it('a failed request shows one block: reason, real error, facts, then Retry', async () => {
    await finishWith('failed', 'stream_error', 'HTTP 502: upstream refused');
    const blocks = document.querySelectorAll('.gcp-run-result');
    expect(blocks).toHaveLength(1);
    expect(document.querySelector('.gcp-error-row')).toBeNull();
    expect(screen.getAllByRole('alert')).toHaveLength(1);
    const block = blocks[0] as HTMLElement;
    const text = block.textContent ?? '';
    const order = ['Failed', 'The model request failed.', 'HTTP 502: upstream refused', 'No graph changes', 'Validation not run', 'Retry']
      .map((part) => text.indexOf(part));
    expect(order.every((at) => at >= 0)).toBe(true);
    expect([...order].sort((a, b) => a - b)).toEqual(order);
    expect(block.querySelector('.gcp-run-result-facts')?.textContent).toBe('No graph changes · Validation not run');
    // The old generic advice is gone from the block.
    expect(text).not.toContain('Check the recorded mutation state');
  });

  it('Retry uses the secondary button look, not the danger colour', async () => {
    await finishWith('failed', 'stream_error', 'HTTP 502: upstream refused');
    const retry = screen.getByRole('button', { name: 'Retry' });
    expect(retry).toHaveClass('gcp-secondary-btn');
    expect(retry).not.toHaveClass('gcp-danger-btn');
    expect(rule('.gcp-retry-btn')).not.toMatch(/danger/);
    expect(rule('.gcp-retry-btn:hover')).not.toMatch(/danger/);
  });

  it('a user Stop is neutral: no alert and no error-coloured bar', async () => {
    await finishWith('cancelled', 'aborted', 'The operation was aborted.');
    const block = document.querySelector('.gcp-run-result.cancelled') as HTMLElement;
    expect(block).toBeTruthy();
    expect(block.textContent).toContain('Stopped');
    expect(screen.queryAllByRole('alert')).toHaveLength(0);
    expect(document.querySelector('.gcp-error-row')).toBeNull();
    expect(rule('.gcp-run-result.cancelled')).toMatch(/border-color: var\(--gcp-border-strong\)/);
    expect(rule('.gcp-run-result.cancelled')).not.toMatch(/danger/);
  });
});
