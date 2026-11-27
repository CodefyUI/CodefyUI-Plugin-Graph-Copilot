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
import { currentLocale, translate, useT, type MessageKey } from '../i18n';

type T = (key: MessageKey, vars?: Record<string, string | number>) => string;
const tr: T = (key, vars) => translate(currentLocale(), key, vars);

export interface ExperimentsViewProps {
  api: CodefyUIPluginAPI;
  /** Open a comparison draft for review; this action must not send or run it. */
  onStartStudy?: (prompt: string) => void;
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
  if (Number.isNaN(date.getTime())) return tr('lab.dateUnavailable');
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

const STATUS_KEYS: Record<string, MessageKey> = {
  completed: 'lab.status.completed', partial: 'lab.status.partial', failed: 'lab.status.failed',
  invalid: 'lab.status.invalid', running: 'lab.status.running',
};

function StatusBadge({ status }: { status: string }) {
  const t = useT();
  const key = STATUS_KEYS[status];
  const label = key ? t(key) : status.charAt(0).toUpperCase() + status.slice(1);
  return <span className={`gcp-lab-badge ${status}`}>{label}</span>;
}

function CandidateDisclosures({ variant }: { variant: ExperimentVariantResult }) {
  const t = useT();
  const operations = variant.operationSummary;
  return (
    <div className="gcp-candidate-disclosures">
      {operations && operations.length > 0 ? (
        <details className="gcp-candidate-disclosure operations">
          <summary>{t('lab.operations', { count: operations.length })}</summary>
          <ul>
            {operations.map((operation, index) => <li key={`${index}-${operation}`} data-user-content>{operation}</li>)}
          </ul>
        </details>
      ) : (
        <span className="gcp-candidate-evidence-note">
          {operations ? t('lab.noChanges') : t('lab.operationsUnavailable')}
        </span>
      )}
      {variant.errors.length > 0 && (
        <details className="gcp-candidate-disclosure errors">
          <summary>{t('lab.errors', { count: variant.errors.length })}</summary>
          <ul>
            {variant.errors.map((error, index) => <li key={`${index}-${error}`} data-user-content>{error}</li>)}
          </ul>
        </details>
      )}
    </div>
  );
}

function EmptyLab({ onStartStudy }: Pick<ExperimentsViewProps, 'onStartStudy'>) {
  const t = useT();
  const prompt = t('lab.comparisonPrompt');
  return (
    <div className="gcp-lab-empty">
      <h2>{t('lab.empty.title')}</h2>
      <p>{t('lab.empty.body')}</p>
      <p className="gcp-lab-example">{prompt}</p>
      {onStartStudy && (
        <>
          <button type="button" className="gcp-lab-start-study" onClick={() => onStartStudy(prompt)}>
            {t('lab.empty.start')}
          </button>
          <p className="gcp-lab-start-note">{t('lab.empty.startNote')}</p>
        </>
      )}
    </div>
  );
}

export function ExperimentsView({ api, onStartStudy }: ExperimentsViewProps) {
  const t = useT();
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
        if (active) setPortableMessage(tr('lab.msg.verifyFailed', { error: String(error) }));
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
        throw new Error(tr('lab.msg.tooLarge', { limit: STUDY_BUNDLE_MAX_BYTES }));
      }
      const preview = await parseStudyImport(await file.text());
      if (readVersion === importReadVersion.current) setImportPreview(preview);
    } catch (error) {
      if (readVersion !== importReadVersion.current) return;
      setImportPreview(null);
      setImportError(tr('lab.msg.rejected', { error: String(error) }));
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
          tr('lab.msg.idTaken', { id: importPreview.payload.id }),
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
        ? tr('lab.msg.alreadyStored')
        : tr('lab.msg.imported'));
    } catch (error) {
      setImportError(bundleStored
        ? tr('lab.msg.reportNotSaved', { error: String(error) })
        : tr('lab.msg.notImported', { error: String(error) }));
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
      setPortableMessage(tr('lab.msg.exported'));
    } catch (error) {
      setPortableMessage(tr('lab.msg.exportFailed', { error: String(error) }));
    }
  };

  const exportCandidateGraph = (variantId: string, label: string) => {
    if (!selectedPortableBundle) return;
    try {
      const materialized = materializeStudyCandidate(selectedPortableBundle, variantId);
      if (materialized.status === 'error' || !materialized.graph) {
        throw new Error(materialized.errors[0]?.message ?? tr('lab.msg.notReconstructed'));
      }
      downloadText(
        `${safeFilename(selectedPortableBundle.payload.id)}-${safeFilename(label)}-graph.json`,
        'application/json',
        encodeCandidateGraphJson(materialized.graph),
      );
      const outcome = materialized.status === 'blocked'
        ? tr('lab.msg.graphBlanks', { count: materialized.missingSecretRefs.length })
        : tr('lab.msg.graphDownloaded');
      setPortableMessage(materialized.fidelityWarnings.length === 0
        ? outcome
        : `${outcome} ${tr('lab.msg.fidelity', { warnings: materialized.fidelityWarnings.join(' ') })}`);
    } catch (error) {
      setPortableMessage(tr('lab.msg.graphFailed', { error: String(error) }));
    }
  };

  return (
    <section className="gcp-lab" aria-labelledby="gcp-lab-title">
      <div className="gcp-lab-heading">
        <div>
          <h1 id="gcp-lab-title">{t('lab.title')}</h1>
          <p>{t('lab.subtitle')}</p>
        </div>
        <div className="gcp-lab-heading-actions">
          <span className="gcp-lab-count" aria-label={t(sessions.length === 1 ? 'lab.count.aria.one' : 'lab.count.aria.many', { count: sessions.length })}>
            {t(sessions.length === 1 ? 'lab.count.one' : 'lab.count.many', { count: sessions.length })}
          </span>
          <button type="button" disabled={importing} onClick={() => importInputRef.current?.click()}>
            {t('lab.import')}
          </button>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json,.json"
            aria-label={t('lab.import.choose')}
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
          <aside className="gcp-lab-studies" aria-label={t('lab.studies')}>
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
                <strong data-user-content>{session.hypothesis || t('lab.untitled')}</strong>
                <span className="gcp-study-card-meta">
                  <span>{t(session.objective?.direction === 'minimize' ? 'lab.minimize' : 'lab.maximize', { metric: session.objective?.metric || t('lab.metric') })}</span>
                  <span>{t((session.variants?.length ?? 0) === 1 ? 'lab.candidates.one' : 'lab.candidates.many', { count: session.variants?.length ?? 0 })}</span>
                </span>
              </button>
            ))}
          </aside>

          <article className="gcp-lab-report" aria-label={t('lab.report', { hypothesis: selected.hypothesis })}>
            <div className="gcp-lab-report-head">
              <div>
                <h2 data-user-content>{selected.hypothesis || t('lab.untitled')}</h2>
              </div>
              <StatusBadge status={selected.status} />
            </div>

            <div className="gcp-lab-export-actions" aria-label={t('lab.export')}>
              <button
                type="button"
                onClick={() => downloadText(
                  `${safeFilename(selected.id)}-runs.csv`,
                  'text/csv',
                  encodePerRunStudyCsv(exportableStudy(selected)),
                )}
              >
                {t('lab.export.csv')}
              </button>
              <button
                type="button"
                onClick={() => downloadText(
                  `${safeFilename(selected.id)}-research.md`,
                  'text/markdown',
                  generateResearchMarkdownReport(exportableStudy(selected)),
                )}
              >
                {t('lab.export.brief')}
              </button>
              <button
                type="button"
                disabled={!selectedPortableBundle || portableLoading}
                title={selectedPortableBundle
                  ? t('lab.export.portable.title')
                  : t('lab.export.portable.none')}
                onClick={() => { void exportPortableStudy(); }}
              >
                {portableLoading ? t('lab.export.verifying') : t('lab.export.portable')}
              </button>
            </div>

            {selectedPortableBundle && (
              <p className="gcp-lab-integrity">
                {t('lab.integrity')}
                <span className="gcp-lab-integrity-hash">SHA-256 <code>{selectedPortableBundle.integrity.contentSha256}</code></span>
              </p>
            )}

            <div className="gcp-lab-summary-grid">
              <section className="gcp-lab-summary-card" aria-labelledby="gcp-study-objective">
                <div>
                  <h3 id="gcp-study-objective">{t('lab.objective')}</h3>
                  <strong>{t(selected.objective.direction === 'maximize' ? 'lab.maximize' : 'lab.minimize', { metric: selected.objective.metric })}</strong>
                  <span>{t(selected.repetitions === 1 ? 'lab.perCandidate.one' : 'lab.perCandidate.many', { count: selected.repetitions })}</span>
                </div>
              </section>

              <section className="gcp-lab-summary-card" aria-labelledby="gcp-study-result">
                <div>
                  <h3 id="gcp-study-result">{t('lab.result')}</h3>
                  <strong>{selected.winnerLabel ?? t('lab.noWinner')}</strong>
                  <span>
                    {selected.winnerId
                      ? t('lab.observedMean', { value: formatMetric(selected.variants.find((item) => item.id === selected.winnerId)?.mean) })
                      : t('lab.seeFindings')}
                  </span>
                </div>
              </section>
            </div>

            {selected.search && (
              <section className="gcp-lab-search-plan" aria-label={t('lab.search.aria')}>
                <h3>{t('lab.search.title')}</h3>
                <strong>
                  {selected.search.strategy === 'grid' ? t('lab.search.grid') : t('lab.search.seeded')}
                </strong>
                <span>
                  {t('lab.search.generated', { count: selected.search.generatedCandidateCount })} · {' '}
                  {t('lab.search.assignments', { count: selected.search.totalDomainAssignments })} · {' '}
                  {t('lab.search.executions', { count: selected.search.totalExecutionCount })}
                  {selected.search.plannerSeed === undefined
                    ? ''
                    : ` · ${t('lab.search.seed', { seed: selected.search.plannerSeed, version: selected.search.prngVersion ?? '' })}`}
                </span>
                <small>{selected.search.seedDescription}</small>
              </section>
            )}

            {selected.insights?.summary?.length > 0 && (
              <section className="gcp-lab-section" aria-labelledby="gcp-study-findings">
                <div className="gcp-lab-section-title">
                  <h3 id="gcp-study-findings">{t('lab.findings')}</h3>
                </div>
                <ul className="gcp-lab-findings">
                  {selected.insights.summary.map((item, index) => <li key={`${index}-${item}`} data-user-content>{item}</li>)}
                </ul>
              </section>
            )}

            <section className="gcp-lab-section" aria-labelledby="gcp-candidate-evidence">
              <div className="gcp-lab-section-title">
                <h3 id="gcp-candidate-evidence">{t('lab.evidence')}</h3>
                <span>{t(leaderboard.length === 1 ? 'lab.candidates.one' : 'lab.candidates.many', { count: leaderboard.length })}. {selected.objective.direction === 'maximize' ? t('lab.higher') : t('lab.lower')}.</span>
              </div>
              <p id="gcp-candidate-evidence-note" className="gcp-candidate-evidence-note">
                {t('lab.evidence.note')}
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
                      <th role="columnheader" scope="col">{t('lab.col.candidate')}</th>
                      <th role="columnheader" scope="col">{t('lab.col.mean')}</th>
                      <th role="columnheader" scope="col">{t('lab.col.variation')}</th>
                      <th role="columnheader" scope="col">{t('lab.col.runs')}</th>
                      <th role="columnheader" scope="col">{t('lab.col.runtime')}</th>
                      <th role="columnheader" scope="col">{t('lab.col.graph')}</th>
                    </tr>
                  </thead>
                  <tbody role="rowgroup">
                    {leaderboard.map((variant) => {
                      const isWinner = variant.id === selected.winnerId;
                      return (
                        <tr role="row" key={variant.id} className={isWinner ? 'winner' : undefined}>
                          <th role="rowheader" scope="row" aria-label={variant.label} data-label={t('lab.col.candidate')} className="gcp-candidate-cell--candidate">
                            <div className="gcp-candidate-cell-content">
                              <span className="gcp-candidate-name">
                                <strong>{variant.label}</strong>
                                {isWinner && <span className="gcp-winner-tag">{t('lab.best')}</span>}
                                <StatusBadge status={variant.status} />
                              </span>
                              <CandidateDisclosures variant={variant} />
                            </div>
                          </th>
                          <td role="cell" data-label={t('lab.col.mean')} className="gcp-metric-value gcp-candidate-cell--mean">
                            <div className="gcp-candidate-cell-content">
                              <span>{formatMetric(variant.mean)}</span>
                              {variant.baselineComparison && (
                                <small className="gcp-metric-detail">
                                  {t('lab.improvement', { value: formatSignedMetric(variant.baselineComparison.objectiveImprovement) })}
                                  {variant.baselineComparison.hedgesG === undefined
                                    ? ''
                                    : `; ${t('lab.hedges', { value: formatSignedMetric(variant.baselineComparison.hedgesG) })}`}
                                </small>
                              )}
                            </div>
                          </td>
                          <td role="cell" data-label={t('lab.col.variation')} className="gcp-metric-value gcp-candidate-cell--variation">
                            <div className="gcp-candidate-cell-content">
                              <span>{variant.stddev === undefined ? '—' : `± ${formatMetric(variant.stddev)}`}</span>
                              {variant.confidenceInterval95 && (
                                <small className="gcp-metric-detail">
                                  95% CI [{formatMetric(variant.confidenceInterval95.lower)}, {formatMetric(variant.confidenceInterval95.upper)}]
                                </small>
                              )}
                            </div>
                          </td>
                          <td role="cell" data-label={t('lab.col.runs')} className="gcp-candidate-cell--runs">
                            <div className="gcp-candidate-cell-content">
                              <span>{t('lab.objectiveValues', { count: variant.metricValues.length, total: selected.repetitions })}</span>
                              <small className="gcp-metric-detail">
                                {variant.runs
                                  ? t('lab.runsCompleted', { count: variant.runs.filter((run) => run.status === 'completed').length, total: variant.runs.length })
                                  : t('lab.runsUnavailable')}
                              </small>
                            </div>
                          </td>
                          <td role="cell" data-label={t('lab.col.runtime')} className="gcp-candidate-cell--runtime">
                            <div className="gcp-candidate-cell-content">
                              <span>{formatRuntime(variant.runtimeMs)}</span>
                              <small className="gcp-metric-detail">{t('lab.meanPerRun')}</small>
                            </div>
                          </td>
                          <td role="cell" data-label={t('lab.col.graph')} className="gcp-candidate-cell--graph">
                            <div className="gcp-candidate-cell-content">
                              <button
                                type="button"
                                className="gcp-candidate-download"
                                disabled={!selectedPortableBundle}
                                aria-label={t('lab.download.aria', { label: variant.label })}
                                title={selectedPortableBundle
                                  ? t('lab.download.title')
                                  : t('lab.download.none')}
                                onClick={() => exportCandidateGraph(variant.id, variant.label)}
                              >
                                {t('lab.download')}
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
                  <h3 id="gcp-study-warnings">{t('lab.warnings')}</h3>
                </div>
                <div className="gcp-lab-warnings">
                  {selected.applyConflict && <p role="alert">{selected.applyConflict}</p>}
                  {selected.insights?.warnings?.map((warning, index) => (
                    <p key={`${index}-${warning}`} role="alert" data-user-content>{warning}</p>
                  ))}
                </div>
              </section>
            )}

            {selected.insights?.paperIdeas?.length > 0 && (
              <section className="gcp-lab-section" aria-labelledby="gcp-paper-ideas">
                <div className="gcp-lab-section-title">
                  <h3 id="gcp-paper-ideas">{t('lab.ideas')}</h3>
                  <span>{t('lab.ideas.note')}</span>
                </div>
                <div className="gcp-paper-grid">
                  {selected.insights.paperIdeas.map((idea, index) => (
                    <article className="gcp-paper-card" key={`${index}-${idea.title}`}>
                      <h4>{idea.title}</h4>
                      <dl>
                        <div><dt>{t('lab.idea.evidence')}</dt><dd>{idea.evidence}</dd></div>
                        <div><dt>{t('lab.idea.next')}</dt><dd>{idea.nextStep}</dd></div>
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
          title={t('lab.import.title')}
          busy={importing}
          onCancel={() => { if (!importing) setImportPreview(null); }}
          actions={(
            <div className="gcp-study-import-actions">
              <button type="button" data-autofocus="true" onClick={() => { if (!importing) setImportPreview(null); }} disabled={importing}>
                {t('common.cancel')}
              </button>
              <button type="button" className="primary" onClick={() => { void commitImport(); }} disabled={importing}>
                {importing ? t('lab.import.busy') : t('lab.import.confirm')}
              </button>
            </div>
          )}
        >
          <p>{t('lab.integrity')}</p>
          <p data-user-content>{importPreview.payload.spec.hypothesis}</p>
          <dl>
            <div><dt>{t('lab.import.id')}</dt><dd>{importPreview.payload.id}</dd></div>
            <div><dt>{t('lab.import.candidates')}</dt><dd>{importPreview.payload.spec.variants.length}</dd></div>
            <div><dt>{t('lab.import.runs')}</dt><dd>{importPreview.payload.runs.length}</dd></div>
            <div>
              <dt>{t('lab.import.secrets')}</dt>
              <dd>{importPreview.payload.redactionReport.secretRequirements.length}</dd>
            </div>
            <div>
              <dt>SHA-256</dt>
              <dd><code>{importPreview.integrity.contentSha256}</code></dd>
            </div>
          </dl>
          <p className="gcp-study-import-safety">
            {t('lab.import.safety')}
          </p>
          {importError && (
            <p className="gcp-lab-portable-message error" role="alert">{importError}</p>
          )}
        </ConfirmDialog>
      )}
    </section>
  );
}
