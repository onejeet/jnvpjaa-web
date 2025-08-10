'use client';

import LayoutModule from '@/layouts/Layout';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import { Box, Typography, Divider, IconButton, Card, Chip, Stack, Paper, Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { getThread, react, reactToReply, addReply, DiscussionThread, DiscussionReply } from '@/utils/discussions';
import CommentForm from '@/components/common/CommentForm';
import { IconThumbUp, IconThumbDown } from '@tabler/icons-react';
import { paths } from '@/config/paths';
import ProfilePicture from '@/components/common/ProfilePicture';
import { useAuth } from '@/context/AuthContext';

// Geometry constants (in px) to align connector with avatar center
const SPACING_UNIT = 8; // MUI default
const ROW_PADDING_Y = 0; // py={2}
const PAPER_PADDING_Y = 0; // p={{ xs: 1.5 }} vertical
const PAPER_PADDING_X = 0; // p={{ xs: 1.5 }} horizontal
const REPLY_LEFT_PADDING = 7 * SPACING_UNIT; // pl={7}
const AVATAR_SIZE = 36;
const AVATAR_CENTER_X = REPLY_LEFT_PADDING + PAPER_PADDING_X + AVATAR_SIZE / 2; // where elbow should end horizontally
const AVATAR_CENTER_Y = ROW_PADDING_Y + PAPER_PADDING_Y + AVATAR_SIZE / 2; // where elbow should land vertically

// Composer button alignment
const COMPOSER_BTN_HEIGHT = 36;
const COMPOSER_CENTER_Y = ROW_PADDING_Y + PAPER_PADDING_Y + COMPOSER_BTN_HEIGHT / 2 + 4;

const RAIL_X = -10; // left position of vertical rail box
const RAIL_SVG_X = 10; // rail path center inside its SVG
const CONNECT_GAP = 10; // gap before reaching avatar center

export default function SingleDiscussion() {
  const { id } = useParams();
  const [thread, setThread] = useState<DiscussionThread | undefined>(undefined);
  const { user } = useAuth();
  const [showComposer, setShowComposer] = useState(false);

  useEffect(() => {
    if (typeof id === 'string') setThread(getThread(id));
  }, [id]);

  const breadcrumbsList = useMemo(
    () => [{ label: 'Discussions', path: paths.discussions.root }, { label: thread?.title || 'Thread' }],
    [thread?.title]
  );

  if (!thread) {
    return (
      <LayoutModule disableCover title={`Discussion • Alumni Network of JNV Paota, Jaipur`}>
        <Box maxWidth={900} mx="auto">
          <Typography>Thread not found.</Typography>
        </Box>
      </LayoutModule>
    );
  }

  const handleAddReply = (content: string) => {
    addReply(thread.id, {
      authorId: user?.id || 'me',
      authorName: `${user?.firstName || 'You'} ${user?.lastName || ''}`.trim(),
      content,
      authorImage: user?.profileImage,
    });
    setThread(getThread(thread.id));
    setShowComposer(false);
  };

  const onReact = (type: 'like' | 'dislike') => {
    react(thread.id, type);
    setThread(getThread(thread.id));
  };

  const onReactReply = (replyId: string, type: 'like' | 'dislike') => {
    reactToReply(thread.id, replyId, type);
    setThread(getThread(thread.id));
  };

  const ReplyRow = ({ reply, isFirst, isLast }: { reply: DiscussionReply; isFirst: boolean; isLast: boolean }) => {
    // Compute elbow width so it ends before the avatar center, leaving a small gap
    const elbowEndScreenX = AVATAR_CENTER_X - CONNECT_GAP;
    const elbowWidth = Math.max(0, elbowEndScreenX - RAIL_SVG_X - 20);
    const straightStartX = 34; // where the curve transitions to straight in the elbow SVG space

    return (
      <Box position="relative" pl={5} py={2}>
        {/* Vertical rail */}
        <Box position="absolute" left={RAIL_X} top={-20} bottom={0} width={20} sx={{ pointerEvents: 'none' }}>
          <svg width="20" height="100%" viewBox={`0 0 20 100`} preserveAspectRatio="none" style={{ display: 'block' }}>
            <path
              d={`M${RAIL_SVG_X} ${isFirst ? AVATAR_CENTER_Y : 0} L${RAIL_SVG_X} ${isLast ? AVATAR_CENTER_Y + 100 : 100}`}
              stroke="#D6DBE1"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </Box>
        {/* Curve + straight to avatar center (no starting dot) */}
        <Box position="absolute" left={RAIL_X} top={AVATAR_CENTER_Y + 4} sx={{ pointerEvents: 'none' }}>
          <svg width={elbowWidth} height={24} viewBox={`0 0 ${elbowWidth} 24`}>
            {/* Curved segment */}
            <path
              d={`M${RAIL_SVG_X} 12 C ${RAIL_SVG_X + 10} 12, ${RAIL_SVG_X + 16} 12, ${Math.min(straightStartX, elbowWidth)} 12`}
              stroke="#D6DBE1"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Straight segment if there is remaining distance */}
            {elbowWidth > straightStartX && (
              <line
                x1={straightStartX}
                y1={12}
                x2={elbowWidth}
                y2={12}
                stroke="#D6DBE1"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </Box>
        <Box>
          <Stack direction="row" alignItems="center" spacing={1} color="text.secondary" mb={0.5}>
            <ProfilePicture
              id={reply.authorId}
              title={reply.authorName}
              alt={reply.authorName}
              src={reply.authorImage}
              size={AVATAR_SIZE}
            />
            <Typography variant="body2">•</Typography>
            <Typography variant="body2">{new Date(reply.createdAt).toLocaleString()}</Typography>
            <Box display="flex" gap={1.25} ml="auto" alignItems="center">
              <Box display="flex" alignItems="center" gap={0.5}>
                <IconButton onClick={() => onReactReply(reply.id, 'like')} size="small" color="primary">
                  <IconThumbUp size={16} />
                </IconButton>
                <Typography variant="caption">{reply.likes}</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={0.5}>
                <IconButton onClick={() => onReactReply(reply.id, 'dislike')} size="small" color="error">
                  <IconThumbDown size={16} />
                </IconButton>
                <Typography variant="caption">{reply.dislikes}</Typography>
              </Box>
            </Box>
          </Stack>
          <Typography variant="body1" color="text.primary" whiteSpace="pre-line">
            {reply.content}
          </Typography>
        </Box>
      </Box>
    );
  };

  const ComposerRow = () => {
    const elbowEndScreenX = AVATAR_CENTER_X - CONNECT_GAP;
    const elbowWidth = Math.max(0, elbowEndScreenX - RAIL_SVG_X);
    const straightStartX = 34;

    return (
      <Box position="relative" pl={5} py={2}>
        {/* Vertical rail continues */}
        <Box position="absolute" left={RAIL_X} top={-50} bottom={0} width={20} sx={{ pointerEvents: 'none' }}>
          <svg width="20" height="80" viewBox={`0 0 20 100`} preserveAspectRatio="none" style={{ display: 'block' }}>
            <path
              d={`M${RAIL_SVG_X} 0 L${RAIL_SVG_X} 100`}
              stroke="#D6DBE1"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </Box>

        {/* Elbow to user avatar/form area or button center */}
        <Box position="absolute" left={RAIL_X} top={AVATAR_CENTER_Y} sx={{ pointerEvents: 'none' }}>
          <svg width={elbowWidth} height={24} viewBox={`0 0 ${elbowWidth} 24`}>
            <path
              d={`M${RAIL_SVG_X} 12 C ${RAIL_SVG_X + 10} 12, ${RAIL_SVG_X + 16} 12, ${Math.min(straightStartX, elbowWidth)} 12`}
              stroke="#D6DBE1"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {elbowWidth > straightStartX && (
              <line
                x1={straightStartX}
                y1={12}
                x2={elbowWidth}
                y2={12}
                stroke="#D6DBE1"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
            )}
          </svg>
        </Box>

        <Box>
          {showComposer ? (
            <Box ml={2}>
              <Stack direction="row" alignItems="center" spacing={1} color="text.secondary" mb={2}>
                <ProfilePicture
                  id={user?.id}
                  title={`${user?.firstName || ''} ${user?.lastName || ''}`}
                  alt={user?.firstName}
                  src={user?.profileImage}
                  size={AVATAR_SIZE}
                />
                <Typography variant="body2">•</Typography>
                <Typography variant="body2">Now</Typography>
              </Stack>
              <CommentForm onSubmit={handleAddReply} />
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <Button variant="text" onClick={() => setShowComposer(true)}>
                Write a reply
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    );
  };

  return (
    <LayoutModule disableCover title={`${thread.title} • Alumni Network of JNV Paota, Jaipur`}>
      <Box mb={1} display="flex" justifyContent="start" alignItems="center" flexWrap="wrap">
        <Breadcrumbs items={breadcrumbsList} loading={false} />
      </Box>

      <Box maxWidth={900} mx="auto" display="flex" flexDirection="column" gap={2}>
        <Card sx={{ p: { xs: 2, md: 3 } }} elevation={2}>
          <Typography variant="h1" fontSize={{ xs: 22, md: 28 }} fontWeight={600} mb={1}>
            {thread.title}
          </Typography>
          <Stack direction="row" alignItems="center" spacing={1} mb={2} color="text.secondary">
            <ProfilePicture
              id={thread.authorId}
              title={thread.authorName}
              alt={thread.authorName}
              src={thread.authorImage}
              size={28}
            />
            <Typography variant="body2">•</Typography>
            <Typography variant="body2">{new Date(thread.createdAt).toLocaleString()}</Typography>
            <Chip size="small" label={`Replies ${thread.replies.length}`} sx={{ ml: 'auto' }} />
          </Stack>
          <Typography variant="body1" color="grey.900" whiteSpace="pre-line">
            {thread.content}
          </Typography>

          <Box display="flex" gap={2} mt={2} alignItems="center">
            <Box display="flex" alignItems="center" gap={0.5}>
              <IconButton onClick={() => onReact('like')} size="small" color="primary">
                <IconThumbUp size={18} />
              </IconButton>
              <Typography variant="body2">{thread.likes}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={0.5}>
              <IconButton onClick={() => onReact('dislike')} size="small" color="error">
                <IconThumbDown size={18} />
              </IconButton>
              <Typography variant="body2">{thread.dislikes}</Typography>
            </Box>
          </Box>
        </Card>

        <Divider sx={{ my: 1 }} />

        <Box>
          <Typography variant="h5" mb={1}>
            {`All Replies (${thread.replies.length})`}
          </Typography>
          <Box>
            {thread.replies.map((r, i) => (
              <ReplyRow key={r.id} reply={r} isFirst={i === 0} isLast={i === thread.replies.length - 1} />
            ))}
            <ComposerRow />
          </Box>
        </Box>
      </Box>
    </LayoutModule>
  );
}
