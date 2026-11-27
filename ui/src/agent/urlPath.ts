/** Building URL paths from strings the model or the host supplied (SEC6).
 *
 * `encodeURIComponent` leaves `.` and `..` as they are, and the browser
 * normalises `/api/skills/user/..` to `/api/skills` before the request
 * leaves; it also does nothing about an empty segment. Every value placed in
 * a path goes through `pathSegment`, which refuses those outright instead of
 * trying to repair them. Query parameters use URLSearchParams instead. */

export class UnsafePathSegment extends Error {
  constructor(value: string) {
    super(`"${value.slice(0, 80)}" cannot be used in a URL path.`);
    this.name = 'UnsafePathSegment';
  }
}

// `/` and `\` (separators), `?` and `#` (end the path), control characters.
// eslint-disable-next-line no-control-regex
const FORBIDDEN = /[/\\?#\u0000-\u001f\u007f]/;

/** One encoded path segment, or an UnsafePathSegment error. */
export function pathSegment(value: unknown): string {
  if (typeof value !== 'string') throw new UnsafePathSegment(String(value));
  if (value === '' || value === '.' || value === '..' || FORBIDDEN.test(value)) throw new UnsafePathSegment(value);
  return encodeURIComponent(value);
}

/** `a/b` → each part checked and encoded (skill ids are `source/name`). */
export function pathSegments(value: unknown): string {
  if (typeof value !== 'string') throw new UnsafePathSegment(String(value));
  return value.split('/').map(pathSegment).join('/');
}
