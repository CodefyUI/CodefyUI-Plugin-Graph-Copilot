import { describe, expect, it } from 'vitest';
import type { ChatTurn } from '../state/conversations';
import { historicalCallIds, historyWindow } from './history';

const group = (id: string): ChatTurn[] => [
  { role: 'assistant', content: `reading ${id}`, tool_calls: [{ id, name: 'get_current_graph', arguments: {} }] },
  { role: 'tool', content: '{}', tool_call_id: id },
];

describe('complete provider history groups', () => {
  it('never starts a window with a sliced-off tool result', () => {
    const history: ChatTurn[] = [...group('first'), ...Array.from({ length: 19 }, (_, index): ChatTurn => ({ role: 'user', content: String(index) }))];
    const kept = historyWindow(history);
    expect(kept).toHaveLength(19);
    expect(kept[0].role).toBe('user');
    expect(history).toHaveLength(21);
  });

  it('drops orphan results and retains only prose from incomplete legacy calls', () => {
    const history: ChatTurn[] = [
      { role: 'tool', tool_call_id: 'orphan', content: 'ignore' },
      group('incomplete')[0],
      { role: 'assistant', content: 'normal reply' },
      ...group('complete'),
    ];
    const kept = historyWindow(history);
    expect(kept).toHaveLength(4);
    expect(kept[0]).toEqual({ role: 'assistant', content: 'reading incomplete' });
    expect(kept[2].tool_calls?.[0].id).toBe('complete');
    expect(historicalCallIds(history)).toEqual(new Set(['orphan', 'incomplete', 'complete']));
  });

  it('normalizes out-of-order matching tools to call order and keeps the whole latest group', () => {
    const calls = ['a', 'b', 'c'].map((id) => ({ id, name: 'get_current_graph', arguments: {} }));
    const history: ChatTurn[] = [{ role: 'assistant', content: '', tool_calls: calls },
      ...['c', 'a', 'b'].map((id): ChatTurn => ({ role: 'tool', content: '{}', tool_call_id: id }))];
    const kept = historyWindow(history, 2);
    expect(kept).toHaveLength(4);
    expect(kept.slice(1).map((turn) => turn.tool_call_id)).toEqual(['a', 'b', 'c']);
  });

  it('does not fabricate results for duplicated, malformed, or mismatched groups', () => {
    const history: ChatTurn[] = [...group('first'), ...group('first'), group('missing')[0],
      { role: 'tool', tool_call_id: 'different', content: '{}' },
      { role: 'assistant', content: '', tool_calls: [{ id: 'broken', name: '', arguments: {} }] }];
    expect(historyWindow(history).filter((turn) => turn.role === 'tool')).toHaveLength(1);
    expect(historyWindow(history).filter((turn) => turn.tool_calls?.length)).toHaveLength(1);
  });
});
