const { test } = require('node:test');
const assert = require('node:assert/strict');
const path = require('node:path');
const { pathToFileURL } = require('node:url');

const load = () => import(pathToFileURL(path.join(__dirname, '..', 'scripts', 'route-snapshot.mjs')).href);

const SAMPLE = `<!doctype html><html><head>
<title>About | JNVPJAA</title>
<meta name="description" content="Who we are">
<meta name="robots" content="index, follow">
<link rel="canonical" href="https://jnvpjaa.org/about">
<meta property="og:title" content="About us">
<meta name="twitter:card" content="summary">
<link rel="alternate" hreflang="hi" href="https://jnvpjaa.org/hi/about">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"WebPage","name":"About"}</script>
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"JNVPJAA"}</script>
<style>.x{color:red}</style>
</head><body><main><h1>About <b>us</b></h1><p>We are alumni.</p><script>var a=1</script></main></body></html>`;

test('parsePage extracts the SEO head, structured data and visible text', async () => {
  const { parsePage } = await load();
  const facts = parsePage(SAMPLE, {
    'content-type': 'text/html; charset=utf-8',
    'cache-control': 'private, no-cache',
    'x-frame-options': 'SAMEORIGIN',
    'x-powered-by': 'Next.js',
  });
  assert.equal(facts.title, 'About | JNVPJAA');
  assert.equal(facts.description, 'Who we are');
  assert.equal(facts.robots, 'index, follow');
  assert.equal(facts.canonical, 'https://jnvpjaa.org/about');
  assert.equal(facts.og['og:title'], 'About us');
  assert.equal(facts.twitter['twitter:card'], 'summary');
  assert.deepEqual(facts.hreflang, ['hi=https://jnvpjaa.org/hi/about']);
  assert.deepEqual(facts.jsonLdTypes, ['Organization', 'WebPage']);
  assert.equal(facts.jsonLdHashes.length, 2);
  assert.equal(facts.h1, 'About us');
  assert.ok(facts.textLength > 0);
  assert.equal(facts.security['x-frame-options'], 'SAMEORIGIN');
  assert.equal(facts.security['x-powered-by'], undefined);
  assert.equal(facts.cacheControl, 'private, no-cache');
});

test('diffSnapshots reports exactly the changed field', async () => {
  const { diffSnapshots } = await load();
  const page = (title) => ({ status: 200, redirects: [], facts: { title, h1: 'x' }, ttfbMs: 10, totalMs: 20 });
  const a = { pages: { '/': page('Home'), '/about': page('About') } };
  const b = { pages: { '/': page('Home'), '/about': page('About us') } };
  const diff = diffSnapshots(a, b);
  assert.equal(diff.length, 1);
  assert.equal(diff[0].url, '/about');
  assert.equal(diff[0].field, 'facts.title');
});

test('diffSnapshots ignores timing and flags missing pages', async () => {
  const { diffSnapshots } = await load();
  const a = { pages: { '/': { status: 200, ttfbMs: 5 }, '/gone': { status: 200 } } };
  const b = { pages: { '/': { status: 200, ttfbMs: 900 } } };
  assert.deepEqual(
    diffSnapshots(a, b).map((d) => [d.url, d.field]),
    [['/gone', 'missing']]
  );
});
