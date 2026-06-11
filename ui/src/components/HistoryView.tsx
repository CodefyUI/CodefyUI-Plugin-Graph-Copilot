import React, { useState } from 'react';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import type { Conversation } from '../state/conversations';
import { listConversations, deleteConversation } from '../state/conversations';

// ---------------------------------------------------------------------------
// Relative-time helper
// ---------------------------------------------------------------------------

function relativeTime(ts: number): string {
  const diff = Date.now() - ts;
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return 'just now';
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 24) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 7) return `${day}d ago`;
  const wk = Math.floor(day / 7);
  return `${wk}w ago`;
}

// ---------------------------------------------------------------------------
// Props
// ---------------------------------------------------------------------------

export interface HistoryViewProps {
  api: CodefyUIPluginAPI;
  activeId: string;
  onResume: (conv: Conversation) => void;
  onNew: () => void;
}

// ---------------------------------------------------------------------------
// HistoryView
// ---------------------------------------------------------------------------

export function HistoryView({ api, activeId, onResume, onNew }: HistoryViewProps) {
  const [conversations, setConversations] = useState<Conversation[]>(() =>
    listConversations(api),
  );
  // Track which row is in "confirm delete" state (first click)
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (pendingDelete === id) {
      // Second click — confirm delete
      deleteConversation(api, id);
      setConversations(listConversations(api));
      if (pendingDelete === id) setPendingDelete(null);
    } else {
      // First click — arm confirm
      setPendingDelete(id);
    }
  };

  // Clicking elsewhere clears the pending-delete state
  const handleListClick = () => {
    setPendingDelete(null);
  };

  return (
    <div className="gcp-history">
      <div className="gcp-history-top">
        <button
          className="gcp-new-btn"
          onClick={onNew}
          aria-label="Start new conversation"
        >
          + New chat
        </button>
      </div>

      {conversations.length === 0 ? (
        <div className="gcp-history-empty">No conversations yet</div>
      ) : (
        <div className="gcp-history-list" onClick={handleListClick}>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`gcp-history-item${conv.id === activeId ? ' active' : ''}`}
              onClick={() => onResume(conv)}
              role="button"
              tabIndex={0}
              aria-label={`Resume conversation: ${conv.title || '(untitled)'}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onResume(conv);
                }
              }}
            >
              <div className="gcp-history-info">
                <div className="gcp-history-title">
                  {conv.title || '(untitled)'}
                </div>
                <div className="gcp-history-meta">
                  {relativeTime(conv.updatedAt)} · {conv.provider}/{conv.model || '—'}
                </div>
              </div>

              <button
                className={`gcp-history-delete${pendingDelete === conv.id ? ' confirm' : ''}`}
                onClick={(e) => handleDelete(e, conv.id)}
                aria-label={
                  pendingDelete === conv.id
                    ? `Confirm delete "${conv.title || 'untitled'}"`
                    : `Delete "${conv.title || 'untitled'}"`
                }
                title={pendingDelete === conv.id ? 'Click again to confirm' : 'Delete'}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
