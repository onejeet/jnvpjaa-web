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

      wbInstance.addEventListener('waiting', () => {
        console.log('[PWA] New Service Worker waiting to activate');
        setUpdateAvailable(true);
        setWb(wbInstance);
      });

      wbInstance.addEventListener('controlling', () => {
        console.log('[PWA] New service worker has taken control');
        window.location.reload();
      });

      wbInstance.register().catch((error) => {
        console.error('[PWA] Service worker registration failed:', error);
      });
    }
  }, []);

  const handleUpdate = () => {
    if (!wb) return;

    setAlertDialogProps({
      action: 'loading',
      title: 'Update in Progress...',
      message: 'Hang tight! We are updating the app. This will just take a second.',
    });

    wb.messageSW({ type: 'SKIP_WAITING' }).catch((err) => {
      console.error('[PWA] Error sending SKIP_WAITING:', err);
    });
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        window.location.reload();
      }
    }, 2000);
  };

  return (
    <AlertDialog
      open={updateAvailable}
      onCancel={() => setUpdateAvailable(false)}
      title="App Update Available"
      message="A new version of the app is ready! Tap update to apply it now."
      onOkay={handleUpdate}
      okayButtonProps={{
        title: 'Update',
      }}
      action="app"
      {...alertDialogProps}
    />
  );
}
