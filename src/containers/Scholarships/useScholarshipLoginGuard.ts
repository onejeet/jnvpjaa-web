'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { paths } from '@/config/paths';

export const useScholarshipLoginGuard = (userId?: string | null) => {
  const router = useRouter();
  const [hasCheckedLocalSession, setHasCheckedLocalSession] = React.useState(false);
  const [hasLocalSession, setHasLocalSession] = React.useState(false);

  React.useEffect(() => {
    const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('logged_in') === 'true';
    setHasLocalSession(isLoggedIn);
    setHasCheckedLocalSession(true);

    if (!isLoggedIn) {
      router.replace(paths.home);
    }
  }, [router]);

  React.useEffect(() => {
    if (!hasCheckedLocalSession || !hasLocalSession || userId) {
      return;
    }

    const timeout = window.setTimeout(() => {
      router.replace(paths.home);
    }, 5000);

    return () => window.clearTimeout(timeout);
  }, [hasCheckedLocalSession, hasLocalSession, router, userId]);

  return Boolean(userId);
};
