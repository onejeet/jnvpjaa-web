import { Box, Divider, Grid2 as Grid, Typography } from '@mui/material';
import dayjs from 'dayjs';
import ProfilePicture from '../ProfilePicture';
import { ArrowRight } from '@phosphor-icons/react';

const BlogCard = () => {
  return (
    <Box
      component={Grid}
      container
      width="100%"
      bgcolor="grey.100"
      borderRadius={4}
      display="flex"
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
          <Typography fontSize="0.7rem" variant="body2">
            {dayjs().format('MMM').toString()}
          </Typography>
          <Typography fontSize="0.9rem" variant="subtitle1">
            {dayjs().format('DD').toString()}
          </Typography>
        </Box>
        <Typography fontSize="1rem" variant="body2" ml={{ xs: 1, md: 0 }}>
          {dayjs().format('YYYY').toString()}
        </Typography>
      </Box>
      <Box component={Grid} size={{ xs: 12, md: 9.5 }} display="flex" flexDirection="column">
        <Typography variant="h1" sx={{ display: 'flex', alignItems: 'center' }}>
          New York Design Week <ArrowRight size={32} weight="bold" />
        </Typography>
        <Typography variant="body1">We bring to life the most complex projects, specialize</Typography>
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
        <ProfilePicture title="Jeet Sharma" summary="Batch of 2009" />
      </Box>
    </Box>
  );
};

export default BlogCard;
