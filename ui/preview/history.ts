import type { Conversation } from '../src/state/conversations';

/** Explicit legacy and interrupted wire shapes are intentional: they let the
 * real UI/executor prove safe history rendering without migration or replay. */
export function seededConversations(): Conversation[] {
  const now = Date.now();
  const base = { provider: 'openai' as const, model: 'mock-graph-model', mode: 'edit' as const };
  return [
    {
      ...base, id: 'mock-legacy', title: 'Legacy sample explanation', createdAt: now - 300_000, updatedAt: now - 60_000,
      // No runId or structured summary: this is a pre-reliable-runs record.
      messages: [
        { role: 'user', content: 'Explain the sample dataset pipeline.' },
        { role: 'assistant', content: 'Dataset sends its sample images to Preview. This legacy conversation has no run receipt.' },
      ],
    },
    {
      ...base, id: 'mock-success', title: 'Previously validated sample', createdAt: now - 600_000, updatedAt: now - 120_000,
      messages: [
        { role: 'user', content: 'Check the sample graph structure.', runId: 'mock-success-run' },
        { role: 'assistant', content: 'I’ll check the stored sample structure.', runId: 'mock-success-run',
          tool_calls: [{ id: 'mock-seed-validation', name: 'validate_graph', arguments: {} }] },
        { role: 'tool', content: JSON.stringify({ status: 'valid', valid: true, errors: [] }), tool_call_id: 'mock-seed-validation', toolOutcome: 'completed', runId: 'mock-success-run' },
        { role: 'assistant', content: 'The stored sample structure was validated. That result does not execute the graph.', runId: 'mock-success-run',
          runSummary: { id: 'mock-success-run', mode: 'edit', status: 'completed', mutation: 'none', mutationAttempted: false, appliedOps: 0, failedOps: 0, validation: { status: 'valid', errors: [] } } },
      ],
    },
    {
      ...base, id: 'mock-interrupted', title: 'Interrupted schema lookup', createdAt: now - 900_000, updatedAt: now - 180_000,
      messages: [
        { role: 'user', content: 'Inspect Normalize before proposing an edit.', runId: 'mock-interrupted-run' },
        { role: 'assistant', content: 'This saved turn ended before the tool result arrived.', runId: 'mock-interrupted-run',
          tool_calls: [{ id: 'mock-seed-unresolved', name: 'get_node_schemas', arguments: { node_types: ['Normalize'] } }] },
        // Missing tool response is deliberately not fabricated in saved history.
      ],
    },
  ];
}
