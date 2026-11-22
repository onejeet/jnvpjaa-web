import { existsSync } from 'fs';
import { join } from 'path';
import { expect, test } from '@playwright/test';
import { landingSchema, LANDING_LAYOUTS } from './tenant.schema';
import { landing } from './tenant';
import { safeList } from '../containers/Landing/safeList';
import { alumniMilestone, celebratingBatches } from '../containers/Landing/celebrating';

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

test('batches celebrating are the 10, 25 and 50 year batches that exist', () => {
  expect(celebratingBatches(2026).map((b) => b.batch)).toEqual([2016, 2001]);
  expect(celebratingBatches(2043).map((b) => b.batch)).toEqual([2033, 2018, 1993]);
});

test('a profile shows the biggest milestone its batch has reached', () => {
  expect(alumniMilestone(2020, 2026)).toBeNull();
  expect(alumniMilestone(0, 2026)).toBeNull();
  expect(alumniMilestone(2016, 2026)).toMatchObject({ label: '10 years', thisYear: true });
  expect(alumniMilestone(2010, 2026)).toMatchObject({ years: 10, yearsOut: 16, thisYear: false });
  expect(alumniMilestone(2001, 2026)).toMatchObject({ label: 'Silver jubilee', thisYear: true });
  expect(alumniMilestone(1970, 2026)).toMatchObject({ label: 'Golden jubilee', thisYear: false });
});

test('the FAQ is optional and capped at eight questions', () => {
  const { faq, ...rest } = landing;
  expect(landingSchema.safeParse(rest).success).toBe(true);
  const nine = Array.from({ length: 9 }, (_, i) => ({ question: `Q${i}`, answer: 'A' }));
  expect(landingSchema.safeParse({ ...landing, faq: nine }).success).toBe(false);
  expect(faq?.length).toBeGreaterThan(0);
});
