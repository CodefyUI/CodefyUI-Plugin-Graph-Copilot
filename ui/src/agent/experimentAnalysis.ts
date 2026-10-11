/**
 * Dependency-free statistics and research exports for small graph studies.
 *
 * These interfaces are intentionally structural. Runtime experiment code can
 * project its private records into this shape without introducing a circular
 * dependency back into the analysis layer.
 */

export type StudyDirection = 'maximize' | 'minimize';

export interface ConfidenceInterval95 {
  confidenceLevel: 0.95;
  degreesOfFreedom: number;
  mean: number;
  margin: number;
  lower: number;
  upper: number;
}

export interface BaselineComparison {
  baselineMean: number;
  candidateMean: number;
  /** Candidate mean minus baseline mean, independent of objective direction. */
  rawDelta: number;
  /** Positive is better for both maximize and minimize objectives. */
  improvement: number;
  /** Candidate minus baseline standardized effect. */
  hedgesG?: number;
  /** Positive is better for both maximize and minimize objectives. */
  directionAdjustedHedgesG?: number;
}

export interface PerRunStudyObjective {
  metric: string;
  direction: StudyDirection;
}

export interface PerRunStudyObservation {
  variantId: string;
  variantLabel: string;
  /** One-based repetition number in exported studies. */
  repetition: number;
  status: string;
  metricKey?: string;
  metricValue?: number;
  runtimeMs?: number;
  /** Planner or graph seed, when the runtime can provide one. */
  seed?: string | number;
  error?: string;
}

export interface ResearchPaperLead {
  title: string;
  evidence: string;
  nextStep: string;
}

export interface PerRunStudy {
  id: string;
  createdAt: string;
  hypothesis: string;
  objective: PerRunStudyObjective;
  runs: readonly PerRunStudyObservation[];
  baselineVariantId?: string;
  warnings?: readonly string[];
  paperLeads?: readonly ResearchPaperLead[];
}

interface SampleStatistics {
  mean: number;
  variance: number;
}

function sampleStatistics(values: readonly number[]): SampleStatistics | undefined {
  if (values.length === 0 || values.some((value) => !Number.isFinite(value))) {
    return undefined;
  }

  // Welford's algorithm avoids the cancellation error of sum((x - mean)^2).
  let mean = 0;
  let sumSquaredDeviations = 0;
  values.forEach((value, index) => {
    const count = index + 1;
    const delta = value - mean;
    mean += delta / count;
    const nextDelta = value - mean;
    sumSquaredDeviations += delta * nextDelta;
  });

  if (!Number.isFinite(mean) || !Number.isFinite(sumSquaredDeviations)) {
    return undefined;
  }
  const variance = values.length < 2 ? 0 : sumSquaredDeviations / (values.length - 1);
  if (!Number.isFinite(variance)) return undefined;
  return { mean, variance: Math.max(0, variance) };
}

export function sampleMean(values: readonly number[]): number | undefined {
  return sampleStatistics(values)?.mean;
}

export function sampleStddev(values: readonly number[]): number | undefined {
  if (values.length < 2) return undefined;
  const statistics = sampleStatistics(values);
  if (!statistics) return undefined;
  const result = Math.sqrt(statistics.variance);
  return Number.isFinite(result) ? result : undefined;
}

// Lanczos log-gamma and the continued-fraction incomplete beta implementation
// keep the Student-t quantile dependency-free. The small studies used by the
// workbench (n=2..5) match the standard two-sided 95% critical values.
function logGamma(value: number): number {
  const coefficients = [
    676.5203681218851,
    -1259.1392167224028,
    771.32342877765313,
    -176.61502916214059,
    12.507343278686905,
    -0.13857109526572012,
    9.9843695780195716e-6,
    1.5056327351493116e-7,
  ];
  if (value < 0.5) {
    return Math.log(Math.PI) - Math.log(Math.sin(Math.PI * value)) - logGamma(1 - value);
  }
  let x = 0.99999999999980993;
  const shifted = value - 1;
  coefficients.forEach((coefficient, index) => {
    x += coefficient / (shifted + index + 1);
  });
  const t = shifted + coefficients.length - 0.5;
  return 0.5 * Math.log(2 * Math.PI) + (shifted + 0.5) * Math.log(t) - t + Math.log(x);
}

