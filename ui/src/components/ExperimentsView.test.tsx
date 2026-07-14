import React from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  EXPERIMENTS_CHANGED_EVENT,
  EXPERIMENTS_STORAGE_KEY,
  loadExperimentSessions,
  type ExperimentSession,
} from '../agent/experiments';
import { projectStudyBundleToSession } from '../agent/studyImportProjection';
import {
  createStudyBundle,
  encodeStudyBundle,
  parseStudyBundle,
  type CreateStudyBundleInput,
  type PortableGraphV1,
  type StudyBundleV1,
  type StudyRunRecordV1,
  type StudyVariantSpecV1,
} from '../agent/studyBundle';
import { loadStudyBundle, saveStudyBundle } from '../agent/studyStorage';
import type { CodefyUIPluginAPI } from '../types/codefyui';
import { ExperimentsView } from './ExperimentsView';

function makeApi(sessions: ExperimentSession[] = []) {
  const store = new Map<string, string>([
    [EXPERIMENTS_STORAGE_KEY, JSON.stringify(sessions)],
  ]);
  const applyOperations = vi.fn();
  const fetch = vi.fn();
  const api = {
    graph: { applyOperations },
    http: { fetch },
    storage: {
      get: vi.fn((key: string) => store.get(key) ?? null),
      set: vi.fn((key: string, value: string) => store.set(key, value)),
      remove: vi.fn((key: string) => store.delete(key)),
    },
  } as unknown as CodefyUIPluginAPI;
  return { api, store, applyOperations, fetch };
}

function makeSession(over: Partial<ExperimentSession> = {}): ExperimentSession {
  return {
    id: 'study-1',
    createdAt: '2026-07-14T08:30:00.000Z',
    hypothesis: 'A smaller learning rate improves validation accuracy',
    objective: { metric: 'Accuracy.accuracy', direction: 'maximize' },
    repetitions: 3,
    status: 'completed',
    winnerId: 'slow',
    winnerLabel: 'LR 0.001',
    variants: [
      {
        id: 'fast',
        label: 'LR 0.01',
        status: 'completed',
        metricKey: 'Accuracy.accuracy',
        metricValues: [0.83, 0.84, 0.82],
        mean: 0.83,
        stddev: 0.008,
        runtimeMs: 1500,
        observedMetrics: {},
        errors: [],
      },
      {
        id: 'slow',
        label: 'LR 0.001',
        status: 'completed',
        metricKey: 'Accuracy.accuracy',
        metricValues: [0.91, 0.92, 0.9],
        mean: 0.91,
        stddev: 0.008,
        confidenceInterval95: { level: 0.95, lower: 0.89, upper: 0.93 },
        baselineComparison: {
          baselineId: 'fast',
          meanDelta: 0.08,
          objectiveImprovement: 0.08,
          hedgesG: 1.25,
        },
        runtimeMs: 1800,
        observedMetrics: {},
        errors: [],
      },
    ],
    insights: {
      summary: ['LR 0.001 ranked first across all candidates.'],
      warnings: ['This pilot still needs held-out validation.'],
      paperIdeas: [{
        title: 'Learning-rate stability across graph depth',
        evidence: 'The lower-rate candidate led this pilot.',
        nextStep: 'Repeat across five seeds and three graph depths.',
      }],
    },
    ...over,
  };
}

