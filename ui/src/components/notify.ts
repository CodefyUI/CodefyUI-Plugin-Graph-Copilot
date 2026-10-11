/**
 * notify — browser notifications for long graph runs (#22).
 *
 * Fired only when the user is away (hidden tab), the setting is on, and the
 * browser granted permission. Permission is requested lazily from the run-
 * approval click, which is a user gesture, so the prompt never appears
 * unprompted.
 */

import type { Settings } from '../state/settings';

function enabled(settings: Settings): boolean {
  return settings.notifyOnRunCompletion !== false && typeof Notification !== 'undefined';
}

export function maybeRequestNotificationPermission(settings: Settings): void {
  if (!enabled(settings)) return;
  if (Notification.permission === 'default') {
    void Notification.requestPermission();
  }
}

export function notifyRunFinished(
  settings: Settings,
  info: { runId?: string; status: string; detail?: string },
): void {
  if (!enabled(settings)) return;
  if (Notification.permission !== 'granted') return;
  if (typeof document === 'undefined' || !document.hidden) return;
  const body = [info.detail, info.runId ? `run ${info.runId.slice(0, 8)}` : '']
    .filter(Boolean)
    .join(' · ');
  try {
    const notification = new Notification(`Graph run ${info.status}`, body ? { body } : undefined);
    notification.onclick = () => {
      try { window.focus(); } catch { /* focus can be refused */ }
      notification.close();
    };
  } catch {
    // Some platforms throw from the constructor (e.g. Android Chrome).
  }
}
