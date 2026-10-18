// vitest setup file — imported before each test suite
import { expect, afterEach } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

// React 19 needs the same act environment for direct act() and RTL helpers.
(globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean })
  .IS_REACT_ACT_ENVIRONMENT = true;

// Extend vitest's expect with @testing-library/jest-dom matchers
expect.extend(jestDomMatchers);

// jsdom does not implement scrollIntoView — stub it so ChatView's
// useEffect(auto-scroll) doesn't throw in tests.
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView = function () {};
  // Model only the open state in jsdom; real modal focus/inertness is exercised
  // in Chromium, not inferred from these stubs.
  window.HTMLDialogElement.prototype.showModal = function () { this.setAttribute('open', ''); };
  window.HTMLDialogElement.prototype.close = function () { this.removeAttribute('open'); };
}

// Clean up rendered components after each test to prevent DOM accumulation
// (RTL 16 / React 19: cleanup unmounts roots and resets the document)
afterEach(() => {
  cleanup();
});
