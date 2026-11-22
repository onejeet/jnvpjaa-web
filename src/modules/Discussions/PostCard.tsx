'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Box,
  ButtonBase,
  IconButton,
  InputBase,
  Link as MuiLink,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { IconDots, IconPencil, IconPin, IconPinnedOff, IconTrash } from '@tabler/icons-react';
import ProfilePicture from '@/components/common/ProfilePicture';
import Button from '@/components/core/Button';
import { useMemberHref } from '@/hooks/useMemberHref';
import { useAlert } from '@/context/AlertContext';
import { paths } from '@/config/paths';
import { POST_MAX_LENGTH, TAG_LABEL, type DiscussionPost } from '@/apollo/discussionOperations';
import { splitLinks } from '@/modules/CommentsModule/commentThreads';
import { fullTime, memberName, memberTag, shortTime, TAG_COLOR } from './discussion.utils';
import { EmbedFrame, PhotoGrid } from './PostMedia';
import PollView from './PollView';
import ReactionBar from './ReactionBar';
import { usePostActions } from './usePostActions';

export type PostVariant = 'feed' | 'root' | 'reply';

interface PostCardProps {
  post: DiscussionPost;
  variant?: PostVariant;
  /** Thread view passes this to open the reply box; the feed opens the thread instead. */
  onReply?: (post: DiscussionPost) => void;
}

const AVATAR = 40;
const CLAMP_LINES = 6;

const Dot = () => (
  <Box component="span" aria-hidden color="text.secondary" fontSize={13}>
    ·
  </Box>
);

// Clicks on these never open the thread.
const INTERACTIVE =
  'a, button, [role="button"], iframe, input, textarea, [role="menu"], .MuiPopover-root, .MuiDialog-root';

const Body: React.FC<{ text: string; size: number; clamp: boolean }> = ({ text, size, clamp }) => {
  const ref = React.useRef<HTMLParagraphElement>(null);
  const [overflows, setOverflows] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  React.useLayoutEffect(() => {
    const el = ref.current;
    if (clamp && el) setOverflows(el.scrollHeight > el.clientHeight + 1);
  }, [clamp, text]);

  return (
    <>
      <Typography
        ref={ref}
        fontSize={size}
        lineHeight={1.5}
        color="text.primary"
        sx={{
          whiteSpace: 'pre-wrap',
          overflowWrap: 'anywhere',
          ...(clamp && !expanded
            ? { display: '-webkit-box', WebkitLineClamp: CLAMP_LINES, WebkitBoxOrient: 'vertical', overflow: 'hidden' }
            : {}),
        }}
      >
        {splitLinks(text).map((part, i) =>
          part.href ? (
            <MuiLink key={i} href={part.href} target="_blank" rel="noopener noreferrer nofollow ugc" underline="hover">
              {part.text}
            </MuiLink>
          ) : (
            <React.Fragment key={i}>{part.text}</React.Fragment>
          )
        )}
      </Typography>
      {clamp && overflows && !expanded && (
        <ButtonBase
          onClick={() => setExpanded(true)}
          sx={{ color: 'primary.main', fontSize: size, fontWeight: 500, mt: 0.25 }}
        >
          Show more
        </ButtonBase>
      )}
    </>
  );
};

