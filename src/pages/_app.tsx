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

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppProps & { emotionCache: any }) => (
  <CacheProvider value={emotionCache}>
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <AlertProvider>
          <LayoutProvider>
            <Component {...pageProps} />
            <GoogleTagManager gtmId="GTM-W7R5B5JB" />
          </LayoutProvider>
        </AlertProvider>
      </AuthProvider>
    </ApolloProvider>
  </CacheProvider>
);

export default MyApp;
