'use client';

import React from 'react';
import Button from '@/components/core/Button';
import { ButtonProps } from '@/components/core/Button/Button.types';
import { Box, Typography } from '@mui/material';
import { useEmptyViewAnimation } from './useEmptyViewAnimation';
import Lottie from '@/components/common/DynamicLottie';

interface IProps {
  type?: string;
  message?: string | React.ReactNode;
  buttonProps?: ButtonProps;
}

const EmptyView: React.FC<IProps> = ({ type, message, buttonProps }) => {
  const animation = useEmptyViewAnimation();
  return (
    <Box
      mt={-10}
      mb={4}
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
      overflow="hidden"
    >
      <Box
        sx={{ width: { xs: 280, sm: 400 }, height: { xs: 280, sm: 400 } }}
        aria-label="No results illustration"
        role="img"
      >
        {animation && <Lottie animationData={animation} loop style={{ width: '100%', height: '100%' }} />}
      </Box>

      {/* <Image src="https://assets.jnvpjaa.org/svg/doggie.svg" alt="empty" width={500} height={300} /> */}
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" mt={-10}>
        {React.isValidElement(message) ? (
          message
        ) : (
          <Typography variant="body1" color="grey.500" mb={2}>
            {message || `No ${type || ''} data is available.`}
          </Typography>
        )}

        {buttonProps ? <Button {...(buttonProps || {})} /> : null}
      </Box>
    </Box>
  );
};

export default EmptyView;
