'use client';

import React from 'react';
import Link from 'next/link';
import { useQuery } from '@apollo/client';
import { Box, ButtonBase, Skeleton, Typography } from '@mui/material';
import { IconPencilPlus } from '@tabler/icons-react';
import ProfilePicture from '@/components/common/ProfilePicture';
import Button from '@/components/core/Button';
import LayoutModule from '@/layouts/Layout';
import { useMemberHref } from '@/hooks/useMemberHref';
import { paths } from '@/config/paths';
import { DISCUSSION_STATS, POST_TAGS, TAG_LABEL, type DiscussionStatsData } from '@/apollo/discussionOperations';
import { memberName, memberTag, TAG_COLOR } from './discussion.utils';

export const COLUMN = 600;
const RAIL = 300;
// The site top bar only shows from md up; phones use the bottom dock instead.
const BAR = 60;
export const TOPBAR = { xs: 0, md: BAR };

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <Box border={1} borderColor="divider" borderRadius={4} py={1.5}>
    <Typography component="h2" fontWeight={800} fontSize={18} px={2} pb={0.5}>
      {title}
    </Typography>
    {children}
  </Box>
);

const Rail: React.FC<{ onNewPost?: () => void }> = ({ onNewPost }) => {
  const { data, loading } = useQuery<DiscussionStatsData>(DISCUSSION_STATS, { fetchPolicy: 'cache-and-network' });
  const memberHref = useMemberHref();
  const stats = data?.discussionStats;
  const count = (t: string) => stats?.tags.find((x) => x.tag === t)?.count ?? 0;

  return (
    <Box
      component="aside"
      aria-label="Discussion overview"
      width={RAIL}
      flexShrink={0}
      display={{ xs: 'none', md: 'flex' }}
      flexDirection="column"
      gap={2}
      position="sticky"
      top={BAR + 16}
      alignSelf="flex-start"
      pt={2}
    >
      {onNewPost && (
        <Button
          title="New post"
          size="large"
          fullWidth
          startIcon={<IconPencilPlus size={20} />}
          onClick={onNewPost}
          sx={{ borderRadius: 999, height: 48, fontSize: 16 }}
        />
      )}
      <Section title="Browse">
        {POST_TAGS.map((t) => (
          <ButtonBase
            key={t}
            component={Link}
            href={`${paths.discussions.root}?tag=${t.toLowerCase()}`}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              px: 2,
              py: 1,
              '&:hover': { bgcolor: 'action.hover' },
            }}
          >
            <Typography fontWeight={700} fontSize={15} color={t === 'DISCUSSION' ? 'text.primary' : TAG_COLOR[t]}>
              {TAG_LABEL[t]}
            </Typography>
            <Typography fontSize={13} color="text.secondary" sx={{ fontVariantNumeric: 'tabular-nums' }}>
              {loading && !stats ? '' : `${count(t)} ${count(t) === 1 ? 'post' : 'posts'}`}
            </Typography>
          </ButtonBase>
        ))}
      </Section>
      <Section title="Active this week">
        {loading && !stats
          ? [0, 1, 2].map((i) => (
              <Box key={i} display="flex" gap={1.5} px={2} py={1} alignItems="center">
                <Skeleton variant="circular" width={36} height={36} />
                <Skeleton width="60%" />
              </Box>
            ))
          : null}
        {stats && !stats.activeMembers.length && (
          <Typography fontSize={14} color="text.secondary" px={2} py={1}>
            Quiet week so far. Say hello.
          </Typography>
        )}
        {stats?.activeMembers.map((m) => {
          const href = memberHref(m);
          return (
            <ButtonBase
              key={m.id}
              {...(href ? { component: Link, href } : {})}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 1.5,
                width: '100%',
                px: 2,
                py: 1,
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              <ProfilePicture
                id={m.id}
                src={m.profileImage || undefined}
                size={36}
                containerProps={{ sx: { width: 36, height: 36, flexShrink: 0 } }}
              />
              <Box minWidth={0} textAlign="left">
                <Typography fontWeight={700} fontSize={15} noWrap>
                  {memberName(m)}
                </Typography>
                {memberTag(m) && (
                  <Typography fontSize={13} color="text.secondary" noWrap>
                    {memberTag(m)}
                  </Typography>
                )}
              </Box>
            </ButtonBase>
          );
        })}
      </Section>
    </Box>
  );
};

/** Twitter-shaped frame: one 600px column with hairline sides, a sticky rail on wide screens. */
const DiscussionShell: React.FC<{ children: React.ReactNode; onNewPost?: () => void }> = ({ children, onNewPost }) => (
  <LayoutModule
    disableCover
    containerProps={{ sx: { overflow: 'visible', py: 0, px: { xs: 0, sm: 2 }, maxWidth: '100%' } }}
  >
    <Box display="flex" justifyContent="center" gap={3}>
      <Box
        component="main"
        width="100%"
        maxWidth={COLUMN}
        minWidth={0}
        minHeight="calc(100dvh - 60px)"
        borderLeft={{ xs: 0, sm: 1 }}
        borderRight={{ xs: 0, sm: 1 }}
        borderColor={{ sm: 'divider' }}
        pb={{ xs: 'calc(96px + env(safe-area-inset-bottom))', md: 4 }}
      >
        {children}
      </Box>
      <Rail onNewPost={onNewPost} />
    </Box>
  </LayoutModule>
);

export default DiscussionShell;
