import React, { useEffect, useId, useRef, useState } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Conversation } from '../state/conversations';
import { listConversations, deleteConversation } from '../state/conversations';
import { currentLocale, translate, useT } from '../i18n';

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function relativeTime(ts: number): string {
  const tr = translate.bind(null, currentLocale());
  const sec = Math.floor((Date.now() - ts) / 1000);
  if (sec < 60) return tr('history.justNow');
  const min = Math.floor(sec / 60);
  if (min < 60) return tr('history.minutesAgo', { count: min });
  const hr = Math.floor(min / 60);
  if (hr < 24) return tr('history.hoursAgo', { count: hr });
  const day = Math.floor(hr / 24);
  return day < 7 ? tr('history.daysAgo', { count: day }) : tr('history.weeksAgo', { count: Math.floor(day / 7) });
}

export interface HistoryViewProps {
  api: CodefyUIPluginAPI;
  activeId: string;
  onResume: (conv: Conversation) => void;
  onNew: () => void;
  /** Prevent navigation or deletion until the active run has settled. */
  disabled?: boolean;
}

export function HistoryView({ api, activeId, onResume, onNew, disabled = false }: HistoryViewProps) {
  const [conversations, setConversations] = useState<Conversation[]>(() => listConversations(api));
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const t = useT();
  const confirmationId = useId();
  const focusAfterDeleteRef = useRef<string | null | undefined>(undefined);
  const listRef = useRef<HTMLDivElement>(null);
  const newButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (disabled) setPendingDelete(null);
    else setConversations(listConversations(api));
  }, [api, disabled]);
  useEffect(() => {
    if (focusAfterDeleteRef.current === undefined) return;
    const nextId = focusAfterDeleteRef.current;
    const next = nextId
      ? [...(listRef.current?.querySelectorAll<HTMLButtonElement>('[data-resume-id]') ?? [])]
        .find((button) => button.dataset.resumeId === nextId)
      : newButtonRef.current;
    next?.focus();
    focusAfterDeleteRef.current = undefined;
  }, [conversations]);

  function cancelDelete(restoreFocus = false) {
    if (restoreFocus && pendingDelete) {
      [...(listRef.current?.querySelectorAll<HTMLButtonElement>('[data-delete-id]') ?? [])]
        .find((button) => button.dataset.deleteId === pendingDelete)?.focus();
    }
    setPendingDelete(null);
  }

  function handleResume(id: string) {
    if (disabled) return;
    const saved = listConversations(api);
    setConversations(saved);
    setPendingDelete(null);
    const current = saved.find((conv) => conv.id === id);
    if (current) onResume(current);
  }

  function handleDelete(id: string) {
    if (disabled) return;
    if (pendingDelete !== id) {
      setPendingDelete(id);
      return;
    }
    const index = conversations.findIndex((conv) => conv.id === id);
    const next = conversations[index + 1] ?? conversations[index - 1];
    deleteConversation(api, id);
    focusAfterDeleteRef.current = next?.id ?? null;
    setConversations(listConversations(api));
    setPendingDelete(null);
  }

  return (
    <div className="gcp-history" onKeyDown={(e) => {
      if (e.key === 'Escape' && pendingDelete) {
        e.preventDefault();
        e.stopPropagation();
        cancelDelete(true);
      }
    }}>
      <div className="gcp-view-heading">
        <h2>{t('history.title')}</h2>
        <p>{t('history.note')}</p>
      </div>
      <div className="gcp-history-top">
        <button ref={newButtonRef} type="button" className="gcp-new-btn" aria-label={t('history.new.aria')} disabled={disabled}
          onClick={() => { if (!disabled) { setPendingDelete(null); onNew(); } }}>
          {t('history.new')}
        </button>
      </div>
      {conversations.length === 0 ? (
        <div className="gcp-history-empty">
          <p>{t('history.empty')}</p>
          <p>{t('history.empty.hint')}</p>
        </div>
      ) : (
        <div className="gcp-history-list" ref={listRef} onClick={(e) => {
          if (e.target === e.currentTarget) cancelDelete();
        }}>
          {conversations.map((conv) => {
            const title = conv.title || t('history.untitled.paren');
            const name = conv.title || t('history.untitled');
            const confirming = pendingDelete === conv.id;
            return (
              <div key={conv.id} className={`gcp-history-item${conv.id === activeId ? ' active' : ''}`}>
                <button type="button" className="gcp-history-resume" disabled={disabled} data-resume-id={conv.id}
                  aria-label={t('history.resume', { title })} aria-current={conv.id === activeId ? 'true' : undefined}
                  onClick={() => handleResume(conv.id)}>
                  <span className="gcp-history-info">
                    <span className="gcp-history-title" title={title}>{title}</span>
                    <span className="gcp-history-meta">
                      {relativeTime(conv.updatedAt)} · {conv.provider}/{conv.model || '—'}
                      {conv.reasoningEffort ? ` · ${t('history.effort', { effort: conv.reasoningEffort })}` : ''}
                    </span>
                  </span>
                </button>
                {confirming && <span id={confirmationId} className="gcp-history-confirm-label">{t('history.delete.confirm')}</span>}
                <button type="button" className={`gcp-history-delete${confirming ? ' confirm' : ''}`}
                  data-delete-id={conv.id} disabled={disabled} onClick={() => handleDelete(conv.id)}
                  aria-describedby={confirming ? confirmationId : undefined}
                  aria-label={t(confirming ? 'history.delete.confirmAria' : 'history.delete.aria', { title: name })}
                  title={confirming ? t('history.delete.title') : t('history.delete')}>
                  {confirming ? t('history.delete') : <DeleteIcon />}
                </button>
                {confirming && (
                  <button type="button" className="gcp-history-cancel" disabled={disabled}
                    aria-label={t('history.delete.cancelAria', { title: name })} onClick={() => cancelDelete(true)}>
                    {t('common.cancel')}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
