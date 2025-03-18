import { Box, Card, Typography } from '@mui/material';
import React from 'react';
import DOMPurify from 'dompurify';
import { ISingleBlogViewProps } from './SingleBlogView.types';
import dayjs from 'dayjs';
import { Dot, DotOutline } from '@phosphor-icons/react';
import ProfilePicture from '../ProfilePicture';

const SingleBlogView: React.FC<ISingleBlogViewProps> = ({ blog = {}, loading }) => {
  const { id, title, author, content } = blog;
  const [sanitizedContent, setSanitizedContent] = React.useState('');

  React.useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(content || ''));
  }, [content]);

  return (
    <Card sx={{ p: 3 }} className="single-blog">
      <Box display="flex" alignItems="center" gap={0.5}>
        <Typography>{dayjs().format('MMM DD, YYYY')}</Typography>
        {/* {categoryId && (
          <>
            <DotOutline size={32} weight="bold" />
            <Typography>{categoryId}</Typography>
          </>
        )} */}

        <Dot size={32} weight="bold" />
        <ProfilePicture
          id={author?.id}
          title={`${author?.firstName || ''} ${author?.lastName || ''}`}
          alt={`${author?.firstName || ''} ${author?.lastName || ''}`}
          src={author?.profileImage}
          summary={`Batch of ${author?.batch || ''}`}
        />
      </Box>
      <Typography
        variant="h1"
        lineHeight="normal"
        fontSize={{
          xs: 30,
          md: 50,
        }}
        py={2}
      >
        {title}
      </Typography>
      <Typography
        variant="body1"
        color="text.primary"
        mt={1}
        mb={2}
        fontSize="18px"
        dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      />
    </Card>
  );
};

export default React.memo(SingleBlogView);
