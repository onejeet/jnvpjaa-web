import '@/styles/globals.css';
import { LayoutProvider } from '@/context/LayoutContext';
import createEmotionCache from '@/utils/theme/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { GoogleTagManager } from '@next/third-parties/google';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'src/apollo/client';
import { AlertProvider } from '@/context/AlertContext';
import { AuthProvider } from '@/context/AuthContext';
import ServiceWorkerUpdater from '@/components/PWA/ServiceWorkerUpdater';
import PWAInstaller from '@/components/PWA/PWAnstaller';
import OfflineDialog from '@/components/common/OfflineDialog';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppProps & { emotionCache: any }) => (
  <CacheProvider value={emotionCache}>
    <ApolloProvider client={apolloClient}>
      <AuthProvider checkAuth={!!pageProps?.checkAuth} isAuthPage={!!pageProps?.isAuthPage}>
        <LayoutProvider>
          <AlertProvider>
            <Component {...pageProps} />
            <ServiceWorkerUpdater />
            <PWAInstaller />
            <OfflineDialog checkAuth={!!pageProps?.checkAuth} />
            <GoogleTagManager gtmId="GTM-W7R5B5JB" />
          </AlertProvider>
        </LayoutProvider>
      </AuthProvider>
    </ApolloProvider>
  </CacheProvider>
);

export default MyApp;
