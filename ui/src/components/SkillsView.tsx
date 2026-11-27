/** The Skills view: what the host found, turning skills on and off, reading
 * one, and installing from a folder, an archive or a git URL.
 *
 * Every refusal is the host's: its message is shown as written, nothing is
 * retried, and once the host says installing is refused on this server
 * (403 `remote_install_refused`) the install and delete controls go away. */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import {
  deleteSkill, getSkill, installSkill, listSkills, setSkillEnabled,
  type HostError, type InstallResult, type SkillDetail, type SkillSummary,
} from '../agent/hostContext';
import { Markdown } from './markdown';
import { useT, type MessageKey } from '../i18n';

const GROUPS: Array<{ key: string; label: MessageKey; match: (source: string) => boolean }> = [
  { key: 'project', label: 'skills.group.project', match: (source) => source === 'project' },
  { key: 'user', label: 'skills.group.user', match: (source) => source === 'user' },
  { key: 'plugin', label: 'skills.group.plugin', match: (source) => source.startsWith('plugin:') },
  { key: 'builtin', label: 'skills.group.builtin', match: (source) => source === 'builtin' },
  { key: 'extra', label: 'skills.group.extra', match: (source) => source === 'extra' },
];

function sourceLabel(source: string, t: ReturnType<typeof useT>): string {
  if (source.startsWith('plugin:')) return `${t('skills.source.plugin')} ${source.slice(7)}`;
  const key = `skills.source.${source}` as MessageKey;
  return ['project', 'user', 'builtin', 'extra'].includes(source) ? t(key) : source;
}

const isRemoteRefusal = (error: HostError | null): boolean => error?.status === 403 && error.code === 'remote_install_refused';

export interface SkillsViewProps {
  api: CodefyUIPluginAPI;
  /** Called after a change the agent's context should see (toggle, install, delete). */
  onChanged?: () => void;
}

type ListState =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ready'; skills: SkillSummary[] };

