/** Which skills a conversation has loaded, and how an invoked skill is sent. */
import type { ChatTurn, SkillInvocation } from '../state/conversations';
import type { AgentContext } from './hostContext';
import type { SkillSession } from './tools/types';
import { quoteSkill } from './untrusted';

/** A user message with the skills invoked on it, each quoted as reference. */
export function withSkills(text: string, skills: SkillInvocation[] | undefined): string {
  if (!skills?.length) return text;
  const blocks = skills.map((skill) => (skill.body === undefined
    ? `The user invoked the skill "${skill.name}" for this message; its text is not available. Call load_skill if it is needed.`
    : `The user invoked the skill "${skill.name}" for this message.\n${quoteSkill(skill.name, skill.body)}`));
  return [text, ...blocks].filter(Boolean).join('\n\n');
}

/** Which skills this conversation loaded (any time) and which the model can
 * still see (inside the history window). A skill counts once its load_skill
 * call completed, or once the user invoked it. */
export function skillNamesIn(turns: ChatTurn[]): Set<string> {
  const names = new Set<string>();
  const outcomes = new Map(turns.filter((turn) => turn.role === 'tool').map((turn) => [turn.tool_call_id, turn.toolOutcome]));
  for (const turn of turns) {
    for (const skill of turn.skills ?? []) names.add(skill.name);
    for (const call of turn.tool_calls ?? []) {
      if (call.name === 'load_skill' && typeof call.arguments?.name === 'string' && outcomes.get(call.id) === 'completed') {
        names.add(call.arguments.name.trim());
      }
    }
  }
  return names;
}

/** Skill files (`name\npath`) whose read_skill_file call completed. */
export function skillFilesIn(turns: ChatTurn[]): Set<string> {
  const files = new Set<string>();
  const outcomes = new Map(turns.filter((turn) => turn.role === 'tool').map((turn) => [turn.tool_call_id, turn.toolOutcome]));
  for (const turn of turns) {
    for (const call of turn.tool_calls ?? []) {
      const { name, path } = call.arguments ?? {};
      if (call.name === 'read_skill_file' && typeof name === 'string' && typeof path === 'string' && outcomes.get(call.id) === 'completed') {
        files.add(`${name.trim()}\n${path.trim()}`);
      }
    }
  }
  return files;
}

export function skillSession(context: AgentContext, history: ChatTurn[], windowed: ChatTurn[], current: SkillInvocation[] = []): SkillSession {
  const loaded = skillNamesIn(history);
  const inContext = skillNamesIn(windowed);
  for (const skill of current) { loaded.add(skill.name); inContext.add(skill.name); }
  return { context, loaded, inContext, filesInContext: skillFilesIn(windowed) };
}

