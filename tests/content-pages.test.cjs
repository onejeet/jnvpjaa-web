const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

// Transpile a TS module and evaluate it in isolation (zod resolves through the real require).
const load = (file) => {
  const source = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  vm.runInNewContext(source, { exports: mod.exports, module: mod, require });
  return mod.exports;
};

const registry = load('src/modules/ContentPages/contentPages.registry.ts');
const schema = load('src/modules/ContentPages/contentPages.schema.ts');

test('registry matches the backend page set', () => {
  const backend = readFileSync('../jnvpjaa-backend/src/services/contentPages/schema.ts', 'utf8');
  const pairs = [...backend.matchAll(/'?([a-z-]+)'?: \{ type: '([a-z-]+)'/g)].map(([, slug, type]) => [slug, type]);
  assert.equal(pairs.length, 7);
  assert.deepEqual(
    Object.entries(registry.CONTENT_PAGES).map(([slug, page]) => [slug, page.type]),
    pairs
  );
});

const message = { heading: 'Hi', body: '<p>x</p>' };
const ok = (type, fields) => schema.contentFieldsSchema(type).safeParse(fields).success;

test('web schema rejects what the backend rejects', () => {
  assert.equal(ok('message', message), true);
  assert.equal(ok('message', { ...message, heading: '' }), false);
  assert.equal(ok('message', { ...message, photo: { url: 'javascript:alert(1)', alt: 'x' } }), false);
  const list = {
    heading: 'P',
    groups: [{ key: 'platinum', label: 'Platinum', visible: true }],
    people: [{ name: 'A', group: 'gold' }],
  };
  assert.equal(ok('people-list', list), false);
  assert.equal(ok('people-list', { ...list, people: [{ name: 'A', group: 'platinum' }] }), true);
});
