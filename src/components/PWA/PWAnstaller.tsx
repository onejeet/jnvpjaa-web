'use client';

import { useEffect, useState } from 'react';
import AlertDialog from '../common/AlertDialog';
import { brand } from '@/config/tenant';
import { type BeforeInstallPromptEvent, setDeferredInstallPrompt } from './installPrompt';

// Asking on every visit trains people to tap "Cancel"; ask again only after a quiet period.
const DISMISSED_KEY = 'pwa_install_dismissed_at';
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;

const recentlyDismissed = () => {
  try {
    return Date.now() - Number(localStorage.getItem(DISMISSED_KEY) || 0) < SNOOZE_MS;
  } catch {
    return false;
  }
};

const rememberDismissal = () => {
  try {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
  } catch {
    // Storage blocked (private mode): the prompt simply comes back next visit.
  }
};

export default function PWAInstaller() {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(pointer: coarse)').matches;
    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredInstallPrompt(event as BeforeInstallPromptEvent);
      if (!isMobile || recentlyDismissed()) return;
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    const handleInstalled = () => {
      setDeferredInstallPrompt(null);
      setInstallPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleInstalled);
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    try {
      await installPrompt.prompt();
      if ((await installPrompt.userChoice).outcome === 'dismissed') rememberDismissal();
    } catch (err) {
      console.error('PWA install failed:', err);
    }
    setDeferredInstallPrompt(null);
    setInstallPrompt(null);
  };

  const handleCancel = () => {
    rememberDismissal();
    setInstallPrompt(null);
  };

  return (
    <AlertDialog
      open={Boolean(installPrompt)}
      title={`Install ${brand.shortName} App`}
      message={`Get quick access to ${brand.shortName} by installing the app on your device. Enjoy a faster and better experience! 🚀`}
      onOkay={handleInstall}
      onCancel={handleCancel}
      okayButtonProps={{
        title: 'Install App',
      }}
      action="app"
    />
  );
}
