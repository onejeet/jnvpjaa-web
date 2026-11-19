import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';
import { test, type Browser } from '@playwright/test';
import { signedIn, type Persona } from './support';

/**
 * Migration evidence, not a regression test: screenshots of key pages at desktop and phone width plus a
 * per-page count of hydration errors. Runs only when CAPTURE_DIR is set, e.g.
 *   CAPTURE_DIR=docs/superpowers/migration/baseline npx playwright test e2e/capture-screens.spec.ts
 */
const DIR = process.env.CAPTURE_DIR;
const PAGES: { name: string; url: string; as?: Persona }[] = [
  { name: 'home', url: '/' },
  { name: 'blog-post', url: '/blog/navodaya-a-journey-from-dreams-to-destiny/' },
  { name: 'newsroom', url: '/newsroom/' },
  { name: 'events', url: '/events/' },
  { name: 'gallery', url: '/gallery/' },
  { name: 'signin', url: '/signin/' },
  { name: 'profile', url: '/profile/', as: 'member' },
  { name: 'admin', url: '/admin/', as: 'president' },
  { name: 'blog-new', url: '/blog/new/', as: 'member' },
];
const SIZES = [
  { width: 1366, height: 900 },
  { width: 375, height: 812 },
];

const contextFor = (browser: Browser, as: Persona | undefined, viewport: { width: number; height: number }) =>
  as ? signedIn(browser, as, { viewport }) : browser.newContext({ viewport });

test('capture screenshots and hydration errors', async ({ browser }) => {
  test.skip(!DIR, 'set CAPTURE_DIR to capture');
  test.setTimeout(300_000);
  const shots = path.join(DIR!, 'screens');
  mkdirSync(shots, { recursive: true });
  const hydration: Record<string, number> = {};
  for (const size of SIZES) {
    for (const p of PAGES) {
      const context = await contextFor(browser, p.as, size);
      const page = await context.newPage();
      let count = 0;
      const isHydration = (t: string) =>
        /hydrat|did not match|server rendered HTML|Minified React error #(418|419|421|422|423|425)\b/i.test(t);
      page.on('console', (m) => m.type() === 'error' && isHydration(m.text()) && count++);
      page.on('pageerror', (e) => isHydration(e.message) && count++);
      await page.goto(p.url, { waitUntil: 'networkidle' }).catch(() => undefined);
      await page.waitForTimeout(1000);
      await page.screenshot({ path: path.join(shots, `${p.name}-${size.width}.png`), fullPage: false });
      hydration[`${p.name}-${size.width}`] = count;
      await context.close();
    }
  }
  writeFileSync(path.join(DIR!, 'hydration.json'), JSON.stringify(hydration, null, 2));
});
