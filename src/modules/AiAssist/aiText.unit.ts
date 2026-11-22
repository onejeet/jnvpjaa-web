import { expect, test } from '@playwright/test';
import { escapeHtml, hasMedia, htmlText, isFilled, sameValue, wordCount } from './aiText';

test('html text and word count read like a person would', () => {
  expect(htmlText('<h2>Hi</h2><p>Tom &amp; Jerry&nbsp;met</p><ul><li>one</li><li>two</li></ul>')).toBe(
    'Hi\nTom & Jerry met\none\ntwo'
  );
  expect(wordCount(htmlText('<p>one two</p><p>three</p>'))).toBe(3);
  expect(wordCount('   ')).toBe(0);
});

test('media, filled and same-value checks', () => {
  expect(hasMedia('<p>x</p><img src="a">')).toBe(true);
  expect(hasMedia('<p>image of a cat</p>')).toBe(false);
  expect(isFilled('<p></p>')).toBe(false);
  expect(isFilled([{ heading: '', body: '<p>x</p>' }])).toBe(true);
  expect(isFilled([])).toBe(false);
  expect(sameValue('<p>Hello  world</p>', 'Hello world')).toBe(true);
  expect(sameValue([{ heading: 'A', body: '<p>b</p>' }], [{ heading: 'A', body: 'b' }])).toBe(true);
  expect(sameValue('a', 'b')).toBe(false);
  expect(escapeHtml('<b>&"')).toBe('&lt;b&gt;&amp;&quot;');
});
