import { existsSync, mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'fs';
import os from 'os';
import path from 'path';
import { expect, test } from '@playwright/test';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { copyTenantAssets } = require('../../scripts/tenant-assets');

const fakeTenant = (withFonts = true) => {
  const dir = mkdtempSync(path.join(os.tmpdir(), 'tenant-'));
  mkdirSync(path.join(dir, 'public/icons'), { recursive: true });
  writeFileSync(path.join(dir, 'public/favicon.png'), 'x');
  writeFileSync(path.join(dir, 'public/icons/icon-192.png'), 'x');
  mkdirSync(path.join(dir, 'fonts'));
  for (const f of withFonts ? ['body', 'display', 'serif'] : ['display', 'serif'])
    writeFileSync(path.join(dir, `fonts/${f}.woff2`), 'x');
  return { id: 'fake', dir };
};

test('copies the tenant public files and fonts into place', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'root-'));
  const copied: string[] = copyTenantAssets(fakeTenant(), root);
  expect(existsSync(path.join(root, 'public/favicon.png'))).toBe(true);
  expect(existsSync(path.join(root, 'public/icons/icon-192.png'))).toBe(true);
  expect(existsSync(path.join(root, 'src/utils/theme/fonts/files/body.woff2'))).toBe(true);
  expect(copied).toContain('public/icons/icon-192.png');
  rmSync(root, { recursive: true });
});

test('a tenant missing a font fails with the file it needs', () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'root-'));
  expect(() => copyTenantAssets(fakeTenant(false), root)).toThrow(/tenants\/fake\/fonts\/body\.woff2 missing/);
  rmSync(root, { recursive: true });
});

test("switching tenants removes the previous tenant's files", () => {
  const root = mkdtempSync(path.join(os.tmpdir(), 'root-'));
  copyTenantAssets(fakeTenant(), root);
  const other = fakeTenant();
  rmSync(path.join(other.dir, 'public/icons'), { recursive: true });
  copyTenantAssets(other, root);
  expect(existsSync(path.join(root, 'public/icons/icon-192.png'))).toBe(false);
  expect(existsSync(path.join(root, 'public/favicon.png'))).toBe(true);
  rmSync(root, { recursive: true });
});