const InlineEditor: React.FC<{ initial: string; onSave: (body: string) => Promise<unknown>; onCancel: () => void }> = ({
  initial,
  onSave,
  onCancel,
}) => {
  const [value, setValue] = React.useState(initial);
  const [saving, setSaving] = React.useState(false);
  const { showAlert } = useAlert();
  const trimmed = value.trim();
  const inputRef = React.useRef<HTMLTextAreaElement>(null);

  // Focus with the caret at the end. Deferred so it lands after the ⋯ menu hands focus back to its button.
  React.useEffect(() => {
    const id = setTimeout(() => {
      const el = inputRef.current;
      el?.focus();
      el?.setSelectionRange(el.value.length, el.value.length);
    });
    return () => clearTimeout(id);
  }, []);

  return (
    <Box mt={1} border={1} borderColor="divider" borderRadius={3} p={1.5}>
      <InputBase
        inputRef={inputRef}
        multiline
        fullWidth
        value={value}
        onChange={(e) => setValue(e.target.value)}
        inputProps={{ maxLength: POST_MAX_LENGTH, 'aria-label': 'Edit post' }}
        sx={{ fontSize: 15, lineHeight: 1.5 }}
      />
      <Box display="flex" justifyContent="flex-end" gap={1} mt={1}>
        <Button title="Cancel" variant="text" size="small" onClick={onCancel} />
        <Button
          title="Save"
          size="small"
          disabled={!trimmed || saving || trimmed === initial.trim()}
          onClick={async () => {
            setSaving(true);
            try {
              await onSave(trimmed);
              onCancel();
            } catch (err) {
              showAlert({ visible: true, type: 'error', message: (err as Error).message });
            } finally {
              setSaving(false);
            }
          }}
        />
      </Box>
    </Box>
  );
};

