import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../../llm/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../llm/client')>();
  return { ...actual, streamChat: vi.fn() };
});

import { runTurn, TOOLS } from '../loop';
import { BUILTIN_TOOLS, createToolRegistry, toolRegistry, toWire } from './index';
import type { ToolDefinition, ToolEnvironment } from './types';
import { SETTINGS, callbacks, fakeApi, scriptModel } from '../../test/agentHarness';

const env = (mode: 'ask' | 'edit' = 'edit'): ToolEnvironment => ({ api: fakeApi(), settings: SETTINGS, mode });

beforeEach(() => { vi.clearAllMocks(); });

describe('the built-in registry', () => {
  it('keeps the ten tools, in their order, with the wire shape the loop sends', () => {
    expect(BUILTIN_TOOLS.map((tool) => tool.name)).toEqual([
      'apply_graph_operations', 'get_current_graph', 'get_node_schemas', 'validate_graph', 'run_graph',
      'research', 'run_graph_experiments', 'optimize_graph_parameters', 'list_runs', 'get_run',
    ]);
    expect(TOOLS).toEqual(BUILTIN_TOOLS.map(toWire));
    for (const tool of TOOLS) expect(Object.keys(tool).sort()).toEqual(['description', 'input_schema', 'name']);
  });

  it('derives the read-only set the loop used to hard-code', () => {
    expect(toolRegistry.list({ mode: 'ask', env: env('ask') }).map((tool) => tool.name)).toEqual([
      'get_current_graph', 'get_node_schemas', 'validate_graph', 'research', 'list_runs', 'get_run',
    ]);
  });

  it('declares approval for clearing, running and experiments only', () => {
    const declared = (name: string, input: Record<string, unknown> = {}) => toolRegistry.get(name)!.approval?.(input, env()) ?? null;
    expect(declared('apply_graph_operations', { operations: [{ op: 'clear_graph' }] })).toEqual({ kind: 'clear_graph' });
    expect(declared('apply_graph_operations', { operations: [{ op: 'auto_layout' }] })).toBeNull();
    expect(declared('run_graph')).toEqual({ kind: 'run_graph' });
    expect(declared('run_graph_experiments')).toEqual({ kind: 'experiment' });
    expect(declared('optimize_graph_parameters')).toEqual({ kind: 'experiment' });
    for (const name of ['get_current_graph', 'get_node_schemas', 'validate_graph', 'research', 'list_runs', 'get_run']) {
      expect(declared(name), name).toBeNull();
    }
  });
});

describe('createToolRegistry', () => {
  const tool = (name: string, extra: Partial<ToolDefinition> = {}): ToolDefinition => ({
    name, description: name, input_schema: { type: 'object', properties: {} }, group: 'workspace', readOnly: true,
    execute: async () => ({ content: name, outcome: 'completed' }), ...extra,
  });

  it('refuses two tools of one name', () => {
    expect(() => createToolRegistry([tool('a'), tool('a')])).toThrow(/already registered/);
  });

  it('leaves out unavailable tools, and tools whose check throws', () => {
    const registry = createToolRegistry([
      tool('on'), tool('off', { available: () => false }), tool('broken', { available: () => { throw new Error('x'); } }),
    ]);
    expect(registry.list({ mode: 'edit', env: env() }).map((t) => t.name)).toEqual(['on']);
    // Without an environment a gated tool is never offered.
    expect(registry.list({ mode: 'edit' }).map((t) => t.name)).toEqual(['on']);
  });
});

describe('the loop enforces what a tool declares', () => {
  it('refuses a declared-approval side effect that was never approved, whatever the tool does', async () => {
    const sideEffect = vi.fn();
    const sloppy: ToolDefinition = {
      name: 'launch', description: 'launch', input_schema: { type: 'object' }, group: 'run', readOnly: false,
      approval: () => ({ kind: 'run_graph' }),
      // A buggy tool that skips its approval card and goes straight to dispatch.
      async execute(_input, ctx) { ctx.dispatched(); sideEffect(); return { content: 'launched', outcome: 'completed' }; },
    };
    scriptModel([{ calls: [{ id: 'c1', name: 'launch', arguments: {} }] }]);
    const onRunApproval = vi.fn(async () => true);
    const result = await runTurn({
      api: fakeApi(), settings: SETTINGS, history: [], userText: 'go',
      callbacks: callbacks({ onRunApproval }), registry: createToolRegistry([sloppy]),
    });
    expect(sideEffect).not.toHaveBeenCalled();
    expect(result.status).toBe('incomplete');
    expect(result.reason).toBe('approval_missing');
    expect(result.sideEffectAttempted).toBe(false);
    const receipt = result.turns.find((turn) => turn.role === 'tool')!;
    expect(receipt.toolOutcome).toBe('not_executed');
  });

  it('a tool cannot ask for an approval kind it did not declare', async () => {
    const sneaky: ToolDefinition = {
      name: 'peek', description: 'peek', input_schema: { type: 'object' }, group: 'graph', readOnly: false,
      async execute(_input, ctx) {
        await ctx.approve({ kind: 'clear_graph', request: { runId: 'r', toolCallId: 'c', nodeCount: 0, edgeCount: 0 } });
        return { content: 'x', outcome: 'completed' };
      },
    };
    scriptModel([{ calls: [{ id: 'c1', name: 'peek', arguments: {} }] }]);
    const confirmClearGraph = vi.fn(async () => true);
    const result = await runTurn({
      api: fakeApi(), settings: SETTINGS, history: [], userText: 'go', callbacks: callbacks(),
      confirmClearGraph, registry: createToolRegistry([sneaky]),
    });
    expect(confirmClearGraph).not.toHaveBeenCalled();
    expect(result.status).toBe('failed');
  });

  it('a registered tool that is not available is neither sent nor run', async () => {
    const run = vi.fn(async () => ({ content: 'ran', outcome: 'completed' as const }));
    const hidden: ToolDefinition = {
      name: 'hidden', description: 'hidden', input_schema: { type: 'object' }, group: 'project', readOnly: true,
      available: () => false, execute: run,
    };
    const bodies = scriptModel([{ calls: [{ id: 'c1', name: 'hidden', arguments: {} }] }, { text: 'ok' }]);
    const result = await runTurn({
      api: fakeApi(), settings: SETTINGS, history: [], userText: 'go', callbacks: callbacks(),
      registry: createToolRegistry([hidden]),
    });
    expect(bodies[0].tools).toEqual([]);
    expect(run).not.toHaveBeenCalled();
    expect(result.turns.find((turn) => turn.role === 'tool')!.content).toContain('Unknown tool: hidden');
  });
});
