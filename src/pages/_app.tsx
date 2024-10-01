import '@/styles/globals.css';
import { LayoutProvider } from '@/context/LayoutCotext';
import createEmotionCache from '@/utils/theme/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { AppCacheProvider } from '@mui/material-nextjs/v13-pagesRouter';
import { GoogleTagManager } from '@next/third-parties/google';
import { AppProps } from 'next/app';
import Head from 'next/head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <AppCacheProvider>
    <Head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
    </Head>
    {/* <CacheProvider value={clientSideEmotionCache}> */}
    <LayoutProvider>
      <Component {...pageProps} />
      <GoogleTagManager gtmId="GTM-W7R5B5JB" />
    </LayoutProvider>
    {/* </CacheProvider> */}
  </AppCacheProvider>
);

export default MyApp;
