const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

// Transpile a dependency-free TS module and evaluate it in isolation.
const load = (file) => {
  const source = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const mod = {};
  vm.runInNewContext(source, { exports: mod, require, Intl, Date });
  return mod;
};

const utils = load('src/modules/Newsroom/newsroom.utils.ts');

test('dateline uses India time and the Jaipur place name', () => {
  assert.equal(utils.formatDateline('2026-11-16T10:00:00+05:30'), 'JAIPUR, 16 Nov 2026');
  assert.equal(utils.formatDateline('2026-11-16T20:00:00Z'), 'JAIPUR, 17 Nov 2026');
  assert.equal(utils.formatDateline('2026-11-16T10:00:00+05:30', 'NEW DELHI'), 'NEW DELHI, 16 Nov 2026');
});

test('category guard accepts only known categories', () => {
  assert.equal(utils.isNewsCategory('PRESS_RELEASE'), true);
  assert.equal(utils.isNewsCategory('x'), false);
  assert.equal(utils.isNewsCategory(undefined), false);
});

test('every category has a label and the byline is the association', () => {
  assert.deepEqual(JSON.parse(JSON.stringify(utils.NEWS_CATEGORY_LABELS)), {
    ANNOUNCEMENT: 'Announcement',
    PRESS_RELEASE: 'Press release',
    ACHIEVEMENT: 'Achievement',
    IN_THE_MEDIA: 'In the media',
  });
  assert.equal(utils.NEWS_BYLINE, 'JNVPJAA Communications');
});

const { latestNews } = load('src/modules/Newsroom/latestNews.ts');

test('latestNews returns [] on error', async () => {
  const posts = await latestNews(() => Promise.reject(new Error('API down')), {});
  assert.equal(JSON.stringify(posts), '[]');
});

test('latestNews requests 3', async () => {
  let seen;
  const posts = await latestNews(async (opts) => {
    seen = opts;
    return { data: { newsPosts: { data: [{ slug: 'a' }, { slug: 'b' }] } } };
  }, 'DOC');
  assert.equal(seen.variables.limit, 3);
  assert.equal(seen.query, 'DOC');
  assert.deepEqual(
    posts.map((p) => p.slug),
    ['a', 'b']
  );
});

test('manage status: draft, scheduled when publishedAt is in the future, else published', () => {
  const now = new Date('2026-11-16T12:00:00Z');
  assert.equal(utils.newsStatusLabel('DRAFT', '2026-11-20T00:00:00Z', now), 'Draft');
  assert.equal(utils.newsStatusLabel('PUBLISHED', '2026-11-17T00:00:00Z', now), 'Scheduled');
  assert.equal(utils.newsStatusLabel('PUBLISHED', '2026-11-16T11:00:00Z', now), 'Published');
  assert.equal(utils.newsStatusLabel('PUBLISHED', null, now), 'Published');
});
