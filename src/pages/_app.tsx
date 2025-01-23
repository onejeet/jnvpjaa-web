import '@/styles/globals.css';
import { LayoutProvider } from '@/context/LayoutCotext';
import createEmotionCache from '@/utils/theme/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { GoogleTagManager } from '@next/third-parties/google';
import { AppProps } from 'next/app';
import Head from 'next/head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps, emotionCache = clientSideEmotionCache }: AppProps & { emotionCache: any }) => (
  <CacheProvider value={emotionCache}>
    <LayoutProvider>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="GTM-W7R5B5JB" />
    </LayoutProvider>
  </CacheProvider>
);

export default MyApp;
