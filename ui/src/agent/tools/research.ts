import { streamChat } from '../../llm/client';
import type { WireMessage } from '../../llm/client';
import type { Settings } from '../../state/settings';
import type { CodefyUIPluginAPI } from '../../types/codefyui';
import { buildChatBody } from '../chatBody';
import { compactIndex } from '../prompt';
import { awaitWithSignal, isAbortError, throwIfAborted } from '../toolGuards';
import type { ToolDefinition } from './types';

interface ResearchAnswer { text: string; failed: boolean }
async function researchSubagent(
  api: CodefyUIPluginAPI, settings: Settings, question: string, indexText: string, signal?: AbortSignal,
): Promise<ResearchAnswer> {
  const messages: WireMessage[] = [
    { role: 'system', content: 'You are an index-only CodefyUI research assistant. Suggest CONCISE candidate node types using exact names present in this index and a one-line rationale. You have NO schemas: do not invent ports, parameter names, connections, or a wiring plan. Say when the index has no candidate. get_node_schemas is required before wiring. No tools, preamble, or code.\n\n## Node index\n' + indexText },
    { role: 'user', content: question },
  ];
  let text = '';
  let terminal = false;
  let active = true;
  let failed = false;
  try {
    throwIfAborted(signal);
    await awaitWithSignal(streamChat(api, buildChatBody(settings, messages, [], 1024), {
      onText(delta) { if (active && !signal?.aborted && !terminal) text += delta; },
      onDone(event) { if (active && !signal?.aborted && !terminal) { terminal = true; if (!text) text = event.message.content; } },
      onError() { if (active && !signal?.aborted && !terminal) { terminal = true; failed = true; } },
    }, signal), signal);
    throwIfAborted(signal);
    failed ||= !terminal;
  } catch (error) {
    throwIfAborted(signal);
    if (isAbortError(error)) throw error;
    failed = true;
  } finally {
    active = false;
  }
  return { text: failed ? '(research unavailable)' : text.trim() || '(no candidate)', failed };
}

export const researchTool: ToolDefinition = {
  name: 'research',
  description: 'For complex requests, research up to FOUR independent questions in parallel. Index-only subagents suggest candidate catalog node types, not verified ports or wiring. Get exact schemas before any connections.',
  input_schema: { type: 'object', properties: { questions: { type: 'array', items: { type: 'string' }, maxItems: 4 } }, required: ['questions'] },
  group: 'graph',
  readOnly: true,
  async execute(args, ctx) {
    const { api, settings, signal } = ctx;
    if (!Array.isArray(args.questions) || !args.questions.every((question) => typeof question === 'string')) {
      ctx.fail('research requires a non-empty "questions" array of strings.'); return;
    }
    const questions = (args.questions as string[]).filter((question) => question.trim()).slice(0, 4);
    if (!questions.length) { ctx.fail('research requires a non-empty "questions" array.'); return; }
    const index = compactIndex(api.graph.getNodeDefinitions());
    throwIfAborted(signal);
    const answers = await awaitWithSignal(Promise.all(questions.map((question) => researchSubagent(api, settings, question, index, signal))), signal);
    throwIfAborted(signal);
    const failed = answers.some((answer) => answer.failed);
    const content = 'Index-only candidate suggestions; verify exact schemas before wiring.\n\n' + questions.map((question, index) => `[${index + 1}] Q: ${question}\nA: ${answers[index].text}`).join('\n\n');
    return { content, outcome: failed ? 'error' : 'completed' };
  },
};
