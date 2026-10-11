import { afterEach, describe, expect, it, vi } from 'vitest';
import type { StudyBundleV1 } from './studyBundle';
import { projectStudyBundleToSession } from './studyImportProjection';

function fixture(): StudyBundleV1 {
  return {
    format: 'codefyui.graph-copilot.study',
    formatVersion: 1,
    payload: {
      id: 'imported-study-1',
      createdAt: '2026-07-14T01:00:00.000Z',
      completedAt: '2026-07-14T01:03:00.000Z',
      producer: {
        pluginId: 'graph-copilot',
        pluginVersion: '0.3.0',
        codefyuiApiVersion: 2,
      },
      provenance: { facts: [] },
      spec: {
        hypothesis: 'The tuned graph improves accuracy.',
        baseline: {
          nodes: [{
            id: 'trainer',
            type: 'Trainer',
            position: { x: 0, y: 0 },
            data: {
              params: { api_key: { $gcpSecretRef: 'trainer-api-key' } },
            },
          }],
          edges: [],
        },
        objective: { metric: 'accuracy', direction: 'maximize' },
        repetitions: 3,
        concurrency: 1,
        applyBestRequested: false,
        variants: [
          { id: 'baseline', label: 'Baseline', operations: [] },
          {
            id: 'tuned',
            label: 'Tuned',
            operations: [{
              op: 'set_params',
              node_id: 'trainer',
              params: { api_key: { $gcpSecretRef: 'trainer-api-key' } },
            }],
          },
        ],
      },
      // Intentionally unordered and missing baseline repetition two. Projection
      // must sort actual evidence, not manufacture the missing attempt.
      runs: [
        {
          runKey: 'tuned:3',
          variantId: 'tuned',
          repetition: 3,
          status: 'cancelled',
          durationMs: 25,
          metrics: [],
          error: { phase: 'cancel', code: 'USER_CANCELLED', message: 'Stopped by reviewer.' },
        },
        {
          runKey: 'baseline:3',
          variantId: 'baseline',
          repetition: 3,
          status: 'failed',
          durationMs: 50,
          metrics: [{
            observedKey: 'runtime',
            canonicalKey: 'system.runtime_ms',
            value: 50,
            source: 'client',
          }],
          error: { phase: 'execute', code: 'WORKER_EXIT', message: 'Worker exited.' },
        },
        {
          runKey: 'baseline:1',
          variantId: 'baseline',
          repetition: 1,
          status: 'completed',
          durationMs: 100,
          metrics: [
            {
              observedKey: 'accuracy-node.accuracy',
              canonicalKey: 'Accuracy.accuracy',
              value: 0.81,
              source: 'output_summary',
            },
            {
              observedKey: 'Accuracy.accuracy',
              canonicalKey: 'Accuracy.accuracy',
              value: 0.82,
              source: 'progress',
            },
            {
              observedKey: 'runtime',
              canonicalKey: 'system.runtime_ms',
              value: 100,
              source: 'client',
            },
          ],
        },
      ],
      derived: {
        status: 'partial',
        variants: [
          {
            id: 'baseline',
            label: 'Baseline',
            status: 'failed',
            metricKey: 'Accuracy.accuracy',
            metricValues: [0.81],
            mean: 0.81,
            runtimeMs: 75,
            observedMetrics: [
              { key: 'system.runtime_ms', value: 75 },
              { key: 'Accuracy.accuracy', value: 0.81 },
            ],
            operationSummary: [],
            errors: ['Only one repetition completed.'],
          },
          {
            id: 'tuned',
            label: 'Tuned',
            status: 'failed',
            metricValues: [],
            runtimeMs: 0,
            observedMetrics: [],
            operationSummary: ['set trainer: api_key'],
            errors: ['Cancelled before measurement.'],
          },
        ],
        winnerId: 'baseline',
        winnerLabel: 'Baseline',
        appliedVariantId: 'baseline',
        applyConflict: 'The live graph changed after the study.',
        insights: {
          summary: ['Baseline supplied the only completed objective sample.'],
          warnings: ['Pilot evidence only.'],
          paperIdeas: [{
            title: 'Accuracy stability',
            evidence: 'One completed observation is available.',
            nextStep: 'Repeat under controlled seeds.',
          }],
        },
      },
      redactionReport: {
        policy: 'explicit-secret-ref-v1',
        secretRequirements: [{
          id: 'trainer-api-key',
          locations: [
            '/spec/baseline/nodes/0/data/params/api_key',
            '/spec/variants/1/operations/0/params/api_key',
          ],
          reason: 'Trainer.api_key is secret.',
          requiredAtReplay: true,
          nodeType: 'Trainer',
          parameter: 'api_key',
        }],
        textRedactions: [],
      },
    },
    integrity: {
      algorithm: 'SHA-256',
      canonicalization: 'plugin-canonical-v1',
      contentSha256: '0'.repeat(64),
    },
  };
}

