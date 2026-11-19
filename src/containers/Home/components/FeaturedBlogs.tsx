'use client';

import React from 'react';
import { Box, Grid2 as Grid } from '@mui/material';
import SpecialTitle from '@/components/common/SpecialTitle';
import BlogCard from '@/components/common/BlogCard';
import { Blog, BlogStatus, useGetBlogQuery } from '@/apollo/hooks';
import { content } from '@/config/tenant';

// Blog slugs chosen per tenant (tenants/<id>/content.json, one per line); none → no section.
const FEATURED_SLUGS = (content['home.featuredBlogSlugs'] || '')
  .split('\n')
  .map((id) => id.trim())
  .filter(Boolean);

function FeaturedBlog({ slug }: { slug: string }) {
  const { data } = useGetBlogQuery({ variables: { slug } });
  const blog = data?.getBlog as Blog | undefined;
  if (!blog || blog.status !== BlogStatus.Published) return null;
  return (
    <Grid size={{ xs: 12 }}>
      <BlogCard blog={blog} isReadOnly />
    </Grid>
  );
}

export default function FeaturedBlogs() {
  if (!FEATURED_SLUGS.length) return null;
  return (
    <Box py={5} bgcolor="grey.300" width="100%" display="flex" flexDirection="column" alignItems="center">
      <SpecialTitle title="Featured Stories & Experiences" />
      <Box px={{ xs: 2, md: 5 }} mt={{ xs: 4, md: 5 }} width="100%">
        <Grid container spacing={2} width="100%" display="flex" alignItems="start" mt={1}>
          <Grid container size={{ xs: 12, md: 12 }} spacing={1}>
            {FEATURED_SLUGS.map((slug) => (
              <FeaturedBlog key={slug} slug={slug} />
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
