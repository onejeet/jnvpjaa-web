import { expect, test } from '@playwright/test';
import { contentLanguage, generateSchema } from '@/config/seo.config';
import { htmlToMarkdown } from './llms';

test('htmlToMarkdown keeps structure and drops markup', () => {
  const md = htmlToMarkdown(
    '<h2>Memories</h2><p>Hello <strong>alumni</strong> &amp; <a href="https://x.org">friends</a></p><ul><li>One</li><li>Two</li></ul><script>x</script>'
  );
  expect(md).toBe('### Memories\n\nHello **alumni** & [friends](https://x.org)\n\n- One\n- Two');
  expect(htmlToMarkdown(null)).toBe('');
});

test('contentLanguage detects Hindi posts', () => {
  expect(contentLanguage('नवोदय की यादें')).toBe('hi-IN');
  expect(contentLanguage('Navodaya memories')).toBe('en-IN');
});

test('event schema never invents a venue for protected locations', () => {
  const loc = (e: object) => (e as { location?: unknown }).location;
  const base = { id: 6, title: 'Meet', startDate: '2026-01-01', summary: 's' };
  expect(loc(generateSchema.event({ ...base, location: 'protected', medium: 'offline' }))).toBeUndefined();
  expect(loc(generateSchema.event({ ...base, location: 'protected', medium: 'online' }))).toMatchObject({
    '@type': 'VirtualLocation',
  });
});
