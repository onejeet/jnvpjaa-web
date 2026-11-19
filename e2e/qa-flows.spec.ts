import { expect, test, type Page } from '@playwright/test';
import { API_URL, signedIn, watchErrors } from './support';

// Forms that would email someone are only exercised up to validation: any send is aborted and counted.
async function blockSends(page: Page, ops: RegExp) {
  const sent: string[] = [];
  await page.route(API_URL, (route) => {
    const query = route.request().postDataJSON?.()?.query ?? '';
    if (ops.test(query)) {
      sent.push(query.slice(0, 60));
      return route.abort();
    }
    return route.continue();
  });
  return sent;
}

test('sign-up refuses an empty form without contacting the server', async ({ page }) => {
  const errors = watchErrors(page);
  const sent = await blockSends(page, /\bsignup\s*\(/);
  await page.goto('/signup/');
  await page.getByRole('button', { name: 'Submit for approval' }).click();
  await expect(page.getByText('Required').first()).toBeVisible();
  expect(sent).toEqual([]);
  expect(errors).toEqual([]);
});

test('forgot-password validates the email before sending', async ({ page }) => {
  const errors = watchErrors(page);
  const sent = await blockSends(page, /\bforgotPassword\s*\(/);
  await page.goto('/forgot-password/');
  await page.getByRole('button', { name: 'Send reset link' }).click();
  expect(sent).toEqual([]);
  await page.getByLabel('Email address').fill('not-an-email');
  await page.getByRole('button', { name: 'Send reset link' }).click();
  expect(sent).toEqual([]);
  expect(errors).toEqual([]);
});

test('sign-in with an unknown account shows an error and stays on the page', async ({ page }) => {
  await page.goto('/signin/');
  await page.getByLabel(/email/i).fill('nobody@example.test');
  await page
    .getByLabel(/password/i)
    .first()
    .fill('wrong-password-123');
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page.getByRole('alert').filter({ hasText: /invalid email or password/i })).toBeVisible();
  expect(new URL(page.url()).pathname).toBe('/signin/');
});

test('member directory search filters without errors', async ({ browser }) => {
  const context = await signedIn(browser, 'member');
  const page = await context.newPage();
  const errors = watchErrors(page);
  await page.goto('/members/', { waitUntil: 'networkidle' });
  const search = page.getByPlaceholder('Search by Name...');
  await search.fill('zzqx-no-such-member');
  await page.waitForTimeout(1200);
  await expect(page.getByText('No data is available.')).toBeVisible();
  await search.fill('');
  await page.waitForTimeout(1200);
  expect(errors).toEqual([]);
  await context.close();
});
