'use client';

import { Card, CardActionArea, Box, Typography, IconButton, Chip, Stack } from '@mui/material';
import { IconMessageCircle, IconCalendar, IconHeart } from '@tabler/icons-react';
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

        <Stack direction="row" alignItems="center" spacing={1} mt={1}>
          <ProfilePicture
            id={authorId}
            title={authorName || 'Unknown'}
            alt={authorName}
            src={authorImage}
            size={26}
            titleComponentProps={{
              titleProps: { fontSize: '12px', fontWeight: 500 },
              summaryProps: { fontSize: '12px', color: 'text.secondary' },
            }}
          />
          <Box display="flex" alignItems="center" gap={0.5} color="text.secondary" ml={1}>
            <IconCalendar size={16} />
            <Typography variant="caption">{new Date(createdAt).toLocaleString()}</Typography>
          </Box>

          <Chip
            size="small"
            variant="outlined"
            icon={<IconMessageCircle size={14} />}
            label={repliesCount}
            sx={{ ml: 'auto' }}
          />
        </Stack>

        <Box display="flex" gap={2} mt={1} alignItems="center">
          <Box display="flex" alignItems="center" gap={0.5} onClick={(e) => e.stopPropagation()}>
            <IconButton size="small" onClick={() => onReact?.(id, 'like')}>
              <IconHeart size={16} />
            </IconButton>
            <Typography variant="caption">{likes}</Typography>
          </Box>
        </Box>
      </CardActionArea>
    </Card>
  );
};

export default DiscussionCard;
