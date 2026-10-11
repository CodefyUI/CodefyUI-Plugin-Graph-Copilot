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

export interface ExperimentsViewProps {
  api: CodefyUIPluginAPI;
}

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
  return <span className={`gcp-lab-badge ${status}`}>{status}</span>;
}

function EmptyLab() {
  return (
    <div className="gcp-lab-empty">
      <div className="gcp-lab-empty-mark" aria-hidden="true">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
          <path d="M9 3h6M10 3v5l-5.2 9a2.7 2.7 0 0 0 2.34 4h9.72a2.7 2.7 0 0 0 2.34-4L14 8V3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7.5 15h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
        </svg>
      </div>
      <h2>No experiment studies yet</h2>
      <p>
        Ask the agent to compare graph variants against a numeric objective. Completed studies,
        ranked candidates, and research leads will appear here.
      </p>
      <div className="gcp-lab-example">
        “Compare three learning-rate variants, maximize validation accuracy, and run each three times.”
      </div>
    </div>
  );
}

export function ExperimentsView({ api }: ExperimentsViewProps) {
  const [sessions, setSessions] = useState<ExperimentSession[]>(() => safeLoad(api));
  const [selectedId, setSelectedId] = useState<string | null>(() => safeLoad(api)[0]?.id ?? null);
  const [portableBundle, setPortableBundle] = useState<StudyBundleV1 | null>(null);
  const [portableLoading, setPortableLoading] = useState(false);
  const [portableMessage, setPortableMessage] = useState<string | null>(null);
  const [importPreview, setImportPreview] = useState<StudyBundleV1 | null>(null);
  const [importError, setImportError] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const importInputRef = useRef<HTMLInputElement>(null);

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
    if (!file) return;
    setImportError(null);
    setPortableMessage(null);
    try {
      if (typeof file.size === 'number' && file.size > STUDY_BUNDLE_MAX_BYTES) {
        throw new Error(`Portable study exceeds the ${STUDY_BUNDLE_MAX_BYTES} byte import limit`);
      }
      const preview = await parseStudyImport(await file.text());
      setImportPreview(preview);
    } catch (error) {
      setImportPreview(null);
      setImportError(`Import rejected before storage: ${String(error)}`);
    }
  };

  const commitImport = async () => {
    if (!importPreview) return;
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
          <span className="gcp-eyebrow">Autonomous evaluation</span>
          <h1 id="gcp-lab-title">Experiment Lab</h1>
          <p>Compare isolated graph candidates and turn results into defensible research directions.</p>
        </div>
        <div className="gcp-lab-heading-actions">
          <span className="gcp-lab-count" aria-label={`${sessions.length} experiment studies`}>
            {sessions.length} {sessions.length === 1 ? 'study' : 'studies'}
          </span>
          <button type="button" onClick={() => importInputRef.current?.click()}>
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

      {sessions.length === 0 || !selected ? <EmptyLab /> : (
        <div className="gcp-lab-layout">
          <aside className="gcp-lab-studies" aria-label="Experiment studies">
            {sessions.map((session) => (
              <button
                key={session.id}
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
                  {session.objective?.direction === 'minimize' ? '↓' : '↑'} {session.objective?.metric || 'metric'}
                  <span aria-hidden="true"> · </span>
                  {session.variants?.length ?? 0} candidates
                </span>
              </button>
            ))}
          </aside>

          <article className="gcp-lab-report" aria-label={`Experiment report: ${selected.hypothesis}`}>
            <div className="gcp-lab-report-head">
              <div>
                <span className="gcp-eyebrow">Study hypothesis</span>
                <h2>{selected.hypothesis}</h2>
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
                Content integrity checked · SHA-256 {selectedPortableBundle.integrity.contentSha256.slice(0, 12)}… · authorship unverified
              </p>
            )}

            <div className="gcp-lab-summary-grid">
              <section className="gcp-lab-summary-card" aria-labelledby="gcp-study-objective">
                <span className="gcp-lab-card-icon objective" aria-hidden="true">◎</span>
                <div>
                  <h3 id="gcp-study-objective">Study objective</h3>
                  <strong>{selected.objective.direction === 'maximize' ? 'Maximize' : 'Minimize'} {selected.objective.metric}</strong>
                  <span>{selected.repetitions} {selected.repetitions === 1 ? 'run' : 'runs'} per candidate</span>
                </div>
              </section>

              <section className="gcp-lab-summary-card winner" aria-labelledby="gcp-study-winner">
                <span className="gcp-lab-card-icon winner" aria-hidden="true">★</span>
                <div>
                  <h3 id="gcp-study-winner">Winning candidate</h3>
                  <strong>{selected.winnerLabel ?? 'No winner resolved'}</strong>
                  <span>
                    {selected.winnerId
                      ? `${formatMetric(selected.variants.find((item) => item.id === selected.winnerId)?.mean)} mean score`
                      : 'Check warnings for missing evidence'}
                  </span>
                </div>
              </section>
            </div>

            {selected.search && (
              <section className="gcp-lab-search-plan" aria-label="Deterministic parameter search plan">
                <span className="gcp-eyebrow">Reproducible planner</span>
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

            <section className="gcp-lab-section" aria-labelledby="gcp-candidate-leaderboard">
              <div className="gcp-lab-section-title">
                <h3 id="gcp-candidate-leaderboard">Candidate leaderboard</h3>
                <span>{selected.objective.direction === 'maximize' ? 'Higher is better' : 'Lower is better'}</span>
              </div>
              <div className="gcp-leaderboard-wrap">
                <table className="gcp-leaderboard">
                  <thead>
                    <tr>
                      <th scope="col">Rank</th>
                      <th scope="col">Candidate</th>
                      <th scope="col">Mean</th>
                      <th scope="col">Variation</th>
                      <th scope="col">Runs</th>
                      <th scope="col">Runtime</th>
                      <th scope="col">Graph</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leaderboard.map((variant, index) => {
                      const isWinner = variant.id === selected.winnerId;
                      return (
                        <tr key={variant.id} className={isWinner ? 'winner' : undefined}>
                          <td><span className="gcp-rank">{variant.mean === undefined ? '—' : index + 1}</span></td>
                          <td>
                            <span className="gcp-candidate-name">
                              <strong>{variant.label}</strong>
                              {isWinner && <span className="gcp-winner-tag">Winner</span>}
                              {variant.status !== 'completed' && <StatusBadge status={variant.status} />}
                            </span>
                            {variant.operationSummary && variant.operationSummary.length > 0 && (
                              <span className="gcp-candidate-operations">
                                {variant.operationSummary.join(' · ')}
                              </span>
                            )}
                            {variant.errors?.length > 0 && <span className="gcp-candidate-error">{variant.errors[0]}</span>}
                          </td>
                          <td className="gcp-metric-value">
                            <span>{formatMetric(variant.mean)}</span>
                            {variant.baselineComparison && (
                              <small className="gcp-metric-detail">
                                improvement {formatSignedMetric(variant.baselineComparison.objectiveImprovement)}
                                {variant.baselineComparison.hedgesG === undefined
                                  ? ''
                                  : ` · g ${formatSignedMetric(variant.baselineComparison.hedgesG)}`}
                              </small>
                            )}
                          </td>
                          <td className="gcp-metric-value">
                            <span>{variant.stddev === undefined ? '—' : `± ${formatMetric(variant.stddev)}`}</span>
                            {variant.confidenceInterval95 && (
                              <small className="gcp-metric-detail">
                                95% CI [{formatMetric(variant.confidenceInterval95.lower)}, {formatMetric(variant.confidenceInterval95.upper)}]
                              </small>
                            )}
                          </td>
                          <td>{variant.metricValues?.length ?? 0}</td>
                          <td>{formatRuntime(variant.runtimeMs)}</td>
                          <td>
                            <button
                              type="button"
                              className="gcp-candidate-download"
                              disabled={!selectedPortableBundle}
                              title={selectedPortableBundle
                                ? 'Materialize a graph JSON without changing the canvas; recorded fidelity warnings will be shown'
                                : 'This legacy summary has no portable candidate specification'}
                              onClick={() => exportCandidateGraph(variant.id, variant.label)}
                            >
                              Download
                            </button>
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
                      <span className="gcp-paper-index">0{index + 1}</span>
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
        <div className="gcp-study-import-backdrop">
          <section
            className="gcp-study-import-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="gcp-study-import-title"
          >
            <span className="gcp-eyebrow">Content-integrity check passed · authorship unverified</span>
            <h2 id="gcp-study-import-title">Import portable study?</h2>
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
            <div className="gcp-study-import-actions">
              <button type="button" onClick={() => setImportPreview(null)} disabled={importing}>
                Cancel
              </button>
              <button type="button" className="primary" onClick={() => { void commitImport(); }} disabled={importing}>
                {importing ? 'Importing…' : 'Import read-only'}
              </button>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}
