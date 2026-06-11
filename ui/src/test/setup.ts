// vitest setup file — imported before each test suite
import { expect, afterEach } from 'vitest';
import * as jestDomMatchers from '@testing-library/jest-dom/matchers';
import { cleanup } from '@testing-library/react';

// Extend vitest's expect with @testing-library/jest-dom matchers
expect.extend(jestDomMatchers);

// jsdom does not implement scrollIntoView — stub it so ChatView's
// useEffect(auto-scroll) doesn't throw in tests.
if (typeof window !== 'undefined') {
  window.HTMLElement.prototype.scrollIntoView = function () {};
}

// Clean up rendered components after each test to prevent DOM accumulation
// (RTL 16 / React 19: cleanup unmounts roots and resets the document)
afterEach(() => {
  cleanup();
});
