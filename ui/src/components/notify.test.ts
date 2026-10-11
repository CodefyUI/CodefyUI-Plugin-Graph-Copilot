import { afterEach, describe, expect, it, vi } from 'vitest';
import { maybeRequestNotificationPermission, notifyRunFinished } from './notify';
import { DEFAULT_SETTINGS } from '../state/settings';

function installNotification(permission: NotificationPermission) {
  const constructed: Array<{ title: string; options?: { body?: string } }> = [];
  class FakeNotification {
    static permission = permission;
    static requestPermission = vi.fn(async () => permission);
    onclick: (() => void) | null = null;
    close = vi.fn();
    constructor(title: string, opts?: { body?: string }) {
      constructed.push({ title, options: opts });
    }
  }
  vi.stubGlobal('Notification', FakeNotification);
  return { constructed, FakeNotification };
}
function setHidden(hidden: boolean) {
  Object.defineProperty(document, 'hidden', { value: hidden, configurable: true });
}
afterEach(() => { vi.unstubAllGlobals(); setHidden(false); });

describe('notifyRunFinished', () => {
  it('fires only when enabled + granted + hidden', () => {
    const { constructed } = installNotification('granted');
    setHidden(true);
    notifyRunFinished(DEFAULT_SETTINGS, { runId: 'abcdef123456', status: 'complete', detail: 'val_loss 2.95' });
    expect(constructed).toEqual([{ title: 'Graph run complete', options: { body: 'val_loss 2.95 · run abcdef12' } }]);
  });
  it('passes undefined options when body is empty (conditional variant)', () => {
    const { constructed } = installNotification('granted');
    setHidden(true);
    notifyRunFinished(DEFAULT_SETTINGS, { status: 'complete' });
    expect(constructed).toEqual([{ title: 'Graph run complete', options: undefined }]);
  });
  it('stays silent when the tab is visible', () => {
    const { constructed } = installNotification('granted');
    setHidden(false);
    notifyRunFinished(DEFAULT_SETTINGS, { status: 'complete' });
    expect(constructed).toHaveLength(0);
  });
  it('stays silent when permission is not granted or the setting is off', () => {
    const { constructed } = installNotification('denied');
    setHidden(true);
    notifyRunFinished(DEFAULT_SETTINGS, { status: 'complete' });
    notifyRunFinished({ ...DEFAULT_SETTINGS, notifyOnRunCompletion: false }, { status: 'complete' });
    expect(constructed).toHaveLength(0);
  });
  it('is a no-op when Notification does not exist', () => {
    setHidden(true);
    expect(() => notifyRunFinished(DEFAULT_SETTINGS, { status: 'complete' })).not.toThrow();
  });
});

describe('maybeRequestNotificationPermission', () => {
  it('requests only from the default state with the setting on', () => {
    const { FakeNotification } = installNotification('default');
    maybeRequestNotificationPermission(DEFAULT_SETTINGS);
    expect(FakeNotification.requestPermission).toHaveBeenCalledTimes(1);
    maybeRequestNotificationPermission({ ...DEFAULT_SETTINGS, notifyOnRunCompletion: false });
    expect(FakeNotification.requestPermission).toHaveBeenCalledTimes(1);
  });
  it('does not request when already granted or denied', () => {
    const { FakeNotification } = installNotification('granted');
    maybeRequestNotificationPermission(DEFAULT_SETTINGS);
    expect(FakeNotification.requestPermission).not.toHaveBeenCalled();
  });
});
