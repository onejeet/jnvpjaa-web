#!/usr/bin/env node
/**
 * Collects stored rich-text HTML for the editor round-trip check (e2e/editor-roundtrip.spec.ts).
 *   node scripts/export-editor-corpus.mjs --local   -> e2e/fixtures/editor-corpus/local.json (local API, e2e personas)
 *   node scripts/export-editor-corpus.mjs --live    -> e2e/fixtures/editor-corpus/live.json  (public pages of the live site,
 *                                                       signed out, read-only)
 */
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const OUT_DIR = join(ROOT, 'e2e/fixtures/editor-corpus');
const API = process.env.E2E_API_URL || 'http://localhost:4000/client';
const LIVE = process.env.LIVE_SITE || 'https://jnvpjaa.org';
const PER_KIND = 50;
const UA = 'jnvpjaa-migration-check';

const tokens = () => JSON.parse(readFileSync(join(ROOT, 'e2e/.state/tokens.json'), 'utf8'));

async function gql(query, variables = {}) {
  const res = await fetch(API, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      origin: 'http://localhost:3890',
      cookie: `access_token=${tokens().superadmin.access}`,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors).slice(0, 400));
  return json.data;
}

const isHtml = (s) => typeof s === 'string' && /<[a-z][\s\S]*>/i.test(s);
const item = (id, source, kind, html) => ({ id, source, kind, html });

/** Every HTML string inside a content page's `fields` JSON, keyed by its JSON path. */
function htmlStrings(value, path = '') {
  if (isHtml(value)) return [[path, value]];
  if (value && typeof value === 'object')
    return Object.entries(value).flatMap(([k, v]) => htmlStrings(v, path ? `${path}.${k}` : k));
  return [];
}

async function exportLocal() {
  const items = [];

  const blogs = await gql(`query($o:ListInput){getBlogList(options:$o){data{id}}}`, { o: { limit: PER_KIND } });
  for (const { id } of blogs.getBlogList.data) {
    const { getBlog } = await gql(`query($id:String){getBlog(id:$id){id content comments{id content}}}`, { id });
    if (isHtml(getBlog?.content)) items.push(item(`blog:${id}`, 'local', 'blog', getBlog.content));
    for (const c of getBlog?.comments || [])
      if (isHtml(c.content)) items.push(item(`comment:${c.id}`, 'local', 'comment', c.content));
  }

  const events = await gql(`query($o:ListInput){getEventList(options:$o){data{id}}}`, { o: { limit: PER_KIND } });
  for (const { id } of events.getEventList.data) {
    const { getEventDetails } = await gql(`query($id:Int){getEventDetails(id:$id){id description}}`, { id });
    if (isHtml(getEventDetails?.description))
      items.push(item(`event:${id}`, 'local', 'event', getEventDetails.description));
  }

  const news = await gql(`{managedNewsPosts{id content}}`);
  for (const n of news.managedNewsPosts.slice(0, PER_KIND))
    if (isHtml(n.content)) items.push(item(`newsroom:${n.id}`, 'local', 'newsroom', n.content));

  const jobs = await gql(`query($l:Int){jobs(limit:$l){data{slug}}}`, { l: PER_KIND });
  for (const { slug } of jobs.jobs.data) {
    const { job } = await gql(`query($s:String!){job(slug:$s){id description}}`, { s: slug });
    if (isHtml(job?.description)) items.push(item(`job:${job.id}`, 'local', 'job', job.description));
  }

  const pages = await gql(`{contentPagesForEditor{slug fields}}`);
  for (const p of pages.contentPagesForEditor)
    for (const [path, html] of htmlStrings(p.fields))
      items.push(item(`contentPage:${p.slug}:${path}`, 'local', 'contentPage', html));

  const users = await gql(`query($o:ListInput){getUserList(options:$o){data{id aboutMe}}}`, { o: { limit: 500 } });
  for (const u of users.getUserList.data.filter((x) => isHtml(x.aboutMe)).slice(0, PER_KIND))
    items.push(item(`aboutMe:${u.id}`, 'local', 'aboutMe', u.aboutMe));

  return items;
}

async function exportLive() {
  const { chromium } = await import('@playwright/test');
  const xml = await (await fetch(`${LIVE}/sitemap.xml`, { headers: { 'user-agent': UA } })).text();
  const locs = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((m) => m[1]);
  const pick = (re, n) => locs.filter((u) => re.test(new URL(u).pathname)).slice(0, n);
  const urls = [
    ...pick(/^\/blog\/[^/]+\/?$/, 15).map((u) => ['blog', u]),
    ...pick(/^\/newsroom\/[^/]+\/?$/, 8).map((u) => ['newsroom', u]),
    ...pick(/^\/events\/[^/]+\/?$/, 8).map((u) => ['event', u]),
  ];
  const browser = await chromium.launch(process.env.E2E_CHROMIUM ? { executablePath: process.env.E2E_CHROMIUM } : {});
  const page = await browser.newPage({ userAgent: UA });
  const items = [];
  for (const [kind, url] of urls) {
    try {
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 45_000 });
      // Bodies are sanitised on the client, so wait until the container is filled.
      await page
        .waitForFunction(() => (document.querySelector('.rich_content')?.innerHTML.length ?? 0) > 0, null, {
          timeout: 20_000,
        })
        .catch(() => undefined);
      const html = await page
        .locator('.rich_content')
        .first()
        .evaluate((el) => el.innerHTML, null, { timeout: 15_000 });
      if (isHtml(html)) items.push(item(`live:${new URL(url).pathname}`, 'live', kind, html));
    } catch (e) {
      console.warn(`skip ${url}: ${e.message.split('\n')[0]}`);
    }
  }
  await browser.close();
  return items;
}

const write = (name, items) => {
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(join(OUT_DIR, name), JSON.stringify(items, null, 2));
  const kinds = items.reduce((acc, i) => ({ ...acc, [i.kind]: (acc[i.kind] || 0) + 1 }), {});
  console.log(`${name}: ${items.length} items ${JSON.stringify(kinds)}`);
};

const args = process.argv.slice(2);
if (args.includes('--local')) write('local.json', await exportLocal());
if (args.includes('--live')) write('live.json', await exportLive());
