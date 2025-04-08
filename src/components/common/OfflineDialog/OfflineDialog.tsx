'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { checkInternetConnection } from '@/utils/network';
import Dialog from '@/components/core/Dialog';
import { ArrowsCounterClockwise, CheckCircle } from '@phosphor-icons/react';
import Lottie from 'lottie-react';
import successLottieIcon from '@/utils/lottie/success2_icon.json';
import offlineLottieIcon from '@/utils/lottie/offline_art.json';

interface OfflineDialogProps {
  checkAuth?: boolean;
}

const OfflineDialog: React.FC<OfflineDialogProps> = ({ checkAuth }) => {
  const [isOnline, setIsOnline] = useState<boolean>(navigator.onLine);
  const [showDialog, setShowDialog] = useState<boolean>(!navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      if (checkAuth) {
        setIsOnline(true);
        setShowDialog(true);
      }
    };

    const handleOffline = () => {
      if (checkAuth) {
        setIsOnline(false);
        setShowDialog(true);
      }
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const handleRetry = async () => {
    const online = await checkInternetConnection();
    if (online) {
      setIsOnline(true);
      setShowDialog(true);
    }
  };

  const handleClose = () => {
    if (isOnline) {
      setShowDialog(false);
    }
  };

  return (
    <Dialog
      title={isOnline ? 'Back Online 🎉' : 'You are Offline'}
      open={showDialog}
      hideHeader
      maxWidth="xs"
      onClose={handleClose}
      disableEscapeKeyDown={!isOnline}
      footerProps={{
        onOkay: () => (isOnline ? handleClose() : handleRetry()),
        okayButtonProps: {
          title: isOnline ? 'Okay' : 'Retry',
          startIcon: isOnline ? <CheckCircle size={18} /> : <ArrowsCounterClockwise size={18} />,
        },
        onCancel: isOnline ? undefined : handleClose,
        sx: {
          borderTop: 'none',
          justifyContent: 'center',
        },
      }}
    >
      <Box p={2} display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Lottie
          animationData={isOnline ? successLottieIcon : offlineLottieIcon}
          loop={true}
          style={{ width: '200px', height: '200px' }}
        />
        <Typography variant="h2" mt={-2}>
          {isOnline ? 'Back Online 🎉' : 'You are Offline'}
        </Typography>
        <Typography variant="body1" my={2} textAlign="center">
          {isOnline
            ? `Everything looks good! You're connected to the internet.`
            : 'You appear to be offline. Please check your connection and try again.'}
        </Typography>
      </Box>
    </Dialog>
  );
};

export default OfflineDialog;
