#!/usr/bin/env node
/**
 * Records what crawlers and visitors get from each public route (status, redirects, SEO head,
 * structured data, visible text, security headers, timing) and diffs two recordings.
 *   node scripts/route-snapshot.mjs --base http://localhost:3890 --out snap.json [--sitemap-cap 15] [--runs 3]
 *   node scripts/route-snapshot.mjs --diff a.json b.json      (exit 1 when they differ)
 */
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

// The headers next.config.js sets on every route, plus the usual security ones if a host adds them.
const SECURITY_HEADERS = [
  'x-frame-options',
  'referrer-policy',
  'permissions-policy',
  'x-content-type-options',
  'strict-transport-security',
  'content-security-policy',
];

const STATIC_PATHS = [
  '/',
  '/about',
  '/vision',
  '/president-message',
  '/principal-message',
  '/secretary-message',
  '/past-presidents',
  '/bhamashah-pillars',
  '/executive-committee',
  '/batch-coordinators',
  '/blog',
  '/events',
  '/newsroom',
  '/gallery',
  '/businesses',
  '/jobs',
  '/student-hub',
  '/scholarships',
  '/donations',
  '/contact-us',
  '/privacy_policy',
  '/terms_condition',
  '/signin',
  '/signup',
  '/forgot-password',
];
const PROBES = [
  '/this-does-not-exist-xyz',
  '/profile',
  '/robots.txt',
  '/sitemap.xml',
  '/newsroom/feed.xml',
  '/manifest.json',
  '/sw.js',
];

const hash = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ');
const stripTags = (s) =>
  decode(s.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
const attr = (tag, name) => {
  const m = tag.match(new RegExp(`\\s${name}\\s*=\\s*("([^"]*)"|'([^']*)')`, 'i'));
  return m ? decode(m[2] ?? m[3]) : null;
};

export function parsePage(html, headers = {}) {
  const h = Object.fromEntries(Object.entries(headers).map(([k, v]) => [k.toLowerCase(), v]));
  const head = (html.match(/<head[\s\S]*?<\/head>/i) || [html])[0];
  const metas = head.match(/<meta\b[^>]*>/gi) || [];
  const links = head.match(/<link\b[^>]*>/gi) || [];
  const meta = (key) => {
    const tag = metas.find((t) => (attr(t, 'name') || attr(t, 'property')) === key);
    return tag ? attr(tag, 'content') : null;
  };
  const prefixed = (prefix) =>
    Object.fromEntries(
      metas
        .map((t) => [attr(t, 'property') || attr(t, 'name'), attr(t, 'content')])
        .filter(([k]) => k && k.startsWith(prefix))
        .sort(([a], [b]) => a.localeCompare(b))
    );

  const ldBlocks = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map(
    (m) => m[1].trim()
  );
  const ldTypes = ldBlocks.flatMap((b) => {
    try {
      const j = JSON.parse(b);
      return (Array.isArray(j) ? j : j['@graph'] || [j]).flatMap((x) => x['@type'] || []);
    } catch {
      return ['<invalid-json>'];
    }
  });

  const body = (html.match(/<main[\s\S]*?<\/main>/i) || html.match(/<body[\s\S]*<\/body>/i) || [''])[0]
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ');
  const text = stripTags(body);
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  const title = head.match(/<title[^>]*>([\s\S]*?)<\/title>/i);

  return {
    title: title ? stripTags(title[1]) : null,
    description: meta('description'),
    robots: meta('robots'),
    canonical: (() => {
      const t = links.find((l) => attr(l, 'rel') === 'canonical');
      return t ? attr(t, 'href') : null;
    })(),
    og: prefixed('og:'),
    twitter: prefixed('twitter:'),
    hreflang: links
      .filter((l) => attr(l, 'rel') === 'alternate' && attr(l, 'hreflang'))
      .map((l) => `${attr(l, 'hreflang')}=${attr(l, 'href')}`)
      .sort(),
    jsonLdTypes: ldTypes.map(String).sort(),
    jsonLdHashes: ldBlocks.map(hash).sort(),
    h1: h1 ? stripTags(h1[1]) : null,
    textLength: text.length,
    textHash: hash(text),
    security: Object.fromEntries(SECURITY_HEADERS.filter((k) => h[k] !== undefined).map((k) => [k, h[k]])),
    cacheControl: h['cache-control'] ?? null,
    xRobotsTag: h['x-robots-tag'] ?? null,
    contentType: h['content-type'] ?? null,
  };
}

const IGNORED = new Set(['ttfbMs', 'totalMs']);
const flatten = (obj, prefix = '', out = {}) => {
  for (const [k, v] of Object.entries(obj ?? {})) {
    if (!prefix && IGNORED.has(k)) continue;
    const key = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = JSON.stringify(v);
  }
  return out;
};

export function diffSnapshots(a, b) {
  const out = [];
  const urls = [...new Set([...Object.keys(a.pages), ...Object.keys(b.pages)])].sort();
  for (const url of urls) {
    if (!b.pages[url]) {
      out.push({ url, field: 'missing', before: 'present', after: null });
      continue;
    }
    if (!a.pages[url]) {
      out.push({ url, field: 'added', before: null, after: 'present' });
      continue;
    }
    const fa = flatten(a.pages[url]);
    const fb = flatten(b.pages[url]);
    for (const field of [...new Set([...Object.keys(fa), ...Object.keys(fb)])].sort()) {
      if (fa[field] !== fb[field]) out.push({ url, field, before: fa[field] ?? null, after: fb[field] ?? null });
    }
  }
  return out;
}

const median = (xs) => [...xs].sort((x, y) => x - y)[Math.floor(xs.length / 2)];

async function fetchOnce(base, path) {
  const redirects = [];
  let url = new URL(path, base).href;
  const start = performance.now();
  let res;
  let ttfb;
  for (let hop = 0; hop < 6; hop++) {
    res = await fetch(url, { redirect: 'manual', headers: { 'user-agent': 'jnvpjaa-route-snapshot' } });
    ttfb ??= performance.now() - start;
    if (res.status < 300 || res.status >= 400 || !res.headers.get('location')) break;
    const next = new URL(res.headers.get('location'), url);
    redirects.push(`${res.status} ${next.pathname}${next.search}`);
    url = next.href;
  }
  const body = await res.text();
  return { res, body, redirects, ttfb, total: performance.now() - start };
}

async function snapshotUrl(base, path, runs) {
  const samples = [];
  for (let i = 0; i < runs; i++) samples.push(await fetchOnce(base, path));
  const { res, body, redirects } = samples[0];
  const headers = Object.fromEntries(res.headers.entries());
  const isHtml = (headers['content-type'] || '').includes('text/html');
  return {
    status: res.status,
    redirects,
    ...(isHtml
      ? { facts: parsePage(body, headers) }
      : {
          bodyHash: hash(body),
          facts: {
            security: parsePage('', headers).security,
            cacheControl: headers['cache-control'] ?? null,
            contentType: headers['content-type'] ?? null,
          },
        }),
    ttfbMs: Math.round(median(samples.map((s) => s.ttfb))),
    totalMs: Math.round(median(samples.map((s) => s.total))),
  };
}

async function sitemapPaths(base, cap) {
  try {
    const xml = await (await fetch(new URL('/sitemap.xml', base))).text();
    const perSection = {};
    const paths = [];
    for (const [, loc] of xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)) {
      const u = new URL(decode(loc));
      const section = u.pathname.split('/')[1] || '/';
      perSection[section] = (perSection[section] || 0) + 1;
      if (perSection[section] <= cap) paths.push(`${u.pathname}${u.search}`);
    }
    return paths;
  } catch {
    return [];
  }
}