function betaContinuedFraction(a: number, b: number, x: number): number {
  const maxIterations = 200;
  const epsilon = 3e-14;
  const minimum = 1e-300;
  const qab = a + b;
  const qap = a + 1;
  const qam = a - 1;
  let c = 1;
  let d = 1 - (qab * x) / qap;
  if (Math.abs(d) < minimum) d = minimum;
  d = 1 / d;
  let result = d;

  for (let iteration = 1; iteration <= maxIterations; iteration += 1) {
    const twiceIteration = 2 * iteration;
    let coefficient = (iteration * (b - iteration) * x)
      / ((qam + twiceIteration) * (a + twiceIteration));
    d = 1 + coefficient * d;
    if (Math.abs(d) < minimum) d = minimum;
    c = 1 + coefficient / c;
    if (Math.abs(c) < minimum) c = minimum;
    d = 1 / d;
    result *= d * c;

    coefficient = -((a + iteration) * (qab + iteration) * x)
      / ((a + twiceIteration) * (qap + twiceIteration));
    d = 1 + coefficient * d;
    if (Math.abs(d) < minimum) d = minimum;
    c = 1 + coefficient / c;
    if (Math.abs(c) < minimum) c = minimum;
    d = 1 / d;
    const delta = d * c;
    result *= delta;
    if (Math.abs(delta - 1) <= epsilon) break;
  }
  return result;
}

function regularizedIncompleteBeta(x: number, a: number, b: number): number {
  if (x <= 0) return 0;
  if (x >= 1) return 1;
  const factor = Math.exp(
    logGamma(a + b) - logGamma(a) - logGamma(b)
      + a * Math.log(x) + b * Math.log1p(-x),
  );
  if (x < (a + 1) / (a + b + 2)) {
    return factor * betaContinuedFraction(a, b, x) / a;
  }
  return 1 - factor * betaContinuedFraction(b, a, 1 - x) / b;
}

function studentTCdf(value: number, degreesOfFreedom: number): number {
  if (value === 0) return 0.5;
  const betaX = degreesOfFreedom / (degreesOfFreedom + value * value);
  const tail = 0.5 * regularizedIncompleteBeta(
    betaX,
    degreesOfFreedom / 2,
    0.5,
  );
  return value > 0 ? 1 - tail : tail;
}

function studentTCritical95(degreesOfFreedom: number): number | undefined {
  if (!Number.isInteger(degreesOfFreedom) || degreesOfFreedom < 1) return undefined;
  const target = 0.975;
  let low = 0;
  let high = 1;
  while (studentTCdf(high, degreesOfFreedom) < target && high < 1e6) high *= 2;
  if (high >= 1e6) return undefined;
  for (let iteration = 0; iteration < 100; iteration += 1) {
    const midpoint = (low + high) / 2;
    if (studentTCdf(midpoint, degreesOfFreedom) < target) low = midpoint;
    else high = midpoint;
  }
  return (low + high) / 2;
}

export function studentTConfidenceInterval95(
  values: readonly number[],
): ConfidenceInterval95 | undefined {
  if (values.length < 2) return undefined;
  const mean = sampleMean(values);
  const standardDeviation = sampleStddev(values);
  const degreesOfFreedom = values.length - 1;
  const criticalValue = studentTCritical95(degreesOfFreedom);
  if (mean === undefined || standardDeviation === undefined || criticalValue === undefined) {
    return undefined;
  }
  const margin = criticalValue * standardDeviation / Math.sqrt(values.length);
  const lower = mean - margin;
  const upper = mean + margin;
  if (![margin, lower, upper].every(Number.isFinite)) return undefined;
  return {
    confidenceLevel: 0.95,
    degreesOfFreedom,
    mean,
    margin,
    lower,
    upper,
  };
}

/** Short discoverable alias for the two-sided 95% Student-t interval. */
export const studentTCI95 = studentTConfidenceInterval95;

/**
 * Independent-sample Hedges g. Positive means sampleA has the larger mean.
 * Uses pooled sample variance and J ~= 1 - 3/(4df - 1).
 */
export function hedgesG(
  sampleA: readonly number[],
  sampleB: readonly number[],
): number | undefined {
  if (sampleA.length < 2 || sampleB.length < 2) return undefined;
  const first = sampleStatistics(sampleA);
  const second = sampleStatistics(sampleB);
  if (!first || !second) return undefined;
  const degreesOfFreedom = sampleA.length + sampleB.length - 2;
  const pooledVariance = (
    (sampleA.length - 1) * first.variance
    + (sampleB.length - 1) * second.variance
  ) / degreesOfFreedom;
  if (!Number.isFinite(pooledVariance) || pooledVariance <= 0) return undefined;
  const standardizedDifference = (first.mean - second.mean) / Math.sqrt(pooledVariance);
  const correction = 1 - 3 / (4 * degreesOfFreedom - 1);
  const result = standardizedDifference * correction;
  return Number.isFinite(result) ? result : undefined;
}

