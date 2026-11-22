'use client';

import React from 'react';
import { useMutation } from '@apollo/client';
import { useRouter } from 'next/navigation';
import {
  DELETE_DISCUSSION_POST,
  EDIT_DISCUSSION_POST,
  PIN_DISCUSSION_POST,
  TOGGLE_DISCUSSION_REACTION,
  type DiscussionPost,
} from '@/apollo/discussionOperations';
import { useAlert } from '@/context/AlertContext';
import { toggleReaction } from '@/modules/CommentsModule/commentThreads';
import { paths } from '@/config/paths';

/** Every write a post card can make, with the cache kept in step so nothing has to refetch. */
export const usePostActions = (post: DiscussionPost, isRoot = false) => {
  const { showAlert } = useAlert();
  const router = useRouter();
  const onError = (err: Error) =>
    showAlert({ visible: true, type: 'error', message: err.message || 'Something went wrong.' });

  const [toggle] = useMutation(TOGGLE_DISCUSSION_REACTION, { onError });
  const [edit] = useMutation(EDIT_DISCUSSION_POST);
  const [pin] = useMutation(PIN_DISCUSSION_POST, { onError, refetchQueries: ['DiscussionFeed'] });
  const [remove] = useMutation<{ deleteDiscussionPost: { id: string; deleted: 'soft' | 'hard' } }>(
    DELETE_DISCUSSION_POST,
    {
      onError,
      update: (cache, { data }) => {
        const soft = data?.deleteDiscussionPost.deleted === 'soft';
        const id = cache.identify({ __typename: 'Post', id: post.id });
        // The server keeps a placeholder when others replied to it; otherwise the post is gone.
        if (soft) {
          cache.modify({
            id,
            fields: { isDeleted: () => true, body: () => '', images: () => [], embed: () => null, poll: () => null },
          });
          return;
        }
        cache.evict({ id });
        cache.gc();
        if (post.rootId) {
          cache.modify({
            id: cache.identify({ __typename: 'Post', id: post.rootId }),
            fields: { replyCount: (n: number) => Math.max(0, n - 1) },
          });
        }
      },
      onCompleted: (data) => {
        showAlert({ visible: true, type: 'success', message: 'Post deleted.' });
        if (isRoot && data.deleteDiscussionPost.deleted === 'hard') router.replace(paths.discussions.root);
      },
    }
  );

  const react = React.useCallback(
    (emoji: string) =>
      toggle({
        variables: { postId: post.id, emoji },
        optimisticResponse: {
          toggleDiscussionReaction: {
            __typename: 'Post',
            id: post.id,
            reactions: toggleReaction(post.reactions, emoji).map((r) => ({
              __typename: 'CommentReactionSummary',
              ...r,
            })),
          },
        },
      }),
    [toggle, post.id, post.reactions]
  );

  const confirmDelete = React.useCallback(
    () =>
      showAlert(
        {
          visible: true,
          type: 'custom',
          action: 'approve',
          title: 'Delete post?',
          message:
            post.replyCount > 0
              ? 'This can’t be undone. Replies will stay, under a “deleted” note.'
              : 'This can’t be undone.',
          okayButtonProps: { title: 'Delete', color: 'error' },
          onOkay: () => {
            showAlert({ visible: true, type: 'loading', message: 'Deleting post…' });
            remove({ variables: { id: post.id } });
          },
        },
        true
      ),
    [showAlert, remove, post.id, post.replyCount]
  );

  return {
    react,
    confirmDelete,
    saveEdit: (body: string) => edit({ variables: { id: post.id, body } }),
    togglePin: () => pin({ variables: { id: post.id, pinned: !post.isPinned } }),
  };
};
