/** SEC4: what the plugin stores (in the host's localStorage) is bounded.
 * Skill text is stored as a reference and fetched again when the
 * conversation continues; other tool results are capped at 16 KB; reading
 * the same skill file twice is deduplicated; a save that had to drop data
 * reports it. */
import { describe, it, expect, vi, beforeEach } from 'vitest';

vi.mock('../llm/client', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../llm/client')>();
  return { ...actual, streamChat: vi.fn() };
});

import { runTurn } from './loop';
import {
  HOST_REF_STUB, STORED_RESULT_LIMIT, listConversations, newConversation, onStorageProblem, saveConversation,
  type ChatTurn, type Conversation,
} from '../state/conversations';
import type { AgentContext } from './hostContext';
import { SETTINGS, callbacks, fakeApi, scriptModel } from '../test/agentHarness';

const SKILL = { id: 'builtin/build-graph', name: 'build-graph', description: 'Build a graph.', source: 'builtin' };
const BODY = '# Build a graph\nUnique instruction text 7f3a.';
const context: AgentContext = { project: null, instructions: null, skills: [SKILL] };
const detail = { ...SKILL, license: null, compatibility: null, metadata: {}, allowed_tools: [], enabled: true, valid: true, issues: [],
  shadowed_by: null, file_count: 2, has_scripts: false, body: BODY, files: [{ path: 'SKILL.md', kind: 'skill', size: 1 }, { path: 'ref.md', kind: 'reference', size: 1 }] };
const call = (id: string, name: string, args: Record<string, unknown> = {}) => ({ id, name, arguments: args });

function host(routes: Record<string, () => { status?: number; body: unknown }> = {}) {
  return fakeApi({ routes: {
    '/api/skills/builtin/build-graph': () => ({ body: detail }),
    '/api/skills/file?*': () => ({ body: { path: 'ref.md', content: 'File text 91bc.', truncated: false } }),
    ...routes,
  } });
}
const conversation = (messages: ChatTurn[]): Conversation => ({ ...newConversation('openai', 'gpt-4o'), messages });
const stored = (api: ReturnType<typeof fakeApi>) => JSON.stringify(listConversations(api));

beforeEach(() => { vi.clearAllMocks(); });

