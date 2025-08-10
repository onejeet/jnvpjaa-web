'use client';

import { Avatar, Box, Typography, Stack, Button } from '@mui/material';
import { useState } from 'react';
import CommentForm from '../CommentForm';
import dayjs from 'dayjs';
import { Comment } from '@/apollo/hooks';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface Props {
  comment: Comment;
  onReply: (parentId: string, content: string) => void;
}

export default function CommentItem({ comment, onReply }: Props) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  return (
    <Box sx={{ mt: 2 }}>
      <Stack direction="row" spacing={2}>
        <Avatar src={comment?.author?.profileImage || undefined} />
        <Box>
          <Typography fontWeight="bold">{`${comment?.author?.firstName || ''} ${comment?.author?.lastName || ''}`}</Typography>
          <Typography variant="body2" color="text.secondary">
            {dayjs(comment.createdAt).fromNow()}
          </Typography>
          <Typography mt={1}>{comment.content}</Typography>
          <Button size="small" onClick={() => setShowReplyForm((prev) => !prev)} sx={{ mt: 1 }}>
            Reply
          </Button>
          {showReplyForm && (
            <Box mt={1}>
              <CommentForm
                onSubmit={(text) => {
                  onReply(comment.id!, text);
                  setShowReplyForm(false);
                }}
                autoFocus
              />
            </Box>
          )}
          {/* <Box ml={4}>
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} onReply={onReply} />
            ))}
          </Box> */}
        </Box>
      </Stack>
    </Box>
  );
}
