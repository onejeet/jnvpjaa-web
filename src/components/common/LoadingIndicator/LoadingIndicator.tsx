/* REACT */

import React from 'react';
import { Backdrop } from '@mui/material';
/* MUI */
import Box from '@mui/material/Box';
import { alpha } from '@mui/system';

/* TYPES */
import type { LoadingIndicatorProps } from './LoadingIndicator.types';
import Image from 'next/image';

const LOADING_SPINNER_SRC = 'https://assets.jnvpjaa.org/svg/triangle-spin.svg';
const LOADING_LOGO_SRC = 'https://assets.jnvpjaa.org/branding/logo-square-white.webp';

const getContent = (props: LoadingIndicatorProps) => {
  const { size, children, icon, ...restProps } = props;
  const logoSize = size ? Math.ceil(0.55 * size) : 100;

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
        <Image src={LOADING_SPINNER_SRC} width={250} height={250} alt="loading" priority />
      </Box>

      {children || (
        <Box width={logoSize} height={logoSize} borderRadius="50%" overflow="hidden" position="relative" flexShrink={0}>
          <Image src={LOADING_LOGO_SRC} alt="JNVPJAA logo" fill sizes={`${logoSize}px`} priority />
        </Box>
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
        backgroundColor: (theme) => alpha(theme.palette.common.black, 0.3),
      }}
      {...BackdropProps}
    >
      <Box position="absolute">{getContent(restProps)}</Box>
    </Backdrop>
  ) : (
    getContent(restProps)
  );

export default LoadingIndicator;