describe('SEC4: stored conversations are bounded', () => {
  it('a loaded skill and a skill file are stored as references, not their text', async () => {
    scriptModel([{ calls: [call('c1', 'load_skill', { name: 'build-graph' }), call('c2', 'read_skill_file', { name: 'build-graph', path: 'ref.md' })] }, { text: 'ok' }]);
    const api = host();
    const result = await runTurn({ api, settings: SETTINGS, history: [], userText: 'x', callbacks: callbacks(), agentContext: context });
    const tools = result.turns.filter((turn) => turn.role === 'tool');
    expect(tools.map((turn) => turn.hostRef)).toEqual([
      { kind: 'skill', id: SKILL.id, name: 'build-graph' }, { kind: 'skill_file', id: SKILL.id, name: 'build-graph', path: 'ref.md' },
    ]);
    saveConversation(api, conversation([{ role: 'user', content: 'x' }, ...result.turns]));
    expect(stored(api)).not.toContain('7f3a');
    expect(stored(api)).not.toContain('91bc');
    expect(listConversations(api)[0].messages.filter((turn) => turn.role === 'tool').map((turn) => turn.content)).toEqual([HOST_REF_STUB, HOST_REF_STUB]);
  });

  it('a skill invoked with /name is stored as {id, name} only', () => {
    const api = host();
    saveConversation(api, conversation([{ role: 'user', content: 'go', skills: [{ id: SKILL.id, name: SKILL.name, body: BODY }] }]));
    expect(listConversations(api)[0].messages[0].skills).toEqual([{ id: SKILL.id, name: SKILL.name }]);
    expect(stored(api)).not.toContain('7f3a');
  });

  it('any other tool result is stored cut at 16 KB, with a marker', () => {
    const api = host();
    const big = 'd'.repeat(40_000);
    saveConversation(api, conversation([{ role: 'tool', tool_call_id: 'c1', content: big, toolOutcome: 'completed' }]));
    const content = listConversations(api)[0].messages[0].content;
    expect(content.length).toBeLessThan(STORED_RESULT_LIMIT + 200);
    expect(content).toContain('Stored copy cut at 16 KB of 40000 characters');
  });

  it('the next turn fetches the skill text again and sends it to the model', async () => {
    const api = host();
    scriptModel([{ calls: [call('c1', 'load_skill', { name: 'build-graph' })] }, { text: 'ok' }]);
    const first = await runTurn({ api, settings: SETTINGS, history: [], userText: 'x', callbacks: callbacks(), agentContext: context });
    saveConversation(api, conversation([{ role: 'user', content: 'x' }, ...first.turns]));
    const history = listConversations(api)[0].messages;
    const bodies = scriptModel([{ text: 'again' }]);
    await runTurn({ api, settings: SETTINGS, history, userText: 'continue', callbacks: callbacks(), agentContext: context });
    const sent = JSON.stringify(bodies[0].messages);
    expect(sent).toContain('7f3a');
    expect(sent).not.toContain(HOST_REF_STUB);
  });

  it('when CodefyUI no longer has the skill, the model is told to load it again, and load_skill really loads', async () => {
    let gone = false;
    const api = host({ '/api/skills/builtin/build-graph': () => (gone ? { status: 404, body: { detail: 'Not Found' } } : { body: detail }) });
    scriptModel([{ calls: [call('c1', 'load_skill', { name: 'build-graph' })] }, { text: 'ok' }]);
    const first = await runTurn({ api, settings: SETTINGS, history: [], userText: 'x', callbacks: callbacks(), agentContext: context });
    saveConversation(api, conversation([{ role: 'user', content: 'x' }, ...first.turns]));
    gone = true;
    const bodies = scriptModel([{ calls: [call('c2', 'load_skill', { name: 'build-graph' })] }, { text: 'ok' }]);
    const second = await runTurn({ api, settings: SETTINGS, history: listConversations(api)[0].messages, userText: 'go on', callbacks: callbacks(), agentContext: context });
    expect(JSON.stringify(bodies[0].messages)).toContain('no longer available from CodefyUI');
    // Not "already loaded": the call went to the host (and failed there).
    expect(second.turns.find((turn) => turn.role === 'tool')!.content).not.toContain('already loaded');
  });

  it('reading the same skill file twice fetches it once; the second answer points to the first', async () => {
    scriptModel([
      { calls: [call('c1', 'load_skill', { name: 'build-graph' }), call('c2', 'read_skill_file', { name: 'build-graph', path: 'ref.md' })] },
      { calls: [call('c3', 'read_skill_file', { name: 'build-graph', path: 'ref.md' })] },
      { text: 'ok' },
    ]);
    const api = host();
    const result = await runTurn({ api, settings: SETTINGS, history: [], userText: 'x', callbacks: callbacks(), agentContext: context });
    expect(api.fetchLog.filter((entry) => entry.url.startsWith('/api/skills/file')).length).toBe(1);
    const results = result.turns.filter((turn) => turn.role === 'tool').map((turn) => turn.content);
    expect(results[2]).toContain('already read in this conversation');
  });

  it('a save that has to drop conversations reports it instead of losing them silently', () => {
    const api = host();
    for (let index = 0; index < 3; index++) saveConversation(api, { ...conversation([{ role: 'user', content: `old ${index}` }]), updatedAt: index + 1 });
    const set = api.storage.set as ReturnType<typeof vi.fn>;
    const real = set.getMockImplementation()!;
    set.mockImplementation((key: string, value: string) => { if (value.length > 600) throw new DOMException('full', 'QuotaExceededError'); real(key, value); });
    const problems: unknown[] = [];
    const stop = onStorageProblem((problem) => problems.push(problem));
    try {
      saveConversation(api, { ...conversation([{ role: 'user', content: 'new' }]), updatedAt: 99 });
    } finally { stop(); }
    expect(problems).toHaveLength(1);
    expect(problems[0]).toMatchObject({ failed: false });
    expect((problems[0] as { droppedConversations: number }).droppedConversations).toBeGreaterThan(0);
  });
});
