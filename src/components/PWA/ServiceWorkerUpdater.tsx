'use client';

import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';
import AlertDialog, { AlertDialogProps } from '../common/AlertDialog';

export default function ServiceWorkerUpdater() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [alertDialogProps, setAlertDialogProps] = useState<Partial<AlertDialogProps>>({});
  const [wb, setWb] = useState<Workbox | null>(null);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      const wbInstance = new Workbox('/sw.js');
      setWb(wbInstance);

      wbInstance.addEventListener('waiting', () => {
        setUpdateAvailable(true);
      });

      wbInstance.register();
    }
  }, []);

  const handleUpdate = () => {
    setAlertDialogProps({
      action: 'loading',
      title: 'Update is in Progress...',
      message:
        "Hang tight! 🚀 We're refreshing the app with the latest features and improvements. This won’t take long! 😊",
    });
    wb?.messageSW({ type: 'SKIP_WAITING' });
    setUpdateAvailable(false);
    if (typeof window !== 'undefined') {
      window.location.reload();
    }
  };

  return (
    <AlertDialog
      open={updateAvailable}
      onCancel={() => setUpdateAvailable(false)}
      title="App Update Available"
      message="A fresh new version of JNVPJAA is here! 🚀 Enjoy the latest features, fixes, and improvements. Tap Update to get the best experience! 😊"
      onOkay={handleUpdate}
      okayButtonProps={{
        title: 'Update',
      }}
      action="approve"
      {...alertDialogProps}
    />
  );
}
