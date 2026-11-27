/** R3: secret scrubbing must not eat ordinary words. Declared secrets and
 * credential-shaped presumed values are still cut from all text. */
import { describe, expect, it } from 'vitest';
import type { CodefyUIPluginAPI, NodeDefinition, SerializedGraph } from '../types/codefyui';
import { REDACTED_VALUE, redactGraphForContext, redactToolResultForContext, scrubWorthy } from './historyRedaction';

const param = (name: string, param_type = 'string') => ({ name, param_type, default: '', description: '', options: [], min_value: null, max_value: null });
const definitions = [
  { node_name: 'Notes', params: [param('text')] },
  { node_name: 'Remote', params: [param('api_key', 'secret'), param('pin', 'secret')] },
] as unknown as NodeDefinition[];

const node = (id: string, type: string, params: Record<string, unknown>) => ({ id, type, position: { x: 0, y: 0 }, data: { params } });
const NOTE = 'Two linear layers are trained on the 60,000 MNIST training images (split train).';

function graphWith(extra: Partial<SerializedGraph> & { nodes?: unknown[] } = {}): SerializedGraph {
  return {
    nodes: [
      // No schema for this type: its params are presumed secret.
      node('ds', 'CustomDataset', { split: 'train', root: 'mnist' }),
      node('note', 'Notes', { text: NOTE }),
      ...(extra.nodes ?? []),
    ],
    edges: [],
    ...(extra.presets ? { presets: extra.presets } : {}),
  } as unknown as SerializedGraph;
}
const textOf = (graph: SerializedGraph) => (graph.nodes.find((n) => n.id === 'note')!.data as { params: { text: string } }).params.text;

describe('R3: redaction keeps ordinary words', () => {
  it('(a) split: "train" leaves "trained on the training set" intact', () => {
    const safe = redactGraphForContext(graphWith(), definitions);
    expect(textOf(safe)).toBe(NOTE);
    // The schema-less param itself is still not shown.
    expect((safe.nodes[0].data as { params: Record<string, unknown> }).params).toEqual({ split: REDACTED_VALUE, root: REDACTED_VALUE });
  });

  it('(b) a secret param value is cut from other fields and from tool results', () => {
    const key = 'sk-live-abcdef123456';
    const graph = graphWith({ nodes: [node('r', 'Remote', { api_key: key, pin: '1234' }), node('n2', 'Notes', { text: `use ${key} for the call; pin 1234` })] });
    const safe = redactGraphForContext(graph, definitions);
    const json = JSON.stringify(safe);
    expect(json).not.toContain(key);
    expect((safe.nodes[2].data as { params: Record<string, unknown> }).params).toEqual({ api_key: REDACTED_VALUE, pin: REDACTED_VALUE });
    expect((safe.nodes[3].data as { params: { text: string } }).params.text).toBe(`use ${REDACTED_VALUE} for the call; pin 1234`);
    const api = { graph: { getGraph: () => graph, getNodeDefinitions: () => definitions } } as unknown as CodefyUIPluginAPI;
    const result = redactToolResultForContext({ id: 'c', name: 'get_run', arguments: {} }, JSON.stringify({ log: `auth with ${key} ok`, note: 'trained fine' }), api);
    expect(result).not.toContain(key);
    expect(JSON.parse(result)).toEqual({ log: `auth with ${REDACTED_VALUE} ok`, note: 'trained fine' });
  });

  it('(c) a 40-character token in a preset is still cut from the text', () => {
    const token = 'ghp_A1b2C3d4E5f6G7h8I9j0K1l2M3n4O5p6Q7r8';
    expect(token).toHaveLength(40);
    const graph = graphWith({ presets: [{ name: 'deploy', token }, { name: 'train' }], nodes: [node('n2', 'Notes', { text: `token=${token}` })] });
    const safe = redactGraphForContext(graph, definitions);
    expect(JSON.stringify(safe)).not.toContain(token);
    expect((safe.nodes[2].data as { params: { text: string } }).params.text).toBe(`token=${REDACTED_VALUE}`);
    expect(textOf(safe)).toBe(NOTE);
  });

  it('a secret is matched on word boundaries, not inside a longer word', () => {
    const graph = graphWith({ nodes: [node('r', 'Remote', { api_key: 'abcdef' }), node('n2', 'Notes', { text: 'abcdefgh xabcdef abcdef.' })] });
    const safe = redactGraphForContext(graph, definitions);
    expect((safe.nodes[3].data as { params: { text: string } }).params.text).toBe(`abcdefgh xabcdef ${REDACTED_VALUE}.`);
  });

  it('what counts as credential-shaped', () => {
    expect(scrubWorthy('train', 'presumed')).toBe(false);
    expect(scrubWorthy('averyveryverylongword', 'presumed')).toBe(false);
    expect(scrubWorthy('12345678901234567890', 'presumed')).toBe(false);
    expect(scrubWorthy('two words but long enough', 'presumed')).toBe(false);
    expect(scrubWorthy('ghp_A1b2C3d4E5f6G7h8', 'presumed')).toBe(true);
    expect(scrubWorthy('12345', 'explicit')).toBe(false);
    expect(scrubWorthy('hunter2', 'explicit')).toBe(true);
  });
});
