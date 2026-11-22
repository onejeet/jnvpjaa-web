'use client';

import React from 'react';
import { useMutation } from '@apollo/client';
import { Box, ButtonBase, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { IconCircleCheckFilled } from '@tabler/icons-react';
import { VOTE_DISCUSSION_POLL, type PostPoll } from '@/apollo/discussionOperations';
import { useAlert } from '@/context/AlertContext';
import { pollTimeLeft } from './discussion.utils';

const ROW = 40;

const PollView: React.FC<{ postId: string; poll: PostPoll }> = ({ postId, poll }) => {
  const { showAlert } = useAlert();
  const [pending, setPending] = React.useState<number | null>(null);
  const [vote, { loading }] = useMutation(VOTE_DISCUSSION_POLL, {
    onError: (err) => showAlert({ visible: true, type: 'error', message: err.message }),
  });
  const results = poll.results;
  const top = results ? Math.max(...results) : 0;

  return (
    <Box mt={1.5} display="flex" flexDirection="column" gap={1}>
      {poll.options.map((option, i) => {
        if (!results) {
          return (
            <ButtonBase
              key={i}
              disabled={loading || poll.isClosed}
              aria-busy={loading && pending === i}
              onClick={() => {
                setPending(i);
                vote({ variables: { postId, optionIndex: i } });
              }}
              sx={{
                height: ROW,
                px: 2,
                borderRadius: ROW / 2,
                border: 1.5,
                borderColor: 'primary.main',
                color: 'primary.main',
                fontWeight: 600,
                fontSize: 15,
                justifyContent: 'center',
                transition: 'background-color .15s, opacity .15s',
                // While the vote is saving, fade the other choices and fill the chosen one.
                opacity: loading && pending !== i ? 0.45 : 1,
                bgcolor: (t) => (loading && pending === i ? alpha(t.palette.primary.main, 0.12) : 'transparent'),
                '&:hover': { bgcolor: (t) => alpha(t.palette.primary.main, 0.08) },
              }}
            >
              {option}
            </ButtonBase>
          );
        }
        const count = results[i] ?? 0;
        const pct = poll.totalVotes ? Math.round((count / poll.totalVotes) * 100) : 0;
        const mine = poll.viewerVote === i;
        const leading = count > 0 && count === top;
        return (
          <Box
            key={i}
            position="relative"
            height={ROW}
            borderRadius={2}
            overflow="hidden"
            display="flex"
            alignItems="center"
            px={1.5}
            aria-label={`${option}: ${pct}%${mine ? ', your vote' : ''}`}
          >
            <Box
              aria-hidden
              position="absolute"
              left={0}
              top={0}
              bottom={0}
              borderRadius={2}
              sx={{
                width: `${Math.max(pct, 1)}%`,
                bgcolor: (t) => (mine ? alpha(t.palette.primary.main, 0.22) : t.palette.action.selected),
                animation: 'pollFill .6s cubic-bezier(.2,.8,.2,1)',
                '@keyframes pollFill': { from: { width: 0 } },
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
              }}
            />
            <Typography position="relative" fontSize={15} fontWeight={leading ? 700 : 500} flex={1} noWrap>
              {option}
            </Typography>
            {mine && (
              <Box position="relative" color="primary.main" display="flex" mx={0.75}>
                <IconCircleCheckFilled size={18} />
              </Box>
            )}
            <Typography
              position="relative"
              fontSize={15}
              fontWeight={leading ? 700 : 500}
              sx={{ fontVariantNumeric: 'tabular-nums' }}
            >
              {pct}%
            </Typography>
          </Box>
        );
      })}
      <Typography fontSize={13} color="text.secondary">
        {poll.totalVotes} {poll.totalVotes === 1 ? 'vote' : 'votes'} · {pollTimeLeft(poll.closesAt, poll.isClosed)}
      </Typography>
    </Box>
  );
};

export default PollView;
