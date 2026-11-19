import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { expect, test, type Browser, type Page } from '@playwright/test';
import { BASE_URL, signedIn, STATE_DIR, watchErrors, type Persona } from './support';

/**
 * Whole-site QA crawl (opt-in: QA_CRAWL=1). Breadth-first over same-origin links from a set of seeds, per role and
 * viewport, recording anything a visitor would see as broken. Findings go to e2e/.state/qa/<run>.json.
 *   QA_CRAWL=1 npx playwright test e2e/qa-crawl.spec.ts
 */
const RUNS: { as?: Persona; width: number }[] = [
  { width: 1366 },
  { width: 375 },
  { as: 'member', width: 1366 },
  { as: 'member', width: 375 },
  { as: 'president', width: 1366 },
  { as: 'superadmin', width: 1366 },
];
const LIMIT = Number(process.env.QA_LIMIT || 140);
const SEEDS = [
  '/',
  '/about/',
  '/vision/',
  '/blog/',
  '/events/',
  '/gallery/',
  '/newsroom/',
  '/jobs/',
  '/members/',
  '/businesses/',
  '/executive-committee/',
  '/batch-coordinators/',
  '/past-presidents/',
  '/bhamashah-pillars/',
  '/donations/',
  '/contact-us/',
  '/privacy_policy/',
  '/terms_condition/',
  '/president-message/',
  '/secretary-message/',
  '/principal-message/',
  '/student-hub/career-counselling/',
  '/student-hub/skillup-resources/',
  '/signin/',
  '/signup/',
  '/forgot-password/',
  '/profile/',
  '/profile/setup/',
  '/activity/',
  '/admin/',
  '/admin/pages/',
  '/billing/',
  '/transactions/',
  '/scholarships/',
  '/scholarships/new/',
  '/change-password/',
  '/security/',
  '/blog/new/',
  '/events/new/',
  '/jobs/new/',
  '/newsroom/new/',
];
// Links that sign out, leave the site or start an OAuth hop are not crawled.
const SKIP = /^\/(auth\/google|api\/|_next\/|_vercel\/)|logout|signout|\.(xml|json|txt|png|jpe?g|webp|svg|pdf)$/i;

type Finding = { url: string; kind: string; detail: string };

async function audit(page: Page, url: string, width: number, findings: Finding[]) {
  const errors = watchErrors(page);
  const failed: string[] = [];
  page.on('response', (r) => {
    const u = new URL(r.url());
    if (
      u.origin === BASE_URL &&
      r.status() >= 400 &&
      !u.pathname.startsWith('/_vercel/') &&
      r.request().resourceType() !== 'document'
    )
      failed.push(`${r.status()} ${u.pathname}`);
  });
  page.on('requestfailed', (r) => {
    const u = new URL(r.url());
    if (
      u.origin === BASE_URL &&
      !/ERR_ABORTED/.test(r.failure()?.errorText || '') &&
      !u.pathname.startsWith('/_vercel/')
    )
      failed.push(`failed ${u.pathname} ${r.failure()?.errorText}`);
  });
  const res = await page.goto(url, { waitUntil: 'networkidle', timeout: 60_000 }).catch((e) => {
    findings.push({ url, kind: 'navigation', detail: String(e).slice(0, 200) });
    return null;
  });
  await page.waitForTimeout(600);
  const status = res?.status() ?? 0;
  if (status >= 500 || (status >= 400 && status !== 404))
    findings.push({ url, kind: 'status', detail: String(status) });
  if (status === 404) findings.push({ url, kind: '404', detail: `linked page answers 404` });
  const state = await page
    .evaluate(() => ({
      crash: /Application error|Unhandled Runtime Error|Something went wrong|Internal Server Error/i.test(
        document.body.innerText
      ),
      broken: Array.from(document.images)
        .filter((i) => i.complete && i.naturalWidth === 0 && i.currentSrc && !i.currentSrc.startsWith('data:'))
        .map((i) => i.currentSrc.slice(0, 120)),
      overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      h1: document.querySelectorAll('h1').length,
      title: document.title,
      links: Array.from(document.querySelectorAll('a[href]')).map((a) => (a as HTMLAnchorElement).href),
    }))
    .catch(() => null);
  if (!state) return [];
  if (state.crash) findings.push({ url, kind: 'crash-text', detail: 'error screen text visible' });
  for (const b of state.broken) findings.push({ url, kind: 'broken-image', detail: b });
  if (width < 768 && state.overflow > 2) findings.push({ url, kind: 'h-overflow', detail: `${state.overflow}px` });
  if (!state.title) findings.push({ url, kind: 'no-title', detail: '' });
  for (const e of errors) findings.push({ url, kind: 'console', detail: e });
  for (const f of Array.from(new Set(failed))) findings.push({ url, kind: 'request', detail: f });
  return state.links;
}

async function crawl(browser: Browser, as: Persona | undefined, width: number) {
  const viewport = { width, height: width < 768 ? 812 : 900 };
  const context = as ? await signedIn(browser, as, { viewport }) : await browser.newContext({ viewport });
  const findings: Finding[] = [];
  const seen = new Set<string>();
  const queue = [...SEEDS];
  const visited: string[] = [];
  while (queue.length && visited.length < LIMIT) {
    const next = queue.shift()!;
    const key = next.replace(/[?#].*$/, '');
    if (seen.has(key)) continue;
    seen.add(key);
    visited.push(next);
    const page = await context.newPage();
    const links = await audit(page, next, width, findings);
    await page.close();
    for (const href of links) {
      const u = new URL(href);
      if (u.origin !== BASE_URL || SKIP.test(u.pathname)) continue;
      const p = u.pathname + u.search;
      // Same template, many ids: sample at most 3 per dynamic family.
      const family = u.pathname.replace(/\/[^/]+\/?$/, '/*');
      const famCount = Array.from(seen).filter((s) => s.replace(/\/[^/]+\/?$/, '/*') === family).length;
      if (!seen.has(u.pathname) && famCount < 3 + (SEEDS.includes(u.pathname) ? 1 : 0)) queue.push(p);
    }
  }
  await context.close();
  return { visited, findings };
}

for (const run of RUNS) {
  const name = `${run.as ?? 'signed-out'}-${run.width}`;
  test(`site crawl ${name}`, async ({ browser }) => {
    test.skip(!process.env.QA_CRAWL, 'set QA_CRAWL=1 to crawl');
    test.setTimeout(30 * 60_000);
    const { visited, findings } = await crawl(browser, run.as, run.width);
    const dir = path.join(STATE_DIR, 'qa');
    mkdirSync(dir, { recursive: true });
    writeFileSync(path.join(dir, `${name}.json`), JSON.stringify({ visited, findings }, null, 2));
    console.log(`${name}: ${visited.length} pages, ${findings.length} findings`);
    expect(visited.length).toBeGreaterThan(20);
  });
}
