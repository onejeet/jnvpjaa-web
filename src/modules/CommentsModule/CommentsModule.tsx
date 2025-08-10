'use client';

import { Box, Typography, Divider } from '@mui/material';
import CommentForm from '@/components/common/CommentForm';
import CommentItem from '@/components/common/Comment';
import { Comment } from '@/apollo/hooks';

interface CommentsModuleProps {
  type: 'blog' | 'event';
  id: string;
}

const CommentsModule: React.FC<CommentsModuleProps> = ({ type, id }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Comments
      </Typography>
      <CommentForm onSubmit={onAddComment} />
      <Divider sx={{ my: 3 }} />
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} onReply={onReply} />
      ))}
    </Box>
  );
};
P;

export default CommentsModule;
