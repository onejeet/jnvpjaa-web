import {
  Box,
  Card,
  Chip,
  Divider,
  IconButton,
  Skeleton,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import React from 'react';
import DOMPurify from 'dompurify';
import { ISingleBlogViewProps } from './SingleBlogView.types';
import dayjs from 'dayjs';
import { IconCalendarEvent as CalendarDots, IconPointFilled as Dot } from '@tabler/icons-react';
import ProfilePicture from '../ProfilePicture';
import { BlogStatus } from '@/apollo/hooks';
import { debounce, getFormattedLabel, startCase } from '@/utils/helpers';
import ClapButton from '../ClapButton';
import SocialShareModal from '../SocialShareModal';
import Image from 'next/image';
import { dmSans, notoSerif } from '@/utils/theme/fonts';

export function useDebouncedClap(callback: (claps: number) => void, delay = 800) {
  const callbackRef = React.useRef(callback);

  // Always use latest callback
  React.useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  const debounced = React.useMemo(() => {
    return debounce((claps: number) => {
      callbackRef.current(claps);
    }, delay);
  }, [delay]);

  // Optional: cancel debounce on unmount
  React.useEffect(() => {
    return () => debounced.cancel();
  }, [debounced]);

  return debounced;
}

const SingleBlogView: React.FC<ISingleBlogViewProps> = ({ blog, claps: initialClaps, loading, updateClap }) => {
  const { id, title, author, content, cover, shortUrl, status, updatedAt } = blog || {};
  const [sanitizedContent, setSanitizedContent] = React.useState('');
  const [newClaps, setNewClaps] = React.useState(0);

  console.log('ZZ: cover', cover);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const updateClapRef = React.useRef(updateClap);
  updateClapRef.current = updateClap;

  React.useEffect(() => {
    setSanitizedContent(DOMPurify.sanitize(content || ''));
  }, [content]);

  React.useEffect(() => {
    if (initialClaps) {
      setNewClaps(0);
    }
  }, [initialClaps]);

  const statusMessage = React.useMemo(() => {
    return !loading && status && status !== BlogStatus.Published
      ? `Preview Mode. Blog is in "${getFormattedLabel(status as string)}" status.`
      : null;
  }, [status, loading]);

  const onClaps = (claps: number) => {
    setNewClaps(claps);
    onClapsDebounce(claps);
  };

  const onClapsDebounce = useDebouncedClap(updateClap, 800);

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

      <Box p={{ xs: 1.5, md: 3 }} pt={statusMessage ? 8 : 3}>
        {loading ? (
          <Skeleton width="80%" height={66} sx={{ py: 1 }} />
        ) : (
          <Typography
            variant="h1"
            lineHeight="normal"
            fontSize={{
              xs: 24,
              sm: 30,
              md: 50,
            }}
            //  py={1}
          >
            {title}
          </Typography>
        )}
        <Box
          display="flex"
          flexDirection={{ xs: 'column', md: 'row' }}
          alignItems={{ xs: 'start', md: 'center' }}
          gap={{
            xs: 1,
            md: 0.5,
          }}
          mt={{ xs: 1, md: 0 }}
        >
          {loading ? (
            <Skeleton width={80} height={25} />
          ) : (
            <Box display="flex" alignItems="center" gap={1}>
              <CalendarDots size={isMobile ? 18 : 20} />
              <Typography variant="body1" whiteSpace="nowrap" fontSize={{ xs: '16px', md: '18px' }}>
                {dayjs(updatedAt).format('MMM DD, YYYY')}
              </Typography>
            </Box>
          )}

          {/* {categoryId && (
          <>
            <DotOutline size={32}  />
            <Typography>{categoryId}</Typography>
          </>
        )} */}
          {statusMessage && !isMobile && (
            <>
              <Dot size={20} />
              <Chip size="small" label={getFormattedLabel(status as string)} color="error" />
            </>
          )}
          {!isMobile && <Dot size={20} />}
          <Box display="flex" alignItems="center" justifyContent="space-between" width="100%">
            <ProfilePicture
              loading={loading}
              id={author?.id}
              size={44}
              title={`${author?.firstName || ''} ${author?.lastName || ''}`}
              alt={`${author?.firstName || ''} ${author?.lastName || ''}`}
              src={author?.profileImage}
              summary={`Batch of ${author?.batch || ''}`}
            />

            {!statusMessage && (
              <Box gap={1} display="flex" alignItems="center">
                <SocialShareModal title={title} url={shortUrl} />
                <ClapButton
                  initialClaps={initialClaps}
                  claps={newClaps}
                  disabled={Boolean(statusMessage)}
                  setClaps={onClaps}
                  containerProps={{ ml: 'auto' }}
                />
              </Box>
            )}
          </Box>
        </Box>

        <Box width="100%" mt={2} mb={1} display="flex" justifyContent="center">
          {loading ? (
            <Skeleton variant="rectangular" width="100%" height={300} />
          ) : (
            cover?.url && (
              <Box width="100%" display="flex" flexDirection="column" alignItems="start" justifyContent="center">
                <Image
                  src={cover?.url}
                  width={800}
                  height={400}
                  alt={`${title} cover image`}
                  layout="responsive"
                  objectFit="cover"
                  referrerPolicy="no-referrer"
                  style={{
                    maxWidth: isMobile ? '100%' : '90%',
                    // maxHeight: 650,
                    borderRadius: '10px',
                  }}
                />
                {cover?.credits && (
                  <Typography
                    // mt={1}
                    variant="body2"
                    width="100%"
                    maxWidth="90%"
                    py={0.5}
                    textAlign="center"
                    bgcolor="grey.100"
                    color="grey.700"
                    sx={{
                      borderBottomLeftRadius: '10px',
                      borderBottomRightRadius: '10px',
                      a: {
                        color: 'grey.700',
                        '&: hover': {
                          color: 'grey.800',
                          textDecoration: 'none',
                        },
                      },
                    }}
                  >
                    Photo by{' '}
                    <a
                      href={cover?.credits?.url}
                      target="_blank"
                      style={{ color: 'grey.700', borderBottom: '1px dotted' }}
                      rel="noreferrer"
                    >
                      {cover?.credits?.name || ''}
                    </a>{' '}
                    on {cover?.credits?.source}
                  </Typography>
                )}
              </Box>
            )
          )}
        </Box>

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
              className="rich_content"
              variant="body1"
              color="text.primary"
              // mt={1}
              my={2}
              lineHeight={{
                xs: '32px',
                md: '36px',
              }}
              fontSize={{
                xs: '20px',
                md: '22px',
              }}
              sx={{ fontFamily: notoSerif.style.fontFamily }}
              dangerouslySetInnerHTML={{ __html: sanitizedContent }}
            />
            <Divider sx={{ my: { xs: 2, md: 3 } }} />
            <Box
              gap={2}
              mb={{ xs: 2, md: 3 }}
              display="flex"
              alignItems="center"
              flexDirection={{ xs: 'column', sm: 'row' }}
            >
              <SocialShareModal title={title} url={shortUrl} btn_type="button" />
              <Divider
                orientation="vertical"
                sx={{
                  height: '40px',
                  display: {
                    xs: 'none',
                    sm: 'flex',
                  },
                }}
              />
              {id && (
                <ClapButton
                  initialClaps={initialClaps}
                  claps={newClaps}
                  setClaps={onClaps}
                  disabled={Boolean(statusMessage)}
                  author={author}
                  // containerProps={{ ml: { xs: 'none', sm: 'auto' } }}
                />
              )}
            </Box>
          </>
        )}
      </Box>
    </Card>
  );
};

export default React.memo(SingleBlogView);
