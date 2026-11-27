/** Stored conversations keep skill text as references only (SEC4): the
 * plugin's storage is the host's localStorage. Before a turn sends history to
 * the model, the references inside the history window are fetched again. A
 * reference CodefyUI can no longer answer becomes a note, and that skill no
 * longer counts as loaded, so the model calls load_skill again. */
import type { CodefyUIPluginAPI } from '../types/codefyui';
import { HOST_REF_STUB, type ChatTurn, type SkillInvocation } from '../state/conversations';
import { getSkill, getSkillFile } from './hostContext';
import { historyWindow } from './history';
import { skillResultText } from './tools/load_skill';
import { skillFileText } from './tools/read_skill_file';

const gone = (name: string) => `[The text of skill "${name}" is no longer available from CodefyUI. Call load_skill again before relying on it.]`;

export async function resolveHostRefs(api: CodefyUIPluginAPI, history: ChatTurn[], skillsOn: boolean, signal?: AbortSignal): Promise<ChatTurn[]> {
  const window = new Set(historyWindow(history));
  const needs = history.some((turn) => window.has(turn) && ((turn.hostRef && turn.content === HOST_REF_STUB) || turn.skills?.some((skill) => skill.body === undefined)));
  if (!needs) return history;
  const bodies = new Map<string, Promise<string | null>>();
  const body = (id: string) => {
    if (!bodies.has(id)) bodies.set(id, skillsOn ? getSkill(api, id, signal).then((r) => (r.ok ? r.value.body : null), () => null) : Promise.resolve(null));
    return bodies.get(id)!;
  };
  return Promise.all(history.map(async (turn): Promise<ChatTurn> => {
    if (!window.has(turn)) return turn;
    if (turn.role === 'tool' && turn.hostRef && turn.content === HOST_REF_STUB) {
      const ref = turn.hostRef;
      if (ref.kind === 'skill') {
        const detail = skillsOn ? await getSkill(api, ref.id, signal).catch(() => null) : null;
        return detail?.ok ? { ...turn, content: skillResultText(ref.name, detail.value) } : { ...turn, content: gone(ref.name), toolOutcome: 'not_executed' };
      }
      const file = skillsOn ? await getSkillFile(api, ref.id, ref.path, signal).catch(() => null) : null;
      return file?.ok ? { ...turn, content: skillFileText(ref.name, file.value) } : { ...turn, content: gone(ref.name), toolOutcome: 'not_executed' };
    }
    if (turn.role === 'user' && turn.skills?.some((skill) => skill.body === undefined)) {
      const kept: SkillInvocation[] = [];
      const notes: string[] = [];
      for (const skill of turn.skills) {
        const text = skill.body ?? await body(skill.id);
        if (text === null) notes.push(gone(skill.name));
        else kept.push({ ...skill, body: text });
      }
      return { ...turn, content: [turn.content, ...notes].filter(Boolean).join('\n\n'), skills: kept };
    }
    return turn;
  }));
}