export function compareToBaseline(
  candidate: readonly number[],
  baseline: readonly number[],
  direction: StudyDirection,
): BaselineComparison | undefined {
  const candidateMean = sampleMean(candidate);
  const baselineMean = sampleMean(baseline);
  if (candidateMean === undefined || baselineMean === undefined) return undefined;
  const rawDelta = candidateMean - baselineMean;
  const improvement = direction === 'maximize' ? rawDelta : -rawDelta;
  if (!Number.isFinite(rawDelta) || !Number.isFinite(improvement)) return undefined;
  const effect = hedgesG(candidate, baseline);
  return {
    baselineMean,
    candidateMean,
    rawDelta,
    improvement,
    hedgesG: effect,
    directionAdjustedHedgesG: effect === undefined
      ? undefined
      : direction === 'maximize' ? effect : -effect,
  };
}

const CSV_HEADERS = [
  'study_id',
  'created_at',
  'hypothesis',
  'objective_metric',
  'direction',
  'variant_id',
  'variant_label',
  'repetition',
  'status',
  'metric_key',
  'metric_value',
  'runtime_ms',
  'seed',
  'error',
] as const;

function finiteCsvNumber(value: number | undefined): string {
  return value !== undefined && Number.isFinite(value) ? String(value) : '';
}

function defendCsvFormula(value: string): string {
  // Spreadsheet programs can execute formula-like text even after whitespace.
  return /^[\t\r\n ]*[=+\-@]/.test(value) ? `'${value}` : value;
}

