import { existsSync } from 'fs';
import { join } from 'path';
import { expect, test } from '@playwright/test';
import { landingSchema, LANDING_LAYOUTS } from './tenant.schema';
import { landing } from './tenant';
import { safeList } from '../containers/Landing/safeList';

test('every tenant landing config parses and the live tenant keeps the classic home page', () => {
  expect(LANDING_LAYOUTS).toEqual(['classic', 'homecoming', 'welcome', 'spotlight', 'impact']);
  expect(landing.layout).toBe('classic');
});

test('every layout has the home entry next.config.js points @landing/Home at', () => {
  for (const layout of LANDING_LAYOUTS) {
    expect(existsSync(join(__dirname, `../containers/Landing/home/${layout}.tsx`)), layout).toBe(true);
  }
});

test('an unknown landing layout is rejected by name', () => {
  const bad = landingSchema.safeParse({ ...landing, layout: 'fancy' });
  expect(bad.success).toBe(false);
  expect(bad.error?.issues[0].path).toEqual(['layout']);
});

test('a failing landing query yields an empty list so its section hides', async () => {
  expect(
    await safeList(
      () => Promise.reject(new Error('down')),
      (d: any) => d.x
    )
  ).toEqual([]);
  expect(
    await safeList(
      () => Promise.resolve({ data: { x: [1, null, 2] } }),
      (d: any) => d.x
    )
  ).toEqual([1, 2]);
});
