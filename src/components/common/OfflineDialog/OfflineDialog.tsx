'use client';

import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { checkInternetConnection } from '@/utils/network';
import Dialog from '@/components/core/Dialog';
import { IconRefresh as ArrowsCounterClockwise, IconCircleCheck as CheckCircle } from '@tabler/icons-react';
import Lottie from 'lottie-react';
import successLottieIcon from '@/utils/lottie/success3_icon.json';
import offlineLottieIcon from '@/utils/lottie/offline_art.json';
import { useAuth } from '@/context/AuthContext';

interface OfflineDialogProps {}

const OfflineDialog: React.FC<OfflineDialogProps> = () => {
  const { user } = useAuth();
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [retrying, setRetrying] = useState<boolean>(false);

  useEffect(() => {
    const handleOnline = () => {
      if (user?.id) {
        setIsOnline(true);
        setShowDialog(true);
      }
    };

    const handleOffline = () => {
      if (user?.id) {
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
  }, [user]);

  const handleRetry = async () => {
    setRetrying(true);
    const online = await checkInternetConnection();
    setRetrying(false);
    if (online) {
      setIsOnline(true);
      setShowDialog(true);
    }
  };

  const handleClose = () => {
    setShowDialog(false);
    // if (isOnline) {
    //   setShowDialog(false);
    // }
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
          loading: retrying,
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
          style={{ width: isOnline ? '150px' : '200px', height: isOnline ? '150px' : '200px' }}
        />
        <Typography variant="h2" mt={2}>
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
