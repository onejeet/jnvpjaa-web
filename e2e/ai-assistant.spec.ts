import { expect, test, type Page } from '@playwright/test';
import { signedIn } from './support';

/**
 * The AI writing assistant on a form, with the API's AI answers stubbed in the browser:
 * no Gemini call, no uses spent, and the same result every run.
 */

const SHOTS = process.env.CAPTURE_DIR;
const DRAFT = {
  title: 'Delhi Chapter Meet 2026: Sixty Navodayans, One Evening',
  category: 'alumni-stories',
  body: `<p>${'Sixty alumni met in Delhi on 12 October for the first chapter meet of the year. '.repeat(6)}</p><h2>What happened</h2><p>Stories, dinner and a quiz.</p>`,
};

async function stubAi(page: Page) {
  await page.route('**/client**', async (route) => {
    const req = route.request();
    const url = new URL(req.url());
    const body = req.method() === 'POST' ? req.postDataJSON() : null;
    const op = body?.operationName || url.searchParams.get('operationName');
    const resetsAt = '2026-11-23T08:00:00.000Z';
    if (op === 'AiAllowance') {
      return route.fulfill({
        json: {
          data: {
            aiAllowance: {
              __typename: 'AiAllowance',
              limit: 10,
              remaining: 8,
              resetsAt,
              enabled: true,
              available: true,
            },
          },
        },
      });
    }
    if (op === 'AiAssist') {
      const taskId = body?.variables?.taskId;
      const answer =
        taskId === 'blog.proofread'
          ? { result: '<p>Fixed text.</p>', draft: { body: '<p>Fixed text.</p>' }, gaps: [], fixes: 2 }
          : { result: null, draft: DRAFT, gaps: ['names of the sponsors'], fixes: null };
      await new Promise((r) => setTimeout(r, 400));
      return route.fulfill({
        json: { data: { aiAssist: { __typename: 'AiResult', ...answer, remaining: 7, resetsAt } } },
      });
    }
    return route.fallback();
  });
}

test('blog: brief → draft → review → fill the form → undo', async ({ browser }) => {
  const context = await signedIn(browser, 'member', { viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  await stubAi(page);
  await page.goto('/blog/new/');

  const card = page.locator('h2', { hasText: 'AI writing assistant' }).locator('xpath=../..');
  await expect(card).toBeVisible();
  await expect(card.getByText('8 AI uses left today')).toBeVisible();

  // A blank form and a thin brief: a hint, no AI call.
  await card.getByLabel('What should this story be about?').fill('Delhi meet');
  await card.getByRole('button', { name: 'Write my draft with AI' }).click();
  await expect(card.getByText('Add a few details: what happened, who, when.')).toBeVisible();

  await card
    .getByLabel('What should this story be about?')
    .fill('A recap of our Delhi meet on 12 Oct: 60 alumni, dinner, a quiz');
  await card.getByRole('button', { name: 'Write my draft with AI' }).click();
  await expect(card.getByText('Your draft is ready')).toBeVisible();
  await expect(card.getByText('Worth adding: names of the sponsors')).toBeVisible();
  await expect(card.getByText('Alumni Stories')).toBeVisible();
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/ai-review-1366.png` });

  await card.getByRole('button', { name: 'Read full draft' }).first().click();
  await expect(page.getByRole('dialog').getByText('What happened')).toBeVisible();
  await page.getByRole('dialog').getByRole('button', { name: 'Close', exact: true }).last().click();

  await card.getByRole('button', { name: 'Fill the form' }).click();
  await expect(page.getByLabel('Story title')).toHaveValue(DRAFT.title);
  await expect(page.locator('[data-ai-field="content"] .tiptap')).toContainText('What happened');
  await expect(page.getByText('Draft added to the form.')).toBeVisible();
  // Long enough now for the editor's suggestion chips.
  await expect(page.getByRole('button', { name: 'Proofread with AI' })).toBeVisible();
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/ai-filled-1366.png` });

  await page.locator('.MuiSnackbar-root').getByRole('button', { name: 'Undo' }).click();
  await expect(page.getByLabel('Story title')).toHaveValue('');
  await expect(page.locator('[data-ai-field="content"] .tiptap')).not.toContainText('What happened');
  await context.close();
});

test('phones get a Write with AI button that opens the assistant as a sheet', async ({ browser }) => {
  const context = await signedIn(browser, 'member', { viewport: { width: 375, height: 812 } });
  const page = await context.newPage();
  await stubAi(page);
  await page.goto('/blog/new/');
  await page.getByRole('button', { name: 'Write with AI' }).click();
  await expect(page.getByRole('presentation').getByLabel('What should this story be about?')).toBeVisible();
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/ai-sheet-375.png` });
  await context.close();
});

test('About Me: the Write with AI link opens the assistant panel', async ({ browser }) => {
  const context = await signedIn(browser, 'member', { viewport: { width: 1366, height: 900 } });
  const page = await context.newPage();
  await stubAi(page);
  await page.goto('/profile/setup/');
  await page.getByRole('button', { name: 'Write with AI' }).click();
  await expect(page.getByLabel('What would you like fellow alumni to know about you?')).toBeVisible();
  if (SHOTS) await page.screenshot({ path: `${SHOTS}/ai-aboutme-1366.png` });
  await context.close();
});
