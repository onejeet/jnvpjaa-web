import { expect, test } from '@playwright/test';
import dayjs from 'dayjs';
import { memberTag, pollTimeLeft, shortTime } from './discussion.utils';

const now = dayjs('2026-11-22T12:00:00Z');

test('shortTime reads like a feed', () => {
  expect(shortTime('2026-11-22T11:59:40Z', now)).toBe('now');
  expect(shortTime('2026-11-22T11:55:00Z', now)).toBe('5m');
  expect(shortTime('2026-11-22T09:00:00Z', now)).toBe('3h');
  expect(shortTime('2026-11-20T12:00:00Z', now)).toBe('2d');
  expect(shortTime('2026-11-01T12:00:00Z', now)).toBe('1 Nov');
  expect(shortTime('2025-03-04T12:00:00Z', now)).toBe('4 Mar 2025');
});

test('pollTimeLeft counts down in plain words', () => {
  expect(pollTimeLeft('2026-11-25T12:00:00Z', false, now)).toBe('3 days left');
  expect(pollTimeLeft('2026-11-23T11:00:00Z', false, now)).toBe('23 hours left');
  expect(pollTimeLeft('2026-11-22T13:00:00Z', false, now)).toBe('1 hour left');
  expect(pollTimeLeft('2026-11-22T12:10:00Z', false, now)).toBe('10 minutes left');
  expect(pollTimeLeft('2026-11-21T12:00:00Z', true, now)).toBe('Final results');
});

test('memberTag prefers Faculty, then batch', () => {
  expect(memberTag({ batch: 2011 })).toBe('Batch 2011');
  expect(memberTag({ batch: 2011, isFaculty: true })).toBe('Faculty');
  expect(memberTag({})).toBeNull();
});
