import React, { useEffect, useId, useRef, useState } from 'react';
import type { ChatTurn } from '../state/conversations';
import type { AttachmentKind } from '../state/attachments';
import { currentLocale, translate } from '../i18n';
import type { ToolStage } from './turnStages';
import { argSummary, describeStage, formatDuration, opsLine } from './turnStages';
import { Markdown } from './markdown';
import { RunResult } from './RunResult';

interface MessageBubbleProps {
  turn: ChatTurn;
  /** Tool stages grouped under this assistant turn (see turnStages). */
  stages?: ToolStage[];
  /** Only the current run's pending stages may animate. Saved history defaults off. */
  active?: boolean;
  /** An approval card is open for this run: its pending approval tool waits on it. */
  awaiting?: boolean;
  /** Latest run only: its real error and recovery actions join the run result block (U3). */
  runError?: string | null;
  runActions?: React.ReactNode;
  /** 1-based agent step number for tool-calling rounds (see groupTurns). */
  step?: number;
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

/** Streaming text re-parsed as markdown at most every `ms` (80ms): the last
 * chunk always lands, and a finished message is never delayed. */
export function useThrottledText(text: string, live: boolean, ms = 80): string {
  const [shown, setShown] = useState(text);
  const last = useRef(0);
  useEffect(() => {
    if (!live) { setShown(text); return; }
    const wait = ms - (Date.now() - last.current);
    if (wait <= 0) { last.current = Date.now(); setShown(text); return; }
    const id = window.setTimeout(() => { last.current = Date.now(); setShown(text); }, wait);
    return () => window.clearTimeout(id);
  }, [text, live, ms]);
  return live ? shown : text;
}

/** One glyph per outcome; colour repeats it, never replaces it. */
const GLYPH: Record<string, string> = { running: '⚙', waiting: '!', ok: '✓', error: '✗', unknown: '?', cancelled: '○', not_executed: '○', interrupted: '○' };

function ToolStageRow({ stage, active, awaiting = false }: { stage: ToolStage; active: boolean; awaiting?: boolean }) {
  const [open, setOpen] = useState(false);
  const detailId = useId();
  const d = describeStage(stage, active, awaiting);
  const expandable = !!d.detail;
  const durationMs = stage.result?.durationMs;
  const args = argSummary(stage.call.arguments);
  // U4: the past-tense effect line only once the edit has actually happened.
  const ops = stage.call.name === 'apply_graph_operations' && d.status === 'ok' ? opsLine(stage.call.arguments) : '';

  return (
    <div className={`gcp-stage ${d.status}`} aria-busy={d.status === 'running'}>
      <button
        type="button"
        className="gcp-stage-head"
        onClick={() => expandable && setOpen((v) => !v)}
        aria-expanded={expandable ? open : undefined}
        aria-controls={expandable && open ? detailId : undefined}
        aria-label={`${d.label}${d.summary ? `: ${d.summary}` : ''}`}
        disabled={!expandable}
      >
        <span className="gcp-stage-status" aria-hidden="true">
          {d.status === 'running' ? <span className="gcp-stage-spinner">{GLYPH.running}</span> : GLYPH[d.status] ?? '?'}
        </span>
        <span className="gcp-stage-copy">
          <span className="gcp-stage-line">
            <span className="gcp-stage-label">{d.label}</span>
            <code className="gcp-stage-name">{stage.call.name}</code>
          </span>
          {d.summary && <span className="gcp-stage-summary">{d.summary}</span>}
          {ops && <span className="gcp-stage-ops">{ops}</span>}
          {args && !ops && stage.call.name !== 'apply_graph_operations' && <code className="gcp-stage-args" title={args}>{args}</code>}
        </span>
        {typeof durationMs === 'number' && (
          <span className="gcp-stage-time">{formatDuration(durationMs)}</span>
        )}
        {expandable && <ChevronIcon open={open} />}
      </button>
      {d.media && d.media.length > 0 && (
        <div className="gcp-stage-media">
          {d.media.map((m) => (
            // #310: same-origin /api/media references, host-served with a
            // real Content-Type. A gif is an animated image — browsers
            // refuse it as a <video> source.
            m.format === 'gif' ? (
              <img
                key={m.url}
                className="gcp-stage-clip"
                src={m.url}
                alt={m.node ? translate(currentLocale(), 'bubble.clip.node', { node: m.node }) : translate(currentLocale(), 'bubble.clip')}
              />
            ) : (
              <video
                key={m.url}
                className="gcp-stage-clip"
                src={m.url}
                controls
                loop
                preload="metadata"
              />
            )
          ))}
        </div>
      )}
      {open && d.detail && <pre id={detailId} className="gcp-stage-detail">{d.detail}</pre>}
    </div>
  );
}

/** Calls whose rows carry their own results (edits, runs, commits) stay on
 * their own line; three or more other calls in a row fold into one row. */
const OWN_ROW = new Set(['apply_graph_operations', 'run_graph', 'run_graph_experiments', 'optimize_graph_parameters', 'project_commit']);

export function batchStages(stages: ToolStage[]): (ToolStage | ToolStage[])[] {
  const out: (ToolStage | ToolStage[])[] = [];
  for (let i = 0; i < stages.length;) {
    if (OWN_ROW.has(stages[i].call.name)) { out.push(stages[i]); i++; continue; }
    let j = i;
    while (j < stages.length && !OWN_ROW.has(stages[j].call.name)) j++;
    if (j - i >= 3) out.push(stages.slice(i, j));
    else out.push(...stages.slice(i, j));
    i = j;
  }
  return out;
}

function ToolBatch({ stages, active, awaiting = false }: { stages: ToolStage[]; active: boolean; awaiting?: boolean }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const described = stages.map((stage) => describeStage(stage, active, awaiting));
  const tally = (status: string) => described.filter((d) => d.status === status).length;
  const running = tally('running');
  const failed = tally('error') + tally('unknown');
  const status = running ? 'running' : failed ? 'error' : 'ok';
  const names = [...new Set(stages.map((stage) => stage.call.name))].join(', ');
  const facts = [`${tally('ok')} ✓`, ...(failed ? [`${failed} ✗`] : []), ...(running ? [`${running} ⚙`] : [])].join(' · ');
  return (
    <div className={`gcp-stage gcp-stage-batch ${status}`} aria-busy={status === 'running'}>
      <button type="button" className="gcp-stage-head" aria-expanded={open} aria-controls={open ? id : undefined}
        aria-label={`${translate(currentLocale(), 'bubble.toolCalls', { count: stages.length })}: ${names} · ${facts}`} onClick={() => setOpen((v) => !v)}>
        <span className="gcp-stage-status" aria-hidden="true">{GLYPH[status]}</span>
        <span className="gcp-stage-copy">
          <span className="gcp-stage-line">
            <span className="gcp-stage-label">{translate(currentLocale(), 'bubble.toolCalls', { count: stages.length })}</span>
            <code className="gcp-stage-name">{names}</code>
          </span>
          <span className="gcp-stage-summary">{facts}</span>
        </span>
        <ChevronIcon open={open} />
      </button>
      {open && (
        <div id={id} className="gcp-stage-batch-items">
          {stages.map((stage, i) => <ToolStageRow key={`${stage.call.id}-${i}`} stage={stage} active={active} awaiting={awaiting} />)}
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// MessageBubble
// ---------------------------------------------------------------------------

export function MessageBubble({
  turn,
  stages = [],
  active = false,
  awaiting = false,
  runError,
  runActions,
  step,
  streaming = false,
  streamingText,
}: MessageBubbleProps) {
  const liveText = useThrottledText(streamingText ?? '', streaming && streamingText !== undefined);
  // Tool turns are never rendered standalone (they fold into stages)
  if (turn.role === 'tool') return null;
  const t = translate.bind(null, currentLocale());

  const isUser = turn.role === 'user';
  const displayText = streaming && streamingText !== undefined ? liveText : turn.content;
  const hasText = displayText.trim().length > 0;
  const attachments = turn.attachments ?? [];
  const isStep = !isUser && stages.length > 0;

  return (
    <div className={`gcp-msg-row ${isUser ? 'user' : 'assistant'}${isStep ? ' step' : ''}`}>
      {isUser && <span className="gcp-message-author">{t('bubble.you')}</span>}
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

      {/* Skills invoked with /name: a tag, never the skill's text */}
      {isUser && (turn.skills?.length ?? 0) > 0 && (
        <ul className="gcp-skill-tags in-transcript" aria-label={t('tags.label')}>
          {turn.skills!.map((skill) => (
            <li key={skill.id} className="gcp-skill-tag invoked">{t('tags.invoked', { name: skill.name })}</li>
          ))}
        </ul>
      )}

      {/* Step marker — labels each tool-calling round of a multi-round run */}
      {isStep && typeof step === 'number' && (
        <div className="gcp-step-tag">
          {t('bubble.step', { step })}
        </div>
      )}

      {/* Text bubble — skipped when a turn carries only attachments/stages */}
      {(hasText || (streaming && stages.length === 0)) && (
        <div className="gcp-bubble">
          {isUser ? renderPlain(displayText) : <Markdown text={displayText} />}
          {streaming && <span className="gcp-caret" aria-hidden="true" />}
        </div>
      )}

      {/* Tool stages (assistant turns only) — the wired step timeline */}
      {stages.length > 0 && (
        <div className="gcp-stages">
          {batchStages(stages).map((entry, i) => Array.isArray(entry)
            ? <ToolBatch key={`batch-${entry[0].call.id}-${i}`} stages={entry} active={active && !turn.runSummary} awaiting={awaiting} />
            : <ToolStageRow key={`${entry.call.id}-${i}`} stage={entry} active={active && !turn.runSummary} awaiting={awaiting} />)}
        </div>
      )}

      {!isUser && turn.runSummary && <RunResult summary={turn.runSummary} error={runError}>{runActions}</RunResult>}

      {/* Legacy ops summary chip — never contradict a structured run result. */}
      {!isUser && !turn.runSummary && turn.opsSummary && stages.length === 0 && (
        <div className="gcp-ops-chip">
          <span>{t('bubble.applied', { summary: turn.opsSummary })}</span>
        </div>
      )}
    </div>
  );
}
