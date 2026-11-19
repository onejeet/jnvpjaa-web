import { readFileSync } from 'fs';
import { expect, test } from '@playwright/test';
import { SLUGS, SNAPSHOT_FILE, watchErrors, type StoredPage } from './support';

// Anonymous visitors: the seven moved pages must look and behave as before, and the rest of the site must be intact.
// Broken before these changes and untouched by them; reported separately rather than hidden.
const KNOWN_BROKEN = ['/student-hub/career-counselling/'];
const snapshot = (): StoredPage[] => JSON.parse(readFileSync(SNAPSHOT_FILE, 'utf8'));
const stripTags = (html: string) =>
  html
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/\s+/g, ' ')
    .trim();

for (const slug of SLUGS) {
  test(`public /${slug} renders its stored content without errors`, async ({ page }) => {
    const stored = snapshot().find((p) => p.slug === slug)!;
    const errors = watchErrors(page);
    const response = await page.goto(`/${slug}/`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1').first()).toContainText(stored.fields.heading.trim());

    // A recognisable line of the body text proves the stored copy is what renders, not a fallback.
    const body: string | undefined = stored.fields.body || stored.fields.sections?.[0]?.body || stored.fields.intro;
    if (body) await expect(page.locator('main, body').first()).toContainText(stripTags(body).slice(0, 40));

    await expect(page).toHaveTitle(/\S/);
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description?.trim().length).toBeGreaterThan(20);
    const canonical = await page
      .locator('link[rel="canonical"]')
      .getAttribute('href')
      .catch(() => null);
    if (canonical) expect(canonical).toContain(slug);
    expect(errors).toEqual([]);
  });
}

test('message pages show the signer and photo with alt text', async ({ page }) => {
  for (const slug of ['president-message', 'principal-message', 'secretary-message'] as const) {
    const stored = snapshot().find((p) => p.slug === slug)!;
    await page.goto(`/${slug}/`);
    if (stored.fields.signerName) await expect(page.getByText(stored.fields.signerName).first()).toBeVisible();
    if (stored.fields.photo) {
      // The page has a phone copy and a desktop copy of the photo; check the one on screen.
      const img = page.locator(`img[alt="${stored.fields.photo.alt}"]:visible`).first();
      await expect(img).toBeVisible();
      expect(await img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0)).toBe(true);
    }
  }
});

test('past presidents table lists every visible person and exposes no email address', async ({ page }) => {
  const stored = snapshot().find((p) => p.slug === 'past-presidents')!;
  const visibleGroups = new Set(stored.fields.groups.filter((g: any) => g.visible).map((g: any) => g.key));
  const people = stored.fields.people.filter((p: any) => visibleGroups.has(p.group));
  await page.goto('/past-presidents/');
  const grid = page.getByRole('grid');
  await expect(grid).toBeVisible();
  await expect(grid).toContainText(people[0].name);
  // The grid virtualises, so count what it reports rather than what is painted.
  const rowCount = await grid.getAttribute('aria-rowcount');
  expect(Number(rowCount) - 1).toBe(people.length);
  expect(await grid.innerText()).not.toMatch(/[\w.+-]+@[\w-]+\.[\w.]+/);
});

test('bhamashah pillars shows each visible group with its people or empty text', async ({ page }) => {
  const stored = snapshot().find((p) => p.slug === 'bhamashah-pillars')!;
  await page.goto('/bhamashah-pillars/');
  for (const group of stored.fields.groups.filter((g: any) => g.visible)) {
    await expect(page.getByRole('heading', { name: group.label.trim() })).toBeVisible();
    const members = stored.fields.people.filter((p: any) => p.group === group.key);
    if (members.length) await expect(page.getByText(members[0].name).first()).toBeVisible();
    else if (group.emptyText) await expect(page.getByText(group.emptyText.slice(0, 30))).toBeVisible();
  }
});

test('about and vision keep their structured data', async ({ page }) => {
  for (const slug of ['about', 'vision']) {
    await page.goto(`/${slug}/`);
    const ld = await page.locator('script[type="application/ld+json"]').allTextContents();
    expect(ld.some((json) => /"@type"\s*:\s*"(WebPage|AboutPage)"/.test(json))).toBe(true);
  }
});

test.describe('phone width', () => {
  test.use({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  for (const slug of SLUGS) {
    test(`/${slug} has no horizontal scroll at 375px`, async ({ page }) => {
      await page.goto(`/${slug}/`);
      await page.waitForLoadState('networkidle');
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(1);
    });
  }
});

test('footer links to the moved pages all resolve', async ({ page, request }) => {
  await page.goto('/');
  const hrefs = await page
    .locator('footer a[href^="/"]')
    .evaluateAll((links) => Array.from(new Set(links.map((a) => (a as HTMLAnchorElement).getAttribute('href')!))));
  expect(hrefs.length).toBeGreaterThan(3);
  for (const href of hrefs.filter((h) => !KNOWN_BROKEN.includes(h))) {
    const res = await request.get(href, { maxRedirects: 5 });
    expect(res.status(), href).toBeLessThan(400);
  }
});

test('every internal link on the home page still resolves (site smoke)', async ({ page, request }) => {
  test.setTimeout(240_000);
  await page.goto('/');
  await page.waitForLoadState('networkidle');
  const hrefs = await page
    .locator('a[href^="/"]')
    .evaluateAll((links) =>
      Array.from(
        new Set(links.map((a) => (a as HTMLAnchorElement).getAttribute('href')!.split('#')[0]).filter(Boolean))
      )
    );
  const broken: string[] = [];
  for (const href of hrefs.filter((h) => !/^\/(auth|api)\//.test(h) && !KNOWN_BROKEN.includes(h)).slice(0, 80)) {
    const res = await request.get(href, { maxRedirects: 5 });
    if (res.status() >= 400) broken.push(`${href} → ${res.status()}`);
  }
  expect(broken).toEqual([]);
});

// A missing (or unpublished) post is a 404, not a server error: crawlers drop 404s but retry and flag 5xx.
for (const url of [
  '/blog/qa-missing-post/',
  '/events/999999/',
  '/newsroom/qa-missing-post/',
  '/gallery/qa-missing-album/',
  '/jobs/qa-missing-job/',
]) {
  test(`missing content ${url} answers 404`, async ({ request }) => {
    expect((await request.get(url)).status()).toBe(404);
  });
}
