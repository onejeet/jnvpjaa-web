import { expect, test } from '@playwright/test';
import { BASE_URL, getTokens, gql, signedIn, watchErrors } from './support';

/**
 * Behaviour the Next 15 / React 19 / Tiptap 3 upgrade must not change: SSR of public detail pages on a direct load,
 * client navigation, Devanagari slugs, server-side sanitising of saved rich text, and the middleware redirects.
 */
test.describe.configure({ mode: 'serial' });

const HOSTILE =
  '<p>safe</p><img src=x onerror="window.__xss=1"><a href="javascript:window.__xss=2">x</a><p onclick="window.__xss=3">z</p><script>window.__xss=4</script>';

async function blogPaths(): Promise<string[]> {
  const xml = await (await fetch(`${BASE_URL}/sitemap.xml`)).text();
  return Array.from(xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g))
    .map((m) => new URL(m[1]).pathname)
    .filter((p) => /^\/blog\/[^/]+\/$/.test(p));
}

test('blog detail pages are server-rendered on a direct load', async ({ request }) => {
  const paths = await blogPaths();
  expect(paths.length).toBeGreaterThan(0);
  for (const p of paths) {
    const res = await request.get(p, { headers: { 'sec-fetch-dest': 'document' } });
    expect(res.status(), p).toBe(200);
    const html = await res.text();
    const title = html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? '';
    expect(title, `${p} has a post-specific title`).not.toMatch(/^Blog \|/);
    expect(html, `${p} SSR contains the heading`).toMatch(/<h1\b[^>]*>[^<]+/);
  }
});

test('Devanagari blog slugs resolve both percent-encoded and raw', async ({ page }) => {
  const hindi = (await blogPaths()).find((p) => /%E0%A4/i.test(p));
  test.skip(!hindi, 'no Devanagari slug in the local sitemap');
  for (const url of [hindi!, decodeURIComponent(hindi!)]) {
    const res = await page.goto(url);
    expect(res?.status(), url).toBe(200);
    await expect(page.locator('h1').first()).toBeVisible();
  }
});

test('client navigation from the blog list renders the post', async ({ page }) => {
  const errors = watchErrors(page);
  await page.goto('/blog/');
  // Cards navigate with router.push on click (no anchor), so click the first post's heading.
  const card = page.getByRole('heading', { level: 1, name: 'Navodaya: A Journey from Dreams to Destiny' });
  await card.click();
  await page.waitForURL(/\/blog\/navodaya-a-journey-from-dreams-to-destiny\/$/);
  await expect(page.locator('h1').first()).toBeVisible();
  await expect(page.locator('.rich_content').first()).not.toBeEmpty();
  expect(errors.filter((e) => !/hydrat/i.test(e))).toEqual([]);
});

// Saved as a DRAFT on purpose: publishing makes the backend call an external URL shortener.
test('hostile HTML is stripped when a blog is saved', async () => {
  const { categoryId } = (await gql(`{getBlogList(options:{limit:1}){data{categoryId}}}`, {}, 'superadmin')).data
    .getBlogList.data[0];
  const created = await gql(
    `mutation($t:String!,$c:String,$a:String!,$k:String!){createBlog(title:$t,content:$c,status:DRAFT,authorId:$a,categoryId:$k){id content}}`,
    { t: `migration guard ${Date.now()}`, c: HOSTILE, a: getTokens().superadmin.id, k: categoryId },
    'superadmin'
  );
  expect(created.errors).toBeUndefined();
  const blog = created.data.createBlog;
  try {
    expect(blog.content).toContain('safe');
    expect(blog.content).not.toMatch(/onerror|onclick|javascript:|<script/i);
  } finally {
    await gql(`mutation($id:String!){deleteBlog(id:$id){id}}`, { id: blog.id }, 'superadmin');
  }
});

test('signed out, a protected route redirects to signin with the return path', async ({ request }) => {
  const res = await request.get('/profile/', { maxRedirects: 0 });
  expect(res.status()).toBe(307);
  const loc = new URL(res.headers().location, BASE_URL);
  expect(loc.pathname).toMatch(/^\/signin\/?$/);
  expect(Buffer.from(loc.searchParams.get('r')!, 'base64').toString()).toBe('/profile/');
});

test('signed in, auth routes redirect to the profile', async ({ browser }) => {
  const context = await signedIn(browser, 'member');
  const res = await context.request.get('/signin/', { maxRedirects: 0 });
  expect(res.status()).toBe(307);
  expect(new URL(res.headers().location, BASE_URL).pathname).toMatch(/^\/profile\/?$/);
  await context.close();
});

test('the Google auth callback is private, unreferred and unindexed', async ({ request }) => {
  const res = await request.get('/auth/google/', { maxRedirects: 0 });
  const h = res.headers();
  expect(h['cache-control']).toContain('no-store');
  expect(h['referrer-policy']).toBe('no-referrer');
  expect(h['x-robots-tag']).toContain('noindex');
});
