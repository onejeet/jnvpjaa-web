import React from 'react';
import { alpha, Box, Theme } from '@mui/material';

const GlobalBgShade = () => {
  return (
    <Box
      sx={{
        '&::before': {
          content: '" "',
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          width: '100%',
          height: '150px',
          background: (theme: Theme) =>
            `radial-gradient(farthest-corner at 90px -40px,${alpha(theme.palette.primary.main, 0.2)} 0%, transparent 60%)`,
        },
      }}
    />
  );
};

export default React.memo(GlobalBgShade);
