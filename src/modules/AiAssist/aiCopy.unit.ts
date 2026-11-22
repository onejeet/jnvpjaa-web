import { expect, test } from '@playwright/test';
import { aiErrorMessage, formatResetTime } from './aiCopy';

const err = (code: string, resetsAt = '2026-11-23T08:00:00.000Z') => ({
  graphQLErrors: [{ extensions: { code, resetsAt } }],
});

test('each AI error becomes one plain sentence with the local reset time', () => {
  const time = formatResetTime('2026-11-23T08:00:00.000Z', 'en-IN', 'Asia/Kolkata');
  expect(time).toBe('1:30 pm');
  expect(aiErrorMessage(err('AI_MEMBER_LIMIT'), 'en-IN', 'Asia/Kolkata')).toBe(
    "You've used today's AI help. It's back at 1:30 pm."
  );
  expect(aiErrorMessage(err('AI_DAILY_LIMIT'), 'en-IN', 'Asia/Kolkata')).toBe(
    'AI help is resting for now. Your draft is safe — try again after 1:30 pm.'
  );
  expect(aiErrorMessage(err('AI_BUSY'))).toBe('AI is busy for a moment. Please try again in a few seconds.');
  expect(aiErrorMessage(err('TOO_MANY_REQUESTS'))).toBe('AI is busy for a moment. Please try again in a few seconds.');
  // A Super Admin can switch AI off while a page is open.
  expect(aiErrorMessage(err('AI_UNAVAILABLE'))).toBe(
    'AI writing help is switched off right now. Your draft is unchanged.'
  );
  for (const e of [err('AI_FAILED'), new Error('Network down'), null]) {
    expect(aiErrorMessage(e)).toBe("AI couldn't help this time. Your draft is unchanged.");
  }
});

test('server messages for bad input pass through; no jargon ever reaches members', () => {
  expect(
    aiErrorMessage({
      graphQLErrors: [{ message: 'Please shorten your text and try again.', extensions: { code: 'BAD_REQUEST' } }],
    })
  ).toBe('Please shorten your text and try again.');
  for (const code of ['AI_MEMBER_LIMIT', 'AI_DAILY_LIMIT', 'AI_BUSY', 'AI_FAILED', 'X']) {
    expect(aiErrorMessage(err(code))).not.toMatch(/quota|429|rate|token|error code/i);
  }
});
