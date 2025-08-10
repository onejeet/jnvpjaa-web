'use client';

import { Box, Typography, Divider } from '@mui/material';
import CommentForm from '@/components/common/CommentForm';
import CommentItem from '@/components/common/Comment';
import { Comment } from '@/apollo/hooks';
import React from 'react';

interface CommentsModuleProps {
  type: 'blog' | 'event';
  id: string;
}

const CommentsModule: React.FC<CommentsModuleProps> = ({ type, id }) => {
  const [comments, setComments] = React.useState<Comment[]>([]);

  const onAddComment = (content: string) => {
    const newComment: Comment = {
      id: Math.random().toString(),
      content,
      createdAt: new Date().toISOString(),
      author: { id: 'me', firstName: 'You', lastName: '', batch: 0 },
      updatedAt: new Date().toISOString(),
    } as unknown as Comment;
    setComments((prev) => [newComment, ...prev]);
  };

  const onReply = (parentId: string, content: string) => {
    // Placeholder: no nested replies in placeholder state
  };

  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>

      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={onReply} />
      ))}
      <Divider sx={{ my: 3 }} />
      <CommentForm onSubmit={onAddComment} />
    </Box>
  );
};

export default CommentsModule;
