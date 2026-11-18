import { expect, test, type Page } from '@playwright/test';
import { getPage, gql, signedIn, UPDATE, watchErrors, type Persona } from './support';

// Who can reach what, checked in the UI and, separately, against the API (the UI is not the security boundary).
const NAV_LABELS = [
  'Overview',
  'Member access',
  'Executive committee',
  'Batch coordinators',
  'Current assignments',
  'Pages',
  'Newsroom',
  'Settings',
  'Scholarship',
];

const sidebar = (page: Page) => page.getByRole('navigation', { name: 'Admin sections' });

async function navLabels(page: Page) {
  await expect(sidebar(page)).toBeVisible();
  const texts = await sidebar(page).getByRole('link').allInnerTexts();
  return texts.map((t) => t.trim()).filter((t) => NAV_LABELS.includes(t));
}

test.describe('signed out', () => {
  for (const path of ['/admin/', '/admin/pages/', '/admin/pages/vision/', '/admin/settings/']) {
    test(`${path} sends you to sign in`, async ({ page }) => {
      await page.goto(path);
      await expect(page).toHaveURL(/\/signin/);
    });
  }
});

const EXPECTED: Record<Persona, string[]> = {
  superadmin: NAV_LABELS,
  president: [
    'Overview',
    'Member access',
    'Executive committee',
    'Batch coordinators',
    'Current assignments',
    'Pages',
    'Newsroom',
  ],
  treasurer: ['Overview', 'Current assignments'],
  member: [],
};

for (const persona of ['superadmin', 'president', 'treasurer'] as const) {
  test(`${persona} sees exactly their admin sections`, async ({ browser }) => {
    const context = await signedIn(browser, persona);
    const page = await context.newPage();
    const errors = watchErrors(page);
    await page.goto('/admin/');
    expect(await navLabels(page)).toEqual(EXPECTED[persona]);
    expect(errors).toEqual([]);
    await context.close();
  });
}

test('a plain member gets a clear empty state, not an error', async ({ browser }) => {
  const context = await signedIn(browser, 'member');
  const page = await context.newPage();
  await page.goto('/admin/');
  await expect(page.getByText('No administration tasks are available for your account.')).toBeVisible();
  await page.goto('/admin/pages/vision/');
  await expect(page.getByRole('button', { name: 'Save' })).toHaveCount(0);
  await expect(page.locator('[id="fields.heading"]')).toHaveCount(0);
  await context.close();
});

const DENIED: Record<'president' | 'treasurer', string[]> = {
  president: ['/admin/settings/', '/admin/scholarship/'],
  treasurer: ['/admin/pages/', '/admin/pages/vision/', '/admin/executive/', '/admin/settings/'],
};

for (const persona of ['president', 'treasurer'] as const) {
  test(`${persona} typing a forbidden admin URL gets "no access", not the section`, async ({ browser }) => {
    const context = await signedIn(browser, persona);
    const page = await context.newPage();
    for (const path of DENIED[persona]) {
      await page.goto(path);
      await expect(page.getByText("You don't have access to this section."), path).toBeVisible();
      await expect(page.getByRole('button', { name: 'Save' }), path).toHaveCount(0);
    }
    await context.close();
  });
}

test('president can open the editor directly', async ({ browser }) => {
  const context = await signedIn(browser, 'president');
  const page = await context.newPage();
  await page.goto('/admin/pages/vision/');
  await expect(page.getByRole('heading', { level: 1, name: 'Vision & Mission' })).toBeVisible();
  await context.close();
});

test.describe('API refuses editors without the permission', () => {
  for (const persona of [undefined, 'member', 'treasurer'] as const) {
    test(`${persona ?? 'anonymous'} cannot read editor data or save`, async () => {
      const before = await getPage('vision');
      const list = await gql('{contentPagesForEditor{slug}}', {}, persona);
      expect(list.errors?.[0]?.code).toBe('NOT_AUTHORISED');
      const one = await gql('query{contentPageForEditor(slug:"vision"){slug}}', {}, persona);
      expect(one.errors?.[0]?.code).toBe('NOT_AUTHORISED');
      const save = await gql(
        UPDATE,
        {
          input: {
            slug: 'vision',
            fields: { ...before.fields, heading: 'pwned' },
            visible: false,
            expectedUpdatedAt: before.updatedAt,
          },
        },
        persona
      );
      expect(save.errors?.[0]?.code).toBe('NOT_AUTHORISED');
      const after = await getPage('vision');
      expect(after.updatedAt).toBe(before.updatedAt);
      expect(after.visible).toBe(before.visible);
    });
  }

  test('a forged or expired token is refused', async () => {
    const res = await fetch(process.env.E2E_API_URL || 'http://localhost:4000/client', {
      method: 'POST',
      headers: { 'content-type': 'application/json', cookie: 'access_token=eyJhbGciOiJub25lIn0.eyJpZCI6IngifQ.' },
      body: JSON.stringify({ query: '{contentPagesForEditor{slug}}' }),
    });
    const body = await res.json();
    expect(body.data?.contentPagesForEditor ?? null).toBeNull();
    expect(body.errors?.length).toBeGreaterThan(0);
  });
});

test('public queries never leak who edited a page', async () => {
  const res = await gql('query{contentPage(slug:"vision"){slug updatedBy{id firstName}}}');
  // Either the field is not on the public path or it resolves to nothing.
  expect(res.data?.contentPage?.updatedBy ?? null).toBeNull();
});
