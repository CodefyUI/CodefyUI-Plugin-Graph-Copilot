import { currentLocale, translate } from '../i18n';
import { en, type MessageKey } from '../i18n/en';

/** A host run status word in the panel's language; unknown statuses stay as sent. */
export function runStatusWord(status: string): string {
  const key = `runstatus.${status}` as MessageKey;
  return key in en ? translate(currentLocale(), key) : status;
}
