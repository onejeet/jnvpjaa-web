import { expect, test } from '@playwright/test';
import { brand } from '@/config/tenant';
import DefaultPalette, { buildPalette } from './index';

test('default palette uses the tenant primary scale', () => {
  const primary = DefaultPalette('light').primary as any;
  for (const [k, v] of Object.entries(brand.theme.primary)) expect(primary[k], k).toBe(v);
  expect(primary.main).toBe(brand.theme.primary['500']);
  expect(DefaultPalette('light').secondary?.main).toBe(brand.theme.secondary.light);
  expect(DefaultPalette('dark').secondary?.main).toBe(brand.theme.secondary.dark);
});

test('palette follows a different brand theme', () => {
  const theme = { ...brand.theme, primary: { ...brand.theme.primary, '500': '#123456' } };
  expect((buildPalette(theme, 'light').primary as any).main).toBe('#123456');
});
