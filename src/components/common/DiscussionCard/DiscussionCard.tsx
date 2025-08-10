'use client';

import { Card, CardActionArea, Box, Typography, IconButton, Chip, Stack } from '@mui/material';
import { IconMessageCircle, IconCalendar, IconHeart, IconMessage2 } from '@tabler/icons-react';
import ProfilePicture from '@/components/common/ProfilePicture';
import React from 'react';

export interface DiscussionCardProps {
  id: string;
  title: string;
  content?: string;
  authorId?: string;
  authorName?: string;
  authorImage?: string;
  createdAt: string;
  updatedAt?: string;
  likes: number;
  dislikes: number;
  repliesCount: number;
  onOpen?: (id: string) => void;
  onReact?: (id: string, type: 'like' | 'dislike') => void;
}

const DiscussionCard: React.FC<DiscussionCardProps> = ({
  id,
  title,
  content,
  authorId,
  authorName,
  authorImage,
  createdAt,
  likes,
  dislikes,
  repliesCount,
  onOpen,
  onReact,
}) => {
  return (
    <Card>
      <CardActionArea onClick={() => onOpen?.(id)} sx={{ p: { xs: 1.5, md: 2 } }}>
        <Typography variant="h2" fontSize={{ xs: 20, md: 22 }} fontWeight={600} sx={{ mb: 0.5 }}>
          {title}
        </Typography>
        {content && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {content}
          </Typography>
        )}

        <Stack direction="row" alignItems="center" spacing={2} mt={1}>
          <ProfilePicture
            id={authorId}
            title={authorName || 'Unknown'}
            alt={authorName}
            src={authorImage}
            size={36}
            titleComponentProps={{
              titleProps: { fontSize: '14px', fontWeight: 500 },
              summaryProps: { fontSize: '12px', color: 'text.secondary' },
            }}
          />
          <Box display="flex" alignItems="center" gap={0.5} color="text.secondary" ml={1}>
            <IconCalendar size={16} />
            <Typography variant="body2">{new Date(createdAt).toLocaleString()}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={0.5} color="text.secondary" ml={1}>
            <IconMessage2 size={16} />
            <Typography variant="body2">{repliesCount}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={0.5} onClick={(e) => e.stopPropagation()}>
            {/* <IconButton size="small" onClick={() => onReact?.(id, 'like')}> */}
            <IconHeart size={16} />
            {/* </IconButton> */}
            <Typography variant="body2">{likes}</Typography>
          </Box>
        </Stack>
      </CardActionArea>
    </Card>
  );
};

export default DiscussionCard;
