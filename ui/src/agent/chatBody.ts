/** The request body for one model call, and small helpers the loop and the
 * tools share. */
import type { ChatBody, WireMessage } from '../llm/client';
import type { Settings } from '../state/settings';
import { activeReasoningEffort } from '../state/settings';
import type { WireTool } from './tools/types';

/** Swallow observer errors, including accidental async callback rejections.
 * No observer can lose an already captured receipt or strand a run. */
export function observe(fn: () => unknown): void {
  try { void Promise.resolve(fn()).catch(() => {}); } catch { /* observers are not execution */ }
}

export function copy<T>(value: T): T { return JSON.parse(JSON.stringify(value)) as T; }

export function buildChatBody(settings: Settings, messages: WireMessage[], tools: WireTool[], maxTokens = 8192): ChatBody {
  const provider = settings.provider;
  const body: ChatBody = {
    provider, model: settings.models[provider] ?? '', messages: copy(messages), tools, max_tokens: maxTokens,
  };
  if (provider !== 'openai-codex' && settings.apiKeys[provider]) body.api_key = settings.apiKeys[provider];
  if (provider === 'custom' && settings.customBaseUrl) body.base_url = settings.customBaseUrl;
  const effort = activeReasoningEffort(settings);
  if (effort) body.reasoning_effort = effort;
  return body;
}
