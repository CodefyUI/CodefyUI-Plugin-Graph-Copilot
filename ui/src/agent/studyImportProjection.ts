import {
  isExperimentSearchMetadata,
  type ExperimentSearchMetadata,
  type ExperimentRunRecord,
  type ExperimentSession,
  type ExperimentVariantResult,
  type PaperIdea,
} from './experiments';
import type {
  DerivedStudyVariantV1,
  StudyBundleV1,
  StudyMetricSampleV1,
  StudyRunRecordV1,
} from './studyBundle';

const IMPORTED_STUDY_WARNING =
  'Imported portable-study content passed SHA-256 integrity checking, which detects content changes but does not authenticate its author or evidence source. It is read-only and was not executed in this browser session.';

function compareText(left: string, right: string): number {
  return left < right ? -1 : left > right ? 1 : 0;
}

/**
 * Portable run samples have unique observed keys and may contain multiple
 * aliases for one canonical metric. Keep those identities separate so a
 * later export never has to guess where a scalar came from.
 */
function observedMetrics(
  samples: readonly StudyMetricSampleV1[],
): Record<string, number> {
  return Object.fromEntries(
    samples
      .map((sample) => [sample.observedKey, sample.value] as const)
      .sort(([left], [right]) => compareText(left, right)),
  );
}

function observedMetricIdentities(
  samples: readonly StudyMetricSampleV1[],
): Record<string, string> {
  return Object.fromEntries(
    samples
      .map((sample) => [sample.observedKey, sample.canonicalKey] as const)
      .sort(([left], [right]) => compareText(left, right)),
  );
}

function observedMetricSources(
  samples: readonly StudyMetricSampleV1[],
): Record<string, StudyMetricSampleV1['source']> {
  return Object.fromEntries(
    samples
      .map((sample) => [sample.observedKey, sample.source] as const)
      .sort(([left], [right]) => compareText(left, right)),
  );
}

function objectiveSample(
  run: StudyRunRecordV1,
  derivedVariant: DerivedStudyVariantV1,
): StudyMetricSampleV1 | undefined {
  if (derivedVariant.metricKey === undefined) return undefined;
  // `metricKey` in the derived evidence is already the canonical identity
  // selected by the original run. Do not re-run alias or `auto` heuristics in
  // the importing browser, where those heuristics may have changed.
  return run.metrics.find((sample) => sample.canonicalKey === derivedVariant.metricKey);
}

function projectedRun(
  run: StudyRunRecordV1,
  derivedVariant: DerivedStudyVariantV1,
): ExperimentRunRecord {
  const objective = objectiveSample(run, derivedVariant);
  const error = run.status === 'completed'
    ? undefined
    : run.status === 'cancelled'
      ? `Imported run was cancelled [${run.error!.phase}/${run.error!.code}]: ${run.error!.message}`
      : `Imported run failed [${run.error!.phase}/${run.error!.code}]: ${run.error!.message}`;

  return {
    repetition: run.repetition,
    // ExperimentSession has no cancelled run state. Preserve the distinction
    // in the error text while ensuring cancelled evidence never appears as a
    // successful observation.
    status: run.status === 'completed' ? 'completed' : 'failed',
    durationMs: run.durationMs,
    ...(objective === undefined
      ? {}
      : {
        metricKey: objective.canonicalKey,
        metricValue: objective.value,
        metricSource: objective.source,
    }),
    observedMetrics: observedMetrics(run.metrics),
    ...(run.metrics.length === 0
      ? {}
      : {
        observedMetricIdentities: observedMetricIdentities(run.metrics),
        observedMetricSources: observedMetricSources(run.metrics),
      }),
    ...(error === undefined ? {} : { error }),
  };
}

function projectedVariant(
  variant: DerivedStudyVariantV1,
  runs: readonly StudyRunRecordV1[],
): ExperimentVariantResult {
  const projectedRuns = runs
    .filter((run) => run.variantId === variant.id)
    .sort((left, right) => left.repetition - right.repetition || compareText(left.runKey, right.runKey))
    .map((run) => projectedRun(run, variant));

  return {
    id: variant.id,
    label: variant.label,
    status: variant.status,
    ...(variant.metricKey === undefined ? {} : { metricKey: variant.metricKey }),
    metricValues: [...variant.metricValues],
    ...(variant.mean === undefined ? {} : { mean: variant.mean }),
    ...(variant.stddev === undefined ? {} : { stddev: variant.stddev }),
    ...(variant.confidenceInterval95 === undefined
      ? {}
      : { confidenceInterval95: { ...variant.confidenceInterval95 } }),
    ...(variant.baselineComparison === undefined
      ? {}
      : { baselineComparison: { ...variant.baselineComparison } }),
    runtimeMs: variant.runtimeMs,
    observedMetrics: Object.fromEntries(
      variant.observedMetrics
        .map(({ key, value }) => [key, value] as const)
        .sort(([left], [right]) => compareText(left, right)),
    ),
    // Always supply an array, including an empty one. Omitting it would make
    // legacy export code synthesize attempts from aggregate metricValues.
    runs: projectedRuns,
    ...(variant.operationSummary === undefined
      ? {}
      : { operationSummary: [...variant.operationSummary] }),
    errors: [...variant.errors],
  };
}

function clonePaperIdea(idea: PaperIdea): PaperIdea {
  return {
    title: idea.title,
    evidence: idea.evidence,
    nextStep: idea.nextStep,
  };
}

function projectedSearch(bundle: StudyBundleV1): ExperimentSearchMetadata | undefined {
  const fact = bundle.payload.provenance.facts.find((candidate) => (
    candidate.key === 'optimizer.plan' && candidate.status === 'observed'
  ));
  if (!fact || !isExperimentSearchMetadata(fact.value)) return undefined;
  return JSON.parse(JSON.stringify(fact.value)) as ExperimentSearchMetadata;
}

/**
 * Project an already content-integrity-checked portable bundle into the browser's
 * read-only Experiment Lab summary shape.
 *
 * Only derived evidence and scalar run records cross this boundary. Baseline
 * graph data, GraphOps, SecretRefs, and secret requirements are intentionally
 * unreachable from the returned ExperimentSession. This function performs no
 * storage, DOM, network, graph, or execution work and does not mutate input.
 */
export function projectStudyBundleToSession(bundle: StudyBundleV1): ExperimentSession {
  const { payload } = bundle;
  const { derived, spec } = payload;
  const search = projectedSearch(bundle);
  return {
    id: payload.id,
    createdAt: payload.createdAt,
    hypothesis: spec.hypothesis,
    objective: { ...spec.objective },
    repetitions: spec.repetitions,
    status: derived.status,
    variants: derived.variants.map((variant) => projectedVariant(variant, payload.runs)),
    ...(search === undefined ? {} : { search }),
    ...(derived.baselineVariantId === undefined
      ? {}
      : { baselineVariantId: derived.baselineVariantId }),
    ...(derived.winnerId === undefined ? {} : { winnerId: derived.winnerId }),
    ...(derived.winnerLabel === undefined ? {} : { winnerLabel: derived.winnerLabel }),
    ...(derived.appliedVariantId === undefined
      ? {}
      : { appliedVariantId: derived.appliedVariantId }),
    ...(derived.applyConflict === undefined ? {} : { applyConflict: derived.applyConflict }),
    insights: {
      summary: [...derived.insights.summary],
      warnings: [...derived.insights.warnings, IMPORTED_STUDY_WARNING],
      paperIdeas: derived.insights.paperIdeas.map(clonePaperIdea),
    },
  };
}
