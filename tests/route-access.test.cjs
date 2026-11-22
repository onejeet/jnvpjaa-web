const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(readFileSync('src/utils/routeAccess.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const mod = {};
vm.runInNewContext(source, { exports: mod });

test('newsroom pages are public, its editor is not', () => {
  for (const path of ['/newsroom', '/newsroom/', '/newsroom/feed.xml', '/newsroom/annual-meet-2026/']) {
    assert.equal(mod.isProtectedRoute(path), false, path);
  }
  assert.equal(mod.isProtectedRoute('/newsroom/new'), true);
  assert.equal(mod.isProtectedRoute('/newsroom/new/'), true);
});

test('create and edit screens stay protected, look-alike slugs do not', () => {
  for (const path of ['/blog/new', '/blog/new/', '/events/new', '/gallery/new/', '/business/edit/1']) {
    assert.equal(mod.isProtectedRoute(path), true, path);
  }
  for (const path of ['/blog/new-year-at-navodaya/', '/blog/edited-memories/']) {
    assert.equal(mod.isProtectedRoute(path), false, path);
  }
  for (const path of ['/admin', '/profile/x', '/security/']) assert.equal(mod.isProtectedRoute(path), true, path);
  // The discussion board is members only.
  for (const path of ['/discussions', '/discussions/abc']) assert.equal(mod.isProtectedRoute(path), true, path);
});

test('jobs: board and job pages are public, posting and applicants are not', () => {
  for (const path of ['/jobs', '/jobs/', '/jobs/frontend-intern-acme', '/jobs/new-grad-role-acme/']) {
    assert.equal(mod.isProtectedRoute(path), false, path);
  }
  for (const path of ['/jobs/new', '/jobs/new/', '/jobs/frontend-intern-acme/applicants', '/jobs/x/applicants/']) {
    assert.equal(mod.isProtectedRoute(path), true, path);
  }
});
