/* REACT */

import React from 'react';
import { Avatar, Backdrop } from '@mui/material';
/* MUI */
import Box from '@mui/material/Box';
import { alpha } from '@mui/system';

/* TYPES */
import type { LoadingIndicatorProps } from './LoadingIndicator.types';
import Image from 'next/image';

const getContent = (props: LoadingIndicatorProps) => {
  const { size, children, icon, ...restProps } = props;

  return (
    <Box
      display="flex"
      width={size || 180}
      height={size || 180}
      position="relative"
      alignItems="center"
      justifyContent="center"
    >
      <Box position="absolute" color="primary.main">
        <Image src="/assets/svg/triangle-spin.svg" width={250} height={250} alt="loading" />
      </Box>

      {children || (
        <Avatar
          src="/assets/branding/logo-square-white.webp"
          sx={{ width: size ? Math.ceil(0.55 * size) : 100, height: size ? Math.ceil(0.55 * size) : 100 }}
        />
        // <Box
        //   // src="/assets/branding/logo-square-white_transparent.webp"
        //   src="/assets/branding/logo-square-white.jpg"
        //   component="img"
        //   width={size ? Math.ceil(0.55 * size) : 80}
        //   height={size ? Math.ceil(0.55 * size) : 80}
        // />
      )}
    </Box>
  );
};

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ BackdropProps, isBackdrop = true, ...restProps }) =>
  isBackdrop ? (
    <Backdrop
      open={isBackdrop}
      sx={{
        zIndex: (theme) => theme.zIndex.drawer + 10,
        backgroundColor: (theme) => alpha(theme.palette.common.black, 0.5),
      }}
      {...BackdropProps}
    >
      <Box position="absolute">{getContent(restProps)}</Box>
    </Backdrop>
  ) : (
    getContent(restProps)
  );

export default LoadingIndicator;
