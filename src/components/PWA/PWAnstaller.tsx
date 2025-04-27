'use client';

import { useEffect, useState } from 'react';
import AlertDialog, { AlertDialogProps } from '../common/AlertDialog';

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

export default function PWAInstaller() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [alertDialogProps, setAlertDialogProps] = useState<Partial<AlertDialogProps>>({});

  useEffect(() => {
    const isMobile = window?.matchMedia('(pointer: coarse)')?.matches;
    const handleBeforeInstallPrompt = (event: Event) => {
      console.log('beforeinstallprompt fired');
      event.preventDefault();
      if (!isMobile) return;
      setInstallPrompt(event as BeforeInstallPromptEvent);
      setShowInstallDialog(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    try {
      await installPrompt.prompt();
      const choiceResult = await installPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the PWA installation');
      } else {
        console.log('User dismissed the PWA installation');
      }
    } catch (err) {
      console.error('PWA install failed:', err);
    }
    setInstallPrompt(null);
    setShowInstallDialog(false);
  };

  return (
    <AlertDialog
      open={showInstallDialog}
      title="Install JNVPJAA App"
      message="Get quick access to JNVPJAA by installing the app on your device. Enjoy a faster and better experience! 🚀"
      onOkay={handleInstall}
      okayButtonProps={{
        title: 'Install',
      }}
      action="approve"
      {...alertDialogProps}
    />
  );
}
