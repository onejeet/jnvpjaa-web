import '@/styles/globals.css';
import { LayoutProvider } from '@/context/LayoutCotext';
import createEmotionCache from '@/utils/theme/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { GoogleTagManager } from '@next/third-parties/google';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from 'src/apollo/client';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppProps & { emotionCache: any }) => (
  <CacheProvider value={emotionCache}>
    <ApolloProvider client={apolloClient}>
      <LayoutProvider>
        <Component {...pageProps} />
        <GoogleTagManager gtmId="GTM-W7R5B5JB" />
      </LayoutProvider>
    </ApolloProvider>
  </CacheProvider>
);

export default MyApp;
