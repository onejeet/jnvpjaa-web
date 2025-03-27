'use client';

import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import BlogListModule from '@/modules/BlogListModule';
import Image from 'next/image';
import SpecialTitle from '@/components/common/SpecialTitle';

export default function RecentBlogs() {
  const filter = React.useMemo(() => {
    return {
      verified: true,
    };
  }, []);

  return (
    <Box py={5} bgcolor="grey.300" width="100%" display="flex" flexDirection="column" alignItems="center">
      {/* <Typography variant="h1" fontSize="40px">
        Recent Stories & Experiences
        <Image src="/assets/svg/underline.svg" width={300} height={40} alt="uderline" />
      </Typography> */}
      <SpecialTitle title="Recent Stories & Experiences" />
      <Box px={{ xs: 2, md: 5 }} mt={{ xs: 4, md: 5 }} width="100%">
        <BlogListModule filter={filter} limit={5} isReadOnly />
      </Box>
    </Box>
  );
}
