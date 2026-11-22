import { expect, test } from '@playwright/test';
import { gql, signedIn } from './support';

// Members-only board: signed out you can't see it, signed in you can post a poll, vote and reply.

test('signed-out visitors are sent to sign in', async ({ page }) => {
  await page.goto('/discussions/');
  await expect(page).toHaveURL(/\/signin/);
});

test('the API refuses the feed without a session', async () => {
  const res = await gql('{ discussionFeed { posts { id } } }');
  expect(res.errors?.length).toBeGreaterThan(0);
  expect(res.data?.discussionFeed ?? null).toBeNull();
});

test('a member posts a poll, votes and replies', async ({ browser }) => {
  const context = await signedIn(browser, 'member');
  const page = await context.newPage();
  const question = `Reunion venue? ${Date.now()}`;
  let postId: string | undefined;

  try {
    await page.goto('/discussions/');
    await expect(page.getByRole('heading', { name: 'Discussions' })).toBeVisible();

    const composer = page.locator('#discussion-composer');
    await composer.getByRole('textbox', { name: 'Write a post' }).fill(question);
    await composer.getByRole('button', { name: 'Add a poll' }).click();
    await composer.getByRole('textbox', { name: 'Choice 1' }).fill('School campus');
    await composer.getByRole('textbox', { name: 'Choice 2' }).fill('Jaipur hotel');
    await composer.getByRole('button', { name: 'Post', exact: true }).click();

    const card = page.locator('article', { hasText: question });
    await expect(card).toBeVisible();
    postId = (await card.getAttribute('id'))?.replace('post-', '');

    // Results stay hidden until you vote.
    await expect(card.getByText('%')).toHaveCount(0);
    await card.getByRole('button', { name: 'School campus' }).click();
    await expect(card.getByLabel('School campus: 100%, your vote')).toBeVisible();
    await expect(card.getByText('1 vote ·')).toBeVisible();

    await card.getByText(question).click();
    await expect(page).toHaveURL(new RegExp(`/discussions/${postId}`));
    const reply = page.getByRole('textbox', { name: 'Write your reply' });
    await reply.fill('Campus, without a doubt.');
    await reply.press('ControlOrMeta+Enter');
    await expect(page.locator('article', { hasText: 'Campus, without a doubt.' })).toBeVisible();
  } finally {
    if (postId)
      await gql('mutation($id: ID!){ deleteDiscussionPost(id: $id) { id } }', { id: postId }, 'member').catch(() => {});
    await context.close();
  }
});
