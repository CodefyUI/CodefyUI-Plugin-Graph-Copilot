/** A tool registry: the only place the loop learns which tools exist, which
 * are sent to the model, and how each one runs. */
import type { ToolDefinition, ToolEnvironment, WireTool } from './types';

export interface ToolRegistry {
  register(tool: ToolDefinition): void;
  get(name: string): ToolDefinition | undefined;
  /** Every registered tool, in registration order. */
  all(): ToolDefinition[];
  /** The tools for this turn: Ask mode keeps only read-only ones, and a tool
   * whose `available` says no is left out. */
  list(opts: { mode: ToolEnvironment['mode']; env?: ToolEnvironment }): ToolDefinition[];
}

export function isAvailable(tool: ToolDefinition, env?: ToolEnvironment): boolean {
  if (!tool.available) return true;
  if (!env) return false;
  try { return tool.available(env) === true; } catch { return false; }
}

export function createToolRegistry(tools: ToolDefinition[] = []): ToolRegistry {
  const byName = new Map<string, ToolDefinition>();
  const registry: ToolRegistry = {
    register(tool) {
      if (byName.has(tool.name)) throw new Error(`Tool already registered: ${tool.name}`);
      byName.set(tool.name, tool);
    },
    get: (name) => byName.get(name),
    all: () => [...byName.values()],
    list({ mode, env }) {
      return registry.all().filter((tool) => (mode !== 'ask' || tool.readOnly) && isAvailable(tool, env));
    },
  };
  tools.forEach((tool) => registry.register(tool));
  return registry;
}

export function toWire(tool: ToolDefinition): WireTool {
  return { name: tool.name, description: tool.description, input_schema: tool.input_schema };
}
