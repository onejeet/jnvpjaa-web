import { Box, Card, Chip, Typography } from '@mui/material';
import React from 'react';
import DOMPurify from 'dompurify';
import { ISingleBlogViewProps } from './SingleBlogView.types';
import dayjs from 'dayjs';
import { Dot, DotOutline } from '@phosphor-icons/react';
import ProfilePicture from '../ProfilePicture';
import { BlogStatus } from '@/apollo/hooks';
import { startCase } from '@/utils/helpers';

const SingleBlogView: React.FC<ISingleBlogViewProps> = ({ blog, loading }) => {
  const { id, title, author, content, status, updatedAt } = blog || {};
  const [sanitizedContent, setSanitizedContent] = React.useState('');

  React.useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(content || ''));
  }, [content]);

  const statusMessage = React.useMemo(() => {
    return status !== BlogStatus.Published ? `Preview Mode. Blog is not published yet.` : null;
  }, [status]);

  return (
    <Card sx={{ position: 'relative' }} className="single-blog">
      <Box sx={{ position: 'absolute', top: 0, bgcolor: 'error.main', width: '100%', textAlign: 'center' }}>
        <Typography color="common.white" variant="body2" py="4px">
          {statusMessage}
        </Typography>
      </Box>
      <Box p={3} pt={statusMessage ? 5 : 3}>
        <Box display="flex" alignItems="center" gap={0.5}>
          <Typography>{dayjs(updatedAt).format('MMM DD, YYYY')}</Typography>
          {/* {categoryId && (
          <>
            <DotOutline size={32} weight="bold" />
            <Typography>{categoryId}</Typography>
          </>
        )} */}
          {statusMessage && (
            <>
              <Dot size={32} weight="bold" />
              <Chip size="small" label={startCase(status as string)} color="error" />
            </>
          )}
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
      </Box>
    </Card>
  );
};

export default React.memo(SingleBlogView);