export function SkillsView({ api, onChanged }: SkillsViewProps) {
  const t = useT();
  const [list, setList] = useState<ListState>({ status: 'loading' });
  const [openId, setOpenId] = useState<string | null>(null);
  const [installRefused, setInstallRefused] = useState<HostError | null>(null);
  const [toggleError, setToggleError] = useState<string | null>(null);
  const alive = useRef(true);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);

  const load = useCallback(async () => {
    setList({ status: 'loading' });
    const result = await listSkills(api);
    if (!alive.current) return;
    setList(result.ok ? { status: 'ready', skills: result.value } : { status: 'error', message: result.error.message });
  }, [api]);
  useEffect(() => { void load(); }, [load]);

  const toggle = async (skill: SkillSummary, enabled: boolean) => {
    setToggleError(null);
    const result = await setSkillEnabled(api, skill.id, enabled);
    if (!alive.current) return;
    if (!result.ok) { setToggleError(result.error.message); return; }
    setList((current) => current.status === 'ready'
      ? { status: 'ready', skills: current.skills.map((item) => (item.id === skill.id ? result.value : item)) } : current);
    onChanged?.();
  };

  const groups = useMemo(() => (list.status === 'ready'
    ? GROUPS.map((group) => ({ ...group, skills: list.skills.filter((skill) => group.match(skill.source)) })).filter((group) => group.skills.length)
    : []), [list]);

  const refusal = (error: HostError) => { if (isRemoteRefusal(error)) setInstallRefused(error); };

  if (openId) {
    const summary = list.status === 'ready' ? list.skills.find((skill) => skill.id === openId) : undefined;
    return (
      <SkillDetailView api={api} id={openId} summary={summary} canDelete={!installRefused}
        onBack={() => setOpenId(null)}
        onDeleted={() => { setOpenId(null); onChanged?.(); void load(); }}
        onRefused={refusal} />
    );
  }

  return (
    <section className="gcp-skills" aria-labelledby="gcp-skills-title">
      <header className="gcp-view-header">
        <h2 id="gcp-skills-title" className="gcp-view-title">{t('skills.title')}</h2>
        <button className="gcp-icon-btn" onClick={() => { onChanged?.(); void load(); }} aria-label={t('skills.refresh')} title={t('skills.refresh')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M20 11a8 8 0 1 0-2.3 5.7M20 5v6h-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </header>

      {list.status === 'loading' && <p className="gcp-state gcp-state--loading" role="status">{t('skills.loading')}</p>}
      {list.status === 'error' && (
        <div className="gcp-state gcp-state--error" role="alert">
          <p>{t('skills.error', { message: list.message })}</p>
          <button className="gcp-secondary-btn" onClick={() => void load()}>{t('skills.retry')}</button>
        </div>
      )}
      {list.status === 'ready' && list.skills.length === 0 && (
        <div className="gcp-state gcp-state--empty">
          <p className="gcp-state-title">{t('skills.empty.title')}</p>
          <p>{t('skills.empty.body')}</p>
        </div>
      )}
      {toggleError && <p className="gcp-field-error" role="alert">{toggleError}</p>}
      {groups.map((group) => (
        <section key={group.key} className="gcp-skill-group" aria-label={t(group.label)}>
          <h3 className="gcp-skill-group-title">{t(group.label)}</h3>
          <ul className="gcp-skill-list">
            {group.skills.map((skill) => (
              <li key={skill.id} className={`gcp-skill-row${!skill.valid || skill.shadowed_by ? ' muted' : ''}`}>
                <button className="gcp-skill-open" onClick={() => setOpenId(skill.id)} aria-label={t('skills.open', { name: skill.name })}>
                  <span className="gcp-skill-name">{skill.name}</span>
                  <span className="gcp-skill-source">{sourceLabel(skill.source, t)}</span>
                  <span className="gcp-skill-description" data-user-content>{skill.description}</span>
                  {!skill.valid && <span className="gcp-skill-flag">{t('skills.invalid')}</span>}
                  {skill.valid && skill.shadowed_by && <span className="gcp-skill-flag">{t('skills.shadowed', { id: skill.shadowed_by })}</span>}
                </button>
                <label className="gcp-switch">
                  <input type="checkbox" role="switch" checked={skill.enabled}
                    aria-label={t('skills.enabled', { name: skill.name })}
                    onChange={(event) => void toggle(skill, event.target.checked)} />
                  <span className="gcp-switch-track" aria-hidden="true" />
                </label>
              </li>
            ))}
          </ul>
        </section>
      ))}

      {installRefused
        ? <p className="gcp-state gcp-state--notice" role="note">{installRefused.message}</p>
        : list.status !== 'loading' && (
          <InstallForm api={api} onInstalled={() => { onChanged?.(); void load(); }} onRefused={refusal} />
        )}
    </section>
  );
}

function InstallForm({ api, onInstalled, onRefused }: { api: CodefyUIPluginAPI; onInstalled(): void; onRefused(error: HostError): void }) {
  const t = useT();
  const [source, setSource] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<HostError | null>(null);
  const [result, setResult] = useState<InstallResult | null>(null);
  const inFlight = useRef(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    const value = source.trim();
    // One install at a time: the host refuses a second with 409 `busy`.
    if (!value || inFlight.current) return;
    inFlight.current = true;
    setBusy(true);
    setError(null);
    setResult(null);
    const answer = await installSkill(api, value);
    inFlight.current = false;
    setBusy(false);
    if (!answer.ok) { setError(answer.error); onRefused(answer.error); return; }
    setResult(answer.value);
    setSource('');
    onInstalled();
  };

  return (
    <form className="gcp-install" onSubmit={(event) => void submit(event)} aria-labelledby="gcp-install-title">
      <h3 id="gcp-install-title" className="gcp-skill-group-title">{t('skills.install.title')}</h3>
      <label className="gcp-field">
        <span className="gcp-field-label">{t('skills.install.label')}</span>
        <input className="gcp-input" value={source} onChange={(event) => setSource(event.target.value)}
          placeholder={t('skills.install.placeholder')} disabled={busy} spellCheck={false}
          aria-invalid={error ? true : undefined} aria-describedby={error ? 'gcp-install-error' : undefined} />
      </label>
      {error && <p id="gcp-install-error" className="gcp-field-error" role="alert">{error.message}</p>}
      <button type="submit" className="gcp-primary-btn" disabled={busy || !source.trim()} aria-busy={busy || undefined}>
        {busy ? t('skills.install.busy') : t('skills.install.submit')}
      </button>
      {result && (
        <div className="gcp-install-result" role="status">
          {result.installed.length > 0 && <p>{t('skills.install.installed', { names: result.installed.map((skill) => skill.name).join(', ') })}</p>}
          {result.skipped.length > 0 && (
            <ul className="gcp-install-skipped">
              {result.skipped.map((item) => <li key={`${item.name}:${item.code}`}>{t('skills.install.skipped', { name: item.name, message: item.message })}</li>)}
            </ul>
          )}
        </div>
      )}
    </form>
  );
}

