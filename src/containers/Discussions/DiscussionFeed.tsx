'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useApolloClient, useQuery } from '@apollo/client';
import { Box, ButtonBase, Drawer, Fab, IconButton, Skeleton, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { IconArrowUp, IconPlus, IconX } from '@tabler/icons-react';
import {
  DISCUSSION_FEED,
  DISCUSSION_NEW_COUNT,
  DISCUSSION_STATS,
  POST_TAGS,
  TAG_LABEL,
  type DiscussionFeedData,
  type DiscussionPost,
  type PostTag,
} from '@/apollo/discussionOperations';
import { paths } from '@/config/paths';
import Composer from '@/modules/Discussions/Composer';
import DiscussionShell, { TOPBAR } from '@/modules/Discussions/DiscussionShell';
import PostCard from '@/modules/Discussions/PostCard';

const parseTag = (raw: string | null): PostTag | null => {
  const up = raw?.toUpperCase();
  return POST_TAGS.includes(up as PostTag) ? (up as PostTag) : null;
};

export const PostSkeleton = () => (
  <Box display="flex" gap={1.5} px={2} py={1.5} borderBottom={1} borderColor="divider">
    <Skeleton variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
    <Box flex={1}>
      <Skeleton width="45%" />
      <Skeleton />
      <Skeleton width="80%" />
    </Box>
  </Box>
);

const DiscussionFeed: React.FC = () => {
  const params = useSearchParams();
  const tag = parseTag(params.get('tag'));
  const client = useApolloClient();
  const variables = React.useMemo(() => ({ tag }), [tag]);
  const [sheetOpen, setSheetOpen] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const sentinel = React.useRef<HTMLDivElement>(null);
  const tagRef = React.useRef(tag);
  tagRef.current = tag;

  const { data, loading, error, fetchMore, refetch } = useQuery<DiscussionFeedData>(DISCUSSION_FEED, {
    variables,
    fetchPolicy: 'cache-and-network',
    nextFetchPolicy: 'cache-first',
  });
  const feed = data?.discussionFeed;
  const newest = feed?.posts[0]?.createdAt;

  const { data: newData } = useQuery<{ discussionNewCount: number }>(DISCUSSION_NEW_COUNT, {
    variables: { since: newest, tag },
    skip: !newest,
    pollInterval: 60_000,
    skipPollAttempt: () => document.hidden,
    fetchPolicy: 'network-only',
  });
  const newCount = newData?.discussionNewCount ?? 0;

  const loadMore = React.useCallback(async () => {
    if (!feed?.nextCursor || loadingMore) return;
    setLoadingMore(true);
    try {
      await fetchMore({
        variables: { ...variables, cursor: feed.nextCursor },
        updateQuery: (prev, { fetchMoreResult }) => {
          // Apollo writes into the query's current variables; drop a page that was asked for under another tab.
          if (!fetchMoreResult || tagRef.current !== variables.tag) return prev;
          const seen = new Set(prev.discussionFeed.posts.map((p) => p.id));
          return {
            discussionFeed: {
              ...fetchMoreResult.discussionFeed,
              pinned: prev.discussionFeed.pinned,
              posts: [
                ...prev.discussionFeed.posts,
                ...fetchMoreResult.discussionFeed.posts.filter((p) => !seen.has(p.id)),
              ],
            },
          };
        },
      });
    } finally {
      setLoadingMore(false);
    }
  }, [feed?.nextCursor, loadingMore, fetchMore, variables]);

  React.useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => entries[0].isIntersecting && loadMore(), { rootMargin: '600px' });
    io.observe(el);
    return () => io.disconnect();
  }, [loadMore]);

  const onPosted = (post: DiscussionPost) => {
    setSheetOpen(false);
    client.cache.updateQuery<DiscussionFeedData>({ query: DISCUSSION_FEED, variables }, (prev) =>
      prev && (!tag || tag === post.tag)
        ? { discussionFeed: { ...prev.discussionFeed, posts: [post, ...prev.discussionFeed.posts] } }
        : prev
    );
    client.refetchQueries({ include: [DISCUSSION_STATS] });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const showNew = async () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    await refetch();
  };

  const focusComposer = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.querySelector<HTMLTextAreaElement>('#discussion-composer textarea')?.focus({ preventScroll: true });
  };

  // Native history keeps useSearchParams in sync without a server round trip, so tabs switch instantly.
  const setTag = (t: PostTag | null) =>
    window.history.replaceState(
      null,
      '',
      t ? `${paths.discussions.root}?tag=${t.toLowerCase()}` : paths.discussions.root
    );

  const tabs: (PostTag | null)[] = [null, ...POST_TAGS];
  const empty = feed && !feed.posts.length && !feed.pinned.length;

  return (
    <DiscussionShell onNewPost={focusComposer}>
      <Box
        component="header"
        position="sticky"
        top={TOPBAR}
        zIndex={3}
        borderBottom={1}
        borderColor="divider"
        sx={{ bgcolor: (t) => alpha(t.palette.background.paper, 0.85), backdropFilter: 'blur(12px)' }}
      >
        <Typography component="h1" variant="h2" fontSize={{ xs: 22, md: 24 }} px={2} pt={1.5} pb={0.5}>
          Discussions
        </Typography>
        <Box
          component="nav"
          aria-label="Filter by kind"
          display="flex"
          sx={{ overflowX: 'auto', scrollbarWidth: 'none' }}
        >
          {tabs.map((t) => {
            const on = t === tag;
            return (
              <ButtonBase
                key={t ?? 'all'}
                aria-current={on ? 'page' : undefined}
                onClick={() => setTag(t)}
                sx={{
                  flex: '1 0 auto',
                  height: 48,
                  px: 2,
                  fontSize: 15,
                  fontWeight: on ? 700 : 500,
                  color: on ? 'text.primary' : 'text.secondary',
                  position: 'relative',
                  '&:hover': { bgcolor: 'action.hover' },
                  '&::after': on
                    ? {
                        content: '""',
                        position: 'absolute',
                        bottom: 0,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 44,
                        height: 4,
                        borderRadius: 2,
                        bgcolor: 'text.primary',
                      }
                    : undefined,
                }}
              >
                {t ? TAG_LABEL[t] : 'All'}
              </ButtonBase>
            );
          })}
        </Box>
      </Box>

      {newCount > 0 && (
        <Box
          position="sticky"
          top={{ xs: 104, md: TOPBAR.md + 104 }}
          zIndex={2}
          display="flex"
          justifyContent="center"
          height={0}
        >
          <ButtonBase
            onClick={showNew}
            sx={{
              mt: 1.5,
              height: 36,
              px: 2,
              gap: 0.75,
              borderRadius: 18,
              bgcolor: 'primary.main',
              color: 'primary.contrastText',
              fontWeight: 600,
              fontSize: 14,
              boxShadow: '0 4px 14px rgba(0,0,0,.18)',
              animation: 'pillIn .3s ease-out',
              '@keyframes pillIn': { from: { opacity: 0, transform: 'translateY(-8px)' } },
              '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
            }}
          >
            <IconArrowUp size={16} />
            {newCount} new {newCount === 1 ? 'post' : 'posts'}
          </ButtonBase>
        </Box>
      )}

      <Box id="discussion-composer" display={{ xs: 'none', md: 'block' }} borderBottom={1} borderColor="divider">
        <Composer onPosted={onPosted} />
      </Box>

      {/* The server leaves deleted posts out of the feed; hide ones deleted in this session the same way. */}
      {feed?.pinned
        .filter((p) => !p.isDeleted)
        .map((p) => (
          <PostCard key={`pin-${p.id}`} post={p} />
        ))}
      {feed?.posts
        .filter((p) => !p.isDeleted)
        .map((p) => (
          <PostCard key={p.id} post={p} />
        ))}

      {loading && !feed && [0, 1, 2, 3].map((i) => <PostSkeleton key={i} />)}

      {error && !feed && (
        <Box px={2} py={6} textAlign="center">
          <Typography fontWeight={700} fontSize={18}>
            Couldn’t load posts
          </Typography>
          <Typography color="text.secondary" mt={0.5} mb={2}>
            Check your connection and try again.
          </Typography>
          <ButtonBase
            onClick={() => refetch()}
            sx={{ color: 'primary.main', fontWeight: 600, px: 2, height: 36, borderRadius: 18 }}
          >
            Try again
          </ButtonBase>
        </Box>
      )}

      {empty && (
        <Box px={4} py={8} textAlign="center">
          <Typography fontWeight={800} fontSize={22}>
            {tag ? `No ${TAG_LABEL[tag].toLowerCase()} posts yet` : 'Nothing here yet'}
          </Typography>
          <Typography color="text.secondary" mt={1} maxWidth={360} mx="auto">
            Ask a question, share what you need, or start a conversation. Only signed-in members can see it.
          </Typography>
        </Box>
      )}

      <div ref={sentinel} aria-hidden />
      {loadingMore && <PostSkeleton />}
      {feed && !feed.nextCursor && feed.posts.length > 5 && (
        <Typography textAlign="center" color="text.secondary" fontSize={14} py={4}>
          You’re all caught up.
        </Typography>
      )}

      {/* Phones: floating Post button above the dock, composer opens as a sheet. */}
      <Fab
        color="primary"
        aria-label="New post"
        onClick={() => setSheetOpen(true)}
        sx={{
          display: { xs: 'flex', md: 'none' },
          position: 'fixed',
          right: 16,
          // Sit above the site's scroll-to-top button (88px up on phones, 112px on tablets, 48px tall).
          bottom: { xs: 'calc(152px + env(safe-area-inset-bottom))', sm: 'calc(176px + env(safe-area-inset-bottom))' },
          zIndex: 4,
        }}
      >
        <IconPlus size={26} />
      </Fab>
      <Drawer
        anchor="bottom"
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        disableAutoFocus // let the composer's text field take focus, not the sheet itself
        PaperProps={{
          sx: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            maxHeight: '92dvh',
            pb: 'env(safe-area-inset-bottom)',
          },
        }}
      >
        <Box display="flex" alignItems="center" px={1} pt={1}>
          <IconButton aria-label="Close" onClick={() => setSheetOpen(false)}>
            <IconX size={22} />
          </IconButton>
          <Typography fontWeight={700} fontSize={16} ml={0.5}>
            New post
          </Typography>
        </Box>
        {sheetOpen && <Composer autoFocus onPosted={onPosted} />}
      </Drawer>
    </DiscussionShell>
  );
};

export default DiscussionFeed;
