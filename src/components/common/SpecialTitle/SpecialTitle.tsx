import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface SpecialTitleProps {
  title: string;
}

const SpecialTitle: React.FC<SpecialTitleProps> = ({ title }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  return (
    <Box display="flex" position="relative" mb={{ xs: 3, md: 4 }}>
      <Typography variant="h1" fontSize={{ xs: '24px', sm: '32px', md: '40px' }}>
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
