import React from 'react';
import Button from '@/components/core/Button';
import { ButtonProps } from '@/components/core/Button/Button.types';
import { titleCase } from '@/utils/helpers';
import { Box, Typography } from '@mui/material';
import doggieLottieIcon from '@/utils/lottie/doggie_art.json';
import Lottie from 'lottie-react';

interface IProps {
  type?: string;
  message?: string | React.ReactNode;
  buttonProps?: ButtonProps;
}

const EmptyView = ({ type, message, buttonProps }: IProps) => {
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
      <Lottie animationData={doggieLottieIcon} loop={true} style={{ width: '400px', height: '400px' }} />
      {/* <Image src="/assets/svg/doggie.svg" alt="empty" width={500} height={300} /> */}
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
