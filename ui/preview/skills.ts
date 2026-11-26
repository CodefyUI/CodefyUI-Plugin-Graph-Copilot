/** An in-memory stand-in for the host's `/api/skills` and `/api/agent/context`
 * (CodefyUI with Agent Skills). Only the shapes the plugin reads. */

export interface MockSkillsOptions {
  /** `refused`: install and delete answer 403 as a non-loopback server does. */
  install?: 'ok' | 'refused';
  /** AGENTS.md content for the project, or none outside project mode. */
  instructions?: string | null;
}

interface MockSkill {
  id: string; name: string; source: string; description: string; enabled: boolean; body: string;
  files: Record<string, string>;
}

const builtin = (name: string, description: string, body: string, files: Record<string, string> = {}): MockSkill => ({
  id: `builtin/${name}`, name, source: 'builtin', description, enabled: true, body, files,
});

export const REMOTE_REFUSAL = {
  code: 'remote_install_refused',
  message: 'Installing and deleting skills is only allowed from the computer that runs the server. Set CODEFYUI_ALLOW_REMOTE_SKILL_INSTALL=1 to override.',
};

export function createMockSkills(options: MockSkillsOptions = {}) {
  const skills: MockSkill[] = [
    builtin('build-graph', 'Build or edit a CodefyUI graph: ports, the Start trigger, validation errors and auto layout.',
      '# Build a graph\n\n1. Look up exact schemas with `get_node_schemas`.\n2. Connect every required input.\n3. Read `references/ports.md` for port types.',
      { 'references/ports.md': '# Port types\n\nTENSOR, MODEL, DATASET and TRIGGER ports connect only to the same type.' }),
    builtin('train-and-evaluate', 'Train and evaluate a model with the standard TrainingLoop graph.', '# Train and evaluate\n\nSeed every run.'),
    builtin('run-experiments', 'Design parameter searches, ablations and multi-seed comparisons.', '# Run experiments\n\nOne change per variant.'),
  ];
  const summary = (skill: MockSkill) => ({
    id: skill.id, name: skill.name, description: skill.description, source: skill.source, license: null, compatibility: null,
    metadata: {}, allowed_tools: [], enabled: skill.enabled, valid: true, issues: [], shadowed_by: null,
    file_count: Object.keys(skill.files).length + 1, has_scripts: false,
  });
  const detail = (skill: MockSkill) => ({
    ...summary(skill), body: skill.body,
    files: [{ path: 'SKILL.md', kind: 'skill', size: skill.body.length },
      ...Object.entries(skill.files).map(([path, text]) => ({ path, kind: 'reference', size: text.length }))],
  });
  const byId = (id: string) => skills.find((skill) => skill.id === id);
  const instructions = options.instructions ?? null;

  /** Returns [status, body] for a skills route, or null when the URL is not one. */
  function handle(method: string, url: string, body: unknown): [number, unknown] | null {
    if (url === '/api/agent/context' && method === 'GET') {
      return [200, {
        project: instructions === null ? null : { dir: '/mock/project', name: 'mock-project', graphs: ['train'] },
        instructions: instructions === null ? null : { path: 'AGENTS.md', content: instructions, truncated: false },
        skills: skills.filter((skill) => skill.enabled).map((skill) => ({ id: skill.id, name: skill.name, description: skill.description, source: skill.source })),
      }];
    }
    if (url === '/api/skills' && method === 'GET') return [200, skills.map(summary)];
    if (url.startsWith('/api/skills/file?') && method === 'GET') {
      const query = new URLSearchParams(url.slice('/api/skills/file?'.length));
      const skill = byId(query.get('id') ?? '');
      const path = query.get('path') ?? '';
      if (!skill) return [404, { detail: 'No such skill.' }];
      if (path.includes('..') || path.startsWith('/')) return [400, { detail: `'${path}' is outside the skill.` }];
      if (path === 'SKILL.md') return [200, { path, content: skill.body, truncated: false }];
      return path in skill.files ? [200, { path, content: skill.files[path], truncated: false }] : [404, { detail: `No file '${path}' in ${skill.id}.` }];
    }
    if (url === '/api/skills/enabled' && method === 'PUT') {
      const { id, enabled } = body as { id: string; enabled: boolean };
      const skill = byId(id);
      if (!skill) return [404, { detail: `No skill '${id}'.` }];
      skill.enabled = enabled;
      return [200, summary(skill)];
    }
    if (url === '/api/skills/install' && method === 'POST') {
      if (options.install === 'refused') return [403, { detail: REMOTE_REFUSAL }];
      const skill: MockSkill = { id: 'user/lr-finder', name: 'lr-finder', source: 'user', description: 'Find a learning rate.', enabled: true, body: '# LR finder', files: {} };
      if (byId(skill.id)) return [409, { detail: { code: 'exists', message: 'lr-finder is already installed.' } }];
      skills.push(skill);
      return [200, { installed: [summary(skill)], skipped: [] }];
    }
    const match = /^\/api\/skills\/([a-z-]+\/[a-z0-9-]+)$/.exec(url);
    if (match && method === 'GET') {
      const skill = byId(match[1]);
      return skill ? [200, detail(skill)] : [404, { detail: `No skill '${match[1]}'.` }];
    }
    if (match && method === 'DELETE') {
      if (options.install === 'refused') return [403, { detail: REMOTE_REFUSAL }];
      const index = skills.findIndex((skill) => skill.id === match[1] && skill.source === 'user');
      if (index < 0) return [400, { detail: 'Only installed skills can be deleted.' }];
      skills.splice(index, 1);
      return [200, { deleted: match[1] }];
    }
    return null;
  }

  return { handle, inspect: () => skills.map((skill) => ({ id: skill.id, enabled: skill.enabled })) };
}

export type MockSkills = ReturnType<typeof createMockSkills>;
