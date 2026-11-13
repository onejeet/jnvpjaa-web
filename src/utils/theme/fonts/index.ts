import localFont from 'next/font/local';

// Self-host the same Latin font files used by the theme. This keeps builds
// independent of Google Fonts response URLs and avoids next/font/google parsing failures.
export const dmSans = localFont({
  src: './files/dm-sans-latin.woff2',
  weight: '300 800',
  style: 'normal',
  display: 'swap',
});

export const playfairDisplay = localFont({
  src: './files/playfair-display-latin.woff2',
  weight: '400 700',
  style: 'normal',
  display: 'swap',
});

export const notoSerif = localFont({
  src: './files/noto-serif-latin.woff2',
  weight: '300 700',
  style: 'normal',
  display: 'swap',
  variable: '--ff-noto-serif',
});
