import React from 'react';
import type { RunSummary, RunStatus, ValidationReport } from '../agent/types';

const STATUS_LABEL: Record<RunStatus, string> = {
  completed: 'Completed', cancelled: 'Stopped', failed: 'Failed', incomplete: 'Incomplete',
};
const VALIDATION_LABEL: Record<ValidationReport['status'], string> = {
  valid: 'Structure validated', invalid: 'Structure has issues', unavailable: 'Validation unavailable',
  not_run: 'Validation not run', stale: 'Validation out of date',
};

function bounded(text: string, length: number): string {
  return text.length > length ? `${text.slice(0, length - 1)}…` : text;
}

function operationCount(n: number, outcome: string): string {
  return `${n} operation${n === 1 ? '' : 's'} ${outcome}`;
}

/** A terminal receipt, not an execution claim or a recovery action controller. */
export function RunResult({ summary }: { summary: RunSummary }) {
  const message = summary.message || summary.reason?.replace(/_/g, ' ');
  const errors = summary.validation.errors.slice(0, 10);
  return (
    <div className={`gcp-run-result ${summary.status}`}>
      <div role="status" aria-live="polite" aria-atomic="true">
        <strong className="gcp-run-result-title">{STATUS_LABEL[summary.status]}</strong>
        {message && <p className="gcp-run-result-detail">{bounded(message, 1000)}</p>}
        {summary.appliedOps > 0 && <p className="gcp-run-result-detail">{operationCount(summary.appliedOps, 'applied')}</p>}
        {summary.failedOps > 0 && <p className="gcp-run-result-detail">{operationCount(summary.failedOps, 'failed')}</p>}
        {summary.mutation === 'none' && <p className="gcp-run-result-detail">No graph changes</p>}
        {summary.mutation === 'applied' && summary.appliedOps === 0 && <p className="gcp-run-result-detail">Graph changes applied</p>}
        {summary.mutation === 'unknown' && (
          <p className="gcp-run-result-detail">Changes may have been applied. Check the current graph before continuing.</p>
        )}
        <p className="gcp-run-result-detail">{VALIDATION_LABEL[summary.validation.status]}</p>
        {summary.status === 'cancelled' && summary.mutation !== 'none' && (
          <p className="gcp-run-result-detail">Applied changes are not undone by Stop. Use the host's Undo to undo them.</p>
        )}
      </div>
      {errors.length > 0 && (
        <details className="gcp-run-result-errors">
          <summary>Validation details</summary>
          <ul>{errors.map((error, i) => <li key={i}>{bounded(error, 400)}</li>)}</ul>
          {summary.validation.errors.length > errors.length && <p>More issues are available in the tool details.</p>}
        </details>
      )}
    </div>
  );
}
