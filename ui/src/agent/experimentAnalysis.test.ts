import { describe, expect, it } from 'vitest';
import {
  compareToBaseline,
  encodePerRunStudyCsv,
  generateResearchMarkdownReport,
  hedgesG,
  sampleMean,
  sampleStddev,
  studentTConfidenceInterval95,
} from './experimentAnalysis';
import type { PerRunStudy } from './experimentAnalysis';

describe('small-sample statistics', () => {
  it('computes exact means and sample standard deviations', () => {
    expect(sampleMean([1, 2, 3, 4, 5])).toBe(3);
    expect(sampleStddev([1, 2, 3, 4, 5])).toBeCloseTo(Math.sqrt(2.5), 12);
    expect(sampleStddev([4, 4])).toBe(0);
  });

  it('uses the standard 95% Student-t critical values for n=2..5', () => {
    const criticalValues = [
      12.7062047364,
      4.30265272991,
      3.18244630528,
      2.7764451052,
    ];
    [2, 3, 4, 5].forEach((size, index) => {
      const values = Array.from({ length: size }, (_, item) => item + 1);
      const interval = studentTConfidenceInterval95(values)!;
      const standardError = sampleStddev(values)! / Math.sqrt(size);
      expect(interval.degreesOfFreedom).toBe(size - 1);
      expect(interval.confidenceLevel).toBe(0.95);
      expect(interval.mean).toBe(sampleMean(values));
      expect(interval.margin / standardError).toBeCloseTo(criticalValues[index], 9);
      expect(interval.lower).toBeCloseTo(interval.mean - interval.margin, 12);
      expect(interval.upper).toBeCloseTo(interval.mean + interval.margin, 12);
    });
  });

  it('refuses undersized and non-finite samples', () => {
    expect(sampleMean([])).toBeUndefined();
    expect(sampleMean([1, Number.NaN])).toBeUndefined();
    expect(sampleStddev([1])).toBeUndefined();
    expect(sampleStddev([1, Number.POSITIVE_INFINITY])).toBeUndefined();
    expect(studentTConfidenceInterval95([])).toBeUndefined();
    expect(studentTConfidenceInterval95([1])).toBeUndefined();
    expect(studentTConfidenceInterval95([1, Number.NEGATIVE_INFINITY])).toBeUndefined();
  });

  it('computes corrected independent-sample Hedges g and guards zero variance', () => {
    // Means 4 and 2; pooled variance 2.5; df=4; J=0.8.
    expect(hedgesG([2, 4, 6], [1, 2, 3])).toBeCloseTo(1.01192885125, 11);
    expect(hedgesG([1, 1], [1, 1])).toBeUndefined();
    expect(hedgesG([1], [1, 2])).toBeUndefined();
    expect(hedgesG([1, Number.NaN], [1, 2])).toBeUndefined();
  });

  it('keeps raw deltas stable while adjusting improvement for objective direction', () => {
    const maximize = compareToBaseline([1, 2, 3], [2, 4, 6], 'maximize')!;
    expect(maximize.rawDelta).toBe(-2);
    expect(maximize.improvement).toBe(-2);
    expect(maximize.hedgesG).toBeCloseTo(-1.01192885125, 11);
    expect(maximize.directionAdjustedHedgesG).toBeCloseTo(-1.01192885125, 11);

    const minimize = compareToBaseline([1, 2, 3], [2, 4, 6], 'minimize')!;
    expect(minimize.rawDelta).toBe(-2);
    expect(minimize.improvement).toBe(2);
    expect(minimize.directionAdjustedHedgesG).toBeCloseTo(1.01192885125, 11);
    expect(compareToBaseline([Number.NaN], [1], 'maximize')).toBeUndefined();
  });
});

