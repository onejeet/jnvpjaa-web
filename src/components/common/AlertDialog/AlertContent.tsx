import React, { act, Suspense } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import HelpIcon from '@mui/icons-material/Help';
import type { AlertContentProps } from './AlertDialog.types';
import { IconQuestionMark as SealQuestion, IconLoader as Spinner } from '@tabler/icons-react';
import Lottie from 'lottie-react';
import successLottieIcon from '@/utils/lottie/success3_icon.json';
import deleteLottieIcon from '@/utils/lottie/delete_icon.json';
import errorLottieIcon from '@/utils/lottie/error_icon.json';
import loadingLottieIcon from '@/utils/lottie/loading_icon.json';

const AlertContent: React.FC<AlertContentProps> = ({ title, message, action = 'delete', items = [] }) => {
  const MessageComp = React.useMemo(() => {
    switch (action) {
      case 'approve':
        return (
          <Typography variant="body1">
            {message || (
              <Box component="span">
                Do you really want to approve?
                <br /> once approved, the user will be able to login and access portal.
              </Box>
            )}
          </Typography>
        );
      case 'reject':
        return (
          <Typography variant="body1">
            Do you really want to reject?
            <br /> The registration will be discarded and removed.
          </Typography>
        );
      case 'delete':
        if (items.length === 0) {
          return <Typography variant="body1">Do you really want to delete this item?</Typography>;
        } else if (items.length === 1) {
          return (
            <Typography variant="body1">
              Do you really want to delete{' '}
              <Typography variant="body1" component="span" fontWeight={600}>
                {items[0]}
              </Typography>
              ?
            </Typography>
          );
        }
        return (
          <Box display="flex" flexDirection="column">
            <Typography variant="body1">Do you really want to delete below items?</Typography>
            <List sx={{ mt: 1 }} dense>
              {items.map((item, index) => (
                <ListItem key={`delete-item-${index}`} disableGutters sx={{ fontSize: '0.9rem', fontWeight: 600 }}>
                  {item}
                </ListItem>
              ))}
            </List>
          </Box>
        );
      case 'deleting':
        return <Typography variant="body1">{message || 'Deleting, Please wait...'}</Typography>;
      case 'success':
        return message ? <Typography variant="body1">{message || 'Request completed successfully.'}</Typography> : null;
      case 'error':
        return message ? <Typography variant="body1">{message || 'Completed Successfully'}</Typography> : null;
      case 'unsaved':
        return (
          <Typography variant="body1">
            {message || `You have made changes that haven't been saved yet. Are you sure to discard changes?`}
          </Typography>
        );
      default:
        return <Typography variant="body1">{message || ''}</Typography>;
    }
  }, [message, action, items]);

  const titleComp = React.useMemo(() => {
    let upTitle = null;
    if (action === 'delete' || action === 'approve' || action === 'reject') {
      upTitle = title || 'Are you sure?';
    } else if (action === 'deleting') {
      upTitle = title || 'Deleting...';
    } else if (action === 'unsaved') {
      upTitle = title || 'Discard changes?';
    } else if (action === 'success') {
      upTitle = title || 'Completed Successfully!';
    } else if (action === 'error') {
      upTitle = title || 'An error occurred';
    } else if (action === 'loading') {
      upTitle = title || 'Loading...';
    }

    return (
      <Typography fontSize="1.5rem" variant="h6">
        {upTitle}
      </Typography>
    );
  }, [action, title]);

  const iconComp = React.useMemo(() => {
    if (action === 'delete' || action === 'approve' || action === 'reject' || action === 'request') {
      return <SealQuestion size={100} />;
    } else if (action === 'loading') {
      return <Lottie animationData={loadingLottieIcon} loop={true} style={{ width: '130px', height: '130px' }} />;
      // return <Image width={60} height={60} src="/assets/svg/loading_animation.svg" alt="loading" />;
      // return <Spinner fill="grey.700" size={100} />;
    } else if (action === 'success') {
      return <Lottie animationData={successLottieIcon} loop={true} style={{ width: '100px', height: '100px' }} />;
      // return <Image width={60} height={60} src="/assets/svg/success_animation.svg" alt="success" />;
      // return <TaskAltIcon sx={{ color: 'success.main', fontSize: '100px' }} />;
    } else if (action === 'error') {
      return <Lottie animationData={errorLottieIcon} loop={true} style={{ width: '100px', height: '100px' }} />;
      // return <Image width={60} height={60} src="/assets/svg/error_animation.svg" alt="success" />;
      // return <ErrorIcon sx={{ color: 'error.main', fontSize: '100px' }} />;
    } else if (action === 'deleting') {
      return <Lottie animationData={deleteLottieIcon} loop={true} style={{ width: '100px', height: '100px' }} />;
      // return <Image width={60} height={60} src="/assets/svg/delete_animation.svg" alt="deleting" />;
      // return <DeleteIcon sx={{ color: 'error.main', fontSize: '100px' }} />;
    } else if (action === 'unsaved') {
      return <HelpIcon sx={{ color: 'grey.700', fontSize: '100px' }} />;
    }
  }, [action]);

  return (
    <Box
      color="grey.700"
      px={3.5}
      py={6}
      gap={1.5}
      textAlign="center"
      display="flex"
      alignItems="center"
      flexDirection="column"
      width="100%"
    >
      <Box mt={1} mb={3}>
        <Suspense fallback={null}>{iconComp}</Suspense>
      </Box>
      {titleComp}
      {MessageComp}
    </Box>
  );
};

export default AlertContent;
