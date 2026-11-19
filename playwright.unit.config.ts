import { defineConfig } from '@playwright/test';

/** Plain unit tests (`*.unit.ts`) on Playwright's runner: no browser, no servers, no personas. */
export default defineConfig({
  testDir: './src',
  testMatch: /\.unit\.ts$/,
  reporter: 'list',
  tsconfig: './tsconfig.unit.json',
});
