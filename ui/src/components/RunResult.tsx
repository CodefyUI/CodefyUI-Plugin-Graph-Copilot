import React from 'react';
import type { RunSummary, RunStatus, ValidationReport } from '../agent/types';
import { currentLocale, translate } from '../i18n';
import { en, type MessageKey } from '../i18n/en';

const tr = (key: MessageKey, vars?: Record<string, string | number>) => translate(currentLocale(), key, vars);

const STATUS_KEY: Record<RunStatus, MessageKey> = {
  completed: 'run.status.completed', cancelled: 'run.status.cancelled', failed: 'run.status.failed', incomplete: 'run.status.incomplete',
};
const VALIDATION_KEY: Record<ValidationReport['status'], MessageKey> = {
  valid: 'stage.validation.ok', invalid: 'stage.validation.issues', unavailable: 'stage.validation.unavailable',
  not_run: 'stage.validation.notRun', stale: 'stage.validation.stale',
};

function bounded(text: string, length: number): string {
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
}

/** One sentence for why the run ended, in the panel's language. A reason the
 * dictionary does not know falls back to the loop's own message in English
 * and to nothing in other languages (the status word still says it). */
function reasonSentence(summary: RunSummary): string {
  if (summary.reason === 'aborted') return tr('run.reason.aborted');
  const key = `run.reason.${summary.reason ?? ''}` as MessageKey;
  if (summary.reason && key in en) return tr(key);
  return currentLocale() === 'en' && summary.message ? summary.message : '';
}

interface RunResultProps {
  summary: RunSummary;
  /** The real error text of the latest failed run (for example "HTTP 502: …"). */
  error?: string | null;
  /** Recovery actions (Retry, Continue) shown at the end of the same block. */
  children?: React.ReactNode;
}

/** A terminal receipt, not an execution claim. One block per run: the status
 * and its reason, the real error, a line of facts, then any recovery action. */
export function RunResult({ summary, error, children }: RunResultProps) {
  const detached = summary.reason === 'execution_detached';
  const reason = detached ? '' : reasonSentence(summary);
  const errors = summary.validation.errors.slice(0, 10);
  const facts: string[] = [];
  if (summary.appliedOps > 0) facts.push(tr(summary.appliedOps === 1 ? 'run.ops.applied.one' : 'run.ops.applied.many', { count: summary.appliedOps }));
  if (summary.failedOps > 0) facts.push(tr(summary.failedOps === 1 ? 'run.ops.failed.one' : 'run.ops.failed.many', { count: summary.failedOps }));
  if (summary.mutation === 'none') facts.push(tr('run.noChanges'));
  if (summary.mutation === 'applied' && summary.appliedOps === 0) facts.push(tr('run.changesApplied'));
  facts.push(tr(VALIDATION_KEY[summary.validation.status]));
  // A Stop the user asked for is not an error: no alert, neutral colour.
  const shownError = summary.status === 'cancelled' ? null : error;
  return (
    <div className={`gcp-run-result ${summary.status}${detached ? ' detached' : ''}`}>
      <div role="status" aria-live="polite" aria-atomic="true">
        <div className="gcp-run-result-head">
          <strong className="gcp-run-result-title">{detached ? tr('run.detached') : tr(STATUS_KEY[summary.status])}</strong>
          {reason && <span className="gcp-run-result-reason">{bounded(reason, 1000)}</span>}
        </div>
        {shownError && <p className="gcp-run-result-error" role="alert">{bounded(shownError, 1000)}</p>}
        {detached && <p className="gcp-run-result-detail">{tr('run.detached.note')}</p>}
        {summary.mutation === 'unknown' && <p className="gcp-run-result-detail">{tr('run.mutationUnknown')}</p>}
        {summary.hostRunId && <p className="gcp-run-result-detail">{tr('run.hostRun', { id: bounded(summary.hostRunId, 160) })}</p>}
        {summary.sideEffectAttempted && <p className="gcp-run-result-detail">{tr('run.sideEffect')}</p>}
        {summary.status === 'cancelled' && !detached && summary.sideEffectAttempted && (
          <p className="gcp-run-result-detail">{tr('run.stop.sideEffect')}</p>
        )}
        {summary.status === 'cancelled' && !detached && summary.mutation !== 'none' && (
          <p className="gcp-run-result-detail">{tr('run.stop.mutation')}</p>
        )}
        <p className="gcp-run-result-facts">
          {facts.map((fact, i) => (
            <React.Fragment key={fact}>{i > 0 && ' · '}<span>{fact}</span></React.Fragment>
          ))}
        </p>
      </div>
      {children && <div className="gcp-run-result-actions">{children}</div>}
      {errors.length > 0 && (
        <details className="gcp-run-result-errors">
          <summary>{tr('run.validationDetails')}</summary>
          <ul>{errors.map((item, i) => <li key={i}>{bounded(item, 400)}</li>)}</ul>
          {summary.validation.errors.length > errors.length && <p>{tr('run.moreIssues')}</p>}
        </details>
      )}
    </div>
  );
}
