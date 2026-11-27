import './styles.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { CodefyUIPluginAPI, PluginPanelBadge } from './types/codefyui';
import { CopilotApp, type HostMount } from './components/CopilotApp';

const PANEL_ID = 'copilot';
const PANEL_TITLE = 'Copilot';
// The toolbar toggle's glyph (the host shows a short text glyph).
const PANEL_ICON = '◇';

/** The host's side dock (apiVersion 6), else the floating widget every host has. */
export function mountFor(api: CodefyUIPluginAPI): { element: HTMLElement; mount: HostMount } {
  if (api.apiVersion >= 6 && typeof api.ui.addPanel === 'function') {
    const listeners = new Set<(visible: boolean) => void>();
    let visible = false;
    const notify = (next: boolean) => { visible = next; listeners.forEach((listener) => listener(next)); };
    const options = {
      id: PANEL_ID, title: PANEL_TITLE, icon: PANEL_ICON, dock: 'side' as const, side: { defaultWidth: 400 },
      onShow: () => notify(true), onHide: () => notify(false),
    };
    const element = api.ui.addPanel(options);
    let badge: PluginPanelBadge | null = null;
    return {
      element,
      mount: {
        kind: 'side',
        isVisible: () => visible || element.isConnected,
        onVisibility(listener) { listeners.add(listener); return () => { listeners.delete(listener); }; },
        setBadge(next) {
          if (next === badge) return;
          badge = next;
          // Same id again updates the options; the element is kept.
          api.ui.addPanel!({ ...options, badge: next });
        },
      },
    };
  }
  return { element: api.ui.addFloatingWidget({ id: PANEL_ID }), mount: { kind: 'floating' } };
}

export default function activate(api: CodefyUIPluginAPI): void {
  const { element, mount } = mountFor(api);
  // The gcp-root class lives on the CopilotApp root div, rendered into the
  // element provided by the host.
  createRoot(element).render(
    <React.StrictMode>
      <CopilotApp api={api} mount={mount} />
    </React.StrictMode>,
  );
}
