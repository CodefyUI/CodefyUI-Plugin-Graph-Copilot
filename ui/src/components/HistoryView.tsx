import React, { useEffect, useId, useRef, useState } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Conversation } from '../state/conversations';
import { listConversations, deleteConversation } from '../state/conversations';

function DeleteIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v5M14 11v5"
        stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function relativeTime(ts: number): string {
  const sec = Math.floor((Date.now() - ts) / 1000);
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  return day < 7 ? `${day}d ago` : `${Math.floor(day / 7)}w ago`;
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
        <h2>Conversations</h2>
        <p>Saved in this browser only. Deleting a conversation does not undo graph changes or stop host runs.</p>
      </div>
      <div className="gcp-history-top">
        <button ref={newButtonRef} type="button" className="gcp-new-btn" aria-label="Start new conversation" disabled={disabled}
          onClick={() => { if (!disabled) { setPendingDelete(null); onNew(); } }}>
          New conversation
        </button>
      </div>
      {conversations.length === 0 ? (
        <div className="gcp-history-empty">
          <p>No conversations yet</p>
          <p>Start a new conversation to ask about or edit the current graph.</p>
        </div>
      ) : (
        <div className="gcp-history-list" ref={listRef} onClick={(e) => {
          if (e.target === e.currentTarget) cancelDelete();
        }}>
          {conversations.map((conv) => {
            const title = conv.title || '(untitled)';
            const confirming = pendingDelete === conv.id;
            return (
              <div key={conv.id} className={`gcp-history-item${conv.id === activeId ? ' active' : ''}`}>
                <button type="button" className="gcp-history-resume" disabled={disabled} data-resume-id={conv.id}
                  aria-label={`Resume conversation: ${title}`} aria-current={conv.id === activeId ? 'true' : undefined}
                  onClick={() => handleResume(conv.id)}>
                  <span className="gcp-history-info">
                    <span className="gcp-history-title" title={title}>{title}</span>
                    <span className="gcp-history-meta">
                      {relativeTime(conv.updatedAt)} · {conv.provider}/{conv.model || '—'}
                      {conv.reasoningEffort ? ` · ${conv.reasoningEffort} effort` : ''}
                    </span>
                  </span>
                </button>
                {confirming && <span id={confirmationId} className="gcp-history-confirm-label">Delete this conversation?</span>}
                <button type="button" className={`gcp-history-delete${confirming ? ' confirm' : ''}`}
                  data-delete-id={conv.id} disabled={disabled} onClick={() => handleDelete(conv.id)}
                  aria-describedby={confirming ? confirmationId : undefined}
                  aria-label={`${confirming ? 'Confirm delete' : 'Delete'} "${conv.title || 'untitled'}"`}
                  title={confirming ? 'Delete conversation' : 'Delete'}>
                  {confirming ? 'Delete' : <DeleteIcon />}
                </button>
                {confirming && (
                  <button type="button" className="gcp-history-cancel" disabled={disabled}
                    aria-label={`Cancel delete "${conv.title || 'untitled'}"`} onClick={() => cancelDelete(true)}>
                    Cancel
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
