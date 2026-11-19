import { expect, test } from '@playwright/test';
import { mkdirSync, mkdtempSync, writeFileSync } from 'fs';
import { tmpdir } from 'os';
import path from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { checkTenants } = require('../../scripts/tenant-check');

const repo = (features: object) => {
  const root = mkdtempSync(path.join(tmpdir(), 'tenant-check-'));
  mkdirSync(path.join(root, 'tenants/x'), { recursive: true });
  writeFileSync(path.join(root, 'tenants/x/brand.json'), '{"id":"x"}');
  writeFileSync(path.join(root, 'tenants/x/features.json'), JSON.stringify(features));
  return root;
};

test('tenant:check reports features.json drift between the repos', () => {
  expect(checkTenants(repo({ jobs: true }), repo({ jobs: true }))).toEqual([]);
  expect(checkTenants(repo({ jobs: true }), repo({ jobs: false }))).toEqual(['x: features.json differs at jobs']);
});
