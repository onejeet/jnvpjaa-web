'use client';

import { IconCheck, IconShare3 } from '@tabler/icons-react';
import React from 'react';
import Button from '@/components/core/Button';
import { useAlert } from '@/context/AlertContext';

/** Native share sheet where the device has one; otherwise copies the link, with visible confirmation. */
const ShareProfileButton: React.FC<{ path: string; title: string; variant?: 'contained' | 'outlined' }> = ({
  path,
  title,
  variant = 'contained',
}) => {
  const { showAlert } = useAlert();
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  const share = async () => {
    const url = new URL(path, window.location.origin).toString();
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (error: any) {
        if (error?.name === 'AbortError') return; // the member closed the share sheet
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
    } catch {
      showAlert({ visible: true, type: 'error', message: `Couldn't copy automatically. The link is ${url}` });
    }
  };

  return (
    <Button
      title={copied ? 'Link copied' : 'Share profile'}
      variant={variant}
      color={copied ? 'success' : 'primary'}
      startIcon={copied ? <IconCheck size={18} /> : <IconShare3 size={18} />}
      onClick={share}
      aria-live="polite"
    />
  );
};

export default ShareProfileButton;
