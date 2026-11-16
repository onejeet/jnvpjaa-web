const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(readFileSync('src/modules/CommentsModule/commentThreads.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
const mod = {};
vm.runInNewContext(source, { exports: mod });
// vm returns objects from another realm; round-trip so deepEqual compares plain values.
const plain =
  (fn) =>
  (...args) =>
    JSON.parse(JSON.stringify(fn(...args)));
const buildCommentThreads = plain(mod.buildCommentThreads);
const toggleReaction = plain(mod.toggleReaction);
const splitLinks = plain(mod.splitLinks);

test('threads: newest conversation first, replies in order, empty tombstones dropped', () => {
  const threads = buildCommentThreads([
    { id: 'a' },
    { id: 'b' },
    { id: 'a1', parentId: 'a' },
    { id: 'gone', isDeleted: true },
    { id: 'kept', isDeleted: true },
    { id: 'k1', parentId: 'kept' },
    { id: 'a2', parentId: 'a' },
  ]);
  assert.deepEqual(
    threads.map((t) => [t.comment.id, t.replies.map((r) => r.id)]),
    [
      ['kept', ['k1']],
      ['b', []],
      ['a', ['a1', 'a2']],
    ]
  );
});

test('reaction toggle adds, removes and drops empty pills', () => {
  assert.deepEqual(toggleReaction([], '👍'), [{ emoji: '👍', count: 1, reacted: true }]);
  assert.deepEqual(toggleReaction([{ emoji: '👍', count: 1, reacted: true }], '👍'), []);
  assert.deepEqual(toggleReaction([{ emoji: '👍', count: 2, reacted: false }], '👍'), [
    { emoji: '👍', count: 3, reacted: true },
  ]);
});

test('links are split out without trailing punctuation', () => {
  assert.deepEqual(splitLinks('see https://jnvpjaa.org/blog. ok'), [
    { text: 'see ' },
    { text: 'https://jnvpjaa.org/blog', href: 'https://jnvpjaa.org/blog' },
    { text: '. ok' },
  ]);
});
