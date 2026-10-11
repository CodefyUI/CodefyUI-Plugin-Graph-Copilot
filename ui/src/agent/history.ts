import type { ChatTurn } from '../state/conversations';
import type { WireToolCall } from '../llm/client';

/** Provider history is evidence only. Nothing in this window is executable. */
export const HISTORY_TURN_LIMIT = 20;

export function isToolCall(value: unknown): value is WireToolCall {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false;
  const call = value as Partial<WireToolCall>;
  return typeof call.id === 'string' && !!call.id.trim() &&
    typeof call.name === 'string' && !!call.name.trim() &&
    !!call.arguments && typeof call.arguments === 'object' && !Array.isArray(call.arguments);
}

/** Includes IDs from incomplete legacy groups too, preventing accidental replay. */
export function historicalCallIds(history: ChatTurn[]): Set<string> {
  const ids = new Set<string>();
  for (const turn of history) {
    if (Array.isArray(turn.tool_calls)) {
      for (const call of turn.tool_calls) if (typeof call?.id === 'string') ids.add(call.id);
    }
    if (typeof turn.tool_call_id === 'string') ids.add(turn.tool_call_id);
  }
  return ids;
}

/**
 * Normalize legacy orphans without fabricating an execution receipt. Complete
 * assistant/call/result groups are atomic. An incomplete group keeps only its
 * assistant prose; unrelated orphan tool results are dropped. Never mutates
 * persisted history. The latest group may exceed the soft turn budget.
 */
export function historyWindow(history: ChatTurn[], limit = HISTORY_TURN_LIMIT): ChatTurn[] {
  const groups: ChatTurn[][] = [];
  const seen = new Set<string>();
  for (let index = 0; index < history.length; index++) {
    const turn = history[index];
    if (turn.role === 'tool') continue;
    if (turn.role !== 'assistant' || !turn.tool_calls?.length) {
      const { tool_call_id: _id, tool_calls: _calls, ...plain } = turn;
      groups.push([plain]);
      continue;
    }

    const calls = turn.tool_calls;
    const tools: ChatTurn[] = [];
    while (history[index + 1]?.role === 'tool') tools.push(history[++index]);
    const ids = new Set(calls.map((call) => call?.id));
    const results = new Map(tools.map((tool) => [tool.tool_call_id, tool]));
    const valid = calls.every(isToolCall) && ids.size === calls.length &&
      calls.every((call) => !seen.has(call.id)) && tools.length === calls.length &&
      results.size === calls.length && calls.every((call) => results.has(call.id));
    if (valid) {
      calls.forEach((call) => seen.add(call.id));
      groups.push([turn, ...calls.map((call) => results.get(call.id)!)]);
    } else if (turn.content.trim()) {
      const { tool_calls: _calls, tool_call_id: _id, ...plain } = turn;
      groups.push([plain]);
    }
  }

  const kept: ChatTurn[][] = [];
  let count = 0;
  for (let index = groups.length - 1; index >= 0; index--) {
    const group = groups[index];
    if (kept.length && count + group.length > limit) break;
    kept.unshift(group);
    count += group.length;
    if (count >= limit) break;
  }
  return kept.flat();
}
