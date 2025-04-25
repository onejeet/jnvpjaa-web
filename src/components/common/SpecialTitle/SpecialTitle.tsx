'use client';

import { Box, BoxProps, Typography, TypographyProps, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';

interface SpecialTitleProps {
  title: string;
  containerProps?: Partial<BoxProps>;
  titleProps?: Partial<TypographyProps>;
}

const SpecialTitle: React.FC<SpecialTitleProps> = ({ title, containerProps = {}, titleProps = {} }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box display="flex" width="fit-content" position="relative" mb={{ xs: 3, md: 4 }} {...containerProps}>
      <Typography variant="h1" fontSize={{ xs: '24px', sm: '32px', md: '40px' }} {...titleProps}>
        {title}
      </Typography>
      <Box
        position="absolute"
        bottom={isMobile ? '-40px' : '-50px'}
        left="10%"
        sx={{
          height: '40px',
          width: '80%',
          backgroundRepeat: 'no-repeat',
          backgroundImage: 'url("/assets/svg/underline.svg")',
        }}
      />
    </Box>
  );
};

export default SpecialTitle;
