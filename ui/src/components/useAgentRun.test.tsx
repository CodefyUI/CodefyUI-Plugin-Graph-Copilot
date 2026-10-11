import React from 'react';
import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { RunTurnOpts } from '../agent/loop';
import type { RunSummary, TurnResult } from '../agent/types';
import type { Conversation } from '../state/conversations';
import { newConversation, listConversations } from '../state/conversations';
import { useAgentRun } from './useAgentRun';

vi.mock('../agent/loop', () => ({ runTurn: vi.fn() }));
vi.mock('./notify', () => ({ notifyRunFinished: vi.fn() }));
import { runTurn } from '../agent/loop';
import { notifyRunFinished } from './notify';

const settings = { provider: 'openai' as const, models: { openai: 'test-model' }, apiKeys: { openai: 'test-only' }, customBaseUrl: '' };
const baseSummary: RunSummary = {
  id: 'result', mode: 'edit', status: 'completed', mutation: 'none', mutationAttempted: false,
  appliedOps: 0, failedOps: 0, validation: { status: 'not_run', errors: [] },
};
const result = (over: Partial<TurnResult> = {}): TurnResult => ({ ...baseSummary, turns: [{ role: 'assistant', content: 'Answer' }], ...over });

function setup() {
  const store = new Map<string, string>();
  const api = { storage: { get: (k: string) => store.get(k) ?? null, set: (k: string, v: string) => store.set(k, v) } } as unknown as CodefyUIPluginAPI;
  const busyChanged = vi.fn();
  const initial = newConversation('openai', 'test-model');
  const hook = renderHook(({ active }: { active: boolean }) => {
    const [conversation, setConversation] = React.useState<Conversation>(initial);
    const run = useAgentRun({ api, settings, conversation, onConversationChange: setConversation, active, onBusyChange: busyChanged });
    return { run, conversation, setConversation };
  }, { initialProps: { active: true } });
  return { ...hook, api, busyChanged };
}

function controlled() {
  const attempts: Array<{ opts: RunTurnOpts; resolve: (value: TurnResult) => void }> = [];
  vi.mocked(runTurn).mockImplementation((opts) => new Promise<TurnResult>((resolve) => { attempts.push({ opts, resolve }); }));
  return attempts;
}

function start(hook: ReturnType<typeof setup>) {
  act(() => { void hook.result.current.run.start('Request', [], 'edit'); });
}

