'use client';

import React from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { Box, ButtonBase, Card, Skeleton, Typography } from '@mui/material';
import { IconLock, IconMessages } from '@tabler/icons-react';
import {
  COMMENT_THREAD,
  CommentTarget,
  EDIT_COMMENT,
  POST_COMMENT,
  REMOVE_COMMENT,
  TOGGLE_COMMENT_REACTION,
  ThreadComment,
} from '@/apollo/commentOperations';
import Button from '@/components/core/Button';
import { useAuth } from '@/context/AuthContext';
import { useAlert } from '@/context/AlertContext';
import CommentComposer from './CommentComposer';
import CommentItem, { authorName } from './CommentItem';
import { buildCommentThreads, toggleReaction } from './commentThreads';

interface CommentsModuleProps {
  targetType: CommentTarget;
  targetId: string;
}

const COLLAPSED_REPLIES = 2;

const CommentsModule: React.FC<CommentsModuleProps> = ({ targetType, targetId }) => {
  const { user, isAdmin, redirectToSignin } = useAuth();
  const { showAlert } = useAlert();
  const variables = { targetId, targetType };
  const [replyTo, setReplyTo] = React.useState<{ threadId: string; prefill: string } | null>(null);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});

  const { data, loading, refetch } = useQuery<{ getComments: ThreadComment[] }>(COMMENT_THREAD, {
    variables,
    fetchPolicy: 'cache-and-network',
    // Light "live" feel: pick up other members' replies and reactions while the page is open.
    pollInterval: 30000,
    skip: !targetId,
  });
  const comments = React.useMemo(() => (data?.getComments || []).filter(Boolean), [data]);
  const threads = React.useMemo(() => buildCommentThreads(comments), [comments]);
  const count = comments.filter((c) => !c.isDeleted).length;

  const [postComment] = useMutation(POST_COMMENT);
  const [editComment] = useMutation(EDIT_COMMENT);
  const [removeComment] = useMutation(REMOVE_COMMENT);
  const [toggleCommentReaction] = useMutation(TOGGLE_COMMENT_REACTION);

  const showError = React.useCallback(
    (err: unknown) =>
      showAlert({ visible: true, type: 'error', message: (err as Error)?.message || 'Something went wrong.' }),
    [showAlert]
  );

  const requireSignin = React.useCallback(() => {
    if (user?.id) return true;
    redirectToSignin(true);
    return false;
  }, [user?.id, redirectToSignin]);

  const post = React.useCallback(
    (content: string, parentId?: string) =>
      postComment({
        variables: { ...variables, content, parentId },
        optimisticResponse: {
          addComment: {
            __typename: 'Comment',
            id: `temp-${Date.now()}`,
            parentId: parentId || null,
            content,
            isDeleted: false,
            createdAt: new Date().toISOString(),
            editedAt: null,
            authorId: user?.id,
            author: {
              __typename: 'UserBasic',
              id: user?.id,
              firstName: user?.firstName || null,
              lastName: user?.lastName || null,
              profileImage: user?.profileImage || null,
              batch: user?.batch || null,
              isFaculty: user?.isFaculty || null,
            },
            reactions: [],
          },
        },
        update: (cache, { data: result }) => {
          if (!result?.addComment) return;
          cache.updateQuery<{ getComments: ThreadComment[] }>({ query: COMMENT_THREAD, variables }, (prev) => ({
            getComments: [...(prev?.getComments || []), result.addComment],
          }));
        },
        onError: showError,
      }).then((res) => {
        if (res.errors?.length) throw res.errors[0];
        if (parentId) setExpanded((e) => ({ ...e, [parentId]: true }));
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [postComment, targetId, targetType, user, showError]
  );

  const handleReply = React.useCallback(
    (comment: ThreadComment) => {
      if (!requireSignin()) return;
      const threadId = comment.parentId || comment.id;
      // Replying inside a thread tags the person, Threads/Instagram style.
      const prefill = comment.parentId && comment.authorId !== user?.id ? `@${comment.author?.firstName || ''} ` : '';
      setReplyTo({ threadId, prefill });
    },
    [requireSignin, user?.id]
  );

  const handleEdit = React.useCallback(
    (comment: ThreadComment, content: string) =>
      editComment({ variables: { id: comment.id, content }, onError: showError }).then((res) => {
        if (res.errors?.length) throw res.errors[0];
      }),
    [editComment, showError]
  );

  const handleDelete = React.useCallback(
    (comment: ThreadComment) => {
      showAlert(
        {
          visible: true,
          type: 'custom',
          action: 'approve',
          title: 'Delete comment?',
          message: 'This can’t be undone. Replies to it will stay visible.',
          okayButtonProps: { title: 'Delete', color: 'error' },
          onOkay: () => {
            // A non-dialog alert closes the confirm dialog and shows progress as a toast.
            showAlert({ visible: true, type: 'loading', message: 'Deleting comment…' });
            removeComment({
              variables: { id: comment.id },
              onCompleted: () => {
                refetch();
                showAlert({ visible: true, type: 'success', message: 'Comment deleted.' });
              },
              onError: showError,
            });
          },
        },
        true
      );
    },
    [showAlert, removeComment, refetch, showError]
  );

  const handleReact = React.useCallback(
    (comment: ThreadComment, emoji: string) => {
      if (!requireSignin()) return;
      toggleCommentReaction({
        variables: { commentId: comment.id, emoji },
        optimisticResponse: {
          toggleCommentReaction: {
            __typename: 'Comment',
            id: comment.id,
            reactions: toggleReaction(comment.reactions, emoji).map((r) => ({
              __typename: 'CommentReactionSummary',
              ...r,
            })),
          },
        },
        onError: showError,
      });
    },
    [requireSignin, toggleCommentReaction, showError]
  );

  const itemProps = {
    viewer: user,
    isAdmin,
    onReply: handleReply,
    onEdit: handleEdit,
    onDelete: handleDelete,
    onReact: handleReact,
  };

  return (
    <Box component="section" aria-labelledby="comments-heading" mt={{ xs: 3, md: 5 }}>
      <Box display="flex" alignItems="center" gap={1.25} mb={2.5}>
        <IconMessages size={24} />
        <Typography id="comments-heading" variant="h3" fontWeight={700}>
          Conversation
        </Typography>
        {count > 0 && (
          <Typography component="span" variant="body2" color="text.secondary" fontWeight={600}>
            {count}
          </Typography>
        )}
      </Box>

      {user?.id ? (
        <CommentComposer user={user} onSubmit={(content) => post(content)} />
      ) : (
        <Card
          variant="outlined"
          sx={{ p: 2.5, display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', borderRadius: 3 }}
        >
          <Box display="flex" color="text.secondary">
            <IconLock size={22} />
          </Box>
          <Typography flex={1} minWidth={200} color="text.secondary">
            Sign in to join the conversation and reply to fellow alumni.
          </Typography>
          <Button title="Sign in" variant="contained" size="small" onClick={() => redirectToSignin(true)} />
        </Card>
      )}

      <Box mt={4} display="flex" flexDirection="column" gap={3.5}>
        {loading && !data ? (
          [0, 1].map((i) => (
            <Box key={i} display="flex" gap={1.5}>
              <Skeleton variant="circular" width={40} height={40} />
              <Box flex={1}>
                <Skeleton width="30%" />
                <Skeleton width="90%" />
                <Skeleton width="60%" />
              </Box>
            </Box>
          ))
        ) : threads.length === 0 ? (
          <Typography color="text.secondary" textAlign="center" py={3}>
            No comments yet. Start the conversation 👋
          </Typography>
        ) : (
          threads.map(({ comment, replies }) => {
            const isOpen = expanded[comment.id] || replies.length <= COLLAPSED_REPLIES;
            const visible = isOpen ? replies : replies.slice(-COLLAPSED_REPLIES);
            const hidden = replies.length - visible.length;
            const replying = replyTo?.threadId === comment.id;
            const hasThread = replies.length > 0 || replying;
            return (
              <Box key={comment.id} position="relative">
                {hasThread && (
                  // Thread rail from the parent avatar down through the replies.
                  <Box
                    aria-hidden
                    position="absolute"
                    left={19}
                    top={48}
                    bottom={16}
                    width="2px"
                    borderRadius={1}
                    bgcolor="divider"
                  />
                )}
                <CommentItem comment={comment} {...itemProps} />
                {hasThread && (
                  <Box pl={{ xs: 4, sm: 6.5 }} mt={2} display="flex" flexDirection="column" gap={2}>
                    {hidden > 0 && (
                      <ButtonBase
                        onClick={() => setExpanded((e) => ({ ...e, [comment.id]: true }))}
                        sx={{ alignSelf: 'flex-start', fontSize: 13, fontWeight: 700, color: 'primary.main', py: 0.5 }}
                      >
                        View {hidden} earlier {hidden === 1 ? 'reply' : 'replies'}
                      </ButtonBase>
                    )}
                    {visible.map((reply) => (
                      <CommentItem key={reply.id} comment={reply} isReply {...itemProps} />
                    ))}
                    {replying && (
                      <CommentComposer
                        key={`${replyTo.threadId}-${replyTo.prefill}`}
                        compact
                        autoFocus
                        user={user}
                        initialValue={replyTo.prefill}
                        placeholder={`Reply to ${authorName(comment.author)}…`}
                        submitLabel="Reply"
                        onCancel={() => setReplyTo(null)}
                        onSubmit={async (content) => {
                          await post(content, comment.id);
                          setReplyTo(null);
                        }}
                      />
                    )}
                  </Box>
                )}
              </Box>
            );
          })
        )}
      </Box>
    </Box>
  );
};

export default CommentsModule;
