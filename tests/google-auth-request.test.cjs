const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const source = ts.transpileModule(readFileSync('src/containers/Auth/Google/requestGoogleAuth.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
function setup(fetch) {
  let expire;
  let cleared = false;
  const exports = {};
  vm.runInNewContext(source, {
    exports,
    fetch,
    AbortController,
    process: { env: { NEXT_PUBLIC_GRAPHQL_ENDPOINT: 'https://api.example.test/client' } },
    setTimeout: (fn, ms) => {
      assert.equal(ms, 15000);
      expire = fn;
      return 1;
    },
    clearTimeout: () => {
      cleared = true;
    },
  });
  return { request: exports.requestGoogleAuth, expire: () => expire(), cleared: () => cleared };
}
test('reads the flow using cookies without caching', async () => {
  const flow = { googleAuthFlow: { status: 'LINK' } };
  const app = setup(async (url, options) => {
    assert.equal(url, 'https://api.example.test/client');
    assert.equal(options.credentials, 'include');
    assert.equal(options.cache, 'no-store');
    return { ok: true, json: async () => ({ data: flow }) };
  });
  assert.equal(await app.request('query GoogleAuthFlow { googleAuthFlow { status } }'), flow);
  assert.equal(app.cleared(), true);
});
test('aborts a stalled request instead of leaving the callback loading forever', async () => {
  const app = setup(
    (_url, options) =>
      new Promise((_resolve, reject) => {
        options.signal.addEventListener('abort', () => reject(new Error('aborted')));
      })
  );
  const pending = app.request('query');
  app.expire();
  await assert.rejects(pending, /took too long/);
  assert.equal(app.cleared(), true);
});
test('preserves expired-flow errors for the sign-in notice', async () => {
  const app = setup(async () => ({
    ok: true,
    json: async () => ({ errors: [{ message: 'Expired', extensions: { code: 'GOOGLE_AUTH_FAILED' } }] }),
  }));
  await assert.rejects(app.request('query'), { message: 'Expired', code: 'GOOGLE_AUTH_FAILED' });
  assert.equal(app.cleared(), true);
});
test('rejects missing response data', async () => {
  const app = setup(async () => ({ ok: true, json: async () => ({ data: null }) }));
  await assert.rejects(app.request('query'), /Could not complete/);
});
