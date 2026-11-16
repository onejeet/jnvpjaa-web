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
import CommentItem, { authorName, COMMENT_AVATAR, COMMENT_GAP } from './CommentItem';
import { buildCommentThreads, toggleReaction } from './commentThreads';

interface CommentsModuleProps {
  targetType: CommentTarget;
  targetId: string;
}

const COLLAPSED_REPLIES = 2;
const INITIAL_THREADS = 5;

const CommentsModule: React.FC<CommentsModuleProps> = ({ targetType, targetId }) => {
  const { user, isAdmin, redirectToSignin } = useAuth();
  const { showAlert } = useAlert();
  const variables = { targetId, targetType };
  const [replyTo, setReplyTo] = React.useState<{ threadId: string; prefill: string } | null>(null);
  const [expanded, setExpanded] = React.useState<Record<string, boolean>>({});
  const [showAll, setShowAll] = React.useState(false);

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

  const visibleThreads = showAll ? threads : threads.slice(0, INITIAL_THREADS);
  const hiddenCount = threads
    .slice(visibleThreads.length)
    .reduce((n, t) => n + (t.comment.isDeleted ? 0 : 1) + t.replies.filter((r) => !r.isDeleted).length, 0);

  return (
    <Box component="section" aria-labelledby="comments-heading" mt={{ xs: 4, md: 6 }}>
      <Box display="flex" alignItems="center" gap={1} mb={3}>
        <Typography id="comments-heading" component="h2" variant="h3" fontWeight={700}>
          Comments
        </Typography>
        {count > 0 && (
          <Box
            component="span"
            sx={{
              px: 1,
              minWidth: 24,
              height: 24,
              borderRadius: 3,
              bgcolor: 'action.hover',
              color: 'text.secondary',
              fontSize: 13,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {count}
          </Box>
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

      <Box
        component="ul"
        sx={{ listStyle: 'none', p: 0, m: 0, mt: 5, display: 'flex', flexDirection: 'column', gap: 4.5 }}
      >
        {loading && !data ? (
          [0, 1, 2].map((i) => (
            <Box component="li" key={i} display="flex" gap={`${COMMENT_GAP}px`}>
              <Skeleton variant="circular" width={COMMENT_AVATAR} height={COMMENT_AVATAR} sx={{ flexShrink: 0 }} />
              <Box flex={1}>
                <Skeleton width={180} height={24} />
                <Skeleton width="85%" />
                <Skeleton width={140} height={30} />
              </Box>
            </Box>
          ))
        ) : threads.length === 0 ? (
          <Box component="li" textAlign="center" py={4} color="text.secondary">
            <IconMessages size={32} stroke={1.5} style={{ opacity: 0.5 }} />
            <Typography mt={1} color="text.secondary">
              No comments yet. Be the first to share your thoughts 👋
            </Typography>
          </Box>
        ) : (
          visibleThreads.map(({ comment, replies }) => {
            const isOpen = expanded[comment.id] || replies.length <= COLLAPSED_REPLIES;
            const visible = isOpen ? replies : replies.slice(-COLLAPSED_REPLIES);
            const hidden = replies.length - visible.length;
            const replying = replyTo?.threadId === comment.id;
            const hasThread = replies.length > 0 || replying;
            return (
              <Box component="li" key={comment.id} position="relative">
                {hasThread && (
                  // Thread rail: from under the parent avatar, centred on it, down to the last reply.
                  <Box
                    aria-hidden
                    position="absolute"
                    left={COMMENT_AVATAR / 2 - 1}
                    top={COMMENT_AVATAR + 8}
                    bottom={8}
                    width="2px"
                    borderRadius={1}
                    bgcolor="divider"
                  />
                )}
                <CommentItem comment={comment} replyCount={replies.length} {...itemProps} />
                {hasThread && (
                  // Replies start where the parent's text starts, like the reference layout.
                  <Box pl={`${COMMENT_AVATAR + COMMENT_GAP}px`} mt={3} display="flex" flexDirection="column" gap={3}>
                    {hidden > 0 && (
                      <ButtonBase
                        onClick={() => setExpanded((e) => ({ ...e, [comment.id]: true }))}
                        sx={{
                          alignSelf: 'flex-start',
                          fontSize: 13,
                          fontWeight: 600,
                          color: 'primary.main',
                          borderRadius: 2,
                          px: 0.75,
                          ml: -0.75,
                          height: 28,
                          '&:hover': { bgcolor: 'action.hover' },
                        }}
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

      {hiddenCount > 0 && (
        <Box textAlign="center" mt={5}>
          <ButtonBase
            onClick={() => setShowAll(true)}
            sx={{
              px: 2,
              height: 36,
              borderRadius: 5,
              fontSize: 15,
              fontWeight: 500,
              color: 'primary.main',
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            View all comments (+{hiddenCount})
          </ButtonBase>
        </Box>
      )}
    </Box>
  );
};

export default CommentsModule;
