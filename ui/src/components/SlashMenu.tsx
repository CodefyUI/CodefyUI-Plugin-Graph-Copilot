/** The `/` menu under the message box: the host's skills and four commands.
 *
 * The message box is the combobox (it owns focus and the keys); this is its
 * listbox. `slashQuery` decides when it is open: the whole draft is one
 * `/word` with nothing after it. */
import React from 'react';
import type { ContextSkill } from '../agent/hostContext';
import { oneLine } from '../agent/untrusted';
import type { MessageKey } from '../i18n';

export type SlashCommand = 'new' | 'clear' | 'skills' | 'settings';

export type SlashItem =
  | { kind: 'skill'; key: string; label: string; detail: string; skill: ContextSkill }
  | { kind: 'command'; key: string; label: string; detail: MessageKey; command: SlashCommand };

const COMMANDS: Array<{ command: SlashCommand; detail: MessageKey }> = [
  { command: 'new', detail: 'slash.cmd.new' },
  { command: 'clear', detail: 'slash.cmd.clear' },
  { command: 'skills', detail: 'slash.cmd.skills' },
  { command: 'settings', detail: 'slash.cmd.settings' },
];

/** The text after `/` while the draft is exactly one slash word, else null. */
export function slashQuery(draft: string): string | null {
  const match = /^\/([^\s/]*)$/.exec(draft);
  return match ? match[1].toLowerCase() : null;
}

/** Skills first (only on a host that has them), then commands; prefix
 * matches before matches elsewhere in the name. */
export function slashItems(query: string, skills: ContextSkill[] | null): SlashItem[] {
  const rank = (name: string): number => (name.startsWith(query) ? 0 : name.includes(query) ? 1 : -1);
  const skillItems: SlashItem[] = (skills ?? [])
    .map((skill) => ({ skill, score: rank(skill.name.toLowerCase()) }))
    .filter((entry) => entry.score >= 0)
    .sort((a, b) => a.score - b.score || a.skill.name.localeCompare(b.skill.name))
    .map(({ skill }) => ({ kind: 'skill', key: `skill:${skill.id}`, label: `/${skill.name}`, detail: oneLine(skill.description), skill }));
  const commandItems: SlashItem[] = COMMANDS
    .filter(({ command }) => command !== 'skills' || skills !== null)
    .filter(({ command }) => rank(command) >= 0)
    .map(({ command, detail }) => ({ kind: 'command', key: `command:${command}`, label: `/${command}`, detail, command }));
  return [...skillItems, ...commandItems];
}

export interface SlashMenuProps {
  id: string;
  items: SlashItem[];
  active: number;
  t: (key: MessageKey, vars?: Record<string, string | number>) => string;
  onPick(item: SlashItem): void;
  onHover(index: number): void;
}

export const optionId = (menuId: string, index: number): string => `${menuId}-option-${index}`;

export function SlashMenu({ id, items, active, t, onPick, onHover }: SlashMenuProps) {
  if (!items.length) {
    return (
      <div className="gcp-slash-menu" id={id} role="listbox" aria-label={t('slash.label')}>
        <div className="gcp-slash-empty" role="presentation">{t('slash.empty')}</div>
      </div>
    );
  }
  return (
    <ul className="gcp-slash-menu" id={id} role="listbox" aria-label={t('slash.label')}>
      {items.map((item, index) => (
        <li
          key={item.key}
          id={optionId(id, index)}
          role="option"
          aria-selected={index === active}
          className={`gcp-slash-option${index === active ? ' active' : ''}`}
          // Keep focus in the message box: the box is the combobox.
          onMouseDown={(event) => event.preventDefault()}
          onMouseEnter={() => onHover(index)}
          onClick={() => onPick(item)}
        >
          <span className="gcp-slash-name">{item.label}</span>
          <span className="gcp-slash-kind">{item.kind === 'skill' ? t('slash.group.skills') : t('slash.group.commands')}</span>
          <span className="gcp-slash-detail">{item.kind === 'skill' ? item.detail : t(item.detail)}</span>
        </li>
      ))}
    </ul>
  );
}
