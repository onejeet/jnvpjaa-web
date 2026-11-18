import { expect, test, type BrowserContext, type Page } from '@playwright/test';
import { getPage, LABELS, openEditor, restorePage, signedIn, SLUGS, watchErrors, type Slug } from './support';

// The editor as a President uses it. Every test that saves restores the page afterwards.
let context: BrowserContext;
let page: Page;
const touched = new Set<Slug>();

test.beforeEach(async ({ browser }) => {
  context = await signedIn(browser, 'president');
  page = await context.newPage();
});

test.afterEach(async () => {
  await context.close();
  for (const slug of Array.from(touched)) await restorePage(slug);
  touched.clear();
});

const field = (name: string) => page.locator(`[id="${name}"]`);
const saveButton = () => page.getByRole('button', { name: 'Save' });

async function save(expected = /Saved\./) {
  await expect(saveButton()).toBeEnabled();
  await saveButton().click();
  await expect(page.getByText(expected).first()).toBeVisible();
}

test('pages index lists the seven pages in order with their state', async () => {
  const errors = watchErrors(page);
  await page.goto('/admin/pages/');
  // Scope to the index list: the footer also links to the public pages by the same names.
  const list = page.locator('a[href^="/admin/pages/"]');
  for (const slug of SLUGS) await expect(list.getByText(LABELS[slug], { exact: true })).toBeVisible();
  const order = await list.allInnerTexts();
  const mainOrder = order.map((t) => t.trim()).filter((t) => Object.values(LABELS).includes(t));
  expect(mainOrder.slice(-7)).toEqual(SLUGS.map((s) => LABELS[s]));
  await expect(page.getByText('Shown', { exact: true })).toHaveCount(7);
  expect(errors).toEqual([]);
});

for (const slug of SLUGS) {
  test(`${slug}: opens with nothing unsaved and no errors`, async () => {
    const errors = watchErrors(page);
    await openEditor(page, slug);
    // Give the rich-text editors time to mount and normalise their HTML.
    await page.waitForTimeout(1500);
    await expect(saveButton()).toBeDisabled();
    await expect(page.getByText('You have unsaved changes')).toHaveCount(0);
    expect(errors).toEqual([]);
  });
}

test('unknown or hostile slugs are a 404, not an editor', async () => {
  for (const slug of ['nope', '__proto__', 'constructor', 'toString', 'vision%2F..', '..%2Fsettings']) {
    const res = await page.goto(`/admin/pages/${slug}/`);
    // Next streams the admin layout before the page calls notFound(), so dev serves the 404 UI with a 200.
    if (res?.status() !== 404) await expect(page.getByText('Page not found'), slug).toBeVisible();
    await expect(saveButton()).toHaveCount(0);
  }
});

test('editing a heading publishes it to the public page', async () => {
  touched.add('president-message');
  await openEditor(page, 'president-message');
  const heading = `E2E heading ${Date.now()}`;
  await field('fields.heading').fill(heading);
  await expect(page.getByText('You have unsaved changes')).toBeVisible();
  await save(/Saved\. Live on the site now\./);
  await expect(saveButton()).toBeDisabled();
  await expect(page.getByText(/Edited .* by E2E President Tester/)).toBeVisible();

  const visitor = await context.browser()!.newPage();
  await visitor.goto('/president-message/');
  await expect(visitor.locator('h1').first()).toHaveText(heading);
  await visitor.close();
});

test('required, too-long and SEO-limit inputs block saving and say why', async () => {
  const before = await getPage('principal-message');
  await openEditor(page, 'principal-message');

  await field('fields.heading').fill('');
  await saveButton().click();
  await expect(page.getByText('Some fields need attention')).toBeVisible();
  await expect(page.getByText('Required').first()).toBeVisible();

  await field('fields.heading').fill('x'.repeat(201));
  await saveButton().click();
  await expect(page.getByText(/200 character/i).first()).toBeVisible();

  await field('fields.heading').fill(before.fields.heading);
  await field('seoTitle').fill('t'.repeat(71));
  await saveButton().click();
  await expect(page.getByText('Use 70 characters or fewer')).toBeVisible();

  expect((await getPage('principal-message')).updatedAt).toBe(before.updatedAt);
});

