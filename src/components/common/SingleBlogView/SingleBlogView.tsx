import { Box, Card, Chip, IconButton, Skeleton, Tooltip, Typography } from '@mui/material';
import React from 'react';
import DOMPurify from 'dompurify';
import { ISingleBlogViewProps } from './SingleBlogView.types';
import dayjs from 'dayjs';
import { Dot, DotOutline, HandsClapping } from '@phosphor-icons/react';
import ProfilePicture from '../ProfilePicture';
import { BlogStatus } from '@/apollo/hooks';
import { getFormattedLabel, startCase } from '@/utils/helpers';
import ClapButton from '../ClapButton';

const SingleBlogView: React.FC<ISingleBlogViewProps> = ({ blog, loading, updateClap }) => {
  const { id, title, author, content, claps, status, updatedAt } = blog || {};
  const [sanitizedContent, setSanitizedContent] = React.useState('');
  const [newClaps, setNewClaps] = React.useState(0);

  React.useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(content || ''));
  }, [content]);

  const statusMessage = React.useMemo(() => {
    return status && status !== BlogStatus.Published
      ? `Preview Mode. Blog is in "${getFormattedLabel(status as string)}" status.`
      : null;
  }, [status]);

  // TODO: UPDATE CLAPS VIA API

  return (
    <Card sx={{ position: 'relative' }} className="single-blog">
      {statusMessage && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            py: '2px',
            bgcolor: 'error.main',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Typography color="common.white" variant="body2">
            {statusMessage}
          </Typography>
        </Box>
      )}

      <Box p={3} pt={statusMessage ? 5 : 3}>
        <Box display="flex" alignItems="center" gap={0.5}>
          {loading ? (
            <Skeleton width={80} height={25} />
          ) : (
            <Typography>{dayjs(updatedAt).format('MMM DD, YYYY')}</Typography>
          )}

          {/* {categoryId && (
          <>
            <DotOutline size={32} weight="bold" />
            <Typography>{categoryId}</Typography>
          </>
        )} */}
          {statusMessage && (
            <>
              <Dot size={32} weight="bold" />
              <Chip size="small" label={getFormattedLabel(status as string)} color="error" />
            </>
          )}
          <Dot size={32} weight="bold" />
          <ProfilePicture
            loading={loading}
            id={author?.id}
            title={`${author?.firstName || ''} ${author?.lastName || ''}`}
            alt={`${author?.firstName || ''} ${author?.lastName || ''}`}
            src={author?.profileImage}
            summary={`Batch of ${author?.batch || ''}`}
          />
          <ClapButton initialClaps={claps || 10} claps={newClaps} setClaps={setNewClaps} />
        </Box>
        {loading ? (
          <Skeleton width="80%" height={66} sx={{ py: 2 }} />
        ) : (
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
        )}

        {loading ? (
          <>
            <Box my={1}>
              <Skeleton width="100%" height={25} /> <Skeleton width="100%" height={25} />
              <Skeleton width="40%" height={25} />
            </Box>
            <Box my={1}>
              <Skeleton width="100%" height={25} /> <Skeleton width="80%" height={25} />
              <Skeleton width="40%" height={25} />
            </Box>
            <Box my={1}>
              <Skeleton width="100%" height={25} /> <Skeleton width="60%" height={25} />
            </Box>
            <Box my={1}>
              <Skeleton width="100%" height={25} /> <Skeleton width="20%" height={25} />
            </Box>
          </>
        ) : (
          <>
            <Typography
              className="single-blog-content"
              variant="body1"
              color="text.primary"
              mt={1}
              mb={2}
              fontSize="18px"
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
            <ClapButton initialClaps={claps || 10} claps={newClaps} setClaps={setNewClaps} author={author} />
          </>
        )}
      </Box>
    </Card>
  );
};

export default React.memo(SingleBlogView);
