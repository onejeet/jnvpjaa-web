// Import TipTap patches first to ensure they're loaded before any TipTap code
import '@/utils/tiptapPatches';

import '@/styles/globals.css';
import { dmSans } from '@/utils/theme/fonts';
import { Metadata } from 'next';
import { GoogleTagManager } from '@next/third-parties/google';
import { Providers } from '../app/providers';

export const metadata: Metadata = {
  title: {
    template: '%s | JNVPJAA',
    default: 'JNVPJAA • Alumni Network of JNV Paota, Jaipur',
  },
  description:
    'The Official Alumni Network of Jawahar Navodaya Vidyalaya Paota, Jaipur. JNVs are a testament to innovative state-sponsored education in India.',
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Playwrite+CU:wght@400&display=swap" rel="stylesheet" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="JNVPJAA" />
        <link rel="apple-touch-icon" href="/icons/logo-square.png" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="192x192" href="/icons/logo-square.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icons/logo-square.png" />
      </head>
      <body className={dmSans.className}>
        <Providers>
          {children}
          <GoogleTagManager gtmId="GTM-W7R5B5JB" />
        </Providers>
      </body>
    </html>
  );
}
