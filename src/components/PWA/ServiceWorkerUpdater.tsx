'use client';

import { useEffect, useState } from 'react';
import { Workbox } from 'workbox-window';
import AlertDialog, { AlertDialogProps } from '../common/AlertDialog';

// next-pwa is disabled in dev, so a /sw.js there is a stale production build that would serve old code.
const SW_ENABLED = process.env.NEXT_PUBLIC_NODE_ENV !== 'development';

export default function ServiceWorkerUpdater() {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const [alertDialogProps, setAlertDialogProps] = useState<Partial<AlertDialogProps>>({});
  const [wb, setWb] = useState<Workbox | null>(null);

  useEffect(() => {
    if (!SW_ENABLED || !('serviceWorker' in navigator)) return;
    const wbInstance = new Workbox('/sw.js');

    wbInstance.addEventListener('waiting', () => {
      setWb(wbInstance);
      setUpdateAvailable(true);
    });

    // First install also fires 'controlling'; reload only when an update replaced the old worker.
    wbInstance.addEventListener('controlling', (event) => {
      if (event.isUpdate) window.location.reload();
    });

    wbInstance.register().catch((error) => {
      console.error('[PWA] Service worker registration failed:', error);
    });
  }, []);

  const handleUpdate = () => {
    if (!wb) return;
    setAlertDialogProps({
      action: 'loading',
      title: 'Update in Progress...',
      message: 'Hang tight! We are updating the app. This will just take a second.',
    });
    // The 'controlling' listener reloads once the new worker takes over.
    wb.messageSkipWaiting();
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
