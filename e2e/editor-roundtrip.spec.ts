import { existsSync, readFileSync, writeFileSync } from 'fs';
import path from 'path';
import { expect, test, type Page } from '@playwright/test';
import { signedIn } from './support';

/**
 * Stored rich text must survive the editor unchanged: load each corpus item into the real editor and compare
 * getHTML() with what the editor produced when the corpus was recorded (RECORD=1 writes expected.json).
 */
type Item = { id: string; source: string; kind: string; html: string };

const DIR = path.join(__dirname, 'fixtures/editor-corpus');
const EXPECTED = path.join(DIR, 'expected.json');
const read = (file: string): Item[] =>
  existsSync(path.join(DIR, file)) ? JSON.parse(readFileSync(path.join(DIR, file), 'utf8')) : [];
const corpus = [...read('handbuilt.json'), ...read('local.json'), ...read('live.json')];

async function openEditor(page: Page) {
  await page.goto('/blog/new/');
  await page.waitForFunction(() => Boolean((document.querySelector('.ProseMirror') as any)?.editor), null, {
    timeout: 60_000,
  });
}

/** Load HTML into the editor without firing onUpdate (nothing is saved) and read it back. */
const roundTrip = (page: Page, html: string) =>
  page.evaluate((h) => {
    const editor = (document.querySelector('.ProseMirror') as any).editor;
    editor.commands.setContent(h, { emitUpdate: false });
    return editor.getHTML() as string;
  }, html);

test.describe.configure({ mode: 'serial' });

test('stored rich text round-trips through the editor unchanged', async ({ browser }) => {
  test.setTimeout(180_000);
  expect(corpus.length).toBeGreaterThan(20);
  const context = await signedIn(browser, 'member');
  const page = await context.newPage();
  await openEditor(page);

  const actual: Record<string, string> = {};
  for (const item of corpus) actual[item.id] = await roundTrip(page, item.html);
  await context.close();

  if (process.env.RECORD === '1') {
    writeFileSync(EXPECTED, JSON.stringify(actual, null, 2));
    return;
  }
  const expected: Record<string, string> = JSON.parse(readFileSync(EXPECTED, 'utf8'));
  const changed = corpus.map((i) => i.id).filter((id) => actual[id] !== expected[id]);
  for (const id of changed) {
    console.log(`\n--- ${id}\n- ${expected[id]}\n+ ${actual[id]}`);
  }
  expect(changed, 'corpus items whose editor output changed').toEqual([]);
});

test('hostile HTML loaded into the editor leaves nothing executable', async ({ browser }) => {
  const hostile = corpus.find((i) => i.id === 'hb:hostile')!;
  const context = await signedIn(browser, 'member');
  const page = await context.newPage();
  await openEditor(page);
  const out = await roundTrip(page, hostile.html);
  await page.waitForTimeout(500); // give a broken <img> time to fire onerror if it survived
  expect(await page.evaluate(() => (window as any).__xss)).toBeUndefined();
  expect(out).not.toMatch(/onerror|onclick|javascript:|<script|__proto__/i);
  expect(
    await page.locator('.ProseMirror [onerror], .ProseMirror [onclick], .ProseMirror a[href^="javascript:"]').count()
  ).toBe(0);
  await context.close();
});

test('paste keeps formatting and drops scripts', async ({ browser }) => {
  const context = await signedIn(browser, 'member');
  const page = await context.newPage();
  await openEditor(page);
  // Shaped like Word / Google Docs clipboard HTML.
  const pasted =
    '<meta charset="utf-8"><b style="font-weight:normal" id="docs-internal-guid-1"><p><span style="font-weight:700">Bold words</span></p>' +
    '<ul><li><p>first item</p></li><li><p>second item</p></li></ul>' +
    '<p><span style="color:#cc0000">red text</span></p></b><script>window.__xss=5</script><p onclick="window.__xss=6">click</p>';
  const out = await page.evaluate((html) => {
    const el = document.querySelector('.ProseMirror') as HTMLElement & { editor: any };
    el.editor.commands.setContent('', { emitUpdate: false });
    el.editor.commands.focus();
    const data = new DataTransfer();
    data.setData('text/html', html);
    data.setData('text/plain', 'Bold words first item second item red text click');
    el.dispatchEvent(new ClipboardEvent('paste', { clipboardData: data, bubbles: true, cancelable: true }));
    return el.editor.getHTML() as string;
  }, pasted);
  await context.close();
  expect(out).toMatch(/<strong>Bold words<\/strong>/);
  expect(out).toMatch(/<ul><li><p>first item<\/p><\/li><li><p>second item<\/p><\/li><\/ul>/);
  expect(out).toMatch(/color:\s*(#cc0000|rgb\(204, 0, 0\))/);
  expect(out).not.toMatch(/<script|onclick|__xss/i);
});
