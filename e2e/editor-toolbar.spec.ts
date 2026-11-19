import { expect, test, type Page } from '@playwright/test';
import { signedIn } from './support';

/** Every rendered editor control still does its job, and the selection toolbar opens below the selection. */
test.describe.configure({ mode: 'serial' });

const html = (page: Page) =>
  page.evaluate(() => (document.querySelector('.ProseMirror') as any).editor.getHTML() as string);

/** Replace the content with one paragraph and select `hello` (positions 1-6). */
const reset = (page: Page, content = '<p>hello world</p>') =>
  page.evaluate((c) => {
    const editor = (document.querySelector('.ProseMirror') as any).editor;
    editor.commands.setContent(c, { emitUpdate: false });
    editor.chain().focus().setTextSelection({ from: 1, to: 6 }).run();
  }, content);

async function open(page: Page) {
  await page.goto('/blog/new/');
  await page.waitForFunction(() => Boolean((document.querySelector('.ProseMirror') as any)?.editor), null, {
    timeout: 60_000,
  });
}

const tools = (page: Page) => page.getByRole('toolbar', { name: 'Text editor tools' });

test('marks, blocks, alignment, headings and history', async ({ browser }) => {
  const context = await signedIn(browser, 'member', { viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  await open(page);
  const t = tools(page);

  for (const [label, tag] of [
    ['Bold', 'strong'],
    ['Italic', 'em'],
    ['Underline', 'u'],
    ['Strike', 's'],
    ['Code', 'code'],
  ] as const) {
    await reset(page);
    await t.getByRole('button', { name: label, exact: true }).click();
    expect(await html(page), label).toBe(`<p><${tag}>hello</${tag}> world</p>`);
    await t.getByRole('button', { name: label, exact: true }).click();
    expect(await html(page), `${label} off`).toBe('<p>hello world</p>');
  }

  await reset(page);
  await t.getByRole('button', { name: 'Bulletlist', exact: true }).click();
  expect(await html(page)).toBe('<ul><li><p>hello world</p></li></ul>');
  await reset(page);
  await t.getByRole('button', { name: 'Orderedlist', exact: true }).click();
  expect(await html(page)).toBe('<ol><li><p>hello world</p></li></ol>');
  await reset(page);
  await t.getByRole('button', { name: 'Blockquote' }).click();
  expect(await html(page)).toBe('<blockquote><p>hello world</p></blockquote>');

  await reset(page);
  await t.getByRole('button', { name: 'Alignment' }).click();
  await page.getByRole('button', { name: 'Align center' }).click();
  expect(await html(page)).toBe('<p style="text-align: center;">hello world</p>');
  // Choosing moves focus back to the editor, so the popover must close itself.
  await expect(page.getByRole('group', { name: 'Choose alignment' })).toBeHidden();

  await reset(page);
  await t.getByRole('button', { name: 'Paragraph style' }).click();
  await page.getByRole('menuitem', { name: 'Heading 2' }).click();
  expect(await html(page)).toBe('<h2>hello world</h2>');

  await t.getByRole('button', { name: 'Undo' }).click();
  expect(await html(page)).toBe('<p>hello world</p>');
  await t.getByRole('button', { name: 'Redo' }).click();
  expect(await html(page)).toBe('<h2>hello world</h2>');
  await context.close();
});

test('toolbar reflects the formatting under the cursor', async ({ browser }) => {
  const context = await signedIn(browser, 'member', { viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  await open(page);
  const bold = tools(page).getByRole('button', { name: 'Bold', exact: true });
  await reset(page, '<p><strong>bold</strong> plain</p>');
  // Selection-only moves (no content change) must still update the pressed state.
  await page.evaluate(() => (document.querySelector('.ProseMirror') as any).editor.commands.setTextSelection(3));
  await expect(bold).toHaveAttribute('aria-pressed', 'true');
  await page.evaluate(() => (document.querySelector('.ProseMirror') as any).editor.commands.setTextSelection(8));
  await expect(bold).toHaveAttribute('aria-pressed', 'false');
  await context.close();
});

test('link and YouTube insertion', async ({ browser }) => {
  const context = await signedIn(browser, 'member', { viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  await open(page);
  const t = tools(page);

  await reset(page);
  await t.getByRole('button', { name: 'Insert or edit link' }).click();
  await page.locator('[aria-label="Link URL"] input').fill('https://jnvpjaa.org/about');
  await page.getByRole('button', { name: 'Save' }).click();
  expect(await html(page)).toMatch(/<p><a [^>]*href="https:\/\/jnvpjaa\.org\/about"[^>]*>hello<\/a> world<\/p>/);

  await reset(page);
  await t.getByRole('button', { name: 'Insert YouTube video' }).click();
  await page.locator('[aria-label="YouTube URL"] input').fill('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  await page.getByRole('button', { name: 'Add' }).click();
  expect(await html(page)).toContain('src="https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ');
  await context.close();
});

for (const viewport of [
  { width: 1366, height: 900 },
  { width: 375, height: 812 },
]) {
  test(`selection toolbar opens below the selection and works at ${viewport.width}px`, async ({ browser }) => {
    const context = await signedIn(browser, 'member', { viewport });
    const page = await context.newPage();
    await open(page);
    await reset(page);
    const bubble = page.getByRole('toolbar', { name: 'Selected text formatting' });
    await expect(bubble).toBeVisible();
    const selection = await page.evaluate(() => window.getSelection()!.getRangeAt(0).getBoundingClientRect().toJSON());
    const box = (await bubble.boundingBox())!;
    expect(box.y).toBeGreaterThanOrEqual(selection.bottom);
    expect(box.x).toBeGreaterThanOrEqual(0);
    expect(box.x + box.width).toBeLessThanOrEqual(viewport.width);
    await bubble.getByRole('button', { name: 'Bold', exact: true }).click();
    expect(await html(page)).toBe('<p><strong>hello</strong> world</p>');
    await context.close();
  });
}
