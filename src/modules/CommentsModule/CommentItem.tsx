'use client';

import React from 'react';
import Link from 'next/link';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import {
  Box,
  ButtonBase,
  IconButton,
  Link as MuiLink,
  Menu,
  MenuItem,
  Popover,
  Tooltip,
  Typography,
} from '@mui/material';
import { IconArrowBackUp, IconDots, IconMoodPlus, IconPencil, IconTrash } from '@tabler/icons-react';
import ProfilePicture from '@/components/common/ProfilePicture';
import { useMemberHref } from '@/hooks/useMemberHref';
import dynamic from 'next/dynamic';
import { EmojiClickData, EmojiStyle, SkinTones } from 'emoji-picker-react';
import { COMMENT_REACTION_CODES, ThreadComment } from '@/apollo/commentOperations';
import CommentComposer from './CommentComposer';
import { splitLinks } from './commentThreads';

dayjs.extend(relativeTime);

// Loaded only when someone opens the reaction bar.
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export interface CommentItemProps {
  comment: ThreadComment;
  viewer?: { id?: string; profileImage?: string | null };
  isAdmin?: boolean;
  isReply?: boolean;
  replyCount?: number;
  onReply: (comment: ThreadComment) => void;
  onEdit: (comment: ThreadComment, content: string) => Promise<unknown>;
  onDelete: (comment: ThreadComment) => void;
  onReact: (comment: ThreadComment, emoji: string) => void;
}

export const COMMENT_AVATAR = 40;
export const REPLY_AVATAR = 36;
export const COMMENT_GAP = 16; // px between avatar and body

export const authorName = (author: ThreadComment['author']) =>
  [author?.firstName, author?.lastName].filter(Boolean).join(' ') || 'Member';

// Shared look for every control in the action row: quiet grey, one height, same hit area.
const actionSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  height: 28,
  px: 0.75,
  borderRadius: 2,
  fontSize: 13,
  fontWeight: 500,
  color: 'text.secondary',
  fontVariantNumeric: 'tabular-nums',
  transition: 'background-color .15s, color .15s, transform .12s',
  '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
  '&:active': { transform: 'scale(0.94)' },
} as const;

const Dot = () => (
  <Box component="span" aria-hidden width={4} height={4} borderRadius="50%" bgcolor="divider" flexShrink={0} />
);

