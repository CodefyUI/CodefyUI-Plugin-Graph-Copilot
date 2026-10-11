import { defineConfig, devices } from '@playwright/test';

const uiRoot = __dirname;
const origin = 'http://127.0.0.1:4187';

export default defineConfig({
  testDir: './e2e',
  testMatch: '**/*.spec.ts',
  outputDir: './test-results',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: { timeout: 8_000 },
  reporter: [['list'], ['html', { outputFolder: 'playwright-report', open: 'never' }]],
  use: {
    baseURL: origin,
    headless: true,
    serviceWorkers: 'block',
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [{
    name: 'chromium',
    use: { ...devices['Desktop Chrome'], browserName: 'chromium' },
  }],
  // An occupied port is an error, never somebody else's app/test fixture.
  webServer: {
    command: 'pnpm preview:dev --port 4187',
    cwd: uiRoot,
    url: origin,
    reuseExistingServer: false,
    timeout: 30_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
