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
        console.log('Service Worker waiting — update available!');
        setUpdateAvailable(true);
      });

      wbInstance.addEventListener('installed', (event) => {
        console.log('Service Worker installed', event);
        if (event.isUpdate) {
          setUpdateAvailable(true);
        }
      });

      wbInstance.register().catch((error) => {
        console.error('Service worker registration failed:', error);
      });
    }
  }, []);

  const handleUpdate = () => {
    if (!wb) return;
    setAlertDialogProps({
      action: 'loading',
      title: 'Update is in Progress...',
      message:
        "Hang tight! 🚀 We're refreshing the app with the latest features and improvements. This won’t take long! 😊",
    });
    wb.messageSW({ type: 'SKIP_WAITING' })
      .then(() => {
        console.log('Sent SKIP_WAITING to service worker');
        setUpdateAvailable(false);
        window.location.reload();
      })
      .catch((err) => {
        console.error('Error sending SKIP_WAITING:', err);
      });
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
