'use client';

import React from 'react';
import { ToastProps } from './Toast.types';
import { Box, Slide, Typography } from '@mui/material';
import Button from '@/components/core/Button';
import ProfilePicture from '@/components/core/ProfilePicture';
import SquareCheckFilledIcon from '@/components/icons/SquareCheckFilled';
import WarningTriangleFilled from '@/components/icons/WarningTriangleFilled';
import AlertBellFilled from '@/components/icons/AlertBellFilled';
import CircleCheckFilled from '@/components/icons/CircleCheckFilled';
import CrossOutlined from '@/components/icons/CrossOutlined';

const Toast: React.FC<ToastProps> = ({
  visible,
  type = 'success',
  variant = 'minimal',
  message,
  ctaProps,
  avatarProps = {},
  onClose,
  autoClose = true,
  autoCloseDuration,
}) => {
  React.useEffect(() => {
    if (autoClose) {
      let timerId: any;
      if ((type === 'success' || type === 'error') && visible) {
        timerId = setTimeout(() => {
          onClose?.();
        }, autoCloseDuration || 6000);
      }

      return () => {
        if (timerId) {
          return clearTimeout(timerId);
        }
      };
    }
  }, [autoClose, autoCloseDuration, onClose, type, visible]);

  const isMinimal = React.useMemo(() => {
    return variant === 'minimal' && !ctaProps?.onClick;
  }, [variant, ctaProps]);

  const isMessage = React.useMemo(() => {
    return type === 'message' || avatarProps?.title;
  }, [type, avatarProps]);

  const messageText = React.useMemo(() => {
    if (message) return message;
    switch (type) {
      case 'success':
        return 'The action completed successfully.';
      case 'error':
        return 'Soemthing went wrong.';
      case 'message':
        return 'This is dummy message';
    }
  }, [type, message]);

  const color = React.useMemo(() => {
    const colorType = isMessage ? 'message' : type;
    switch (colorType) {
      case 'success':
        return {
          text: 'success.light',
          ctaBtn: 'success',
          border: 'success.light',
        };
      case 'error':
        return {
          text: 'error.light',
          ctaBtn: 'error',
          border: 'error.light',
        };
      case 'message':
        return {
          text: 'grey.500',
          ctaBtn: '#FFFF00',
          border: 'secondary.light',
        };
    }
  }, [type, isMessage]);

  const Icon = React.useMemo(() => {
    switch (type) {
      case 'success':
        return isMinimal ? (
          <SquareCheckFilledIcon
            data-testid="toast-success-minimal-icon"
            sx={{ color: 'success.light', fontSize: '32px' }}
          />
        ) : (
          <Box display="flex" alignItems="center" mb="8px">
            <CircleCheckFilled sx={{ color: 'success.light', fontSize: '18px' }} />
            <Typography
              fontSize="14px"
              color="success.light"
              ml="8px"
              fontWeight={600}
              data-testid="toast-success-expanded-header"
            >
              Success
            </Typography>
          </Box>
        );
      case 'error':
        return isMinimal ? (
          <AlertBellFilled sx={{ color: 'error.light', fontSize: '32px' }} />
        ) : (
          <Box display="flex" alignItems="center" mb="8px">
            <WarningTriangleFilled sx={{ color: 'error.light', fontSize: '18px' }} />
            <Typography
              fontSize="14px"
              color="error.light"
              ml="8px"
              fontWeight={600}
              data-testid="toast-success-expanded-header"
            >
              Attention
            </Typography>
          </Box>
        );
    }

    return null;
  }, [type, isMinimal]);

  return (
    <Slide direction="left" in={visible} mountOnEnter unmountOnExit>
      <Box
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          borderRadius: '6px',
          border: `1px solid`,
          borderColor: color?.border,
          p: '16px',
          display: 'flex',
          alignItems: 'start',
          justifyContent: 'space-between',
          maxWidth: '500px',
          bgcolor: 'common.white',
          zIndex: (theme) => theme.zIndex.drawer + 100,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMinimal ? 'row' : 'column',
            alignItems: 'start',
          }}
        >
          {isMessage ? (
            <ProfilePicture
              {...avatarProps}
              summary={
                <Box display="flex" flexDirection="column">
                  <Typography fontSize="14px" color={color?.text}>
                    {messageText}
                  </Typography>
                  {ctaProps?.onClick && (
                    <Button
                      variant="contained"
                      {...ctaProps}
                      sx={{
                        mt: '10px',
                        maxWidth: 'fit-content',
                        backgroundColor: color?.ctaBtn,
                        color: 'common.black',
                        ...(ctaProps.sx || {}),
                      }}
                      title={ctaProps?.title || 'Action'}
                    />
                  )}
                </Box>
              }
            />
          ) : (
            <>
              {Icon}
              <Box>
                <Typography fontSize="14px" color={color?.text} ml={isMinimal ? '10px' : '0px'}>
                  {messageText}
                </Typography>
              </Box>
              {!isMinimal && ctaProps?.onClick && (
                <Button
                  variant="contained"
                  // @ts-expect-error type
                  color={color?.ctaBtn}
                  {...ctaProps}
                  sx={{ mt: '10px', ...(ctaProps.sx || {}) }}
                  title={ctaProps?.title || 'Action'}
                />
              )}
            </>
          )}
        </Box>

        <CrossOutlined
          data-testid="toast-close-btn"
          sx={{
            color: color?.text,
            fontSize: '18px',
            cursor: 'pointer',
            ml: '10px',
          }}
          onClick={() => {
            onClose?.();
          }}
        />
      </Box>
    </Slide>
  );
};

export default Toast;
