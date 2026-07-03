import React, { useState } from 'react';
import type { ChatTurn } from '../state/conversations';
import type { AttachmentKind } from '../state/attachments';
import type { ToolStage } from './turnStages';
import { describeStage } from './turnStages';
import { Markdown } from './markdown';

interface MessageBubbleProps {
  turn: ChatTurn;
  /** Tool stages grouped under this assistant turn (see turnStages). */
  stages?: ToolStage[];
  streaming?: boolean;
  streamingText?: string;
}

/** Small file glyph for attachment chips (pdf vs generic text/code). */
function FileGlyph({ kind }: { kind: AttachmentKind }) {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M14 2v6h6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      {kind === 'pdf' ? (
        <path d="M9 18v-4M15 18v-4m0 0h1.5M9 14h.8a1 1 0 0 1 0 2H9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      ) : (
        <path d="M8 13h8M8 17h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      )}
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AlertIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v9" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="12" cy="19" r="1.7" fill="currentColor" />
    </svg>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      className={`gcp-stage-chevron${open ? ' open' : ''}`}
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * Render user-turn content, splitting on fenced code blocks (```...```) into
 * prose <span> and <pre> blocks. User text is otherwise shown verbatim —
 * markdown is only interpreted in assistant replies.
 */
function renderPlain(text: string): React.ReactNode[] {
  const parts = text.split(/(```[^\n]*\n[\s\S]*?```|```[\s\S]*?```)/g);
  const nodes: React.ReactNode[] = [];

  parts.forEach((part, i) => {
    if (part.startsWith('```')) {
      const inner = part.replace(/^```[^\n]*\n?/, '').replace(/```$/, '');
      nodes.push(<pre key={i}><code>{inner}</code></pre>);
    } else if (part) {
      nodes.push(<span key={i}>{part}</span>);
    }
  });

  return nodes;
}

// ---------------------------------------------------------------------------
// Tool stage row — one line per tool call: status, label, summary, expandable
// detail. This is what makes an agent run read as distinct steps.
// ---------------------------------------------------------------------------

function ToolStageRow({ stage }: { stage: ToolStage }) {
  const [open, setOpen] = useState(false);
  const d = describeStage(stage);
  const expandable = !!d.detail;

  return (
    <div className={`gcp-stage ${d.status}`}>
      <button
        type="button"
        className="gcp-stage-head"
        onClick={() => expandable && setOpen((v) => !v)}
        aria-expanded={expandable ? open : undefined}
        aria-label={`${d.label}${d.summary ? `: ${d.summary}` : ''}`}
        disabled={!expandable}
      >
        <span className="gcp-stage-status" aria-hidden="true">
          {d.status === 'running' ? (
            <span className="gcp-stage-spinner" />
          ) : d.status === 'ok' ? (
            <CheckIcon />
          ) : (
            <AlertIcon />
          )}
        </span>
        <span className="gcp-stage-label">{d.label}</span>
        {d.summary && <span className="gcp-stage-summary">{d.summary}</span>}
        {expandable && <ChevronIcon open={open} />}
      </button>
      {open && d.detail && <pre className="gcp-stage-detail">{d.detail}</pre>}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MessageBubble
// ---------------------------------------------------------------------------

export function MessageBubble({
  turn,
  stages = [],
  streaming = false,
  streamingText,
}: MessageBubbleProps) {
  // Tool turns are never rendered standalone (they fold into stages)
  if (turn.role === 'tool') return null;

  const isUser = turn.role === 'user';
  const displayText = streaming && streamingText !== undefined ? streamingText : turn.content;
  const hasText = displayText.trim().length > 0;
  const attachments = turn.attachments ?? [];

  return (
    <div className={`gcp-msg-row ${isUser ? 'user' : 'assistant'}`}>
      {/* Attachments (above the text, for user turns) */}
      {attachments.length > 0 && (
        <div className="gcp-bubble-attachments">
          {attachments.map((a, idx) =>
            a.kind === 'image' && a.dataUrl ? (
              <img key={idx} className="gcp-att-image" src={a.dataUrl} alt={a.name} title={a.name} />
            ) : (
              <span key={idx} className="gcp-att-file" title={a.name}>
                <FileGlyph kind={a.kind} />
                <span className="gcp-att-file-name">{a.name}</span>
              </span>
            ),
          )}
        </div>
      )}

      {/* Text bubble — skipped when a turn carries only attachments/stages */}
      {(hasText || (streaming && stages.length === 0)) && (
        <div className="gcp-bubble">
          {isUser ? renderPlain(displayText) : <Markdown text={displayText} />}
          {streaming && <span className="gcp-caret" aria-hidden="true" />}
        </div>
      )}

      {/* Tool stages (assistant turns only) */}
      {stages.length > 0 && (
        <div className="gcp-stages">
          {stages.map((s, i) => (
            <ToolStageRow key={`${s.call.id}-${i}`} stage={s} />
          ))}
        </div>
      )}

      {/* Legacy ops summary chip — only for turns without renderable stages */}
      {!isUser && turn.opsSummary && stages.length === 0 && (
        <div className="gcp-ops-chip">
          <span>Applied: {turn.opsSummary}</span>
        </div>
      )}
    </div>
  );
}
