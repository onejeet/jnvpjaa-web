import { Box, Divider, Grid2 as Grid, Skeleton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ProfilePicture from '../ProfilePicture';
import { ArrowRight } from '@phosphor-icons/react';
import { useRouter } from 'next/router';
import { paths } from '@/config/paths';
import { IBlogCardProps } from './BlogCard.types';

const BlogCard: React.FC<IBlogCardProps> = ({ blog, loading }) => {
  const { slug, title, summary, createdAt, author } = blog;
  const router = useRouter();
  return (
    <Box
      component={Grid}
      container
      width="100%"
      bgcolor="grey.100"
      borderRadius={4}
      display="flex"
      onClick={() => (slug ? router.push(paths.blog.getBlogPostUrl(slug)) : null)}
      p={{
        xs: 3,
        md: 4,
      }}
      //   py={2}
      alignItems="center"
      justifyContent="start"
      //   gap={5}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.4s ease',
        svg: {
          transition: 'all 0.3s linear',
          ml: '10px',
          opacity: 0,
        },
        h1: {
          transition: 'all 0.2s linear',
        },
        '&: hover': {
          px: {
            xs: 3,
            md: 7,
          },
          svg: {
            opacity: 1,
            ml: '16px',
            color: 'primary.main',
          },
          h1: {
            color: 'primary.main',
          },
        },
      }}
    >
      <Box
        component={Grid}
        size={{ xs: 1 }}
        height="100%"
        display="flex"
        flexDirection={{
          xs: 'row',
          md: 'column',
        }}
        mb={{
          xs: 1,
          md: 0,
        }}
        // justifyContent="center"
      >
        <Box gap={0.5} textTransform="uppercase" textAlign="center" alignItems="center" display="flex">
          {loading ? (
            <Skeleton width={50} height={20} />
          ) : (
            <>
              {' '}
              <Typography fontSize="0.7rem" variant="body2">
                {dayjs().format('MMM').toString()}
              </Typography>
              <Typography fontSize="0.9rem" variant="subtitle1">
                {dayjs().format('DD').toString()}
              </Typography>
            </>
          )}
        </Box>
        {loading ? (
          <Skeleton width={50} height={20} />
        ) : (
          <Typography fontSize="1rem" variant="body2" ml={{ xs: 1, md: 0 }}>
            {dayjs().format('YYYY').toString()}
          </Typography>
        )}
      </Box>
      <Box component={Grid} size={{ xs: 12, md: 9.5 }} display="flex" flexDirection="column">
        {loading ? (
          <Skeleton width="80%" height={32} />
        ) : (
          <Typography variant="h1" sx={{ display: 'flex', alignItems: 'center' }}>
            {title} <ArrowRight size={28} weight="bold" />
          </Typography>
        )}

        {summary && <Typography variant="body1">{summary}</Typography>}
      </Box>
      <Box
        component={Grid}
        size={{ xs: 12, md: 1.5 }}
        ml={{
          xs: 0,
          md: 'auto',
        }}
        mt={{
          xs: 1,
          md: 0,
        }}
      >
        <ProfilePicture title="Jeet Sharma" loading={loading} summary="Batch of 2009" />
      </Box>
    </Box>
  );
};

export default BlogCard;
