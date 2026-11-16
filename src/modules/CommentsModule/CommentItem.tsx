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
import { IconDots, IconMessageCircle, IconMoodPlus, IconPencil, IconTrash } from '@tabler/icons-react';
import ProfilePicture from '@/components/common/ProfilePicture';
import { paths } from '@/config/paths';
import { COMMENT_REACTIONS, ThreadComment } from '@/apollo/commentOperations';
import CommentComposer from './CommentComposer';
import { splitLinks } from './commentThreads';

dayjs.extend(relativeTime);

export interface CommentItemProps {
  comment: ThreadComment;
  viewer?: { id?: string; profileImage?: string | null };
  isAdmin?: boolean;
  isReply?: boolean;
  onReply: (comment: ThreadComment) => void;
  onEdit: (comment: ThreadComment, content: string) => Promise<unknown>;
  onDelete: (comment: ThreadComment) => void;
  onReact: (comment: ThreadComment, emoji: string) => void;
}

export const authorName = (author: ThreadComment['author']) =>
  [author?.firstName, author?.lastName].filter(Boolean).join(' ') || 'Member';

const actionSx = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 0.5,
  px: 1,
  py: 0.5,
  borderRadius: 5,
  fontSize: 13,
  fontWeight: 600,
  color: 'text.secondary',
  '&:hover': { bgcolor: 'action.hover', color: 'text.primary' },
} as const;

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  viewer,
  isAdmin,
  isReply,
  onReply,
  onEdit,
  onDelete,
  onReact,
}) => {
  const [editing, setEditing] = React.useState(false);
  const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement | null>(null);
  const [reactAnchor, setReactAnchor] = React.useState<HTMLElement | null>(null);
  const { author } = comment;
  const isOwn = !!viewer?.id && viewer.id === comment.authorId;
  const canDelete = isOwn || !!isAdmin;
  const pending = comment.id.startsWith('temp-');
  const avatarSize = isReply ? 32 : 40;

  if (comment.isDeleted) {
    return (
      <Box display="flex" gap={1.5} alignItems="center" py={0.5}>
        <Box width={avatarSize} height={avatarSize} borderRadius="50%" bgcolor="action.hover" flexShrink={0} />
        <Typography variant="body2" color="text.secondary" fontStyle="italic">
          This comment was deleted.
        </Typography>
      </Box>
    );
  }

  return (
    <Box
      id={`comment-${comment.id}`}
      display="flex"
      gap={1.5}
      sx={{
        opacity: pending ? 0.6 : 1,
        transition: 'opacity .2s',
        animation: 'commentIn .28s ease-out',
        '@keyframes commentIn': { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1 } },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    >
      <ProfilePicture
        id={author?.id}
        src={author?.profileImage || undefined}
        size={avatarSize}
        containerProps={{ sx: { width: avatarSize, flexShrink: 0 } }}
      />
      <Box flex={1} minWidth={0}>
        <Box display="flex" alignItems="baseline" flexWrap="wrap" columnGap={1}>
          <MuiLink
            component={Link}
            href={author?.id ? paths.profile.getProfileUrl(author.id) : '#'}
            underline="hover"
            color="text.primary"
            fontWeight={700}
            fontSize={15}
          >
            {authorName(author)}
          </MuiLink>
          {(author?.batch || author?.isFaculty) && (
            <Typography component="span" variant="caption" color="text.secondary" fontWeight={600}>
              {author?.isFaculty ? 'Faculty' : `Batch ${author?.batch}`}
            </Typography>
          )}
          <Tooltip title={dayjs(comment.createdAt).format('D MMM YYYY, h:mm A')}>
            <Typography component="time" dateTime={comment.createdAt} variant="caption" color="text.secondary">
              · {pending ? 'Posting…' : dayjs(comment.createdAt).fromNow()}
              {comment.editedAt && ' · edited'}
            </Typography>
          </Tooltip>
          {!pending && (isOwn || canDelete) && !editing && (
            <IconButton
              size="small"
              aria-label="Comment options"
              onClick={(e) => setMenuAnchor(e.currentTarget)}
              sx={{ ml: 'auto', alignSelf: 'center', color: 'text.secondary' }}
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
            lineHeight={1.6}
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
          <Box display="flex" alignItems="center" flexWrap="wrap" gap={0.75} mt={0.75} ml={-1}>
            {comment.reactions.map((r) => (
              <ButtonBase
                key={r.emoji}
                aria-pressed={r.reacted}
                aria-label={`${r.emoji} ${r.count}`}
                onClick={() => onReact(comment, r.emoji)}
                sx={{
                  ...actionSx,
                  px: 1,
                  border: '1px solid',
                  borderColor: r.reacted ? 'primary.main' : 'divider',
                  bgcolor: r.reacted ? (t) => `${t.palette.primary.main}14` : 'transparent',
                  color: r.reacted ? 'primary.main' : 'text.secondary',
                  transition: 'transform .12s',
                  '&:active': { transform: 'scale(0.92)' },
                }}
              >
                <span style={{ fontSize: 15, lineHeight: 1 }}>{r.emoji}</span>
                {r.count}
              </ButtonBase>
            ))}
            <Tooltip title="React">
              <ButtonBase aria-label="Add reaction" sx={actionSx} onClick={(e) => setReactAnchor(e.currentTarget)}>
                <IconMoodPlus size={17} />
              </ButtonBase>
            </Tooltip>
            <ButtonBase sx={actionSx} onClick={() => onReply(comment)}>
              <IconMessageCircle size={17} />
              Reply
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
        slotProps={{ paper: { sx: { borderRadius: 6, p: 0.5, display: 'flex', gap: 0.25 } } }}
      >
        {COMMENT_REACTIONS.map((emoji) => (
          <IconButton
            key={emoji}
            aria-label={`React ${emoji}`}
            onClick={() => {
              onReact(comment, emoji);
              setReactAnchor(null);
            }}
            sx={{
              fontSize: 22,
              width: 40,
              height: 40,
              transition: 'transform .12s',
              '&:hover': { transform: 'scale(1.25)' },
            }}
          >
            {emoji}
          </IconButton>
        ))}
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
