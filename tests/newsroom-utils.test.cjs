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