function deepFreeze(value: unknown, seen = new WeakSet<object>()): void {
  if (!value || typeof value !== 'object' || seen.has(value as object)) return;
  seen.add(value as object);
  Object.values(value as Record<string, unknown>).forEach((child) => deepFreeze(child, seen));
  Object.freeze(value);
}

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('projectStudyBundleToSession', () => {
  it('maps the derived display summary without exposing graph operations or SecretRefs', () => {
    const session = projectStudyBundleToSession(fixture());

    expect(session).toMatchObject({
      id: 'imported-study-1',
      createdAt: '2026-07-14T01:00:00.000Z',
      hypothesis: 'The tuned graph improves accuracy.',
      objective: { metric: 'accuracy', direction: 'maximize' },
      repetitions: 3,
      status: 'partial',
      winnerId: 'baseline',
      winnerLabel: 'Baseline',
      appliedVariantId: 'baseline',
      applyConflict: 'The live graph changed after the study.',
    });
    expect(session.variants[0]).toMatchObject({
      id: 'baseline',
      metricKey: 'Accuracy.accuracy',
      metricValues: [0.81],
      mean: 0.81,
      runtimeMs: 75,
      observedMetrics: {
        'Accuracy.accuracy': 0.81,
        'system.runtime_ms': 75,
      },
      operationSummary: [],
      errors: ['Only one repetition completed.'],
    });
    expect(session.insights.summary).toEqual([
      'Baseline supplied the only completed objective sample.',
    ]);
    expect(session.insights.paperIdeas).toEqual([{
      title: 'Accuracy stability',
      evidence: 'One completed observation is available.',
      nextStep: 'Repeat under controlled seeds.',
    }]);
    expect(JSON.stringify(session)).not.toContain('$gcpSecretRef');
    expect(JSON.stringify(session)).not.toContain('set_params');
    expect(session).not.toHaveProperty('spec');
  });

  it('reconstructs only recorded attempts with canonical objective identity and source', () => {
    const session = projectStudyBundleToSession(fixture());
    const baselineRuns = session.variants[0].runs;

    expect(baselineRuns).toHaveLength(2);
    expect(baselineRuns?.map((run) => run.repetition)).toEqual([1, 3]);
    expect(baselineRuns?.[0]).toEqual({
      repetition: 1,
      status: 'completed',
      durationMs: 100,
      metricKey: 'Accuracy.accuracy',
      metricValue: 0.81,
      metricSource: 'output_summary',
      observedMetrics: {
        'Accuracy.accuracy': 0.82,
        'accuracy-node.accuracy': 0.81,
        runtime: 100,
      },
      observedMetricIdentities: {
        'Accuracy.accuracy': 'Accuracy.accuracy',
        'accuracy-node.accuracy': 'Accuracy.accuracy',
        runtime: 'system.runtime_ms',
      },
      observedMetricSources: {
        'Accuracy.accuracy': 'progress',
        'accuracy-node.accuracy': 'output_summary',
        runtime: 'client',
      },
    });
    expect(baselineRuns?.[1]).toMatchObject({
      repetition: 3,
      status: 'failed',
      observedMetrics: { runtime: 50 },
      error: 'Imported run failed [execute/WORKER_EXIT]: Worker exited.',
    });
  });

  it('maps cancelled attempts to failed without losing cancellation semantics', () => {
    const session = projectStudyBundleToSession(fixture());
    expect(session.variants[1].runs).toEqual([{
      repetition: 3,
      status: 'failed',
      durationMs: 25,
      observedMetrics: {},
      error: 'Imported run was cancelled [cancel/USER_CANCELLED]: Stopped by reviewer.',
    }]);
    expect(session.variants[1].runs).toHaveLength(1);
  });

  it('adds an explicit content-integrity/authorship/read-only warning', () => {
    const session = projectStudyBundleToSession(fixture());
    expect(session.insights.warnings[0]).toBe('Pilot evidence only.');
    expect(session.insights.warnings.at(-1)).toBe(
      'Imported portable-study content passed SHA-256 integrity checking, which detects content changes but does not authenticate its author or evidence source. It is read-only and was not executed in this browser session.',
    );
  });

  it('restores a strictly validated optimizer plan from provenance for read-only display', () => {
    const source = fixture();
    (source.payload.provenance.facts as any[]).push({
      key: 'optimizer.plan',
      status: 'observed',
      source: 'graph-experiment request',
      value: {
        schemaVersion: 1,
        strategy: 'grid',
        seedDescription: 'Grid enumeration is deterministic and does not seed graph execution.',
        includesBaseline: true,
        totalDomainAssignments: 2,
        baselineAssignmentExcluded: true,
        generatedCandidateCount: 1,
        totalVariantCount: 2,
        totalExecutionCount: 6,
        bindings: [{
          nodeId: 'trainer',
          nodeType: 'Trainer',
          param: 'width',
          paramType: 'int',
          baselineValue: 64,
          domain: [64, 128],
        }],
        assignments: [{
          variantId: 'tuned',
          domainIndex: 1,
          values: [{ nodeId: 'trainer', param: 'width', value: 128 }],
        }],
      },
    });

    const session = projectStudyBundleToSession(source);
    expect(session.search).toMatchObject({ strategy: 'grid', totalExecutionCount: 6 });
    expect(session.search).not.toBe((source.payload.provenance.facts.at(-1) as any).value);
  });

  it('does not mutate frozen input and returns detached mutable display data', () => {
    const source = fixture();
    const before = JSON.stringify(source);
    deepFreeze(source);

    const session = projectStudyBundleToSession(source);
    session.variants[0].metricValues.push(999);
    session.variants[0].observedMetrics['Accuracy.accuracy'] = 999;
    session.insights.summary.push('Local display annotation.');
    session.insights.paperIdeas[0].title = 'Local title';

    expect(JSON.stringify(source)).toBe(before);
    expect(source.payload.derived.variants[0].metricValues).toEqual([0.81]);
    expect(source.payload.derived.insights.paperIdeas[0].title).toBe('Accuracy stability');
  });

  it('has no storage, network, socket, or browser-event side effects', () => {
    const fetchSpy = vi.fn();
    const webSocketSpy = vi.fn();
    const dispatchSpy = vi.spyOn(window, 'dispatchEvent');
    const storageSpy = vi.spyOn(Storage.prototype, 'setItem');
    vi.stubGlobal('fetch', fetchSpy);
    vi.stubGlobal('WebSocket', webSocketSpy);

    projectStudyBundleToSession(fixture());

    expect(fetchSpy).not.toHaveBeenCalled();
    expect(webSocketSpy).not.toHaveBeenCalled();
    expect(dispatchSpy).not.toHaveBeenCalled();
    expect(storageSpy).not.toHaveBeenCalled();
  });
});
