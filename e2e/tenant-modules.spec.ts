import { expect, test } from '@playwright/test';

// Run against a dev server whose tenant has one module switched off, e.g.
// E2E_DISABLED_MODULE=jobs E2E_BASE_URL=http://localhost:3891 (server started with a scratch TENANT whose features.jobs=false).
const MODULE = process.env.E2E_DISABLED_MODULE;
const ROUTES: Record<string, string[]> = { jobs: ['/jobs/', '/jobs/new/', '/jobs/x/applicants/'] };

test.skip(!MODULE, 'set E2E_DISABLED_MODULE to run');

test('a disabled module 404s on every route and disappears from header and footer', async ({ page, request }) => {
  test.setTimeout(240_000);
  for (const route of ROUTES[MODULE!]) {
    expect((await request.get(route)).status(), route).toBe(404);
  }
  await page.goto('/');
  await page.locator('footer').first().waitFor();
  const root = ROUTES[MODULE!][0].replace(/\/$/, '');
  // Header dropdowns render only when opened; open the one that holds Jobs for JNVPJAA.
  await page.locator('header').getByText('Alumni Center', { exact: true }).first().hover();
  await expect(page.getByRole('link', { name: /Member Directory/ }).first()).toBeVisible();
  expect(await page.locator(`a[href^="${root}"]`).count()).toBe(0);
  // Sibling modules still work.
  expect((await request.get('/events/')).status()).toBe(200);
});
