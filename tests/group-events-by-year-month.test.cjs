const { test } = require('node:test');
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');

const source = ts.transpileModule(readFileSync('src/modules/PastEventListModule/groupEventsByYearMonth.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
}).outputText;
const mod = {};
vm.runInNewContext(source, { exports: mod, require });
// vm returns arrays from another realm; round-trip so deepEqual compares plain values.
const groupEventsByYearMonth = (events) => JSON.parse(JSON.stringify(mod.groupEventsByYearMonth(events)));

test('groups newest-first events into year and month buckets in order', () => {
  const events = [
    { id: 1, startDate: '2026-10-20T10:00:00' },
    { id: 2, startDate: '2026-10-02T10:00:00' },
    { id: 3, startDate: '2026-03-15T10:00:00' },
    { id: 4, startDate: '2025-12-31T10:00:00' },
  ];
  const groups = groupEventsByYearMonth(events);
  assert.deepEqual(
    groups.map((y) => [y.year, y.months.map((m) => [m.label, m.items.map((e) => e.id)])]),
    [
      [
        2026,
        [
          ['October', [1, 2]],
          ['March', [3]],
        ],
      ],
      [2025, [['December', [4]]]],
    ]
  );
});

test('returns no groups for no events', () => {
  assert.deepEqual(groupEventsByYearMonth([]), []);
});
