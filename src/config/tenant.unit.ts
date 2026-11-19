import { readFileSync } from 'fs';
import path from 'path';
import { expect, test } from '@playwright/test';
import { parseTenant } from './tenant.schema';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { resolveTenant } = require('../../tenants/resolve');

const load = (id: string): any => {
  const read = (f: string) => JSON.parse(readFileSync(path.join(__dirname, '../../tenants', id, `${f}.json`), 'utf8'));
  return {
    brand: read('brand'),
    seo: read('seo'),
    features: read('features'),
    content: read('content'),
    landing: read('landing'),
  };
};

test('jnvpjaa tenant parses', () => {
  const t = parseTenant(load('jnvpjaa'), 'jnvpjaa');
  expect(t.brand.name).toBe('JNVPJAA');
  expect(t.brand.domains.site).toBe('jnvpjaa.org');
});

test('missing required field names the path', () => {
  const raw = load('jnvpjaa');
  delete raw.brand.domains.api;
  expect(() => parseTenant(raw, 'x')).toThrow(/Invalid tenant "x"[\s\S]*brand\.domains\.api/);
});

test('unknown feature key is rejected', () => {
  const raw = load('jnvpjaa');
  raw.features.chat = true;
  expect(() => parseTenant(raw, 'x')).toThrow(/features/);
});

test('optional socials may be absent', () => {
  const raw = load('jnvpjaa');
  raw.brand.socials = {};
  expect(parseTenant(raw, 'x').brand.socials.twitter).toBeUndefined();
});

test('domains reject a scheme', () => {
  const raw = load('jnvpjaa');
  raw.brand.domains.site = 'https://jnvpjaa.org';
  expect(() => parseTenant(raw, 'x')).toThrow(/domains\.site/);
});

test('resolveTenant fails without TENANT and for an unknown id', () => {
  expect(() => resolveTenant({})).toThrow(/TENANT is not set/);
  expect(() => resolveTenant({ TENANT: 'nope' })).toThrow(/tenants\/nope\/ not found/);
  expect(resolveTenant({ TENANT: 'jnvpjaa' }).id).toBe('jnvpjaa');
});

test('the build-time tenant module exposes the validated jnvpjaa config', () => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const { brand, features } = require('./tenant');
  expect(brand.id).toBe('jnvpjaa');
  expect(features.jobs).toBe(true);
});