async function makePortableBundle(
  over: { id?: string; hypothesis?: string; addNode?: boolean } = {},
): Promise<StudyBundleV1> {
  const id = over.id ?? 'portable-study-1';
  const hypothesis = over.hypothesis ?? 'A tuned secret-backed trainer improves accuracy';
  const createdAt = '2026-07-14T01:00:00.000Z';
  const completedAt = '2026-07-14T01:02:00.000Z';
  const session: ExperimentSession = {
    id,
    createdAt,
    hypothesis,
    objective: { metric: 'Accuracy.accuracy', direction: 'maximize' },
    repetitions: 1,
    status: 'completed',
    winnerId: 'tuned',
    winnerLabel: 'Tuned',
    variants: [
      {
        id: 'baseline',
        label: 'Baseline',
        status: 'completed',
        metricKey: 'Accuracy.accuracy',
        metricValues: [0.8],
        mean: 0.8,
        runtimeMs: 1_000,
        observedMetrics: { 'Accuracy.accuracy': 0.8, 'system.runtime_ms': 1_000 },
        operationSummary: [],
        errors: [],
      },
      {
        id: 'tuned',
        label: 'Tuned',
        status: 'completed',
        metricKey: 'Accuracy.accuracy',
        metricValues: [0.9],
        mean: 0.9,
        runtimeMs: 900,
        observedMetrics: { 'Accuracy.accuracy': 0.9, 'system.runtime_ms': 900 },
        operationSummary: ['set trainer: learning_rate, api_key'],
        errors: [],
      },
    ],
    insights: {
      summary: ['Tuned has the top observed mean.'],
      warnings: ['Pilot evidence only.'],
      paperIdeas: [],
    },
  };
  const baseline: PortableGraphV1 = {
    name: 'portable-study',
    description: 'Portable graph with an unresolved replay secret',
    nodes: [
      {
        id: 'trainer',
        type: 'Trainer',
        position: { x: 10, y: 20 },
        data: {
          params: {
            learning_rate: 0.01,
            api_key: { $gcpSecretRef: 'trainer-api-key' },
          },
        },
      },
      {
        id: 'accuracy',
        type: 'Accuracy',
        position: { x: 300, y: 20 },
        data: { params: {} },
      },
    ],
    edges: [{
      id: 'edge-1',
      source: 'trainer',
      target: 'accuracy',
      sourceHandle: 'predictions',
      targetHandle: 'predictions',
      type: 'data',
    }],
    presets: [],
    segmentGroups: [],
  };
  const variants: StudyVariantSpecV1[] = [
    { id: 'baseline', label: 'Baseline', operations: [] },
    {
      id: 'tuned',
      label: 'Tuned',
      operations: over.addNode
        ? [{
          op: 'add_node',
          node_type: 'Trainer',
          ref: 'added-trainer',
          params: {
            learning_rate: 0.001,
            api_key: { $gcpSecretRef: 'trainer-api-key' },
          },
        }]
        : [{
          op: 'set_params',
          node_id: 'trainer',
          params: {
            learning_rate: 0.001,
            api_key: { $gcpSecretRef: 'trainer-api-key' },
          },
        }],
    },
  ];
  const runs: StudyRunRecordV1[] = [
    {
      runKey: 'baseline:1',
      runId: 'run-baseline-1',
      graphId: 'graph-baseline',
      variantId: 'baseline',
      repetition: 1,
      status: 'completed',
      startedAt: '2026-07-14T01:00:10.000Z',
      completedAt: '2026-07-14T01:00:11.000Z',
      durationMs: 1_000,
      metrics: [{
        observedKey: 'accuracy.accuracy',
        canonicalKey: 'Accuracy.accuracy',
        value: 0.8,
        source: 'output_summary',
      }],
    },
    {
      runKey: 'tuned:1',
      runId: 'run-tuned-1',
      graphId: 'graph-tuned',
      variantId: 'tuned',
      repetition: 1,
      status: 'completed',
      startedAt: '2026-07-14T01:01:00.000Z',
      completedAt: '2026-07-14T01:01:00.900Z',
      durationMs: 900,
      metrics: [{
        observedKey: 'accuracy.accuracy',
        canonicalKey: 'Accuracy.accuracy',
        value: 0.9,
        source: 'output_summary',
      }],
    },
  ];
  const input: CreateStudyBundleInput = {
    session,
    completedAt,
    producer: {
      pluginId: 'graph-copilot',
      pluginVersion: '0.2.0',
      codefyuiApiVersion: 2,
    },
    provenance: {
      facts: [{
        key: 'codefyui.api_version',
        status: 'observed',
        source: 'plugin-api',
        collectedAt: createdAt,
        value: 2,
      }],
    },
    baseline,
    variants,
    runs,
    redactionReport: {
      policy: 'explicit-secret-ref-v1',
      secretRequirements: [{
        id: 'trainer-api-key',
        locations: [
          '/spec/baseline/nodes/0/data/params/api_key',
          '/spec/variants/1/operations/0/params/api_key',
        ],
        reason: 'Trainer.api_key is declared as a secret parameter.',
        requiredAtReplay: false,
        nodeType: 'Trainer',
        parameter: 'api_key',
      }],
      textRedactions: [],
    },
  };
  return createStudyBundle(input);
}

