'use client';

import { LayoutProvider } from '@/context/LayoutContext';
import createEmotionCache from '@/utils/theme/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'src/apollo/client';
import { AlertProvider } from '@/context/AlertContext';
import { AuthProvider } from '@/context/AuthContext';
import ServiceWorkerUpdater from '@/components/PWA/ServiceWorkerUpdater';
import PWAInstaller from '@/components/PWA/PWAnstaller';
import OfflineDialog from '@/components/common/OfflineDialog';
import { usePathname } from 'next/navigation';

const clientSideEmotionCache = createEmotionCache();

export function Providers({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = React.useMemo(() => ['/signin', '/signup', '/forgot-password'].includes(pathname), [pathname]);

  const checkAuth = React.useMemo(() => {
    return (
      pathname.startsWith('/profile') ||
      pathname.startsWith('/admin') ||
      pathname.includes('/new') ||
      pathname.includes('/edit')
    );
  }, [pathname]);

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ApolloProvider client={apolloClient}>
        <AuthProvider checkAuth={checkAuth} isAuthPage={isAuthPage}>
          <LayoutProvider>
            <AlertProvider>
              {children}
              <ServiceWorkerUpdater />
              <PWAInstaller />
              <OfflineDialog />
            </AlertProvider>
          </LayoutProvider>
        </AuthProvider>
      </ApolloProvider>
    </CacheProvider>
  );
}