describe('per-run CSV export', () => {
  it('uses RFC4180 escaping and neutralizes spreadsheet formulas', () => {
    const study: PerRunStudy = {
      id: '=dangerous-id',
      createdAt: '2026-07-14T00:00:00.000Z',
      hypothesis: 'A comma, a "quote", and\na newline',
      objective: { metric: 'loss', direction: 'minimize' },
      runs: [{
        variantId: 'v1',
        variantLabel: 'Candidate, "blue"\nline two',
        repetition: 1,
        status: 'failed',
        metricKey: 'metric.loss',
        metricValue: Number.NaN,
        runtimeMs: 12.5,
        seed: '  +SUM(A1:A2)',
        error: '@launch',
      }],
    };

    const csv = encodePerRunStudyCsv(study);
    const [header] = csv.split('\r\n');
    expect(header).toBe(
      'study_id,created_at,hypothesis,objective_metric,direction,variant_id,variant_label,repetition,status,metric_key,metric_value,runtime_ms,seed,error',
    );
    expect(csv).toContain("'=dangerous-id");
    expect(csv).toContain('"A comma, a ""quote"", and\na newline"');
    expect(csv).toContain('"Candidate, ""blue""\nline two"');
    expect(csv).toContain(",metric.loss,,12.5,'  +SUM(A1:A2),'@launch");
    expect(csv).not.toContain(',NaN,');
  });
});

describe('research Markdown report', () => {
  it('labels observations separately from claims and carries warnings and paper leads', () => {
    const study: PerRunStudy = {
      id: 'study-1',
      createdAt: '2026-07-14T00:00:00.000Z',
      hypothesis: 'Lower loss transfers to unseen graphs.',
      objective: { metric: 'loss', direction: 'minimize' },
      baselineVariantId: 'base',
      runs: [
        { variantId: 'base', variantLabel: 'Baseline', repetition: 1, status: 'completed', metricValue: 5 },
        { variantId: 'base', variantLabel: 'Baseline', repetition: 2, status: 'completed', metricValue: 7 },
        { variantId: 'candidate', variantLabel: 'Candidate', repetition: 1, status: 'completed', metricValue: 3 },
        { variantId: 'candidate', variantLabel: 'Candidate', repetition: 2, status: 'completed', metricValue: 5 },
      ],
      warnings: ['The run order was not randomized.'],
      paperLeads: [{
        title: 'Transfer under graph shift',
        evidence: 'The candidate improved the bounded objective.',
        nextStep: 'Pre-register a held-out graph family.',
      }],
    };

    const report = generateResearchMarkdownReport(study);
    expect(report).toContain('## Observations');
    expect(report).toContain('**[Observation] Baseline:**');
    expect(report).toContain('**[Observation] Candidate:**');
    expect(report).toContain('raw delta vs Baseline=-2');
    expect(report).toContain('direction-adjusted improvement=2');
    expect(report).toContain('## Claims and interpretation');
    expect(report).toContain('**[Claim status]**');
    expect(report).toContain('do not establish causality');
    expect(report).toContain('**[Warning]** The run order was not randomized.');
    expect(report).toContain('**[Paper lead] Transfer under graph shift**');
  });

  it('reports missing or non-finite evidence as a warning instead of a claim', () => {
    const report = generateResearchMarkdownReport({
      id: 'sparse',
      createdAt: '2026-07-14T00:00:00.000Z',
      hypothesis: 'Sparse evidence',
      objective: { metric: 'score', direction: 'maximize' },
      baselineVariantId: 'missing',
      runs: [{
        variantId: 'v1',
        variantLabel: 'V1',
        repetition: 1,
        status: 'completed',
        metricValue: Number.POSITIVE_INFINITY,
      }],
    });
    expect(report).toContain('n=0');
    expect(report).toContain('95% Student-t CI=unavailable');
    expect(report).toContain('excluded because they failed, were incomplete, or had a non-finite objective value');
    expect(report).toContain("Baseline variant 'missing' was not present");
    expect(report).toContain('No baseline comparison had enough finite evidence');
  });
});
