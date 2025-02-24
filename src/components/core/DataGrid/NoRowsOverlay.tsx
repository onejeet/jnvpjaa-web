import EmptyView from '@/components/common/EmptyView';
import { Box, Typography } from '@mui/material';
import React from 'react';

const NoRowsOverlay: React.FC = () => {
  return (
    <Box
      component="div"
      display="flex"
      width="100%"
      height="100%"
      minHeight={400}
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      position="relative"
      zIndex={1}
      py={4}
      // pt={10}
    >
      <EmptyView />
    </Box>
  );
};

export default NoRowsOverlay;
