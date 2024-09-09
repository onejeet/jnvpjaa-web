import '@/styles/globals.css';
import { LayoutProvider } from '@/context/LayoutCotext';
import createEmotionCache from '@/utils/theme/createEmotionCache';
import { CacheProvider } from '@emotion/react';
import { AppProps } from 'next/app';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

const MyApp = ({ Component, pageProps }: AppProps) => (
  <CacheProvider value={clientSideEmotionCache}>
    <LayoutProvider>
      <Component {...pageProps} />
    </LayoutProvider>
  </CacheProvider>
);

export default MyApp;
