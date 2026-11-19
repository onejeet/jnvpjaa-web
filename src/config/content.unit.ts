import { expect, test } from '@playwright/test';
import { assetUrl, t } from './tenant';

test('t() returns tenant copy and fails loudly on a missing key', () => {
  expect(t('home.heroTitle').length).toBeGreaterThan(0);
  expect(() => t('nope')).toThrow(/Missing content key "nope" for tenant "jnvpjaa"/);
});

test('assetUrl() points at the tenant assets host', () => {
  expect(assetUrl('/svg/clap_icon.svg')).toBe('https://assets.jnvpjaa.org/svg/clap_icon.svg');
});
