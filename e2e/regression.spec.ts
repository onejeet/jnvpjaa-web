import { expect, test, type BrowserContext, type Page } from '@playwright/test';
import { signedIn, watchErrors } from './support';

// Things these changes touched indirectly: the restructured admin sections, the shared EditorShell, the top bar.
let context: BrowserContext;
let page: Page;

test.beforeEach(async ({ browser }) => {
  context = await signedIn(browser, 'superadmin');
  page = await context.newPage();
});
test.afterEach(async () => context.close());

const SECTIONS: [string, RegExp][] = [
  ['/admin/', /Admin Center/],
  ['/admin/access/', /Member access/],
  ['/admin/executive/', /Executive committee/],
  ['/admin/coordinators/', /Batch coordinators/],
  ['/admin/assignments/', /Current assignments/],
  ['/admin/settings/', /Settings/],
  ['/admin/scholarship/', /Scholarship/],
  ['/admin/pages/', /Pages/],
];

for (const [path, heading] of SECTIONS) {
  test(`admin ${path} renders its section with the matching nav item selected`, async () => {
    const errors = watchErrors(page);
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    await expect(page.getByRole('heading', { level: 1, name: heading })).toBeVisible();
    const current = page.getByRole('navigation', { name: 'Admin sections' }).locator('[aria-current="page"]');
    await expect(current).toHaveCount(1);
    await page.waitForLoadState('networkidle');
    await expect(page.getByText(/Something went wrong|Unexpected error/i)).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('unknown admin section never renders a section', async () => {
  for (const path of ['/admin/nope/', '/admin/__proto__/', '/admin/pages/vision/extra/']) {
    const res = await page.goto(path);
    if (res?.status() !== 404)
      await expect(page.getByText(/Page not found|You don't have access to this section/).first(), path).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save' })).toHaveCount(0);
  }
});

test('overview cards lead to every section', async () => {
  await page.goto('/admin/');
  await expect(page.getByRole('heading', { level: 1, name: /Admin Center/ })).toBeVisible();
  const cards = page.locator('a[href^="/admin/"]:not(nav a)');
  const hrefs = Array.from(new Set(await cards.evaluateAll((as) => as.map((a) => a.getAttribute('href')!))));
  expect(hrefs.length).toBeGreaterThanOrEqual(7);
  for (const href of hrefs) {
    const res = await page.goto(href);
    expect(res?.status(), href).toBe(200);
  }
});

test('sidebar navigation is client-side and keeps the shell', async () => {
  await page.goto('/admin/');
  const nav = page.getByRole('navigation', { name: 'Admin sections' });
  for (const label of ['Member access', 'Pages', 'Settings', 'Overview']) {
    await nav.getByRole('link', { name: label }).click();
    await expect(nav.locator('[aria-current="page"]')).toHaveText(new RegExp(label));
  }
  await expect(nav.getByRole('link', { name: /Newsroom/ })).toHaveAttribute('href', '/newsroom/');
});

test('the top bar offers the admin area to a president', async ({ browser }) => {
  const president = await signedIn(browser, 'president');
  const p = await president.newPage();
  await p.goto('/');
  await p.waitForLoadState('networkidle');
  // Admin Center lives in the avatar menu.
  await p.getByRole('img', { name: 'avatar' }).first().click();
  const entry = p.getByRole('menuitem', { name: 'Admin Center' });
  await expect(entry).toBeVisible();
  await entry.click();
  await expect(p).toHaveURL(/\/admin\/?$/);
  await president.close();
});

// EditorShell gained an `inset` mode; the default two-column layout of the other editors must be unchanged.
for (const path of ['/newsroom/new/', '/blog/new/', '/jobs/new/', '/events/new/']) {
  test(`${path} editor still renders in two columns on desktop`, async () => {
    const errors = watchErrors(page);
    const res = await page.goto(path);
    expect(res?.status()).toBe(200);
    const form = page
      .locator('form')
      .filter({ has: page.locator('header h1') })
      .first();
    await expect(form).toBeVisible();
    const columns = await form.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(2);
    expect(errors).toEqual([]);
  });
}

for (const path of ['/profile/', '/billing/', '/security/', '/activity/', '/members/', '/newsroom/', '/events/']) {
  test(`signed-in ${path} still loads cleanly`, async () => {
    const errors = watchErrors(page);
    const res = await page.goto(path);
    expect(res?.status()).toBeLessThan(400);
    await page.waitForLoadState('networkidle');
    expect(errors).toEqual([]);
  });
}
