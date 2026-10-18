import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  EXPERIMENTS_CHANGED_EVENT,
  loadExperimentSessions,
  saveExperimentSession,
  type ExperimentSession,
  type ExperimentVariantResult,
} from '../agent/experiments';
import {
  encodePerRunStudyCsv,
  generateResearchMarkdownReport,
  type PerRunStudy,
  type PerRunStudyObservation,
} from '../agent/experimentAnalysis';
import {
  STUDY_BUNDLE_MAX_BYTES,
  encodeStudyBundle,
  type StudyBundleV1,
} from '../agent/studyBundle';
import {
  loadStudyBundle,
  loadStudyIndex,
  parseStudyImport,
  saveStudyBundle,
} from '../agent/studyStorage';
import { projectStudyBundleToSession } from '../agent/studyImportProjection';
import {
  encodeCandidateGraphJson,
  materializeStudyCandidate,
} from '../agent/studyMaterialize';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import { ConfirmDialog } from './ConfirmDialog';

export interface ExperimentsViewProps {
  api: CodefyUIPluginAPI;
  /** Open a comparison draft for review; this action must not send or run it. */
  onStartStudy?: (prompt: string) => void;
}

const COMPARISON_PROMPT = 'Compare three learning-rate variants, maximize validation accuracy, and run each three times.';

function safeLoad(api: CodefyUIPluginAPI): ExperimentSession[] {
  try {
    return loadExperimentSessions(api);
  } catch {
    return [];
  }
}