const PostCard: React.FC<PostCardProps> = ({ post, variant = 'feed', onReply }) => {
  const router = useRouter();
  const memberHref = useMemberHref();
  const [menuAnchor, setMenuAnchor] = React.useState<HTMLElement | null>(null);
  const [editing, setEditing] = React.useState(false);
  const isRoot = variant === 'root';
  const actions = usePostActions(post, isRoot);
  const { author } = post;
  const href = memberHref(author);
  const threadUrl = paths.discussions.getThreadUrl(post.rootId ?? post.id);
  const linkToThread = variant === 'feed';
  const pending = post.id.startsWith('temp-');
  const hasMenu = !pending && !post.isDeleted && (post.canEdit || post.canDelete || post.canPin);

  const open = (e: React.MouseEvent) => {
    if (!linkToThread || editing || window.getSelection()?.toString()) return;
    if ((e.target as HTMLElement).closest(INTERACTIVE)) return;
    router.push(threadUrl);
  };

  if (post.isDeleted) {
    return (
      <Box component="article" px={2} py={1.5} borderBottom={1} borderColor="divider">
        <Typography fontSize={15} color="text.secondary" bgcolor="action.hover" borderRadius={3} px={2} py={1.5}>
          This post was deleted.
        </Typography>
      </Box>
    );
  }

  const name = (
    <Typography component="span" fontWeight={700} fontSize={15} color="text.primary" noWrap>
      {memberName(author)}
    </Typography>
  );
  const tag = memberTag(author);

  return (
    <Box
      component="article"
      id={`post-${post.id}`}
      onClick={open}
      px={2}
      pt={1.5}
      pb={1}
      borderBottom={1}
      borderColor="divider"
      sx={{
        cursor: linkToThread ? 'pointer' : 'default',
        opacity: pending ? 0.55 : 1,
        transition: 'background-color .15s, opacity .2s',
        '&:hover': linkToThread ? { bgcolor: 'action.hover' } : undefined,
        animation: 'postIn .28s ease-out',
        '@keyframes postIn': { from: { opacity: 0, transform: 'translateY(6px)' }, to: { opacity: 1 } },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    >
      {post.isPinned && !post.parentId && (
        <Box display="flex" alignItems="center" gap={0.75} ml={`${AVATAR - 16}px`} mb={0.5} color="text.secondary">
          <IconPin size={14} />
          <Typography fontSize={13} fontWeight={600}>
            Pinned
          </Typography>
        </Box>
      )}
      <Box display="flex" gap={1.5}>
        <ProfilePicture
          id={author?.id}
          src={author?.profileImage || undefined}
          size={AVATAR}
          containerProps={{ sx: { width: AVATAR, height: AVATAR, flexShrink: 0, alignSelf: 'flex-start' } }}
        />
        <Box flex={1} minWidth={0}>
          <Box display="flex" alignItems="center" columnGap={0.75} minHeight={22} minWidth={0}>
            {href ? (
              <MuiLink
                component={Link}
                href={href}
                underline="hover"
                color="text.primary"
                minWidth={0}
                sx={{ display: 'flex' }}
              >
                {name}
              </MuiLink>
            ) : (
              name
            )}
            {tag && (
              <Typography component="span" fontSize={14} color="text.secondary" noWrap flexShrink={0}>
                {tag}
              </Typography>
            )}
            <Dot />
            <Tooltip title={fullTime(post.createdAt)}>
              {linkToThread ? (
                <MuiLink
                  component={Link}
                  href={threadUrl}
                  underline="hover"
                  fontSize={14}
                  color="text.secondary"
                  flexShrink={0}
                >
                  <time dateTime={post.createdAt}>{pending ? 'Posting…' : shortTime(post.createdAt)}</time>
                </MuiLink>
              ) : (
                <Typography
                  component="time"
                  dateTime={post.createdAt}
                  fontSize={14}
                  color="text.secondary"
                  flexShrink={0}
                >
                  {shortTime(post.createdAt)}
                </Typography>
              )}
            </Tooltip>
            {post.editedAt && (
              <Typography component="span" fontSize={13} color="text.secondary" flexShrink={0}>
                (edited)
              </Typography>
            )}
            {post.tag && post.tag !== 'DISCUSSION' && (
              <>
                <Dot />
                <Typography component="span" fontSize={13} fontWeight={700} color={TAG_COLOR[post.tag]} flexShrink={0}>
                  {TAG_LABEL[post.tag]}
                </Typography>
              </>
            )}
            {hasMenu && (
              <IconButton
                size="small"
                aria-label="Post options"
                onClick={(e) => setMenuAnchor(e.currentTarget)}
                sx={{ ml: 'auto', my: -0.75, mr: -1, color: 'text.secondary' }}
              >
                <IconDots size={18} />
              </IconButton>
            )}
          </Box>

          {post.replyingTo && variant !== 'root' && (
            <Typography fontSize={14} color="text.secondary" mt={0.25}>
              Replying to{' '}
              <Box component="span" color="primary.main">
                @{memberName(post.replyingTo)}
              </Box>
            </Typography>
          )}

          <Box mt={0.5}>
            {editing ? (
              <InlineEditor initial={post.body} onSave={actions.saveEdit} onCancel={() => setEditing(false)} />
            ) : (
              <Body text={post.body} size={isRoot ? 17 : 15} clamp={!isRoot} />
            )}
          </Box>

          <PhotoGrid images={post.images} />
          {post.embed && <EmbedFrame embed={post.embed} />}
          {post.poll && <PollView postId={post.id} poll={post.poll} />}

          {isRoot && (
            <Typography fontSize={14} color="text.secondary" mt={1.5}>
              <time dateTime={post.createdAt}>{fullTime(post.createdAt)}</time>
            </Typography>
          )}

          {!pending && (
            <ReactionBar
              post={post}
              shareUrl={threadUrl}
              onReact={actions.react}
              onReply={() => (onReply ? onReply(post) : router.push(threadUrl))}
            />
          )}
        </Box>
      </Box>

      <Menu
        anchorEl={menuAnchor}
        open={!!menuAnchor}
        onClose={() => setMenuAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {post.canEdit && (
          <MenuItem
            onClick={() => {
              setMenuAnchor(null);
              setEditing(true);
            }}
          >
            <IconPencil size={16} style={{ marginRight: 10 }} /> Edit
          </MenuItem>
        )}
        {post.canPin && !post.parentId && (
          <MenuItem
            onClick={() => {
              setMenuAnchor(null);
              actions.togglePin();
            }}
          >
            {post.isPinned ? (
              <IconPinnedOff size={16} style={{ marginRight: 10 }} />
            ) : (
              <IconPin size={16} style={{ marginRight: 10 }} />
            )}
            {post.isPinned ? 'Unpin' : 'Pin to top'}
          </MenuItem>
        )}
        {post.canDelete && (
          <MenuItem
            sx={{ color: 'error.main' }}
            onClick={() => {
              setMenuAnchor(null);
              actions.confirmDelete();
            }}
          >
            <IconTrash size={16} style={{ marginRight: 10 }} /> Delete
          </MenuItem>
        )}
      </Menu>
    </Box>
  );
};

export default React.memo(PostCard);
