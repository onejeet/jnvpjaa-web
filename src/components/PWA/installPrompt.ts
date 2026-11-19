export type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed'; platform: string }>;
};

// The browser fires beforeinstallprompt once per page load; PWAInstaller keeps it here so the
// menu's install guide can offer a one-tap install on Android even after the auto prompt was dismissed.
let deferred: BeforeInstallPromptEvent | null = null;
export const setDeferredInstallPrompt = (event: BeforeInstallPromptEvent | null) => {
  deferred = event;
};
export const getDeferredInstallPrompt = () => deferred;

export const isStandalone = () =>
  window.matchMedia('(display-mode: standalone)').matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

// iPadOS reports itself as a Mac, so a touch screen is what gives it away.
export const isIOS = () =>
  /iPad|iPhone|iPod/.test(navigator.userAgent) ||
  (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1);

// Phones and tablets only (touch is the primary pointer), and not once the app is already installed.
export const canShowInstallGuide = () => window.matchMedia('(pointer: coarse)').matches && !isStandalone();
