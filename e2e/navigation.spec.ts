import { expect, test, type APIRequestContext } from '@playwright/test';
import { watchErrors } from './support';

// Direct loads render on the server with their data; in-app navigation commits at once with an in-page skeleton
// and streams the data in (DeferOnNavigation), without loading.tsx.
const DEFERRED = [
  '/about/',
  '/vision/',
  '/president-message/',
  '/principal-message/',
  '/secretary-message/',
  '/past-presidents/',
  '/bhamashah-pillars/',
  '/batch-coordinators/',
  '/businesses/',
  '/newsroom/',
  '/jobs/',
];
const NAV_HEADERS = { RSC: '1', 'sec-fetch-dest': 'empty' };

// First detail link on a listing page, so detail routes are covered when the test database has content.
async function firstDetail(request: APIRequestContext, listing: string) {
  const html = await (await request.get(listing)).text();
  const match = html.match(new RegExp(`href="(${listing}(?!new/)[^"/?#.]+/?)"`));
  return match?.[1];
}

test('deferred pages stream a skeleton on navigation and full HTML on direct load', async ({ request }) => {
  const urls = [...DEFERRED];
  for (const listing of ['/gallery/', '/newsroom/']) {
    const detail = await firstDetail(request, listing);
    if (detail) urls.push(detail);
  }
  for (const url of urls) {
    const nav = await (await request.get(url, { headers: NAV_HEADERS })).text();
    expect(nav, `${url} navigation payload has a skeleton`).toContain('"aria-busy":"true"');
    const direct = await request.get(url, { headers: { 'sec-fetch-dest': 'document' } });
    expect(direct.status(), url).toBe(200);
    expect(await direct.text(), `${url} direct load has no skeleton`).not.toContain('aria-label="Loading page"');
  }
});

test('a missing job is a 404 on direct load and the not-found page on navigation', async ({ page, request }) => {
  expect((await request.get('/jobs/qa-missing-job/', { headers: { 'sec-fetch-dest': 'document' } })).status()).toBe(
    404
  );
  await page.goto('/jobs/', { waitUntil: 'networkidle' });
  await page.evaluate(() => (window as any).next.router.push('/jobs/qa-missing-job/'));
  await expect(page.locator('meta[name="robots"][content*="noindex"]').first()).toBeAttached();
});

test('client navigation reaches every deferred page without errors', async ({ page }) => {
  test.setTimeout(180_000);
  const errors = watchErrors(page);
  await page.goto('/', { waitUntil: 'networkidle' });
  for (const url of DEFERRED) {
    await page.evaluate((u) => (window as any).next.router.push(u), url);
    await page.waitForURL(`**${url}`);
    await expect(page.locator('[aria-label="Loading page"]')).toHaveCount(0);
    await expect(page.locator('h1').first(), url).toBeVisible();
  }
  expect(errors).toEqual([]);
});
