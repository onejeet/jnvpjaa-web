import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { expect, test, type APIRequestContext, type Page } from '@playwright/test';

// JNVPJAA must render exactly as before the tenant-config migration.
// E2E_CAPTURE_BASELINE=1 records the current output; otherwise every key is compared with the record.
const BASELINE = path.join(__dirname, 'tenant-baseline.json');
const CAPTURE = process.env.E2E_CAPTURE_BASELINE === '1';
const PATHS = [
  '/',
  '/about/',
  '/vision/',
  '/president-message/',
  '/events/',
  '/contact-us/',
  '/privacy_policy/',
  '/terms_condition/',
  '/members/',
  '/jobs/',
  '/scholarships/',
];

const collapse = (s: string) => s.replace(/\s+/g, ' ').trim();

async function head(page: Page) {
  return page.evaluate(() => {
    const metas = Array.from(document.head.querySelectorAll('meta'))
      .map((m) => [m.getAttribute('name') || m.getAttribute('property') || '', m.getAttribute('content') || ''])
      .filter(([k]) => k)
      .sort((a, b) => (a.join('|') < b.join('|') ? -1 : 1));
    const links = Array.from(
      document.head.querySelectorAll('link[rel="canonical"],link[rel="manifest"],link[rel~="icon"],link[rel="apple-touch-icon"]')
    )
      .map((l) => [l.getAttribute('rel'), l.getAttribute('href'), l.getAttribute('sizes') || ''])
      .sort((a, b) => (a.join('|') < b.join('|') ? -1 : 1));
    const ldJson = Array.from(document.querySelectorAll('script[type="application/ld+json"]')).map((s) =>
      JSON.parse(s.textContent || 'null')
    );
    return { title: document.title, metas, links, ldJson };
  });
}

// Dev pages keep sockets open (HMR, polling), so wait for the footer instead of network idle.
async function settle(page: Page, p: string) {
  await page.goto(p, { waitUntil: 'load' });
  await page.locator('header').first().waitFor();
  // Some pages (e.g. members when signed out) have no footer.
  await page.locator('footer').first().waitFor({ timeout: 10_000 }).catch(() => {});
  await page.waitForTimeout(1500);
}

async function capture(page: Page, request: APIRequestContext) {
  const out: Record<string, unknown> = {};
  for (const p of PATHS) {
    await settle(page, p);
    out[p] = {
      ...(await head(page)),
      headerText: collapse(await page.locator('header').first().innerText()),
      footerText: (await page.locator('footer').count())
        ? collapse(await page.locator('footer').first().innerText())
        : null,
    };
  }
  const manifest = await request.get('/manifest.json');
  // Before the migration the route 500s in dev (duplicate public/ and app/ file, identical content); record the file.
  out.manifest =
    manifest.ok()
      ? await manifest.json()
      : !CAPTURE
        ? { status: manifest.status() }
        : JSON.parse(readFileSync(path.join(__dirname, '../public/manifest.json'), 'utf8'));
  out.robots = await (await request.get('/robots.txt')).text();
  const sitemap = await (await request.get('/sitemap.xml')).text();
  out.sitemap = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), (m) => m[1]).sort();
  await settle(page, '/');
  out.colours = await page.evaluate(() => {
    const style = (el: Element | null) =>
      el ? { color: getComputedStyle(el).color, background: getComputedStyle(el).backgroundColor } : null;
    return {
      primaryButton: style(document.querySelector('.MuiButton-containedPrimary')),
      headerLink: style(document.querySelector('header a')),
    };
  });
  return out;
}

test('JNVPJAA renders identically to the pre-migration baseline', async ({ page, request }) => {
  test.setTimeout(300_000);
  const actual = await capture(page, request);
  if (CAPTURE) {
    writeFileSync(BASELINE, JSON.stringify(actual, null, 2));
    return;
  }
  expect(existsSync(BASELINE), 'run once with E2E_CAPTURE_BASELINE=1 before changing anything').toBe(true);
  const baseline = JSON.parse(readFileSync(BASELINE, 'utf8'));
  for (const key of Object.keys(baseline)) expect.soft(actual[key], key).toEqual(baseline[key]);
});