async function main(argv) {
  const arg = (name, fallback) => {
    const i = argv.indexOf(name);
    return i >= 0 ? argv[i + 1] : fallback;
  };
  if (argv.includes('--diff')) {
    const i = argv.indexOf('--diff');
    const [a, b] = [argv[i + 1], argv[i + 2]].map((f) => JSON.parse(readFileSync(f, 'utf8')));
    const diff = diffSnapshots(a, b);
    for (const d of diff) console.log(`${d.url}\t${d.field}\n    - ${d.before}\n    + ${d.after}`);
    const timing = Object.keys(a.pages)
      .filter((u) => b.pages[u])
      .map((u) => [u, a.pages[u].ttfbMs, b.pages[u].ttfbMs]);
    const slow = timing.filter(([, x, y]) => x != null && y != null && y > x * 1.2 && y - x > 50);
    for (const [u, x, y] of slow) console.log(`${u}\tttfb ${x}ms -> ${y}ms`);
    console.log(`${diff.length} difference(s), ${slow.length} slower page(s) (>20% and >50ms)`);
    process.exit(diff.length ? 1 : 0);
  }
  const base = arg('--base');
  const out = arg('--out');
  if (!base || !out) throw new Error('usage: --base <url> --out <file> | --diff <a> <b>');
  const runs = Number(arg('--runs', 3));
  const paths = [
    ...new Set([...STATIC_PATHS, ...(await sitemapPaths(base, Number(arg('--sitemap-cap', 15)))), ...PROBES]),
  ];
  const pages = {};
  for (const path of paths) {
    try {
      pages[path] = await snapshotUrl(base, path, runs);
    } catch (e) {
      pages[path] = { error: `fetch failed: ${e.message}` };
    }
    process.stdout.write('.');
  }
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, JSON.stringify({ base, takenAt: new Date().toISOString(), pages }, null, 2));
  const failed = Object.values(pages).filter((p) => p.error).length;
  console.log(`\n${paths.length} urls, ${failed} fetch failures -> ${out}`);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  main(process.argv.slice(2)).catch((e) => {
    console.error(e.message);
    process.exit(2);
  });
}