test('a second editor saving first makes your save fail loudly, and Reload recovers', async ({ browser }) => {
  touched.add('secretary-message');
  await openEditor(page, 'secretary-message');
  const other = await signedIn(browser, 'superadmin');
  const otherPage = await other.newPage();
  await openEditor(otherPage, 'secretary-message');

  await otherPage.locator('[id="fields.tagline"]').fill('Saved by the other editor');
  await otherPage.getByRole('button', { name: 'Save' }).click();
  await expect(otherPage.getByText(/Saved\./).first()).toBeVisible();
  await other.close();

  await field('fields.tagline').fill('Saved by me, later');
  await saveButton().click();
  const alert = page.getByRole('alert').filter({ hasText: 'changed by someone else' });
  await expect(alert).toBeVisible();
  expect((await getPage('secretary-message')).fields.tagline).toBe('Saved by the other editor');

  await alert.getByRole('button', { name: 'Reload' }).click();
  await expect(field('fields.tagline')).toHaveValue('Saved by the other editor');
  await expect(saveButton()).toBeDisabled();
});

test('hiding a page 404s it publicly, drops its links, and keeps it editable', async () => {
  touched.add('vision');
  await openEditor(page, 'vision');
  await page.getByLabel('Visible on site').uncheck();
  await save(/hidden from the site/);

  const visitor = await context.browser()!.newPage();
  expect((await visitor.goto('/vision/'))?.status()).toBe(404);
  await visitor.goto('/');
  await visitor.waitForLoadState('networkidle');
  expect(await visitor.locator('a[href="/vision"], a[href="/vision/"]').count()).toBe(0);
  await visitor.close();

  await page.goto('/admin/pages/');
  const row = page
    .locator('div')
    .filter({ has: page.locator('a[href="/admin/pages/vision/"]') })
    .filter({ has: page.getByRole('button', { name: 'View page' }) })
    .last();
  await expect(page.getByText('Hidden', { exact: true })).toBeVisible();
  await expect(row.getByRole('button', { name: 'View page' })).toBeDisabled();

  await openEditor(page, 'vision');
  await page.getByLabel('Visible on site').check();
  await save(/Live on the site now/);
  const again = await context.browser()!.newPage();
  expect((await again.goto('/vision/'))?.status()).toBe(200);
  await again.close();
});

test('past presidents: add, reorder and remove people', async () => {
  touched.add('past-presidents');
  const before = await getPage('past-presidents');
  const count = before.fields.people.length;
  await openEditor(page, 'past-presidents');

  await page.getByRole('button', { name: 'Add person' }).first().click();
  const name = `E2E Person ${Date.now()}`;
  await field(`fields.people.${count}.name`).fill(name);
  await field(`fields.people.${count}.batch`).fill('2001');
  await field(`fields.people.${count}.tenure`).fill('2030–2031');
  await page.getByRole('button', { name: `Move person ${count + 1} up` }).click();
  await expect(field(`fields.people.${count - 1}.name`)).toHaveValue(name);
  await save();

  let stored = await getPage('past-presidents');
  expect(stored.fields.people).toHaveLength(count + 1);
  expect(stored.fields.people[count - 1]).toMatchObject({ name, batch: 2001, tenure: '2030–2031' });

  const visitor = await context.browser()!.newPage();
  await visitor.goto('/past-presidents/');
  await expect(visitor.getByRole('grid')).toContainText(name);
  await visitor.close();

  await page.getByRole('button', { name: `Remove person ${count}` }).click();
  await page.getByRole('button', { name: 'Remove', exact: true }).click();
  await save();
  stored = await getPage('past-presidents');
  expect(stored.fields.people.map((p: any) => p.name)).toEqual(before.fields.people.map((p: any) => p.name));
});