function formatDate(value: string): string {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'Date unavailable';
  return new Intl.DateTimeFormat(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}

function formatMetric(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return '—';
  const magnitude = Math.abs(value);
  if (magnitude !== 0 && (magnitude >= 100_000 || magnitude < 0.0001)) {
    return value.toExponential(3);
  }
  return new Intl.NumberFormat(undefined, { maximumSignificantDigits: 6 }).format(value);
}

function formatSignedMetric(value: number | undefined): string {
  if (value === undefined || !Number.isFinite(value)) return '—';
  return `${value > 0 ? '+' : ''}${formatMetric(value)}`;
}

function formatRuntime(value: number): string {
  if (!Number.isFinite(value) || value < 0) return '—';
  if (value < 1000) return `${Math.round(value)} ms`;
  return `${(value / 1000).toFixed(value < 10_000 ? 1 : 0)} s`;
}

function rankedVariants(session: ExperimentSession): ExperimentVariantResult[] {
  return [...(session.variants ?? [])].sort((left, right) => {
    if (left.mean === undefined) return right.mean === undefined ? 0 : 1;
    if (right.mean === undefined) return -1;
    return session.objective.direction === 'maximize'
      ? right.mean - left.mean
      : left.mean - right.mean;
  });
}

function exportableStudy(session: ExperimentSession): PerRunStudy {
  const runs: PerRunStudyObservation[] = [];
  session.variants.forEach((variant) => {
    if (variant.runs) {
      runs.push(...variant.runs.map((run) => ({
        variantId: variant.id,
        variantLabel: variant.label,
        repetition: run.repetition,
        status: run.status,
        metricKey: run.metricKey,
        metricValue: run.metricValue,
        runtimeMs: run.durationMs,
        error: run.error,
      })));
      return;
    }
    // Legacy summaries have only successful objective values. Export them
    // without inventing missing attempts or per-run runtimes.
    runs.push(...variant.metricValues.map((metricValue, index) => ({
      variantId: variant.id,
      variantLabel: variant.label,
      repetition: index + 1,
      status: 'completed',
      metricKey: variant.metricKey,
      metricValue,
    })));
  });
  return {
    id: session.id,
    createdAt: session.createdAt,
    hypothesis: session.hypothesis,
    objective: session.objective,
    baselineVariantId: session.baselineVariantId,
    warnings: session.insights?.warnings ?? [],
    paperLeads: session.insights?.paperIdeas ?? [],
    runs,
  };
}

function downloadText(filename: string, mediaType: string, content: string): void {
  const url = URL.createObjectURL(new Blob([content], { type: `${mediaType};charset=utf-8` }));
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.style.display = 'none';
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

function safeFilename(value: string): string {
  const safe = value.replace(/[^a-z0-9._-]+/gi, '-').replace(/^-+|-+$/g, '');
  return safe || 'graph-copilot-study';
}

function StatusBadge({ status }: { status: string }) {
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return <span className={`gcp-lab-badge ${status}`}>{label}</span>;
}

function CandidateDisclosures({ variant }: { variant: ExperimentVariantResult }) {
  const operations = variant.operationSummary;
  return (
    <div className="gcp-candidate-disclosures">
      {operations && operations.length > 0 ? (
        <details className="gcp-candidate-disclosure operations">
          <summary>Operation summaries ({operations.length})</summary>
          <ul>
            {operations.map((operation, index) => <li key={`${index}-${operation}`}>{operation}</li>)}
          </ul>
        </details>
      ) : (
        <span className="gcp-candidate-evidence-note">
          {operations ? 'No graph changes recorded.' : 'Operation summaries unavailable.'}
        </span>
      )}
      {variant.errors.length > 0 && (
        <details className="gcp-candidate-disclosure errors">
          <summary>Errors ({variant.errors.length})</summary>
          <ul>
            {variant.errors.map((error, index) => <li key={`${index}-${error}`}>{error}</li>)}
          </ul>
        </details>
      )}
    </div>
  );
}

function EmptyLab({ onStartStudy }: Pick<ExperimentsViewProps, 'onStartStudy'>) {
  return (
    <div className="gcp-lab-empty">
      <h2>No experiment studies yet</h2>
      <p>
        Choose a numeric objective, compare graph variants, and repeat each candidate.
        Ask in Chat or import a portable study to review its evidence here.
      </p>
      <p className="gcp-lab-example">{COMPARISON_PROMPT}</p>
      {onStartStudy && (
        <>
          <button type="button" className="gcp-lab-start-study" onClick={() => onStartStudy(COMPARISON_PROMPT)}>
            Plan a comparison
          </button>
          <p className="gcp-lab-start-note">Opens a draft in Chat for review. Nothing is sent or run.</p>
        </>
      )}
    </div>
  );
}

export function ExperimentsView({ api, onStartStudy }: ExperimentsViewProps) {
  const [sessions, setSessions] = useState<ExperimentSession[]>(() => safeLoad(api));
  const [selectedId, setSelectedId] = useState<string | null>(() => safeLoad(api)[0]?.id ?? null);
  const [portableBundle, setPortableBundle] = useState<StudyBundleV1 | null>(null);
  const [portableLoading, setPortableLoading] = useState(false);
  const [portableMessage, setPortableMessage] = useState<string | null>(null);
  const [importPreview, setImportPreview] = useState<StudyBundleV1 | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);
  const importReadVersion = useRef(0);
  const importCommitPending = useRef(false);

  useEffect(() => () => { importReadVersion.current += 1; }, []);

  useEffect(() => {
    const refresh = () => {
      const next = safeLoad(api);
      setSessions(next);
      setSelectedId((current) => current && next.some((session) => session.id === current)
        ? current
        : next[0]?.id ?? null);
    };
    window.addEventListener(EXPERIMENTS_CHANGED_EVENT, refresh);
    return () => window.removeEventListener(EXPERIMENTS_CHANGED_EVENT, refresh);
  }, [api]);

  const selected = sessions.find((session) => session.id === selectedId) ?? sessions[0];
  const selectedPortableBundle = selected && portableBundle?.payload.id === selected.id
    ? portableBundle
    : null;
  const leaderboard = useMemo(() => selected ? rankedVariants(selected) : [], [selected]);

  useEffect(() => {
    let active = true;
    setPortableBundle(null);
    setPortableLoading(false);
    if (!selected) return () => { active = false; };

    const indexed = loadStudyIndex(api).entries.some((entry) => entry.id === selected.id);
    if (!indexed) return () => { active = false; };

    setPortableLoading(true);
    void loadStudyBundle(api, selected.id)
      .then((bundle) => {
        if (active) setPortableBundle(bundle);
      })
      .catch((error) => {
        if (active) setPortableMessage(`Portable study could not be verified: ${String(error)}`);
      })
      .finally(() => {
        if (active) setPortableLoading(false);
      });
    return () => { active = false; };
  }, [api, selected?.id]);

  const handleImportFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.currentTarget.files?.[0];
    event.currentTarget.value = '';
    if (!file || importPreview || importCommitPending.current) return;
    const readVersion = ++importReadVersion.current;
    setImportError(null);
    setPortableMessage(null);
    try {
      if (typeof file.size === 'number' && file.size > STUDY_BUNDLE_MAX_BYTES) {
        throw new Error(`Portable study exceeds the ${STUDY_BUNDLE_MAX_BYTES} byte import limit`);
      }
      const preview = await parseStudyImport(await file.text());
      if (readVersion === importReadVersion.current) setImportPreview(preview);
    } catch (error) {
      if (readVersion !== importReadVersion.current) return;
      setImportPreview(null);
      setImportError(`Import rejected before storage: ${String(error)}`);
    }
  };

  const commitImport = async () => {
    if (!importPreview || importCommitPending.current) return;
    importCommitPending.current = true;
    importReadVersion.current += 1;
    setImporting(true);
    setImportError(null);
    let bundleStored = false;
    try {
      if (loadExperimentSessions(api).some((session) => session.id === importPreview.payload.id)) {
        throw new Error(
          `A local Experiment Lab report already uses study id '${importPreview.payload.id}'; import was refused to avoid overwriting local evidence.`,
        );
      }
      const projected = projectStudyBundleToSession(importPreview);
      const stored = await saveStudyBundle(api, importPreview);
      bundleStored = true;
      await saveExperimentSession(api, projected, { rejectIfExists: true });
      setSelectedId(projected.id);
      setPortableBundle(importPreview);
      setImportPreview(null);
      setPortableMessage(stored.status === 'unchanged'
        ? 'This content-integrity-checked portable study was already stored; its read-only report was added.'
        : 'Portable study imported for read-only review. SHA-256 checks content changes only; it does not authenticate authorship. No graph was executed or applied.');
    } catch (error) {
      setImportError(bundleStored
        ? `The content-integrity-checked bundle was stored, but its read-only Lab report could not be saved. Retry the import: ${String(error)}`
        : `Portable study was not imported: ${String(error)}`);
    } finally {
      importCommitPending.current = false;
      setImporting(false);
    }
  };

  const exportPortableStudy = async () => {
    if (!selected) return;
    try {
      const bundle = selectedPortableBundle ?? await loadStudyBundle(api, selected.id);
      setPortableBundle(bundle);
      downloadText(
        `${safeFilename(selected.id)}-portable-study.json`,
        'application/json',
        await encodeStudyBundle(bundle),
      );
      setPortableMessage('Portable study content integrity checked before export; SHA-256 does not authenticate authorship.');
    } catch (error) {
      setPortableMessage(`Portable study export failed: ${String(error)}`);
    }
  };

  const exportCandidateGraph = (variantId: string, label: string) => {
    if (!selectedPortableBundle) return;
    try {
      const materialized = materializeStudyCandidate(selectedPortableBundle, variantId);
      if (materialized.status === 'error' || !materialized.graph) {
        throw new Error(materialized.errors[0]?.message ?? 'Candidate could not be reconstructed');
      }
      downloadText(
        `${safeFilename(selectedPortableBundle.payload.id)}-${safeFilename(label)}-graph.json`,
        'application/json',
        encodeCandidateGraphJson(materialized.graph),
      );
      const outcome = materialized.status === 'blocked'
        ? `Candidate graph downloaded with ${materialized.missingSecretRefs.length} unresolved secret value(s) left blank.`
        : 'Candidate graph materialized from the content-integrity-checked portable operation record and downloaded.';
      setPortableMessage(materialized.fidelityWarnings.length === 0
        ? outcome
        : `${outcome} Fidelity warning: ${materialized.fidelityWarnings.join(' ')}`);
    } catch (error) {
      setPortableMessage(`Candidate graph export failed: ${String(error)}`);
    }
  };

  return (
    <section className="gcp-lab" aria-labelledby="gcp-lab-title">
      <div className="gcp-lab-heading">
        <div>
          <h1 id="gcp-lab-title">Experiment lab</h1>
          <p>Review candidate results, graph changes, and evidence limits.</p>
        </div>
        <div className="gcp-lab-heading-actions">
          <span className="gcp-lab-count" aria-label={`${sessions.length} experiment ${sessions.length === 1 ? 'study' : 'studies'}`}>
            {sessions.length} {sessions.length === 1 ? 'study' : 'studies'}
          </span>
          <button type="button" disabled={importing} onClick={() => importInputRef.current?.click()}>
            Import portable study
          </button>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            aria-label="Choose portable study file"
            hidden
            onChange={(event) => { void handleImportFile(event); }}
          />
        </div>
      </div>

      {importError && !importPreview && (
        <p className="gcp-lab-portable-message error" role="alert">{importError}</p>
      )}
      {portableMessage && <p className="gcp-lab-portable-message" role="status">{portableMessage}</p>}

      {sessions.length === 0 || !selected ? <EmptyLab onStartStudy={onStartStudy} /> : (
        <div className="gcp-lab-layout">
          <aside className="gcp-lab-studies" aria-label="Experiment studies">
            {sessions.map((session) => (
              <button
                key={session.id}
                type="button"
                className={`gcp-study-card${session.id === selected.id ? ' active' : ''}`}
                onClick={() => {
                  setPortableMessage(null);
                  setSelectedId(session.id);
                }}
                aria-pressed={session.id === selected.id}
              >
                <span className="gcp-study-card-top">
                  <StatusBadge status={session.status} />
                  <time dateTime={session.createdAt}>{formatDate(session.createdAt)}</time>
                </span>
                <strong>{session.hypothesis || 'Untitled study'}</strong>
                <span className="gcp-study-card-meta">
                  <span>{session.objective?.direction === 'minimize' ? 'Minimize' : 'Maximize'} {session.objective?.metric || 'metric'}</span>
                  <span>{session.variants?.length ?? 0} {(session.variants?.length ?? 0) === 1 ? 'candidate' : 'candidates'}</span>
                </span>
              </button>
            ))}
          </aside>

          <article className="gcp-lab-report" aria-label={`Experiment report: ${selected.hypothesis}`}>
            <div className="gcp-lab-report-head">
              <div>
                <h2>{selected.hypothesis || 'Untitled study'}</h2>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <div className="gcp-lab-export-actions" aria-label="Export study evidence">
              <button
                type="button"
                onClick={() => downloadText(
                  `${safeFilename(selected.id)}-runs.csv`,
                  'text/csv',
                  encodePerRunStudyCsv(exportableStudy(selected)),
                )}
              >
                Export runs CSV
              </button>
              <button
                type="button"
                onClick={() => downloadText(
                  `${safeFilename(selected.id)}-research.md`,
                  'text/markdown',
                  generateResearchMarkdownReport(exportableStudy(selected)),
                )}
              >
                Export research brief
              </button>
              <button
                type="button"
                disabled={!selectedPortableBundle || portableLoading}
                title={selectedPortableBundle
                  ? 'Export the SHA-256 content-integrity-checked baseline, variants, provenance, and run records'
                  : 'No portable bundle is available for this legacy summary'}
                onClick={() => { void exportPortableStudy(); }}
              >
                {portableLoading ? 'Verifying portable study…' : 'Export portable study'}
              </button>
            </div>

            {selectedPortableBundle && (
              <p className="gcp-lab-integrity">
                Content integrity checked. Authorship unverified.
                <span className="gcp-lab-integrity-hash">SHA-256 <code>{selectedPortableBundle.integrity.contentSha256}</code></span>
              </p>
            )}

            <div className="gcp-lab-summary-grid">
              <section className="gcp-lab-summary-card" aria-labelledby="gcp-study-objective">
                <div>
                  <h3 id="gcp-study-objective">Study objective</h3>
                  <strong>{selected.objective.direction === 'maximize' ? 'Maximize' : 'Minimize'} {selected.objective.metric}</strong>
                  <span>{selected.repetitions} {selected.repetitions === 1 ? 'run' : 'runs'} per candidate</span>
                </div>
              </section>

              <section className="gcp-lab-summary-card" aria-labelledby="gcp-study-result">
                <div>
                  <h3 id="gcp-study-result">Observed result</h3>
                  <strong>{selected.winnerLabel ?? 'No unique winner recorded'}</strong>
                  <span>
                    {selected.winnerId
                      ? `${formatMetric(selected.variants.find((item) => item.id === selected.winnerId)?.mean)} observed mean`
                      : 'See findings and warnings for ties or missing evidence.'}
                  </span>
                </div>
              </section>
            </div>

            {selected.search && (
              <section className="gcp-lab-search-plan" aria-label="Deterministic parameter search plan">
                <h3>Parameter search plan</h3>
                <strong>
                  {selected.search.strategy === 'grid' ? 'Complete grid' : 'Seeded random'}
                </strong>
                <span>
                  {selected.search.generatedCandidateCount} generated candidates · {' '}
                  {selected.search.totalDomainAssignments} domain assignments · {' '}
                  {selected.search.totalExecutionCount} executions
                  {selected.search.plannerSeed === undefined
                    ? ''
                    : ` · planner seed ${selected.search.plannerSeed} (${selected.search.prngVersion})`}
                </span>
                <small>{selected.search.seedDescription}</small>
              </section>
            )}

            {selected.insights?.summary?.length > 0 && (
              <section className="gcp-lab-section" aria-labelledby="gcp-study-findings">
                <div className="gcp-lab-section-title">
                  <h3 id="gcp-study-findings">Key findings</h3>
                </div>
                <ul className="gcp-lab-findings">
                  {selected.insights.summary.map((item, index) => <li key={`${index}-${item}`}>{item}</li>)}
                </ul>
              </section>
            )}

            <section className="gcp-lab-section" aria-labelledby="gcp-candidate-evidence">
              <div className="gcp-lab-section-title">
                <h3 id="gcp-candidate-evidence">Candidate evidence</h3>
                <span>{leaderboard.length} {leaderboard.length === 1 ? 'candidate' : 'candidates'}. {selected.objective.direction === 'maximize' ? 'Higher is better' : 'Lower is better'}.</span>
              </div>
              <p id="gcp-candidate-evidence-note" className="gcp-candidate-evidence-note">
                Means, standard deviations, and 95% confidence intervals are descriptive, not a hypothesis test.
                Repetitions are not necessarily independent seeds. A dash means unavailable.
              </p>
              <div className="gcp-leaderboard-wrap">
                <table
                  className="gcp-leaderboard gcp-candidate-evidence"
                  role="table"
                  aria-labelledby="gcp-candidate-evidence"
                  aria-describedby="gcp-candidate-evidence-note"
                >
                  <thead role="rowgroup">
                    <tr role="row">
                      <th role="columnheader" scope="col">Candidate</th>
                      <th role="columnheader" scope="col">Mean</th>
                      <th role="columnheader" scope="col">Variation</th>
                      <th role="columnheader" scope="col">Runs</th>
                      <th role="columnheader" scope="col">Runtime</th>
                      <th role="columnheader" scope="col">Graph</th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {leaderboard.map((variant) => {
                      const isWinner = variant.id === selected.winnerId;
                      return (
                        <tr role="row" key={variant.id} className={isWinner ? 'winner' : undefined}>
                          <th role="rowheader" scope="row" aria-label={variant.label} data-label="Candidate" className="gcp-candidate-cell--candidate">
                            <div className="gcp-candidate-cell-content">
                              <span className="gcp-candidate-name">
                                <strong>{variant.label}</strong>
                                {isWinner && <span className="gcp-winner-tag">Best observed</span>}
                                <StatusBadge status={variant.status} />
                              </span>
                              <CandidateDisclosures variant={variant} />
                            </div>
                          </th>
                          <td role="cell" data-label="Mean" className="gcp-metric-value gcp-candidate-cell--mean">
                            <div className="gcp-candidate-cell-content">
                              <span>{formatMetric(variant.mean)}</span>
                              {variant.baselineComparison && (
                                <small className="gcp-metric-detail">
                                  Improvement {formatSignedMetric(variant.baselineComparison.objectiveImprovement)} vs baseline
                                  {variant.baselineComparison.hedgesG === undefined
                                    ? ''
                                    : `; Hedges g ${formatSignedMetric(variant.baselineComparison.hedgesG)}`}
                                </small>
                              )}
                            </div>
                          </td>
                          <td role="cell" data-label="Variation" className="gcp-metric-value gcp-candidate-cell--variation">
                            <div className="gcp-candidate-cell-content">
                              <span>{variant.stddev === undefined ? '—' : `± ${formatMetric(variant.stddev)}`}</span>
                              {variant.confidenceInterval95 && (
                                <small className="gcp-metric-detail">
                                  95% CI [{formatMetric(variant.confidenceInterval95.lower)}, {formatMetric(variant.confidenceInterval95.upper)}]
                                </small>
                              )}
                            </div>
                          </td>
                          <td role="cell" data-label="Runs" className="gcp-candidate-cell--runs">
                            <div className="gcp-candidate-cell-content">
                              <span>{variant.metricValues.length}/{selected.repetitions} objective values</span>
                              <small className="gcp-metric-detail">
                                {variant.runs
                                  ? `${variant.runs.filter((run) => run.status === 'completed').length}/${variant.runs.length} recorded runs completed`
                                  : 'Per-run records unavailable'}
                              </small>
                            </div>
                          </td>
                          <td role="cell" data-label="Runtime" className="gcp-candidate-cell--runtime">
                            <div className="gcp-candidate-cell-content">
                              <span>{formatRuntime(variant.runtimeMs)}</span>
                              <small className="gcp-metric-detail">Mean per run</small>
                            </div>
                          </td>
                          <td role="cell" data-label="Graph" className="gcp-candidate-cell--graph">
                            <div className="gcp-candidate-cell-content">
                              <button
                                type="button"
                                className="gcp-candidate-download"
                                disabled={!selectedPortableBundle}
                                aria-label={`Download graph for ${variant.label}`}
                                title={selectedPortableBundle
                                  ? 'Materialize a graph JSON without changing the canvas; recorded fidelity warnings will be shown'
                                  : 'This legacy summary has no portable candidate specification'}
                                onClick={() => exportCandidateGraph(variant.id, variant.label)}
                              >
                                Download graph
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </section>

            {(selected.insights?.warnings?.length > 0 || selected.applyConflict) && (
              <section className="gcp-lab-section" aria-labelledby="gcp-study-warnings">
                <div className="gcp-lab-section-title">
                  <h3 id="gcp-study-warnings">Evidence warnings</h3>
                </div>
                <div className="gcp-lab-warnings">
                  {selected.applyConflict && <p role="alert">{selected.applyConflict}</p>}
                  {selected.insights?.warnings?.map((warning, index) => (
                    <p key={`${index}-${warning}`} role="alert">{warning}</p>
                  ))}
                </div>
              </section>
            )}

            {selected.insights?.paperIdeas?.length > 0 && (
              <section className="gcp-lab-section" aria-labelledby="gcp-paper-ideas">
                <div className="gcp-lab-section-title">
                  <h3 id="gcp-paper-ideas">Paper ideas</h3>
                  <span>Research leads, not final claims</span>
                </div>
                <div className="gcp-paper-grid">
                  {selected.insights.paperIdeas.map((idea, index) => (
                    <article className="gcp-paper-card" key={`${index}-${idea.title}`}>
                      <h4>{idea.title}</h4>
                      <dl>
                        <div><dt>Evidence</dt><dd>{idea.evidence}</dd></div>
                        <div><dt>Next step</dt><dd>{idea.nextStep}</dd></div>
                      </dl>
                    </article>
                  ))}
                </div>
              </section>
            )}
          </article>
        </div>
      )}

      {importPreview && (
        <ConfirmDialog
          className="gcp-study-import-dialog"
          title="Import portable study?"
          busy={importing}
          onCancel={() => { if (!importing) setImportPreview(null); }}
          actions={(
            <div className="gcp-study-import-actions">
              <button type="button" data-autofocus="true" onClick={() => { if (!importing) setImportPreview(null); }} disabled={importing}>
                Cancel
              </button>
              <button type="button" className="primary" onClick={() => { void commitImport(); }} disabled={importing}>
                {importing ? 'Importing…' : 'Import read-only'}
              </button>
            </div>
          )}
        >
          <p>Content integrity checked. Authorship unverified.</p>
          <p>{importPreview.payload.spec.hypothesis}</p>
          <dl>
            <div><dt>Study ID</dt><dd>{importPreview.payload.id}</dd></div>
            <div><dt>Candidates</dt><dd>{importPreview.payload.spec.variants.length}</dd></div>
            <div><dt>Run records</dt><dd>{importPreview.payload.runs.length}</dd></div>
            <div>
              <dt>Secrets required</dt>
              <dd>{importPreview.payload.redactionReport.secretRequirements.length}</dd>
            </div>
            <div>
              <dt>SHA-256</dt>
              <dd><code>{importPreview.integrity.contentSha256}</code></dd>
            </div>
          </dl>
          <p className="gcp-study-import-safety">
            SHA-256 detects content changes only; it does not authenticate the author or evidence
            source. Import stores the bundle for read-only review and does not execute, replay,
            apply, or open any graph.
          </p>
          {importError && (
            <p className="gcp-lab-portable-message error" role="alert">{importError}</p>
          )}
        </ConfirmDialog>
      )}
    </section>
  );
}
