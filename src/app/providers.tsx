'use client';

import React from 'react';
import { LayoutProvider } from '@/context/LayoutContext';
import EmotionRegistry from '@/utils/theme/EmotionRegistry';

import { AlertProvider } from '@/context/AlertContext';
import { AuthProvider } from '@/context/AuthContext';
import ServiceWorkerUpdater from '@/components/PWA/ServiceWorkerUpdater';
import PWAInstaller from '@/components/PWA/PWAnstaller';
import OfflineDialog from '@/components/common/OfflineDialog';
import { ApolloWrapper } from '@/apollo/ApolloWrapper';
import ScrollToTop from '@/components/common/ScrollToTop';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EmotionRegistry>
      <ApolloWrapper>
        <AuthProvider>
          <LayoutProvider>
            <AlertProvider>
              {children}
              <ServiceWorkerUpdater />
              <PWAInstaller />
              <OfflineDialog />
              <ScrollToTop threshold={250} />
            </AlertProvider>
          </LayoutProvider>
        </AuthProvider>
      </ApolloWrapper>
    </EmotionRegistry>
  );
}