async function choosePortableFile(bundle: StudyBundleV1): Promise<void> {
  const encoded = await encodeStudyBundle(bundle);
  const file = {
    name: `${bundle.payload.id}.json`,
    type: 'application/json',
    text: vi.fn(async () => encoded),
  } as unknown as File;
  fireEvent.change(screen.getByLabelText(/choose portable study file/i), {
    target: { files: [file] },
  });
  await screen.findByRole('dialog', { name: /import portable study/i });
}

function captureDownloads(): { blobs: Blob[]; filenames: string[] } {
  const blobs: Blob[] = [];
  const filenames: string[] = [];
  Object.defineProperty(URL, 'createObjectURL', {
    configurable: true,
    value: vi.fn((blob: Blob) => {
      blobs.push(blob);
      return `blob:portable-${blobs.length}`;
    }),
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    configurable: true,
    value: vi.fn(),
  });
  vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function click(this: HTMLAnchorElement) {
    filenames.push(this.download);
  });
  return { blobs, filenames };
}

function readBlob(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsText(blob);
  });
}

describe('ExperimentsView', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    let tail: Promise<void> = Promise.resolve();
    vi.stubGlobal('navigator', {
      locks: {
        request: vi.fn((
          _name: string,
          _options: { mode: 'exclusive' },
          callback: () => Promise<unknown>,
        ): Promise<unknown> => {
          const result = tail.then(callback);
          tail = result.then(() => undefined, () => undefined);
          return result;
        }),
      },
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it('shows a useful empty state before the first experiment', () => {
    const { api } = makeApi();
    render(<ExperimentsView api={api} />);

    expect(screen.getByRole('heading', { name: /experiment lab/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /no experiment studies yet/i })).toBeInTheDocument();
    expect(screen.getByText(/compare three learning-rate variants/i)).toBeInTheDocument();
  });

  it('renders the objective, winner, ranked candidates, warnings, and paper ideas', () => {
    const { api } = makeApi([makeSession()]);
    render(<ExperimentsView api={api} />);

    expect(screen.getByRole('heading', { name: /study objective/i })).toBeInTheDocument();
    expect(screen.getByText(/maximize accuracy\.accuracy/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /winning candidate/i })).toBeInTheDocument();
    expect(screen.getAllByText('LR 0.001').length).toBeGreaterThan(0);
    expect(screen.getByRole('heading', { name: /candidate leaderboard/i })).toBeInTheDocument();

    const rows = screen.getAllByRole('row');
    expect(within(rows[1]).getByText('LR 0.001')).toBeInTheDocument();
    expect(within(rows[1]).getByText('Winner')).toBeInTheDocument();
    expect(screen.getByText(/held-out validation/i)).toBeInTheDocument();
    expect(screen.getByText(/95% CI \[0\.89, 0\.93\]/i)).toBeInTheDocument();
    expect(screen.getByText(/improvement \+0\.08.*g \+1\.25/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /learning-rate stability across graph depth/i })).toBeInTheDocument();
    expect(screen.getByText(/repeat across five seeds/i)).toBeInTheDocument();
  });

  it('shows the deterministic optimizer plan separately from graph execution seeds', () => {
    const { api } = makeApi([makeSession({
      search: {
        schemaVersion: 1,
        strategy: 'seeded_random',
        prngVersion: 'mulberry32-v1',
        plannerSeed: 42,
        seedDescription: 'Planner seed reproduces assignment selection; it does not seed graph execution.',
        includesBaseline: true,
        totalDomainAssignments: 12,
        baselineAssignmentExcluded: true,
        generatedCandidateCount: 2,
        totalVariantCount: 3,
        totalExecutionCount: 9,
        bindings: [{
          nodeId: 'model',
          nodeType: 'Model',
          param: 'width',
          paramType: 'int',
          baselineValue: 64,
          domain: [64, 128, 256],
        }],
        assignments: [
          { variantId: 'fast', domainIndex: 1, values: [{ nodeId: 'model', param: 'width', value: 128 }] },
          { variantId: 'slow', domainIndex: 2, values: [{ nodeId: 'model', param: 'width', value: 256 }] },
        ],
      },
    })]);
    render(<ExperimentsView api={api} />);

    const plan = screen.getByRole('region', { name: /deterministic parameter search plan/i });
    expect(within(plan).getByText(/seeded random/i)).toBeInTheDocument();
    expect(within(plan).getByText(/planner seed 42.*mulberry32-v1/i)).toBeInTheDocument();
    expect(within(plan).getByText(/does not seed graph execution/i)).toBeInTheDocument();
  });

  it('switches between stored studies', () => {
    const second = makeSession({
      id: 'study-2',
      hypothesis: 'Runtime can be minimized without reducing accuracy',
      objective: { metric: 'system.runtime_ms', direction: 'minimize' },
      winnerLabel: 'Cached inputs',
      winnerId: 'slow',
    });
    const { api } = makeApi([makeSession(), second]);
    render(<ExperimentsView api={api} />);

    fireEvent.click(screen.getByRole('button', { name: /runtime can be minimized/i }));
    expect(screen.getByRole('heading', { name: /runtime can be minimized/i })).toBeInTheDocument();
    expect(screen.getByText(/minimize system\.runtime_ms/i)).toBeInTheDocument();
    expect(screen.getByText('Cached inputs')).toBeInTheDocument();
  });

  it('reloads sessions when the experiments-changed event fires', () => {
    const { api, store } = makeApi();
    render(<ExperimentsView api={api} />);
    expect(screen.getByText(/no experiment studies yet/i)).toBeInTheDocument();

    store.set(EXPERIMENTS_STORAGE_KEY, JSON.stringify([makeSession()]));
    act(() => window.dispatchEvent(new Event(EXPERIMENTS_CHANGED_EVENT)));

    expect(screen.queryByText(/no experiment studies yet/i)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /smaller learning rate improves/i })).toBeInTheDocument();
  });

  it('previews a content-integrity-checked file without writes, then imports read-only evidence explicitly', async () => {
    const bundle = await makePortableBundle();
    const { api, store, applyOperations, fetch } = makeApi();
    render(<ExperimentsView api={api} />);

    await choosePortableFile(bundle);

    const dialog = screen.getByRole('dialog', { name: /import portable study/i });
    expect(within(dialog).getByText(bundle.payload.id)).toBeInTheDocument();
    expect(within(dialog).getByText(bundle.integrity.contentSha256)).toBeInTheDocument();
    expect(within(dialog).getByText(/does not authenticate the author or evidence source/i)).toBeInTheDocument();
    expect(within(dialog).getByText(/does not execute, replay, apply, or open any graph/i)).toBeInTheDocument();
    expect(api.storage.set).not.toHaveBeenCalled();
    expect(api.storage.remove).not.toHaveBeenCalled();
    expect(applyOperations).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();

    let markLegacySaved!: () => void;
    const legacySaved = new Promise<void>((resolve) => { markLegacySaved = resolve; });
    vi.mocked(api.storage.set).mockImplementation((key: string, value: string) => {
      store.set(key, value);
      if (key === EXPERIMENTS_STORAGE_KEY) markLegacySaved();
    });
    await act(async () => {
      fireEvent.click(within(dialog).getByRole('button', { name: /import read-only/i }));
      await legacySaved;
    });

    expect(await screen.findByText(/no graph was executed or applied/i)).toBeInTheDocument();
    await waitFor(() => {
      expect(screen.getByRole('button', { name: /export portable study/i })).toBeEnabled();
    });
    await expect(loadStudyBundle(api, bundle.payload.id)).resolves.toStrictEqual(bundle);
    expect(loadExperimentSessions(api)[0]).toEqual(expect.objectContaining({
      id: bundle.payload.id,
      hypothesis: bundle.payload.spec.hypothesis,
    }));
    expect(loadExperimentSessions(api)[0].insights.warnings.join(' ')).toContain('read-only');
    expect(applyOperations).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('surfaces an imported study id conflict without replacing either stored representation', async () => {
    const storedBundle = await makePortableBundle({ id: 'conflicting-study', hypothesis: 'Original evidence' });
    const incomingBundle = await makePortableBundle({ id: 'conflicting-study', hypothesis: 'Different evidence' });
    const { api, applyOperations, fetch } = makeApi();
    await saveStudyBundle(api, storedBundle);
    vi.mocked(api.storage.set).mockClear();
    vi.mocked(api.storage.remove).mockClear();
    render(<ExperimentsView api={api} />);

    await choosePortableFile(incomingBundle);
    expect(api.storage.set).not.toHaveBeenCalled();
    fireEvent.click(screen.getByRole('button', { name: /import read-only/i }));

    expect(await screen.findByRole('alert')).toHaveTextContent(/already exists with different content/i);
    expect(api.storage.set).not.toHaveBeenCalled();
    expect(loadExperimentSessions(api)).toEqual([]);
    await expect(loadStudyBundle(api, storedBundle.payload.id)).resolves.toStrictEqual(storedBundle);
    expect(applyOperations).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('refuses to overwrite a legacy local Lab report with the same study id', async () => {
    const legacy = makeSession({ id: 'legacy-collision', hypothesis: 'Keep this local report' });
    const incoming = await makePortableBundle({
      id: 'legacy-collision',
      hypothesis: 'Incoming portable report',
    });
    const { api, applyOperations, fetch } = makeApi([legacy]);
    render(<ExperimentsView api={api} />);

    await choosePortableFile(incoming);
    vi.mocked(api.storage.set).mockClear();
    fireEvent.click(screen.getByRole('button', { name: /import read-only/i }));

    expect(await screen.findByText(/local Experiment Lab report already uses study id/i)).toHaveAttribute('role', 'alert');
    expect(api.storage.set).not.toHaveBeenCalled();
    expect(loadExperimentSessions(api)).toEqual([legacy]);
    expect(applyOperations).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('verifies and downloads the selected portable bundle as parseable JSON', async () => {
    const bundle = await makePortableBundle({ id: 'portable / export' });
    const projected = projectStudyBundleToSession(bundle);
    const { api, applyOperations, fetch } = makeApi([projected]);
    await saveStudyBundle(api, bundle);
    const downloads = captureDownloads();
    render(<ExperimentsView api={api} />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /export portable study/i })).toBeEnabled();
    });
    fireEvent.click(screen.getByRole('button', { name: /export portable study/i }));

    expect(await screen.findByText(/content integrity checked before export/i)).toBeInTheDocument();
    expect(screen.getByText(/does not authenticate authorship/i)).toBeInTheDocument();
    expect(downloads.filenames).toEqual(['portable-export-portable-study.json']);
    expect(downloads.blobs).toHaveLength(1);
    expect(downloads.blobs[0].type).toBe('application/json;charset=utf-8');
    const parsed = await parseStudyBundle(await readBlob(downloads.blobs[0]));
    expect(parsed.integrity.contentSha256).toBe(bundle.integrity.contentSha256);
    expect(parsed.payload.id).toBe(bundle.payload.id);
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(1);
    expect(applyOperations).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('never reuses a cached portable bundle after selecting a different study', async () => {
    const bundle = await makePortableBundle({ id: 'portable-a', hypothesis: 'Portable A' });
    const portable = projectStudyBundleToSession(bundle);
    const legacy = makeSession({ id: 'legacy-b', hypothesis: 'Legacy B' });
    const { api } = makeApi([portable, legacy]);
    await saveStudyBundle(api, bundle);
    render(<ExperimentsView api={api} />);

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /export portable study/i })).toBeEnabled();
    });
    fireEvent.click(screen.getByRole('button', { name: /legacy b/i }));

    expect(screen.getByRole('button', { name: /export portable study/i })).toBeDisabled();
    screen.getAllByRole('button', { name: /download/i }).forEach((button) => {
      expect(button).toBeDisabled();
    });
  });

  it('downloads a materialized candidate with unresolved secrets blank and leaves the canvas untouched', async () => {
    const bundle = await makePortableBundle({ id: 'secret-study' });
    const projected = projectStudyBundleToSession(bundle);
    const { api, applyOperations, fetch } = makeApi([projected]);
    await saveStudyBundle(api, bundle);
    const downloads = captureDownloads();
    render(<ExperimentsView api={api} />);

    const tunedRow = screen.getAllByRole('row').find((row) => within(row).queryByText('Tuned'))!;
    await waitFor(() => expect(within(tunedRow).getByRole('button', { name: /download/i })).toBeEnabled());
    fireEvent.click(within(tunedRow).getByRole('button', { name: /download/i }));

    expect(await screen.findByText(/1 unresolved secret value.*left blank/i)).toBeInTheDocument();
    expect(downloads.filenames).toEqual(['secret-study-Tuned-graph.json']);
    const encoded = await readBlob(downloads.blobs[0]);
    const graph = JSON.parse(encoded) as {
      nodes: Array<{ id: string; data: { params: Record<string, unknown> } }>;
    };
    expect(graph.nodes.find((node) => node.id === 'trainer')?.data.params).toEqual({
      api_key: '',
      learning_rate: 0.001,
    });
    expect(encoded).not.toContain('$gcpSecretRef');
    expect(encoded).not.toContain('trainer-api-key');
    expect(applyOperations).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('surfaces portable-v1 fidelity warnings when a downloaded candidate adds nodes', async () => {
    const bundle = await makePortableBundle({ id: 'approximate-study', addNode: true });
    const projected = projectStudyBundleToSession(bundle);
    const { api } = makeApi([projected]);
    await saveStudyBundle(api, bundle);
    captureDownloads();
    render(<ExperimentsView api={api} />);

    const tunedRow = screen.getAllByRole('row').find((row) => within(row).queryByText('Tuned'))!;
    await waitFor(() => expect(within(tunedRow).getByRole('button', { name: /download/i })).toBeEnabled());
    fireEvent.click(within(tunedRow).getByRole('button', { name: /download/i }));

    expect(await screen.findByText(/fidelity warning:.*node-definition defaults/i)).toBeInTheDocument();
    expect(screen.getByText(/generated node and edge ids.*may differ/i)).toBeInTheDocument();
  });

  it('exports formula-safe run CSV and an evidence-labeled research brief', () => {
    const created: Blob[] = [];
    const downloads: string[] = [];
    Object.defineProperty(URL, 'createObjectURL', {
      configurable: true,
      value: vi.fn((blob: Blob) => {
        created.push(blob);
        return `blob:study-${created.length}`;
      }),
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      configurable: true,
      value: vi.fn(),
    });
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function click(this: HTMLAnchorElement) {
      downloads.push(this.download);
    });
    const { api } = makeApi([makeSession({ id: 'study / unsafe name' })]);
    render(<ExperimentsView api={api} />);

    fireEvent.click(screen.getByRole('button', { name: /export runs csv/i }));
    fireEvent.click(screen.getByRole('button', { name: /export research brief/i }));

    expect(created.map((blob) => blob.type)).toEqual([
      'text/csv;charset=utf-8',
      'text/markdown;charset=utf-8',
    ]);
    expect(downloads).toEqual([
      'study-unsafe-name-runs.csv',
      'study-unsafe-name-research.md',
    ]);
    expect(URL.revokeObjectURL).toHaveBeenCalledTimes(2);
  });
});
