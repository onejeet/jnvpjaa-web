'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useApolloClient, useQuery } from '@apollo/client';
import { Box, ButtonBase, IconButton, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { IconArrowLeft, IconX } from '@tabler/icons-react';
import {
  DISCUSSION_REPLIES,
  DISCUSSION_THREAD,
  type DiscussionPost,
  type DiscussionThreadData,
} from '@/apollo/discussionOperations';
import { paths } from '@/config/paths';
import Composer from '@/modules/Discussions/Composer';
import DiscussionShell, { TOPBAR } from '@/modules/Discussions/DiscussionShell';
import PostCard from '@/modules/Discussions/PostCard';
import { memberName } from '@/modules/Discussions/discussion.utils';
import { PostSkeleton } from './DiscussionFeed';

const Conversation: React.FC<{ id: string }> = ({ id }) => {
  const router = useRouter();
  const client = useApolloClient();
  const [target, setTarget] = React.useState<DiscussionPost | null>(null);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [scrollToId, setScrollToId] = React.useState<string | null>(null);
  const composerRef = React.useRef<HTMLDivElement>(null);

  const { data, loading, error, fetchMore } = useQuery<DiscussionThreadData>(DISCUSSION_THREAD, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });
  const thread = data?.discussionThread;
  const root = thread?.root;

  // Scroll to a reply you just posted once it has rendered.
  React.useEffect(() => {
    const el = scrollToId && document.getElementById(`post-${scrollToId}`);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setScrollToId(null);
  }, [scrollToId, thread?.replies]);

  const replyTo = (post: DiscussionPost) => {
    setTarget(post.id === root?.id ? null : post);
    composerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    composerRef.current?.querySelector('textarea')?.focus({ preventScroll: true });
  };

  const onPosted = (reply: DiscussionPost) => {
    setTarget(null);
    client.cache.updateQuery<DiscussionThreadData>({ query: DISCUSSION_THREAD, variables: { id } }, (prev) =>
      prev
        ? {
            discussionThread: {
              ...prev.discussionThread,
              root: { ...prev.discussionThread.root, replyCount: prev.discussionThread.root.replyCount + 1 },
              replies: [...prev.discussionThread.replies, reply],
            },
          }
        : prev
    );
    setScrollToId(reply.id);
  };

  const loadMore = async () => {
    if (!thread?.nextCursor || !root) return;
    setLoadingMore(true);
    try {
      await fetchMore({
        query: DISCUSSION_REPLIES,
        variables: { rootId: root.id, cursor: thread.nextCursor },
        updateQuery: (prev: DiscussionThreadData, { fetchMoreResult }: { fetchMoreResult: any }) => {
          const more = fetchMoreResult?.discussionReplies;
          if (!more) return prev;
          const seen = new Set(prev.discussionThread.replies.map((r) => r.id));
          return {
            discussionThread: {
              ...prev.discussionThread,
              nextCursor: more.nextCursor,
              replies: [
                ...prev.discussionThread.replies,
                ...more.replies.filter((r: DiscussionPost) => !seen.has(r.id)),
              ],
            },
          };
        },
      });
    } finally {
      setLoadingMore(false);
    }
  };

  return (
    <DiscussionShell>
      <Box
        component="header"
        position="sticky"
        top={TOPBAR}
        zIndex={3}
        display="flex"
        alignItems="center"
        gap={2}
        px={1}
        height={53}
        borderBottom={1}
        borderColor="divider"
        sx={{ bgcolor: (t) => alpha(t.palette.background.paper, 0.85), backdropFilter: 'blur(12px)' }}
      >
        <IconButton
          aria-label="Back to discussions"
          onClick={() => (window.history.length > 1 ? router.back() : router.push(paths.discussions.root))}
        >
          <IconArrowLeft size={20} />
        </IconButton>
        <Typography component="h1" fontWeight={800} fontSize={20}>
          Post
        </Typography>
      </Box>

      {loading && !thread && <PostSkeleton />}

      {error && !thread && (
        <Box px={4} py={8} textAlign="center">
          <Typography fontWeight={800} fontSize={22}>
            This post isn’t here
          </Typography>
          <Typography color="text.secondary" mt={1}>
            It may have been deleted.
          </Typography>
          <ButtonBase
            onClick={() => router.push(paths.discussions.root)}
            sx={{ mt: 2, color: 'primary.main', fontWeight: 600, px: 2, height: 36, borderRadius: 18 }}
          >
            Back to discussions
          </ButtonBase>
        </Box>
      )}

      {root && (
        <>
          <PostCard post={root} variant="root" onReply={replyTo} />
          {!root.isDeleted && (
            <Box ref={composerRef} borderBottom={1} borderColor="divider">
              {target && (
                <Box display="flex" alignItems="center" gap={0.5} px={2} pt={1.5} ml="52px">
                  <Typography fontSize={14} color="text.secondary">
                    Replying to{' '}
                    <Box component="span" color="primary.main">
                      @{memberName(target.author)}
                    </Box>
                  </Typography>
                  <IconButton size="small" aria-label="Reply to the post instead" onClick={() => setTarget(null)}>
                    <IconX size={14} />
                  </IconButton>
                </Box>
              )}
              <Composer compact parentId={target?.id ?? root.id} placeholder="Post your reply" onPosted={onPosted} />
            </Box>
          )}
          {thread.replies.map((r) => (
            <PostCard key={r.id} post={r} variant="reply" onReply={replyTo} />
          ))}
          {thread.nextCursor && (
            <ButtonBase
              onClick={loadMore}
              disabled={loadingMore}
              sx={{
                width: '100%',
                py: 2,
                color: 'primary.main',
                fontWeight: 600,
                fontSize: 15,
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              {loadingMore ? 'Loading…' : 'Show more replies'}
            </ButtonBase>
          )}
          {!thread.replies.length && !root.isDeleted && (
            <Typography textAlign="center" color="text.secondary" fontSize={15} py={5}>
              No replies yet. Be the first.
            </Typography>
          )}
        </>
      )}
    </DiscussionShell>
  );
};

export default Conversation;