describe('useAgentRun ownership and recovery', () => {
  beforeEach(() => vi.resetAllMocks());

  it('commits returned journals even when the observer did not commit, with one finish', async () => {
    vi.mocked(runTurn).mockImplementation(async ({ callbacks }) => {
      callbacks.onFinished(baseSummary);
      return result();
    });
    const hook = setup();
    await act(async () => { await hook.result.current.run.start('Request', [], 'ask'); });
    expect(hook.result.current.conversation.messages.map((turn) => turn.content)).toEqual(['Request', 'Answer']);
    expect(hook.result.current.run.busy).toBe(false);
    expect(hook.busyChanged.mock.calls).toEqual([[true], [false]]);
    expect(listConversations(hook.api)[0].messages).toHaveLength(2);
  });

  it('uses a synchronous latch and ignores callbacks after settlement', async () => {
    const attempts = controlled();
    const hook = setup();
    act(() => {
      void hook.result.current.run.start('Request', [], 'edit');
      void hook.result.current.run.start('Duplicate', [], 'edit');
    });
    expect(attempts).toHaveLength(1);
    act(() => {
      attempts[0].opts.callbacks.onTurnsCommitted(result().turns);
      attempts[0].opts.callbacks.onFinished(baseSummary);
      attempts[0].opts.callbacks.onTurnsCommitted([{ role: 'assistant', content: 'Late duplicate' }]);
      attempts[0].opts.callbacks.onTextDelta('Late token');
      attempts[0].opts.callbacks.onTurnAppended?.({ role: 'assistant', content: 'Late turn' });
      attempts[0].opts.callbacks.onError('Late error');
    });
    await act(async () => { attempts[0].resolve(result()); });
    expect(hook.result.current.conversation.messages).toHaveLength(2);
    expect(hook.result.current.run.streamingText).toBe('');
    expect(hook.result.current.run.error).toBeNull();
  });

  it('keeps the authoritative outcome when a settled executor emits a late finish', async () => {
    const attempts = controlled();
    const hook = setup();
    start(hook);
    const finalResult = result({ status: 'failed', sideEffectAttempted: true, hostRunId: 'dispatched' });
    await act(async () => attempts[0].resolve(finalResult));
    act(() => attempts[0].opts.callbacks.onFinished(result({ status: 'completed' })));
    expect(hook.result.current.run.summary).toMatchObject({ status: 'failed', sideEffectAttempted: true, hostRunId: 'dispatched' });
    expect(hook.busyChanged.mock.calls).toEqual([[true], [false]]);
    expect(hook.result.current.run.canRetry).toBe(false);
  });

  it('retries the original request and attachments without a second user turn or failed-attempt wire history', async () => {
    const attempts = controlled();
    const hook = setup();
    const attachment = { id: 'att', name: 'notes.txt', kind: 'text' as const, text: 'Notes', mime: 'text/plain', size: 5 };
    act(() => { void hook.result.current.run.start('Request', [attachment], 'ask'); });
    const failure = result({ status: 'failed', reason: 'transport_error', message: '503' });
    await act(async () => {
      attempts[0].opts.callbacks.onError('503');
      attempts[0].opts.callbacks.onTurnsCommitted(failure.turns);
      attempts[0].opts.callbacks.onFinished(failure);
      attempts[0].resolve(failure);
    });
    expect(hook.result.current.run.canRetry).toBe(true);
    act(() => { void hook.result.current.run.retry(); });
    expect(attempts).toHaveLength(2);
    expect(attempts[1].opts).toMatchObject({ history: [], userText: 'Request', attachments: [attachment], mode: 'ask' });
    expect(hook.result.current.conversation.messages.filter((turn) => turn.role === 'user')).toHaveLength(1);
    expect(hook.result.current.conversation.messages.filter((turn) => turn.role === 'assistant')).toHaveLength(1);
  });

  it.each(['applied', 'unknown'] as const)('does not retry %s mutations', async (mutation) => {
    const attempts = controlled();
    const hook = setup();
    start(hook);
    await act(async () => { attempts[0].resolve(result({ status: 'failed', mutation, mutationAttempted: true })); });
    expect(hook.result.current.run.canRetry).toBe(false);
    act(() => { void hook.result.current.run.retry(); });
    expect(attempts).toHaveLength(1);
  });

  it('does not retry a dispatched execution when the canvas was not changed', async () => {
    const attempts = controlled();
    const hook = setup();
    start(hook);
    await act(async () => { attempts[0].resolve(result({ status: 'failed', sideEffectAttempted: true, hostRunId: 'host-run' })); });
    expect(hook.result.current.run.canRetry).toBe(false);
    act(() => { void hook.result.current.run.retry(); });
    expect(attempts).toHaveLength(1);
    expect(hook.result.current.run.summary?.mutation).toBe('none');
  });

  it('cancels execution approval without a callback signal when the view becomes inactive', async () => {
    const attempts = controlled();
    const hook = setup();
    start(hook);
    let decision!: Promise<boolean>;
    act(() => {
      decision = attempts[0].opts.callbacks.onRunApproval!({ reason: 'Train', nodeCount: 1, edgeCount: 0,
        nodeTypes: ['Trainer'], timeoutMinutes: 10, device: 'cpu' });
    });
    expect(hook.result.current.run.runApproval?.reason).toBe('Train');
    hook.rerender({ active: false });
    await expect(decision).resolves.toBe(false);
    expect(hook.result.current.run.runApproval).toBeNull();
    expect(attempts[0].opts.signal?.aborted).toBe(true);
  });

  it('rejects execution approval when its tool signal aborts and ignores late approval requests', async () => {
    const attempts = controlled();
    const hook = setup();
    start(hook);
    const toolAbort = new AbortController();
    const request = { reason: 'Run', nodeCount: 1, edgeCount: 0, nodeTypes: ['Trainer'], timeoutMinutes: 10, device: 'cpu' };
    let decision!: Promise<boolean>;
    act(() => { decision = attempts[0].opts.callbacks.onRunApproval!(request, toolAbort.signal); });
    act(() => toolAbort.abort());
    await expect(decision).resolves.toBe(false);
    expect(hook.result.current.run.runApproval).toBeNull();
    expect(attempts[0].opts.signal?.aborted).toBe(false);
    await act(async () => attempts[0].resolve(result({ status: 'cancelled' })));
    await expect(attempts[0].opts.callbacks.onRunApproval!(request)).resolves.toBe(false);
    expect(hook.result.current.run.runApproval).toBeNull();
  });

  it('a newer approval replaces the previous decision and cannot approve both', async () => {
    const attempts = controlled();
    const hook = setup();
    start(hook);
    let previous!: Promise<boolean>;
    let latest!: Promise<boolean>;
    act(() => {
      previous = attempts[0].opts.callbacks.onRunApproval!({ reason: 'Run', nodeCount: 1, edgeCount: 0,
        nodeTypes: ['Trainer'], timeoutMinutes: 10, device: 'cpu' });
      latest = attempts[0].opts.callbacks.onExperimentApproval!({ hypothesis: 'Compare', variantCount: 2,
        repetitions: 1, executionCount: 2, concurrency: 1, runTimeoutMinutes: 10, applyBest: false,
        variants: [], nodeTypes: ['Trainer'] });
    });
    await expect(previous).resolves.toBe(false);
    expect(hook.result.current.run.runApproval).toBeNull();
    expect(hook.result.current.run.experimentApproval?.hypothesis).toBe('Compare');
    act(() => hook.result.current.run.decide(true));
    await expect(latest).resolves.toBe(true);
  });

  it('keeps live execution progress and notifies once without late callbacks after settlement', async () => {
    const attempts = controlled();
    const hook = setup();
    start(hook);
    const callbacks = attempts[0].opts.callbacks;
    const outcome = { status: 'complete' as const, durationMs: 120000, runId: 'host-run', nodeErrors: {},
      completedNodes: 1, totalNodes: 1, outputs: {}, finalProgress: {}, metrics: { loss: 0.25 }, textTail: '', media: [] };
    act(() => {
      callbacks.onRunStarted?.('host-run');
      callbacks.onRunProgress?.({ phase: 'running', nodeType: 'Trainer', progress: { loss: 0.5 },
        elapsedMs: 1000, completedNodes: 0, totalNodes: 1 });
      callbacks.onRunFinished?.(outcome);
      callbacks.onRunFinished?.(outcome);
    });
    expect(hook.result.current.run.runStatusLine).toContain('Trainer');
    expect(hook.result.current.run.runLossSeries).toEqual([0.5]);
    act(() => callbacks.onRunProgress?.({ phase: 'connecting', elapsedMs: 0, completedNodes: 0, totalNodes: 1 }));
    expect(hook.result.current.run.runLossSeries).toEqual([]);
    expect(notifyRunFinished).toHaveBeenCalledTimes(1);
    await act(async () => attempts[0].resolve(result({ sideEffectAttempted: true, hostRunId: 'host-run' })));
    act(() => {
      callbacks.onRunProgress?.({ phase: 'running', elapsedMs: 2000, completedNodes: 1, totalNodes: 1 });
      callbacks.onRunFinished?.({ ...outcome, runId: 'late' });
    });
    expect(hook.result.current.run.runStatusLine).toBeNull();
    expect(notifyRunFinished).toHaveBeenCalledTimes(1);
  });

  it('blocks replay after an unexpected failure following a host run start', async () => {
    vi.mocked(runTurn).mockImplementation(async ({ callbacks }) => {
      callbacks.onRunStarted?.('host-started');
      throw new Error('Disconnected after submit');
    });
    const hook = setup();
    await act(async () => { await hook.result.current.run.start('Run', [], 'edit'); });
    expect(hook.result.current.run.summary).toMatchObject({ mutation: 'none', sideEffectAttempted: true, hostRunId: 'host-started' });
    expect(hook.result.current.run.canRetry).toBe(false);
  });

  it('does not offer Retry after the user declines a destructive request', async () => {
    vi.mocked(runTurn).mockResolvedValue(result({ status: 'cancelled', reason: 'confirmation_declined' }));
    const hook = setup();
    await act(async () => { await hook.result.current.run.start('Clear', [], 'edit'); });
    expect(hook.result.current.run.canRetry).toBe(false);
  });

  it('stops and rejects pending confirmation when the view becomes inactive', async () => {
    const attempts = controlled();
    const hook = setup();
    start(hook);
    let decision!: Promise<boolean>;
    const opts = attempts[0].opts;
    act(() => { decision = opts.confirmClearGraph!({ runId: opts.runId!, toolCallId: 'clear', nodeCount: 2, edgeCount: 1 }, opts.signal); });
    expect(hook.result.current.run.confirmation?.nodeCount).toBe(2);
    hook.rerender({ active: false });
    expect(opts.signal?.aborted).toBe(true);
    await expect(decision).resolves.toBe(false);
    expect(hook.result.current.run.confirmation).toBeNull();
    act(() => { void hook.result.current.run.start('Offscreen', [], 'edit'); });
    expect(attempts).toHaveLength(1);
  });

  it('confirms once and rejects late confirmation requests after settlement', async () => {
    const attempts = controlled();
    const hook = setup();
    start(hook);
    const opts = attempts[0].opts;
    const request = { runId: opts.runId!, toolCallId: 'clear', nodeCount: 2, edgeCount: 1 };
    let decision!: Promise<boolean>;
    act(() => { decision = opts.confirmClearGraph!(request, opts.signal); });
    act(() => { hook.result.current.run.decide(true); hook.result.current.run.decide(true); });
    await expect(decision).resolves.toBe(true);
    await act(async () => { attempts[0].resolve(result()); });
    await expect(opts.confirmClearGraph!(request, opts.signal)).resolves.toBe(false);
  });

  it('saves an old run to its original conversation but never overwrites a new one', async () => {
    const attempts = controlled();
    const hook = setup();
    const oldId = hook.result.current.conversation.id;
    start(hook);
    const replacement = newConversation('openai', 'test-model');
    act(() => { hook.result.current.setConversation(replacement); });
    expect(attempts[0].opts.signal?.aborted).toBe(true);
    await act(async () => { attempts[0].resolve(result({ status: 'cancelled' })); });
    expect(hook.result.current.conversation).toEqual(replacement);
    expect(hook.result.current.run.summary).toBeNull();
    expect(hook.result.current.run.busy).toBe(false);
    expect(listConversations(hook.api).find((c) => c.id === oldId)?.messages).toHaveLength(2);
    act(() => { void hook.result.current.run.retry(); });
    expect(attempts).toHaveLength(1);
  });

  it('aborts on unmount and persists the final receipt without notifying an unmounted view', async () => {
    const attempts = controlled();
    const hook = setup();
    start(hook);
    hook.unmount();
    expect(attempts[0].opts.signal?.aborted).toBe(true);
    await act(async () => { attempts[0].resolve(result({ status: 'cancelled' })); });
    expect(listConversations(hook.api)[0].messages).toHaveLength(2);
    expect(hook.busyChanged.mock.calls).toEqual([[true]]);
  });

  it('blocks retry conservatively when an unexpected executor throw follows a mutation call', async () => {
    vi.mocked(runTurn).mockImplementation(async ({ callbacks }) => {
      callbacks.onTurnAppended?.({ role: 'assistant', content: '', tool_calls: [{ id: 'apply', name: 'apply_graph_operations', arguments: { operations: [] } }] });
      callbacks.onOpsApplied('Applied', { results: [], refs: {}, node_count: 0, edge_count: 0 });
      throw new Error('Host disconnected');
    });
    const hook = setup();
    await act(async () => { await hook.result.current.run.start('Request', [], 'edit'); });
    expect(hook.result.current.run.summary).toMatchObject({ status: 'failed', mutation: 'unknown', mutationAttempted: true });
    expect(hook.result.current.run.canRetry).toBe(false);
    expect(hook.result.current.run.error).toBe('Host disconnected');
  });

  it('supports error recovery for a thrown request without a mutation and ignores blank input', async () => {
    vi.mocked(runTurn).mockRejectedValue('Offline');
    const hook = setup();
    await act(async () => { await hook.result.current.run.start('  ', [], 'edit'); });
    expect(runTurn).not.toHaveBeenCalled();
    await act(async () => { await hook.result.current.run.start('Request', [], 'edit'); });
    expect(hook.result.current.run.canRetry).toBe(true);
    expect(hook.result.current.run.error).toBe('Offline');
  });
});
