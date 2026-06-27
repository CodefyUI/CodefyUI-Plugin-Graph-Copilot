import { describe, it, expect, vi } from 'vitest';
import { waitFor } from '@testing-library/react';
import type { CodefyUIPluginAPI } from './types/codefyui';

import activate from './index';

function makeFakeApi(el: HTMLElement): CodefyUIPluginAPI {
  return {
    apiVersion: 1,
    pluginId: 'graph-copilot',
    ui: { addFloatingWidget: vi.fn().mockReturnValue(el), toast: vi.fn() },
    graph: {
      getGraph: vi.fn(),
      getNodeDefinitions: vi.fn(),
      applyOperations: vi.fn(),
      onGraphChanged: vi.fn().mockReturnValue(() => {}),
    },
    http: { fetch: vi.fn() },
    storage: { get: vi.fn().mockReturnValue(null), set: vi.fn(), remove: vi.fn() },
  } as unknown as CodefyUIPluginAPI;
}

describe('activate (plugin entry)', () => {
  it('requests a floating widget and mounts the Copilot app into it', async () => {
    const el = document.createElement('div');
    document.body.appendChild(el);
    const api = makeFakeApi(el);

    activate(api);

    expect(api.ui.addFloatingWidget).toHaveBeenCalledWith({ id: 'copilot' });
    await waitFor(() => {
      expect(el.querySelector('[aria-label="Graph Copilot"]')).toBeTruthy();
    });
  });
});
