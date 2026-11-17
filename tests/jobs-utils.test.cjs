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

const utils = load('src/modules/Jobs/jobs.utils.ts');

test('salary uses rupees with Indian grouping', () => {
  assert.equal(utils.formatSalary(600000, 900000, 'YEAR'), '₹6,00,000 – ₹9,00,000 / year');
  assert.equal(utils.formatSalary(20000, null, 'MONTH'), 'From ₹20,000 / month');
  assert.equal(utils.formatSalary(null, 50000, 'MONTH'), 'Up to ₹50,000 / month');
  assert.equal(utils.formatSalary(30000, 30000, 'MONTH'), '₹30,000 / month');
  assert.equal(utils.formatSalary(null, null), null);
});

test('deadline label shows the last day to apply in India time', () => {
  assert.equal(utils.deadlineLabel('2026-11-20T18:30:00.000Z'), 'Apply by 20 Nov 2026');
  assert.equal(utils.deadlineLabel(null), null);
  assert.equal(utils.deadlineInputValue('2026-11-20T18:30:00.000Z'), '2026-11-20');
});

test('social handles become profile links', () => {
  assert.equal(utils.socialUrl('github', 'octo'), 'https://github.com/octo');
  assert.equal(utils.socialUrl('linkedin', 'jane-doe'), 'https://www.linkedin.com/in/jane-doe');
  assert.equal(utils.socialUrl('linkedin', ''), '');
});

test('https check matches the API rule', () => {
  assert.equal(utils.isHttpsUrl('https://drive.google.com/x'), true);
  assert.equal(utils.isHttpsUrl('drive.google.com/x'), false);
  assert.equal(utils.isHttpsUrl('https://a b'), false);
});

test('amount input groups digits the Indian way and keeps only digits', () => {
  assert.equal(utils.amountDigits('6,00,000'), '600000');
  assert.equal(utils.amountDigits('₹ 12a3'), '123');
  assert.equal(utils.amountDigits('007'), '7');
  assert.equal(utils.amountDigits('1234567890123'), '123456789');
  assert.equal(utils.amountDigits(''), '');
  assert.equal(utils.groupAmount('600000'), '6,00,000');
  assert.equal(utils.groupAmount('15000'), '15,000');
  assert.equal(utils.groupAmount(''), '');
});
