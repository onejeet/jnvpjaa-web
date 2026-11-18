import { defineConfig, devices } from '@playwright/test';

/**
 * End-to-end suite for the local dev stack (web on :3890, API on :4000).
 * Run: `npm run test:e2e` after creating personas (see e2e/README.md).
 * Tests share one database, so they run one at a time and every content change is restored in teardown.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  workers: 1,
  retries: 0,
  timeout: 90_000,
  expect: { timeout: 20_000 },
  reporter: [['list'], ['html', { open: 'never', outputFolder: 'e2e/.state/report' }]],
  outputDir: 'e2e/.state/results',
  globalSetup: './e2e/global-setup.ts',
  globalTeardown: './e2e/global-teardown.ts',
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:3890',
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    navigationTimeout: 60_000,
    // Reuse an installed Chromium instead of downloading one (set E2E_CHROMIUM to its binary).
    launchOptions: process.env.E2E_CHROMIUM ? { executablePath: process.env.E2E_CHROMIUM } : {},
  },
  projects: [{ name: 'chromium', use: { ...devices['Desktop Chrome'], viewport: { width: 1366, height: 900 } } }],
});