const formatTime = (date: string) => {
  const d = dayjs(date);
  return dayjs().diff(d, 'day') < 7 ? d.fromNow() : d.format(d.year() === dayjs().year() ? 'D MMM' : 'D MMM YYYY');
};

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  viewer,
  isAdmin,
  isReply,
  replyCount = 0,
  onReply,
  onEdit,
  onDelete,
  onReact,
}) => {
  const [editing, setEditing] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement | null>(null);
  const [reactAnchor, setReactAnchor] = React.useState<HTMLElement | null>(null);
  const { author } = comment;
  const authorHref = useMemberHref()(author);
  const isOwn = !!viewer?.id && viewer.id === comment.authorId;
  const canDelete = isOwn || !!isAdmin;
  const pending = comment.id.startsWith('temp-');
  const avatarSize = isReply ? REPLY_AVATAR : COMMENT_AVATAR;

  const pickReaction = ({ emoji }: EmojiClickData) => {
    setReactAnchor(null);
    onReact(comment, emoji);
  };

  if (comment.isDeleted) {
    return (
      <Box display="flex" gap={`${COMMENT_GAP}px`} alignItems="center">
        <Box width={avatarSize} height={avatarSize} borderRadius="50%" bgcolor="action.hover" flexShrink={0} />
        <Typography fontSize={14} color="text.secondary" fontStyle="italic">
          This comment was deleted.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      id={`comment-${comment.id}`}
      display="flex"
      alignItems="flex-start"
      gap={`${COMMENT_GAP}px`}
      sx={{
        opacity: pending ? 0.55 : 1,
        transition: 'opacity .2s',
        animation: 'commentIn .28s ease-out',
        '@keyframes commentIn': { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1 } },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        '&:hover .comment-options, &:focus-within .comment-options': { opacity: 1 },
      }}
    >
      <ProfilePicture
        id={author?.id}
        src={author?.profileImage || undefined}
        size={avatarSize}
        // ProfilePicture's wrapper centres its avatar; pin it to the avatar's size so it can't drift down.
        containerProps={{ sx: { width: avatarSize, height: avatarSize, flexShrink: 0, alignSelf: 'flex-start' } }}
      />
      <Box flex={1} minWidth={0}>
        {/* Header: name · batch · time, vertically centred on the avatar's top half */}
        <Box display="flex" alignItems="center" columnGap={1} minHeight={22} pt="2px" flexWrap="wrap">
          {authorHref ? (
            <MuiLink
              component={Link}
              href={authorHref}
              underline="hover"
              color="text.primary"
              fontWeight={600}
              fontSize={15}
              lineHeight="22px"
            >
              {authorName(author)}
            </MuiLink>
          ) : (
            <Typography component="span" color="text.primary" fontWeight={600} fontSize={15} lineHeight="22px">
              {authorName(author)}
            </Typography>
          )}
          {(author?.batch || author?.isFaculty) && (
            <>
              <Dot />
              <Typography component="span" fontSize={13} color="text.secondary">
                {author?.isFaculty ? 'Faculty' : `Batch ${author?.batch}`}
              </Typography>
            </>
          )}
          <Dot />
          <Tooltip title={dayjs(comment.createdAt).format('D MMM YYYY, h:mm A')}>
            <Typography component="time" dateTime={comment.createdAt} fontSize={13} color="text.secondary">
              {pending ? 'Posting…' : formatTime(comment.createdAt)}
              {comment.editedAt && ' (edited)'}
            </Typography>
          </Tooltip>
          {!pending && canDelete && !editing && (
            <IconButton
              className="comment-options"
              size="small"
              aria-label="Comment options"
              onClick={(e) => setMenuAnchor(e.currentTarget)}
              sx={{
                ml: 'auto',
                my: -0.5,
                color: 'text.secondary',
                opacity: { xs: 1, md: menuAnchor ? 1 : 0 },
                transition: 'opacity .15s',
              }}
            >
              <IconDots size={18} />
            </IconButton>
          )}
        </Box>

        {editing ? (
          <Box mt={1}>
            <CommentComposer
              compact
              autoFocus
              initialValue={comment.content}
              submitLabel="Save"
              onCancel={() => setEditing(false)}
              onSubmit={async (content) => {
                await onEdit(comment, content);
                setEditing(false);
              }}
            />
          </Box>
        ) : (
          <Typography
            mt={0.5}
            fontSize={15}
            lineHeight={1.55}
            color="text.primary"
            sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}
          >
            {splitLinks(comment.content).map((part, i) =>
              part.href ? (
                <MuiLink key={i} href={part.href} target="_blank" rel="noopener noreferrer nofollow ugc">
                  {part.text}
                </MuiLink>
              ) : (
                <React.Fragment key={i}>{part.text}</React.Fragment>
              )
            )}
          </Typography>
        )}

        {!editing && !pending && (
          // ml offsets the buttons' inner padding so the first icon lines up with the text above.
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={0.25} mt={0.5} ml={-0.75}>
            {comment.reactions.map((r) => (
              <ButtonBase
                key={r.emoji}
                aria-pressed={r.reacted}
                aria-label={`${r.emoji} ${r.count}${r.reacted ? ', you reacted' : ''}`}
                onClick={() => onReact(comment, r.emoji)}
                sx={{
                  ...actionSx,
                  // Active = coloured count, like the filled thumb in the reference; no block that breaks alignment.
                  color: r.reacted ? 'primary.main' : 'text.secondary',
                  fontWeight: r.reacted ? 700 : 500,
                }}
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
                sx={{ ...actionSx, ...(reactAnchor ? { bgcolor: 'action.hover', color: 'text.primary' } : {}) }}
                onClick={(e) => setReactAnchor(e.currentTarget)}
              >
                <IconMoodPlus size={18} stroke={1.75} />
              </ButtonBase>
            </Tooltip>
            <ButtonBase sx={actionSx} onClick={() => onReply(comment)}>
              <IconArrowBackUp size={18} stroke={1.75} />
              Reply{replyCount > 0 && ` (${replyCount})`}
            </ButtonBase>
          </Box>
        )}
      </Box>

      <Popover
        open={!!reactAnchor}
        anchorEl={reactAnchor}
        onClose={() => setReactAnchor(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        // The picker draws its own rounded bar/panel, so the popover paper stays invisible.
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
          onReactionClick={pickReaction}
          onEmojiClick={pickReaction}
          style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}
        />
      </Popover>

      <Menu anchorEl={menuAnchor} open={!!menuAnchor} onClose={() => setMenuAnchor(null)}>
        {isOwn && (
          <MenuItem
            onClick={() => {
              setMenuAnchor(null);
              setEditing(true);
            }}
          >
            <IconPencil size={16} style={{ marginRight: 10 }} /> Edit
          </MenuItem>
        )}
        {canDelete && (
          <MenuItem
            sx={{ color: 'error.main' }}
            onClick={() => {
              setMenuAnchor(null);
              onDelete(comment);
            }}
          >
            <IconTrash size={16} style={{ marginRight: 10 }} /> Delete
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default React.memo(CommentItem);
