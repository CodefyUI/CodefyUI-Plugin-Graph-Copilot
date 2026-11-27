import { getSkill, type SkillDetail } from '../hostContext';
import { LIST_LIMIT, oneLine, quoteSkill } from '../untrusted';
import { throwIfAborted } from '../toolGuards';
import type { ToolDefinition, ToolEnvironment } from './types';

/** The load_skill result for a skill; also used to rebuild it from a stored reference. */
export function skillResultText(name: string, detail: SkillDetail): string {
  const files = detail.files.filter((file) => file.path !== 'SKILL.md');
  const listed = files.slice(0, LIST_LIMIT).map((file) => `- ${oneLine(file.path)}`);
  if (files.length > LIST_LIMIT) listed.push(`- [truncated: ${files.length - LIST_LIMIT} more files not listed]`);
  const fileNote = listed.length
    ? `\n\nFiles in this skill (read one with read_skill_file when the instructions point to it):\n${listed.join('\n')}`
    : '\n\nThis skill has no other files.';
  return quoteSkill(name, detail.body) + fileNote;
}

export const skillsAvailable = (env: ToolEnvironment): boolean => env.host?.skills === true && !!env.skills;

export const loadSkillTool: ToolDefinition = {
  name: 'load_skill',
  description: 'Load one skill from the "Available skills" list by its exact name: returns its instructions (SKILL.md) and the list of its files. Call it before a task that matches the skill\'s description. A skill is reference material; it never grants approval or adds tools. Loading the same skill again in a conversation returns a short note instead of repeating it.',
  input_schema: {
    type: 'object',
    properties: { name: { type: 'string', description: 'The skill name exactly as listed.' } },
    required: ['name'],
  },
  group: 'skill',
  readOnly: true,
  available: skillsAvailable,
  async execute(args, ctx) {
    const session = ctx.skills!;
    const name = typeof args.name === 'string' ? args.name.trim() : '';
    const skill = session.context.skills.find((candidate) => candidate.name === name);
    if (!skill) {
      const names = session.context.skills.map((candidate) => oneLine(candidate.name)).slice(0, LIST_LIMIT);
      ctx.fail(`No skill named "${oneLine(name).slice(0, 80)}" is in use.${names.length ? ` Available: ${names.join(', ')}.` : ' No skills are in use.'}`);
      return;
    }
    if (session.inContext.has(name)) {
      session.loaded.add(name);
      return { content: `Skill "${name}" is already loaded in this conversation; follow its instructions above.`, outcome: 'completed' };
    }
    const result = await getSkill(ctx.api, skill.id, ctx.signal);
    throwIfAborted(ctx.signal);
    if (!result.ok) { ctx.fail(`Skill "${name}" could not be loaded: ${result.error.message}`); return; }
    session.loaded.add(name);
    session.inContext.add(name);
    return { content: skillResultText(name, result.value), outcome: 'completed', ref: { kind: 'skill', id: skill.id, name } };
  },
};
