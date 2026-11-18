import { expect, test } from '@playwright/test';
import { getPage, gql, restorePage, savePage, UPDATE, type Slug } from './support';

// Hostile input straight at the API, bypassing every client-side check.
const touched = new Set<Slug>();
test.afterEach(async () => {
  for (const slug of Array.from(touched)) await restorePage(slug);
  touched.clear();
});

async function rejected(slug: Slug, fields: any, pattern?: RegExp) {
  const before = await getPage(slug);
  const res = await savePage(slug, { fields });
  expect(res.errors, JSON.stringify(res.data)).toBeTruthy();
  if (pattern) expect(res.errors![0].message).toMatch(pattern);
  expect((await getPage(slug)).updatedAt).toBe(before.updatedAt);
}

test('script, event handlers and javascript: links are stripped before storage and never run', async ({ page }) => {
  touched.add('vision');
  const before = await getPage('vision');
  const hostile =
    '<p>safe text</p><script>alert(1)</script><img src="https://content.jnvpjaa.org/a.png" onerror="alert(2)">' +
    '<a href="javascript:alert(3)">click</a><a href="https://example.org" onclick="alert(4)">ok link</a>' +
    '<iframe src="https://evil.example"></iframe><p style="position:fixed;background:url(javascript:alert(5))">styled</p>';
  const sections = [...before.fields.sections];
  sections[0] = { ...sections[0], body: hostile };
  const res = await savePage('vision', { fields: { ...before.fields, sections } });
  expect(res.errors).toBeUndefined();

  const stored = (await getPage('vision')).fields.sections[0].body as string;
  expect(stored).toContain('safe text');
  for (const bad of ['<script', 'onerror', 'javascript:', 'onclick', '<iframe', 'position:fixed', 'url(']) {
    expect(stored.toLowerCase(), bad).not.toContain(bad);
  }

  let dialogs = 0;
  page.on('dialog', (d) => (dialogs++, d.dismiss()));
  await page.goto('/vision/');
  await expect(page.getByText('safe text')).toBeVisible();
  for (const link of await page.getByRole('link', { name: 'click' }).all()) {
    await link.click({ trial: true }).catch(() => {});
  }
  await page.waitForTimeout(500);
  expect(dialogs).toBe(0);
  expect(await page.locator('main a[href^="javascript:"], main [onerror], main iframe').count()).toBe(0);
});

test('image URLs must be https on an allowed host', async () => {
  const base = (await getPage('president-message')).fields;
  for (const url of [
    'javascript:alert(1)',
    'http://content.jnvpjaa.org/a.png',
    'https://example.com/a.png',
    'https://content.jnvpjaa.org.evil.com/a.png',
    'https://evil.com/?x=content.jnvpjaa.org',
    'data:image/png;base64,AAAA',
    '//content.jnvpjaa.org/a.png',
  ]) {
    await rejected('president-message', { ...base, photo: { url, alt: 'x' } });
  }
  await rejected('president-message', { ...base, photo: { url: 'https://content.jnvpjaa.org/a.png', alt: '' } });
});

test('size limits are enforced server-side', async () => {
  const msg = (await getPage('president-message')).fields;
  await rejected('president-message', { ...msg, body: `<p>${'a'.repeat(100_001)}</p>` });
  await rejected('president-message', { ...msg, heading: 'h'.repeat(201) });
  await rejected('president-message', { ...msg, heading: '   ' });

  const text = (await getPage('about')).fields;
  const section = { heading: 'x', body: '<p>x</p>' };
  await rejected('about', { ...text, sections: Array.from({ length: 13 }, () => section) });
  await rejected('about', { ...text, sections: [] });

  const people = (await getPage('past-presidents')).fields;
  const group = people.groups[0].key;
  await rejected('past-presidents', {
    ...people,
    people: Array.from({ length: 201 }, (_, i) => ({ name: `P${i}`, group })),
  });
});

