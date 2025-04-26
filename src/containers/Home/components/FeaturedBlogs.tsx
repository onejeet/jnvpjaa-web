import React from 'react';
import { Box, Grid2 as Grid } from '@mui/material';
import SpecialTitle from '@/components/common/SpecialTitle';
import BlogCard from '@/components/common/BlogCard';
import { Blog, BlogBasic, BlogStatus } from '@/apollo/hooks';

const listData: Blog[] = [
  {
    author: {
      batch: 2009,
      disabled: false,
      dob: '1992-04-09T18:30:00.000Z',
      firstName: 'Ashish',
      id: '722f311f-2136-4d4d-83ab-422c8100d323',
      isConfidential: true,
      isFaculty: false,
      isVerified: true,
      lastName: 'Kumar',
      profileImage: 'https://assets.jnvpjaa.org/assets/profile/ashish-kumar-2009.webp',
    },
    authorId: '722f311f-2136-4d4d-83ab-422c8100d323',
    categoryId: 'career-networking',
    claps: 0,
    createdAt: '2025-04-12T08:54:37.229Z',
    id: '6c6c2ee3-8a66-4916-85e2-20726e28168a',
    shortUrl: '',
    slug: 'navodaya-a-journey-from-dreams-to-destiny',
    status: BlogStatus.Published,
    summary: 'Some places shape your life, give wings to your dreams, and lay the foundation...',
    title: 'Navodaya: A Journey from Dreams to Destiny',
    updatedAt: '2025-04-13T10:49:47.410Z',
  },
  {
    author: {
      batch: 1994,
      disabled: false,
      dob: '1976-11-25T18:30:00.000Z',
      firstName: 'Shiv',
      id: '52e2e1fe-bb2e-475d-8db2-bb2fd8e0b775',
      isConfidential: true,
      isFaculty: false,
      isVerified: true,
      lastName: 'Vijaya',
      profileImage: 'https://assets.jnvpjaa.org/assets/profile/shiv-vijaya-1994.jpg',
    },
    authorId: '52e2e1fe-bb2e-475d-8db2-bb2fd8e0b775',
    categoryId: 'alumni-thoughts-creativity',
    claps: 0,
    createdAt: '2019-08-10T18:30:00.000Z',
    id: 'd9d3495e-511c-472b-b49f-816d30bda311',
    shortUrl: '',
    slug: 'मेरा-देश-मैं-ही-सँवारूँ',
    status: BlogStatus.Published,
    summary: 'भारत विविधताओं का एक_देश प्राकृतिक संपदाओं से, संसाधनों से, दर्शनीय स्थलों...',
    title: 'मेरा देश मैं ही सँवारूँ',
    updatedAt: '2025-04-13T10:49:47.402Z',
  },
  {
    author: {
      batch: 1994,
      disabled: false,
      dob: '1976-11-25T18:30:00.000Z',
      firstName: 'Shiv',
      id: '52e2e1fe-bb2e-475d-8db2-bb2fd8e0b775',
      isConfidential: true,
      isFaculty: false,
      isVerified: true,
      lastName: 'Vijaya',
      profileImage: 'https://assets.jnvpjaa.org/assets/profile/shiv-vijaya-1994.jpg',
    },
    authorId: '52e2e1fe-bb2e-475d-8db2-bb2fd8e0b775',
    categoryId: 'alumni-stories',
    claps: 0,
    createdAt: '2019-07-08T18:30:00.000Z',
    id: 'bffed43b-b305-4a2f-9486-8cc915490ae0',
    shortUrl: '',
    slug: 'भाई-हमारे-साथ-भी-फ़्रेम-में-आ-जाएगा-क्या',
    status: BlogStatus.Published,
    summary: 'ये बात उन दिनों की है जब हम नए नए टीन एजर बने थे, होंठों के ऊपर छोटी छोटी मूँछे दिखने लगी थी...',
    title: 'भाई हमारे साथ भी फ़्रेम में आ जाएगा क्या?',
    updatedAt: '2025-04-13T10:49:47.391Z',
  },
];

export default function FeaturedBlogs() {
  return (
    <Box py={5} bgcolor="grey.300" width="100%" display="flex" flexDirection="column" alignItems="center">
      <SpecialTitle title="Featured Stories & Experiences" />
      <Box px={{ xs: 2, md: 5 }} mt={{ xs: 4, md: 5 }} width="100%">
        <Grid container spacing={2} width="100%" display="flex" alignItems="start" mt={1}>
          <Grid container size={{ xs: 12, md: 12 }} spacing={1}>
            {listData?.map((blog: Blog, index: number) => (
              <Grid size={{ xs: 12 }} key={`events-${blog.id}-${index}`}>
                <BlogCard blog={blog} isReadOnly />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