test('a new person with no name cannot be saved', async () => {
  const before = await getPage('past-presidents');
  await openEditor(page, 'past-presidents');
  await page.getByRole('button', { name: 'Add person' }).first().click();
  await saveButton().click();
  await expect(page.getByText('Some fields need attention')).toBeVisible();
  expect((await getPage('past-presidents')).updatedAt).toBe(before.updatedAt);
});

test('bhamashah: hiding a group removes it from the public page only', async () => {
  touched.add('bhamashah-pillars');
  const stored = await getPage('bhamashah-pillars');
  const gold = stored.fields.groups[1];
  await openEditor(page, 'bhamashah-pillars');
  await page.getByLabel('Shown').nth(1).uncheck();
  await save();

  const visitor = await context.browser()!.newPage();
  await visitor.goto('/bhamashah-pillars/');
  await expect(visitor.getByRole('heading', { name: gold.label.trim() })).toHaveCount(0);
  await expect(visitor.getByRole('heading', { name: stored.fields.groups[0].label.trim() })).toBeVisible();
  await visitor.close();
});

test('text page: sections can be added up to the limit and the last one cannot be removed', async () => {
  touched.add('about');
  const before = await getPage('about');
  await openEditor(page, 'about');
  const add = page.getByRole('button', { name: 'Add section' });
  for (let n = before.fields.sections.length; n < 12; n++) await add.click();
  await expect(page.locator('section[aria-label^="Section "]')).toHaveCount(12);
  await expect(add).toHaveCount(0);
  // Empty new sections must be rejected, not stored as blank blocks.
  await saveButton().click();
  await expect(page.getByText('Some fields need attention')).toBeVisible();
  expect((await getPage('about')).updatedAt).toBe(before.updatedAt);
});

test('typed markup is shown as text, never executed', async () => {
  touched.add('president-message');
  let dialogs = 0;
  await openEditor(page, 'president-message');
  const payload = `<img src=x onerror=alert(1)><script>alert(2)</script>`;
  await field('fields.heading').fill(payload);
  await field('fields.tagline').fill('"><svg onload=alert(3)>');
  await save();
  const visitor = await context.browser()!.newPage();
  visitor.on('dialog', (d) => (dialogs++, d.dismiss()));
  await visitor.goto('/president-message/');
  await expect(visitor.locator('h1').first()).toHaveText(payload);
  await visitor.waitForTimeout(1000);
  expect(dialogs).toBe(0);
  expect(await visitor.locator('img[src="x"], svg[onload]').count()).toBe(0);
  await visitor.close();
});

test('unsaved edits: in-app links ask first; staying keeps the edit', async () => {
  await openEditor(page, 'principal-message');
  await field('fields.tagline').fill('unsaved change');
  const prompts: string[] = [];
  page.once('dialog', (d) => (prompts.push(d.message()), d.dismiss()));
  await page.getByRole('navigation', { name: 'Admin sections' }).getByRole('link', { name: 'Overview' }).click();
  await page.waitForTimeout(800);
  expect(prompts[0]).toMatch(/unsaved changes/);
  await expect(page).toHaveURL(/\/admin\/pages\/principal-message/);
  await expect(field('fields.tagline')).toHaveValue('unsaved change');

  page.once('dialog', (d) => d.accept());
  await page.getByRole('navigation', { name: 'Admin sections' }).getByRole('link', { name: 'Overview' }).click();
  await expect(page).toHaveURL(/\/admin\/?$/);
});

test('unsaved edits: closing the tab triggers the browser prompt', async () => {
  await openEditor(page, 'principal-message');
  await field('fields.tagline').fill('unsaved change');
  // Browsers require a real gesture in the page before honouring beforeunload.
  await field('fields.tagline').click();
  const prompt = new Promise<string>((resolve) => page.once('dialog', (d) => (resolve(d.type()), d.accept())));
  await page.close({ runBeforeUnload: true });
  expect(await prompt).toBe('beforeunload');
});