test('wrong shapes are rejected: unknown keys, wrong page type, unknown group, null', async () => {
  const msg = (await getPage('president-message')).fields;
  await rejected('president-message', { ...msg, extra: 'nope' });
  await rejected('president-message', (await getPage('vision')).fields);
  await rejected('president-message', 'string');
  const people = (await getPage('past-presidents')).fields;
  await rejected('past-presidents', { ...people, people: [{ name: 'X', group: 'not-a-group' }] }, /group/i);
  await rejected('past-presidents', { ...people, people: [{ name: 'X', group: people.groups[0].key, batch: 'abc' }] });
  await rejected('past-presidents', {
    ...people,
    // JSON.parse makes __proto__ an own key, as a hostile request body would; a literal would set the prototype.
    groups: [{ ...people.groups[0], ...JSON.parse('{"__proto__":{"polluted":true}}') }, ...people.groups.slice(1)],
  });
  expect(({} as any).polluted).toBeUndefined();
  // savePage() would fall back to the stored fields for null, so send it raw.
  const current = await getPage('president-message');
  const raw = await gql(
    UPDATE,
    { input: { slug: 'president-message', fields: null, visible: true, expectedUpdatedAt: current.updatedAt } },
    'superadmin'
  );
  expect(raw.errors).toBeTruthy();
  expect((await getPage('president-message')).updatedAt).toBe(current.updatedAt);
});

test('unknown slugs and SEO overflow are refused', async () => {
  const before = await getPage('vision');
  for (const slug of ['nope', '__proto__', 'constructor', '']) {
    const res = await gql(
      UPDATE,
      { input: { slug, fields: before.fields, visible: true, expectedUpdatedAt: before.updatedAt } },
      'superadmin'
    );
    expect(res.errors, slug).toBeTruthy();
  }
  const long = await savePage('vision', { seoTitle: 't'.repeat(71) });
  expect(long.errors?.[0].message).toMatch(/70/);
  const longer = await savePage('vision', { seoDescription: 'd'.repeat(321) });
  expect(longer.errors?.[0].message).toMatch(/320/);
  expect((await getPage('vision')).updatedAt).toBe(before.updatedAt);
});

test('stale or missing version is a conflict, never an overwrite', async () => {
  const before = await getPage('about');
  for (const expectedUpdatedAt of [null, '2000-01-01T00:00:00.000Z', 'not-a-date']) {
    const res = await gql(
      UPDATE,
      { input: { slug: 'about', fields: before.fields, visible: true, expectedUpdatedAt } },
      'superadmin'
    );
    expect(res.errors, String(expectedUpdatedAt)).toBeTruthy();
    // A malformed date is refused by the shared DateTime scalar before the resolver runs.
    if (expectedUpdatedAt !== 'not-a-date') expect(res.errors![0].message).toMatch(/changed by someone else/);
  }
  expect((await getPage('about')).updatedAt).toBe(before.updatedAt);
});

test('two simultaneous saves of the same version: exactly one wins', async () => {
  touched.add('principal-message');
  const before = await getPage('principal-message');
  const attempt = (tagline: string, as: 'superadmin' | 'president') =>
    gql(
      UPDATE,
      {
        input: {
          slug: 'principal-message',
          fields: { ...before.fields, tagline },
          visible: before.visible,
          expectedUpdatedAt: before.updatedAt,
        },
      },
      as
    );
  const results = await Promise.all([
    attempt('race A', 'superadmin'),
    attempt('race B', 'president'),
    attempt('race C', 'superadmin'),
    attempt('race D', 'president'),
  ]);
  const winners = results.filter((r) => !r.errors);
  expect(winners).toHaveLength(1);
  for (const loser of results.filter((r) => r.errors))
    expect(loser.errors![0].message).toMatch(/changed by someone else/);
  const stored = await getPage('principal-message');
  expect(stored.fields.tagline).toBe(winners[0].data.updateContentPage.fields.tagline);
});

test('unicode, emoji and RTL text survive a round trip', async ({ page }) => {
  touched.add('secretary-message');
  const base = (await getPage('secretary-message')).fields;
  const tagline = 'नमस्ते 🎓 مرحبا — “quotes” & <angle>';
  expect((await savePage('secretary-message', { fields: { ...base, tagline } })).errors).toBeUndefined();
  expect((await getPage('secretary-message')).fields.tagline).toBe(tagline);
  await page.goto('/secretary-message/');
  await expect(page.getByText(tagline)).toBeVisible();
});

test('public queries only reveal visible pages', async () => {
  touched.add('about');
  expect((await savePage('about', { visible: false })).errors).toBeUndefined();
  const hidden = await gql('{hiddenContentPages}');
  expect(hidden.data.hiddenContentPages).toContain('about');
  const pub = await gql('query{contentPage(slug:"about"){slug fields}}');
  expect(pub.data?.contentPage ?? null).toBeNull();
  const editor = await gql('query{contentPageForEditor(slug:"about"){slug visible}}', {}, 'president');
  expect(editor.data.contentPageForEditor).toMatchObject({ slug: 'about', visible: false });
});