function encodeCsvCell(value: string): string {
  const defended = defendCsvFormula(value);
  return /[",\r\n]/.test(defended)
    ? `"${defended.replace(/"/g, '""')}"`
    : defended;
}

/** Encode one row per run with RFC4180 quotes and CRLF record separators. */
export function encodePerRunStudyCsv(study: PerRunStudy): string {
  const rows: string[][] = [CSV_HEADERS.slice()];
  study.runs.forEach((run) => {
    rows.push([
      study.id,
      study.createdAt,
      study.hypothesis,
      study.objective.metric,
      study.objective.direction,
      run.variantId,
      run.variantLabel,
      finiteCsvNumber(run.repetition),
      run.status,
      run.metricKey ?? '',
      finiteCsvNumber(run.metricValue),
      finiteCsvNumber(run.runtimeMs),
      run.seed === undefined
        ? ''
        : typeof run.seed === 'number' ? finiteCsvNumber(run.seed) : run.seed,
      run.error ?? '',
    ]);
  });
  return rows.map((row) => row.map(encodeCsvCell).join(',')).join('\r\n');
}

/** Compatibility-friendly name for callers that think in study-run exports. */
export const encodeStudyRunsCsv = encodePerRunStudyCsv;

function reportNumber(value: number): string {
  if (Object.is(value, -0) || value === 0) return '0';
  return Number(value.toPrecision(6)).toString();
}

function reportText(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').replace(/`/g, "'").trim();
}

interface ReportVariant {
  id: string;
  label: string;
  usableValues: number[];
  unusableRuns: number;
}

function reportVariants(study: PerRunStudy): ReportVariant[] {
  const variants = new Map<string, ReportVariant>();
  study.runs.forEach((run) => {
    let variant = variants.get(run.variantId);
    if (!variant) {
      variant = {
        id: run.variantId,
        label: run.variantLabel || run.variantId,
        usableValues: [],
        unusableRuns: 0,
      };
      variants.set(run.variantId, variant);
    }
    if (run.status === 'completed' && Number.isFinite(run.metricValue)) {
      variant.usableValues.push(run.metricValue!);
    } else {
      variant.unusableRuns += 1;
    }
  });
  return [...variants.values()];
}

/**
 * Produce a compact research handoff. Descriptive evidence and inferential
 * claims are deliberately separated so a best observed mean is not presented
 * as causal proof or external validity.
 */
export function generateResearchMarkdownReport(study: PerRunStudy): string {
  const variants = reportVariants(study);
  const baseline = variants.find((variant) => variant.id === study.baselineVariantId);
  const automaticWarnings: string[] = [];
  const lines = [
    `# Research report: ${reportText(study.id)}`,
    '',
    '## Study question',
    '',
    `- Hypothesis under test: ${reportText(study.hypothesis)}`,
    `- Objective: ${study.objective.direction} \`${reportText(study.objective.metric)}\`.`,
    `- Recorded evidence: ${study.runs.length} run(s) across ${variants.length} variant(s).`,
    '',
    '## Observations',
    '',
  ];

  if (variants.length === 0) {
    lines.push('- **[Observation]** No run records were available.');
    automaticWarnings.push('No run records were available for analysis.');
  }

  variants.forEach((variant) => {
    const mean = sampleMean(variant.usableValues);
    const standardDeviation = sampleStddev(variant.usableValues);
    const interval = studentTConfidenceInterval95(variant.usableValues);
    const details = [`n=${variant.usableValues.length}`];
    if (mean !== undefined) details.push(`mean=${reportNumber(mean)}`);
    if (standardDeviation !== undefined) details.push(`sample SD=${reportNumber(standardDeviation)}`);
    if (interval) {
      details.push(`95% Student-t CI=[${reportNumber(interval.lower)}, ${reportNumber(interval.upper)}]`);
    } else {
      details.push('95% Student-t CI=unavailable');
    }
    if (baseline && variant.id !== baseline.id) {
      const comparison = compareToBaseline(
        variant.usableValues,
        baseline.usableValues,
        study.objective.direction,
      );
      if (comparison) {
        details.push(`raw delta vs ${reportText(baseline.label)}=${reportNumber(comparison.rawDelta)}`);
        details.push(`direction-adjusted improvement=${reportNumber(comparison.improvement)}`);
        if (comparison.hedgesG !== undefined) {
          details.push(`Hedges g=${reportNumber(comparison.hedgesG)}`);
        }
      }
    }
    lines.push(`- **[Observation] ${reportText(variant.label)}:** ${details.join('; ')}.`);
    if (variant.usableValues.length < 2) {
      automaticWarnings.push(
        `${variant.label} has fewer than two finite completed observations; variability and a confidence interval are unavailable.`,
      );
    }
    if (variant.unusableRuns > 0) {
      automaticWarnings.push(
        `${variant.label} has ${variant.unusableRuns} run(s) excluded because they failed, were incomplete, or had a non-finite objective value.`,
      );
    }
  });

  if (study.baselineVariantId && !baseline) {
    automaticWarnings.push(`Baseline variant '${study.baselineVariantId}' was not present in the run records.`);
  }

  const comparisons = baseline
    ? variants
      .filter((variant) => variant.id !== baseline.id)
      .map((variant) => ({
        variant,
        comparison: compareToBaseline(
          variant.usableValues,
          baseline.usableValues,
          study.objective.direction,
        ),
      }))
      .filter((item): item is { variant: ReportVariant; comparison: BaselineComparison } =>
        item.comparison !== undefined)
      .sort((first, second) => second.comparison.improvement - first.comparison.improvement)
    : [];

  lines.push(
    '',
    '## Claims and interpretation',
    '',
    '- **[Claim status]** The hypothesis remains a claim under test. These descriptive observations alone do not establish causality, robustness, or external validity.',
  );
  if (comparisons[0]) {
    lines.push(
      `- **[Candidate claim]** ${reportText(comparisons[0].variant.label)} had the strongest observed direction-adjusted change versus the baseline (${reportNumber(comparisons[0].comparison.improvement)}); confirm it with a pre-registered, independently replicated study before treating it as a conclusion.`,
    );
  } else {
    lines.push('- **[Candidate claim]** No baseline comparison had enough finite evidence to nominate a directional result.');
  }

  const warnings = [...(study.warnings ?? []), ...automaticWarnings];
  lines.push('', '## Warnings', '');
  if (warnings.length === 0) lines.push('- None recorded.');
  else warnings.forEach((warning) => lines.push(`- **[Warning]** ${reportText(warning)}`));

  lines.push('', '## Paper leads', '');
  if (!study.paperLeads?.length) {
    lines.push('- None recorded.');
  } else {
    study.paperLeads.forEach((lead) => {
      lines.push(
        `- **[Paper lead] ${reportText(lead.title)}** — Evidence: ${reportText(lead.evidence)} Next study: ${reportText(lead.nextStep)}`,
      );
    });
  }
  return lines.join('\n');
}
