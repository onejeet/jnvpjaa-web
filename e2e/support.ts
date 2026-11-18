import { readFileSync } from 'fs';
import path from 'path';
import { expect, type Browser, type BrowserContext, type Page } from '@playwright/test';

export const API_URL = process.env.E2E_API_URL || 'http://localhost:4000/client';
export const BASE_URL = process.env.E2E_BASE_URL || 'http://localhost:3890';
export const STATE_DIR = path.join(__dirname, '.state');
export const TOKENS_FILE = process.env.E2E_TOKENS || path.join(STATE_DIR, 'tokens.json');
export const SNAPSHOT_FILE = path.join(STATE_DIR, 'content-snapshot.json');

export type Persona = 'superadmin' | 'president' | 'treasurer' | 'member';
type Tokens = Record<Persona, { id: string; access: string; refresh: string }>;

let tokens: Tokens | null = null;
export const getTokens = (): Tokens => (tokens ??= JSON.parse(readFileSync(TOKENS_FILE, 'utf8')));

export const SLUGS = [
  'president-message',
  'principal-message',
  'secretary-message',
  'vision',
  'about',
  'past-presidents',
  'bhamashah-pillars',
] as const;
export type Slug = (typeof SLUGS)[number];

export const LABELS: Record<Slug, string> = {
  'president-message': "President's Message",
  'principal-message': "Principal's Message",
  'secretary-message': "Secretary's Message",
  vision: 'Vision & Mission',
  about: 'About',
  'past-presidents': 'Past Presidents',
  'bhamashah-pillars': 'Bhamashah Pillars',
};

export type StoredPage = {
  slug: Slug;
  type: string;
  visible: boolean;
  fields: any;
  seoTitle: string | null;
  seoDescription: string | null;
  updatedAt: string;
};

/** Raw GraphQL call, optionally as a persona. Returns the whole response body. */
export async function gql(query: string, variables: Record<string, unknown> = {}, as?: Persona) {
  const headers: Record<string, string> = { 'content-type': 'application/json', origin: BASE_URL };
  if (as) headers.cookie = `access_token=${getTokens()[as].access}`;
  const res = await fetch(API_URL, { method: 'POST', headers, body: JSON.stringify({ query, variables }) });
  return (await res.json()) as { data?: any; errors?: { message: string; code?: string }[] };
}

const PAGE_FIELDS = 'slug type visible fields seoTitle seoDescription updatedAt';

export async function getPage(slug: Slug): Promise<StoredPage> {
  const res = await gql(
    `query($slug:String!){contentPageForEditor(slug:$slug){${PAGE_FIELDS}}}`,
    { slug },
    'superadmin'
  );
  if (res.errors) throw new Error(JSON.stringify(res.errors));
  return res.data.contentPageForEditor;
}

export async function getAllPages(): Promise<StoredPage[]> {
  const res = await gql(`{contentPagesForEditor{${PAGE_FIELDS}}}`, {}, 'superadmin');
  if (res.errors) throw new Error(JSON.stringify(res.errors));
  return res.data.contentPagesForEditor;
}

export const UPDATE = `mutation($input: ContentPageInput!){updateContentPage(input:$input){${PAGE_FIELDS}}}`;

/** Save a page through the API as a persona, using the current version so it is not a conflict. */
export async function savePage(
  slug: Slug,
  change: Partial<Pick<StoredPage, 'fields' | 'visible' | 'seoTitle' | 'seoDescription'>>,
  as: Persona = 'superadmin'
) {
  const current = await getPage(slug);
  return gql(
    UPDATE,
    {
      input: {
        slug,
        fields: change.fields ?? current.fields,
        visible: change.visible ?? current.visible,
        seoTitle: change.seoTitle !== undefined ? change.seoTitle : current.seoTitle,
        seoDescription: change.seoDescription !== undefined ? change.seoDescription : current.seoDescription,
        expectedUpdatedAt: current.updatedAt,
      },
    },
    as
  );
}

/** Put a page back exactly as it was in the snapshot taken before the run. */
export async function restorePage(slug: Slug) {
  const snapshot: StoredPage[] = JSON.parse(readFileSync(SNAPSHOT_FILE, 'utf8'));
  const original = snapshot.find((p) => p.slug === slug);
  if (!original) return;
  const res = await savePage(slug, original);
  if (res.errors) throw new Error(`restore ${slug} failed: ${JSON.stringify(res.errors)}`);
}

/** A browser context signed in as the persona (session cookies + the client's logged-in flag). */
export async function signedIn(browser: Browser, as: Persona, options: Parameters<Browser['newContext']>[0] = {}) {
  const context = await browser.newContext(options);
  const { access, refresh } = getTokens()[as];
  await context.addCookies([
    { name: 'access_token', value: access, domain: 'localhost', path: '/' },
    { name: 'refresh_token', value: refresh, domain: 'localhost', path: '/' },
  ]);
  await context.addInitScript(() => {
    try {
      localStorage.setItem('logged_in', 'true');
    } catch {
      // Storage can be blocked; the cookies alone still sign the user in.
    }
  });
  return context;
}

// Warnings that predate these changes, in files they did not touch (ProfileCard's styled bgColor; the event form's inputs).
const PRE_EXISTING_WARNINGS = [/bgColor bgcolor/, /changing an uncontrolled input to be controlled/];

/** Collects uncaught page errors and console errors so a test can assert the page stayed healthy. */
export function watchErrors(page: Page) {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(`pageerror: ${error.message}`));
  page.on('console', (msg) => {
    if (msg.type() !== 'error') return;
    const text = msg.text();
    // Dev-only noise unrelated to the app's behaviour.
    if (
      /Download the (React|Apollo) DevTools|Failed to load resource|favicon|net::ERR_|\[Fast Refresh\]|webpack-hmr/i.test(
        text
      )
    )
      return;
    if (PRE_EXISTING_WARNINGS.some((pattern) => pattern.test(text))) return;
    errors.push(`console: ${text.slice(0, 300)}`);
  });
  return errors;
}

/** Wait for the editor form to finish loading. */
export async function openEditor(page: Page, slug: Slug) {
  await page.goto(`/admin/pages/${slug}/`);
  await expect(page.getByRole('heading', { level: 1, name: LABELS[slug] })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Save' })).toBeVisible();
  return page.getByRole('button', { name: 'Save' });
}

export const visibleText = async (page: Page) => (await page.locator('body').innerText()).replace(/\s+/g, ' ');

export type { BrowserContext };
