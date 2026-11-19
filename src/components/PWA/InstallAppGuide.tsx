'use client';

import React from 'react';
import { alpha, Box, Stack, Typography } from '@mui/material';
import type { Theme } from '@mui/material';
import { IconDotsVertical, IconDownload, IconShare2, IconSquarePlus } from '@tabler/icons-react';
import Dialog from '@/components/core/Dialog';
import { brand } from '@/config/tenant';
import { getDeferredInstallPrompt, isIOS, setDeferredInstallPrompt } from './installPrompt';

type Step = { text: React.ReactNode; icon: React.ReactNode };

const IOS_STEPS: Step[] = [
  {
    text: 'Tap the Share button in the browser toolbar (on newer iPhones it may sit under •••).',
    icon: <IconShare2 />,
  },
  { text: 'Scroll down and tap “Add to Home Screen”.', icon: <IconSquarePlus /> },
  { text: 'Tap “Add”. The app now opens from your home screen.', icon: <IconDownload /> },
];

const ANDROID_STEPS: Step[] = [
  { text: 'Open the browser menu at the top right.', icon: <IconDotsVertical /> },
  { text: 'Tap “Install app” or “Add to Home screen”.', icon: <IconSquarePlus /> },
  { text: 'Confirm with “Install”. The app now opens from your home screen.', icon: <IconDownload /> },
];

interface InstallAppGuideProps {
  open: boolean;
  onClose: () => void;
}

const InstallAppGuide: React.FC<InstallAppGuideProps> = ({ open, onClose }) => {
  // Read at open time: the deferred prompt may arrive after the menu first renders.
  const ios = open && isIOS();
  const prompt = open ? getDeferredInstallPrompt() : null;
  const steps = ios ? IOS_STEPS : ANDROID_STEPS;

  const installNow = async () => {
    if (!prompt) return;
    try {
      await prompt.prompt();
      await prompt.userChoice;
    } catch (err) {
      console.error('PWA install failed:', err);
    }
    // A prompt event can only be used once.
    setDeferredInstallPrompt(null);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      title={`Install ${brand.shortName}`}
      subTitle="Full screen and one tap away, like any app."
      footerProps={{
        onOkay: prompt ? installNow : onClose,
        okayButtonProps: { title: prompt ? 'Install now' : 'Got it' },
        onCancel: prompt ? onClose : undefined,
        cancelButtonProps: { title: 'Not now' },
      }}
    >
      <Stack spacing={2} px={2.5} py={1.5}>
        {prompt && (
          <Typography variant="body2" color="text.secondary">
            Tap “Install now”, or add it by hand:
          </Typography>
        )}
        <Stack component="ol" spacing={1.75} sx={{ listStyle: 'none', p: 0, m: 0 }}>
          {steps.map((step, index) => (
            <Stack component="li" key={index} direction="row" spacing={1.5} alignItems="center">
              <Box
                aria-hidden
                sx={{
                  width: 36,
                  height: 36,
                  flexShrink: 0,
                  borderRadius: '10px',
                  display: 'grid',
                  placeItems: 'center',
                  color: 'primary.main',
                  bgcolor: (theme: Theme) => alpha(theme.palette.primary.main, 0.08),
                  '& svg': { width: 20, height: 20 },
                }}
              >
                {step.icon}
              </Box>
              <Typography fontSize={15}>
                <Box component="span" fontWeight={600}>
                  {index + 1}.{' '}
                </Box>
                {step.text}
              </Typography>
            </Stack>
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {ios
            ? 'No “Add to Home Screen”? Open this page in Safari and try again.'
            : 'No install option? Open this page in Chrome and try again.'}
        </Typography>
      </Stack>
    </Dialog>
  );
};

export default InstallAppGuide;
