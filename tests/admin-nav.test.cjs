const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

// Transpile a TS module, resolving the `@/` alias to src/.
const load = (file) => {
  const source = ts.transpileModule(readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  const localRequire = (id) => (id.startsWith('@/') ? load(path.join('src', `${id.slice(2)}.ts`)) : require(id));
  vm.runInNewContext(source, { exports: mod.exports, module: mod, require: localRequire });
  return mod.exports;
};

const { getAdminNav, getActiveItem } = load('src/modules/AdminShell/adminNav.ts');
// The backend's grants are the source of truth for what each position holds.
const backend = load('../jnvpjaa-backend/src/constants/access.ts');

const viewer = ({ perms = [], roles = [] }) => ({
  can: (code) => roles.includes('SUPER_ADMIN') || perms.includes(code),
  hasRole: (code) => roles.includes(code),
});
const position = (code) => viewer({ perms: backend.EXECUTIVE_POSITION_PERMISSION_MAP[code] });
// Array.from: the module runs in its own vm realm, so its arrays fail deepStrictEqual's prototype check.
const hrefs = (access) => Array.from(getAdminNav(access).flatMap((group) => group.items.map((item) => item.href)));

test('a super admin sees every item', () => {
  assert.deepEqual(hrefs(viewer({ roles: ['SUPER_ADMIN'] })), [
    '/admin',
    '/admin/access',
    '/admin/executive',
    '/admin/coordinators',
    '/admin/assignments',
    '/admin/pages',
    '/newsroom',
    '/admin/settings',
    '/admin/scholarship',
  ]);
});

test('a president manages people and content but not the platform', () => {
  assert.deepEqual(hrefs(position('PRESIDENT')), [
    '/admin',
    '/admin/executive',
    '/admin/coordinators',
    '/admin/assignments',
    '/admin/pages',
    '/newsroom',
  ]);
});

test('a vice president sees assignments and pages', () => {
  assert.deepEqual(hrefs(position('VICE_PRESIDENT_MALE')), ['/admin', '/admin/assignments', '/admin/pages']);
});

test('a treasurer sees assignments only', () => {
  assert.deepEqual(hrefs(position('TREASURER')), ['/admin', '/admin/assignments']);
});

test('a plain member sees nothing', () => {
  assert.equal(getAdminNav(viewer({})).length, 0);
});

test('nested routes resolve to their section', () => {
  const nav = getAdminNav(viewer({ roles: ['SUPER_ADMIN'] }));
  assert.equal(getActiveItem(nav, '/admin/pages/vision').href, '/admin/pages');
  assert.equal(getActiveItem(nav, '/admin').href, '/admin');
  assert.equal(getActiveItem(nav, '/admin/nope'), undefined);
});
