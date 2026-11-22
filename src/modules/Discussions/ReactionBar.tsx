'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Box, ButtonBase, Popover, Tooltip } from '@mui/material';
import { IconLink, IconMessageCircle, IconMoodPlus } from '@tabler/icons-react';
import { EmojiClickData, EmojiStyle, SkinTones } from 'emoji-picker-react';
import { COMMENT_REACTION_CODES } from '@/apollo/commentOperations';
import type { DiscussionPost } from '@/apollo/discussionOperations';
import { useAlert } from '@/context/AlertContext';

const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export const actionSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  height: 32,
  px: 1,
  borderRadius: 4,
  fontSize: 13,
  fontWeight: 500,
  color: 'text.secondary',
  fontVariantNumeric: 'tabular-nums',
  transition: 'background-color .15s, color .15s, transform .12s',
  '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
  '&:active': { transform: 'scale(0.94)' },
} as const;

interface ReactionBarProps {
  post: DiscussionPost;
  onReact: (emoji: string) => void;
  onReply: () => void;
  shareUrl: string;
}

const ReactionBar: React.FC<ReactionBarProps> = ({ post, onReact, onReply, shareUrl }) => {
  const [anchor, setAnchor] = React.useState<HTMLElement | null>(null);
  const { showAlert } = useAlert();
  const pick = ({ emoji }: EmojiClickData) => {
    setAnchor(null);
    onReact(emoji);
  };

  return (
    // ml cancels the first button's padding so its icon lines up with the text above.
    <Box display="flex" alignItems="center" flexWrap="wrap" gap={0.25} mt={1} ml={-1}>
      <ButtonBase
        sx={actionSx}
        onClick={onReply}
        aria-label={`Reply${post.replyCount ? `, ${post.replyCount} replies` : ''}`}
      >
        <IconMessageCircle size={18} stroke={1.75} />
        {post.replyCount > 0 && post.replyCount}
      </ButtonBase>
      {post.reactions.map((r) => (
        <ButtonBase
          key={r.emoji}
          aria-pressed={r.reacted}
          aria-label={`${r.emoji} ${r.count}${r.reacted ? ', you reacted' : ''}`}
          onClick={() => onReact(r.emoji)}
          sx={{ ...actionSx, color: r.reacted ? 'primary.main' : 'text.secondary', fontWeight: r.reacted ? 700 : 500 }}
        >
          <Box component="span" fontSize={15} lineHeight={1}>
            {r.emoji}
          </Box>
          {r.count}
        </ButtonBase>
      ))}
      <Tooltip title="Add reaction">
        <ButtonBase
          aria-label="Add reaction"
          sx={{ ...actionSx, ...(anchor ? { bgcolor: 'action.hover', color: 'text.primary' } : {}) }}
          onClick={(e) => setAnchor(e.currentTarget)}
        >
          <IconMoodPlus size={18} stroke={1.75} />
        </ButtonBase>
      </Tooltip>
      <Tooltip title="Copy link">
        <ButtonBase
          aria-label="Copy link"
          sx={{ ...actionSx, ml: 'auto' }}
          onClick={() =>
            navigator.clipboard
              ?.writeText(new URL(shareUrl, window.location.origin).toString())
              .then(() => showAlert({ visible: true, type: 'success', message: 'Link copied.' }))
          }
        >
          <IconLink size={18} stroke={1.75} />
        </ButtonBase>
      </Tooltip>

      <Popover
        open={!!anchor}
        anchorEl={anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        slotProps={{ paper: { sx: { mb: 0.75, bgcolor: 'transparent', boxShadow: 'none', overflow: 'visible' } } }}
      >
        <EmojiPicker
          reactionsDefaultOpen
          allowExpandReactions
          reactions={COMMENT_REACTION_CODES}
          emojiStyle={EmojiStyle.NATIVE}
          width="min(350px, calc(100vw - 32px))"
          lazyLoadEmojis
          previewConfig={{ showPreview: false }}
          defaultSkinTone={SkinTones.MEDIUM_LIGHT}
          onReactionClick={pick}
          onEmojiClick={pick}
          style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
        />
      </Popover>
    </Box>
  );
};

export default ReactionBar;
