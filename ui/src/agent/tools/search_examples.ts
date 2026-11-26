import { hostError } from '../hostContext';
import { LIST_LIMIT, oneLine } from '../untrusted';
import { awaitWithSignal, isRecord, throwIfAborted } from '../toolGuards';
import { hasWorkspace } from './workspace';
import type { ToolDefinition } from './types';

interface Example {
  name: string; path: string; description: string; category: string; section: string | null; family: string | null;
  main_tag: string | null; tags: string[]; node_count: number; source: string;
}

function parseExample(value: unknown): Example | null {
  if (!isRecord(value) || typeof value.name !== 'string' || typeof value.path !== 'string') return null;
  const str = (field: unknown) => (typeof field === 'string' ? field : null);
  return {
    name: value.name, path: value.path, description: str(value.description) ?? '', category: str(value.category) ?? '',
    section: str(value.section), family: str(value.family), main_tag: str(value.main_tag),
    tags: Array.isArray(value.tags) ? value.tags.filter((tag): tag is string => typeof tag === 'string') : [],
    node_count: typeof value.node_count === 'number' ? value.node_count : 0, source: str(value.source) ?? 'builtin',
  };
}

/** The tags an example is filed under: its own when it has them, else the
 * gallery section and category (older hosts). */
export function exampleTags(example: Example): string[] {
  const own = [example.main_tag, ...example.tags].filter((tag): tag is string => !!tag);
  return own.length ? own : [example.section, example.category].filter((tag): tag is string => !!tag);
}

export const searchExamplesTool: ToolDefinition = {
  name: 'search_examples',
  description: 'Search the example graphs by keywords (all must match the name, description, category or tags) and optionally one tag. Returns each match\'s path for open_example, its tags and node count. Prefer an example as a starting point when the canvas is empty.',
  input_schema: {
    type: 'object',
    properties: {
      query: { type: 'string', description: 'Keywords, e.g. "mnist cnn".' },
      tag: { type: 'string', description: 'Only examples filed under this tag (or gallery section/category).' },
      limit: { type: 'integer', minimum: 1, maximum: 50, description: 'Results to return (default 10).' },
    },
  },
  group: 'example',
  readOnly: true,
  // Results are acted on through open_example, which needs the workspace API.
  available: hasWorkspace,
  async execute(args, ctx) {
    const { api, signal } = ctx;
    const response = await awaitWithSignal(api.http.fetch('/api/examples/list', { signal }), signal);
    throwIfAborted(signal);
    if (!response.ok) { ctx.fail(`Examples could not be listed: ${(await hostError(response)).message}`); return; }
    const data: unknown = await awaitWithSignal(response.json(), signal);
    const examples = (Array.isArray(data) ? data : []).map(parseExample).filter((example): example is Example => example !== null);
    const words = (typeof args.query === 'string' ? args.query : '').toLowerCase().split(/\s+/).filter(Boolean);
    const tag = typeof args.tag === 'string' ? args.tag.trim().toLowerCase() : '';
    const limit = typeof args.limit === 'number' && Number.isFinite(args.limit) ? Math.min(Math.max(Math.round(args.limit), 1), 50) : 10;
    const matches = examples.filter((example) => {
      const tags = exampleTags(example).map((value) => value.toLowerCase());
      if (tag && !tags.includes(tag)) return false;
      const haystack = [example.name, example.description, example.category, example.family ?? '', ...tags].join(' ').toLowerCase();
      return words.every((word) => haystack.includes(word));
    });
    const results = matches.slice(0, Math.min(limit, LIST_LIMIT)).map((example) => ({
      name: example.name, path: example.path, tags: exampleTags(example), node_count: example.node_count,
      description: oneLine(example.description).slice(0, 200),
    }));
    return { content: JSON.stringify({ total_matches: matches.length, results }), outcome: 'completed' };
  },
};
