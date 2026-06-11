import './styles.css';
import React from 'react';
import { createRoot } from 'react-dom/client';
import type { CodefyUIPluginAPI } from './types/codefyui';
import { CopilotApp } from './components/CopilotApp';

export default function activate(api: CodefyUIPluginAPI): void {
  const el = api.ui.addFloatingWidget({ id: 'copilot' });

  // The gcp-root class lives on the CopilotApp root div (position: relative),
  // rendered into the element provided by the host.
  createRoot(el).render(
    <React.StrictMode>
      <CopilotApp api={api} />
    </React.StrictMode>,
  );
}