function SkillDetailView({ api, id, summary, canDelete, onBack, onDeleted, onRefused }: {
  api: CodefyUIPluginAPI; id: string; summary?: SkillSummary; canDelete: boolean;
  onBack(): void; onDeleted(): void; onRefused(error: HostError): void;
}) {
  const t = useT();
  const [detail, setDetail] = useState<SkillDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const backRef = useRef<HTMLButtonElement>(null);
  useEffect(() => { backRef.current?.focus(); }, []);
  useEffect(() => {
    let live = true;
    void getSkill(api, id).then((result) => {
      if (!live) return;
      if (result.ok) setDetail(result.value); else setError(result.error.message);
    });
    return () => { live = false; };
  }, [api, id]);

  const name = detail?.name ?? summary?.name ?? id;
  const [confirming, setConfirming] = useState(false);
  const remove = async () => {
    setConfirming(false);
    setDeleteError(null);
    const result = await deleteSkill(api, id);
    if (!result.ok) { setDeleteError(result.error.message); onRefused(result.error); return; }
    onDeleted();
  };

  return (
    <section className="gcp-skills gcp-skill-detail" aria-labelledby="gcp-skill-detail-title">
      <header className="gcp-view-header">
        <button ref={backRef} className="gcp-secondary-btn" onClick={onBack}>{t('skills.back')}</button>
        <h2 id="gcp-skill-detail-title" className="gcp-view-title">{name}</h2>
      </header>
      {!detail && !error && <p className="gcp-state gcp-state--loading" role="status">{t('skills.body.loading')}</p>}
      {error && <p className="gcp-state gcp-state--error" role="alert">{error}</p>}
      {detail && (
        <>
          <p className="gcp-skill-description full" data-user-content>{detail.description}</p>
          {detail.issues.length > 0 && (
            <section className="gcp-skill-issues" aria-label={t('skills.issues')}>
              <h3 className="gcp-skill-group-title">{t('skills.issues')}</h3>
              <ul>{detail.issues.map((issue, index) => <li key={index} data-level={issue.level}><code>{issue.code}</code> {issue.message}</li>)}</ul>
            </section>
          )}
          {detail.allowed_tools.length > 0 && (
            <p className="gcp-skill-meta">{t('skills.allowedTools')}: <code>{detail.allowed_tools.join(' ')}</code></p>
          )}
          {detail.has_scripts && <p className="gcp-skill-meta">{t('skills.scripts')}</p>}
          <div className="gcp-skill-body gcp-md"><Markdown text={detail.body} /></div>
          <h3 className="gcp-skill-group-title">{t('skills.files')}</h3>
          {detail.files.filter((file) => file.path !== 'SKILL.md').length
            ? <ul className="gcp-skill-files">{detail.files.filter((file) => file.path !== 'SKILL.md').map((file) => <li key={file.path}><code>{file.path}</code></li>)}</ul>
            : <p className="gcp-skill-meta">{t('skills.noFiles')}</p>}
          {detail.source === 'user' && canDelete && !confirming && (
            <button className="gcp-danger-btn" onClick={() => setConfirming(true)}>{t('skills.delete', { name })}</button>
          )}
          {detail.source === 'user' && canDelete && confirming && (
            <div className="gcp-inline-confirm" role="group" aria-label={t('skills.delete', { name })}>
              <p>{t('skills.deleteConfirm', { name })}</p>
              <button className="gcp-danger-btn" autoFocus onClick={() => void remove()}>{t('skills.delete', { name })}</button>
              <button className="gcp-secondary-btn" onClick={() => setConfirming(false)}>{t('common.cancel')}</button>
            </div>
          )}
          {deleteError && <p className="gcp-field-error" role="alert">{deleteError}</p>}
        </>
      )}
    </section>
  );
}
