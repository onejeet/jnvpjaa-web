'use client';

import { useEffect, useState } from 'react';
import AlertDialog, { AlertDialogProps } from '../common/AlertDialog';

export default function PWAInstaller() {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null);
  const [showInstallDialog, setShowInstallDialog] = useState(false);
  const [alertDialogProps, setAlertDialogProps] = useState<Partial<AlertDialogProps>>({});

  useEffect(() => {
    const isMobile = window?.matchMedia('(pointer: coarse)')?.matches;
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      if (!isMobile) return;
      setInstallPrompt(event);
      setShowInstallDialog(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (installPrompt) {
      // @ts-expect-error type-error
      installPrompt.prompt();
      // @ts-expect-error type-error
      const choice = await installPrompt.userChoice;
      if (choice.outcome === 'accepted') {
        console.log('User installed the app');
      } else {
        console.log('User dismissed the install prompt');
      }
      setInstallPrompt(null);
    }
    setShowInstallDialog(false);
  };

  return (
    <AlertDialog
      open={showInstallDialog}
      // onCancel={() => setShowInstallDialog(false)}
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
