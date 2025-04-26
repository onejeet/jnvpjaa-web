import React from 'react';
import { LayoutProvider } from '@/context/LayoutContext';
import createEmotionCache from '@/utils/theme/createEmotionCache';
import { CacheProvider } from '@emotion/react';

import { AlertProvider } from '@/context/AlertContext';
import { AuthProvider } from '@/context/AuthContext';
import ServiceWorkerUpdater from '@/components/PWA/ServiceWorkerUpdater';
import PWAInstaller from '@/components/PWA/PWAnstaller';
import OfflineDialog from '@/components/common/OfflineDialog';
import { ApolloWrapper } from '@/apollo/ApolloWrapper';

const clientSideEmotionCache = createEmotionCache();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ApolloWrapper>
        <AuthProvider>
          <LayoutProvider>
            <AlertProvider>
              {children}
              <ServiceWorkerUpdater />
              <PWAInstaller />
              <OfflineDialog />
            </AlertProvider>
          </LayoutProvider>
        </AuthProvider>
      </ApolloWrapper>
    </CacheProvider>
  );
}