test('saved changes do not trigger the leave prompt', async () => {
  touched.add('principal-message');
  await openEditor(page, 'principal-message');
  await field('fields.tagline').fill(`clean ${Date.now()}`);
  await save();
  let prompted = false;
  page.on('dialog', (d) => ((prompted = true), d.dismiss()));
  await page.getByRole('navigation', { name: 'Admin sections' }).getByRole('link', { name: 'Overview' }).click();
  await expect(page).toHaveURL(/\/admin\/?$/);
  expect(prompted).toBe(false);
});

test.describe('photo upload', () => {
  test('rejects the wrong file type and oversized files with a message', async () => {
    await openEditor(page, 'president-message');
    const input = page.locator('input[type="file"]').first();
    await input.setInputFiles({ name: 'x.gif', mimeType: 'image/gif', buffer: Buffer.from('GIF89a') });
    await expect(page.getByText('Use a JPEG, PNG or WebP image.')).toBeVisible();
    await input.setInputFiles({ name: 'big.png', mimeType: 'image/png', buffer: Buffer.alloc(5 * 1024 * 1024 + 1) });
    await expect(page.getByText('Use an image under 5 MB.')).toBeVisible();
    await expect(saveButton()).toBeDisabled();
  });

  test('a successful upload stores a content-domain URL with alt text', async () => {
    touched.add('president-message');
    // Stand in for object storage: accept the signed PUT without leaving the machine.
    await page.route(/^https:\/\/(?!localhost).*\.(r2\.cloudflarestorage\.com|amazonaws\.com)\//, (route) =>
      route.request().method() === 'PUT' ? route.fulfill({ status: 200 }) : route.continue()
    );
    await page.route('https://content.jnvpjaa.org/**', (route) =>
      route.fulfill({ status: 200, contentType: 'image/png', body: PNG_1PX })
    );
    await openEditor(page, 'president-message');
    await page
      .locator('input[type="file"]')
      .first()
      .setInputFiles({ name: 'p.png', mimeType: 'image/png', buffer: PNG_1PX });
    await expect(saveButton()).toBeEnabled({ timeout: 30_000 });
    await save();
    const stored = await getPage('president-message');
    expect(new URL(stored.fields.photo.url).hostname).toBe('content.jnvpjaa.org');
    expect(stored.fields.photo.alt.trim().length).toBeGreaterThan(0);
  });
});

test('editor works at phone width with no sideways scroll', async ({ browser }) => {
  const phone = await signedIn(browser, 'president', {
    viewport: { width: 375, height: 812 },
    isMobile: true,
    hasTouch: true,
  });
  const p = await phone.newPage();
  for (const slug of ['president-message', 'vision', 'past-presidents'] as const) {
    await openEditor(p, slug);
    await p.waitForTimeout(800);
    expect(await p.evaluate(() => document.documentElement.scrollWidth - innerWidth), slug).toBeLessThanOrEqual(1);
  }
  await p.getByRole('button', { name: /Pages/ }).first().click();
  const drawer = p.getByRole('presentation').getByRole('navigation', { name: 'Admin sections' });
  await expect(drawer).toBeVisible();
  await drawer.getByRole('link', { name: 'Overview' }).click();
  await expect(p).toHaveURL(/\/admin\/?$/);
  await phone.close();
});

test('SEO fields save without touching content and reach the public page', async () => {
  touched.add('secretary-message');
  const before = await getPage('secretary-message');
  await openEditor(page, 'secretary-message');
  await field('seoTitle').fill('Secretary · E2E');
  await field('seoDescription').fill('A description written by the e2e suite.');
  await save();
  const after = await getPage('secretary-message');
  expect(after.seoTitle).toBe('Secretary · E2E');
  expect(after.seoDescription).toBe('A description written by the e2e suite.');
  // The rich-text editor rewrites <b> as <strong> when it loads; the wording must be untouched.
  const norm = (f: unknown) => JSON.stringify(f).replace(/<(\/?)b>/g, '<$1strong>');
  expect(norm(after.fields)).toBe(norm(before.fields));
  const visitor = await context.browser()!.newPage();
  await visitor.goto('/secretary-message/');
  await expect(visitor).toHaveTitle(/Secretary · E2E/);
  await visitor.close();
});

const PNG_1PX = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=',
  'base64'
);
