/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  reloadOnOnline: false,
  runtimeCaching: [
    {
      urlPattern: /^https:\/\/(.*)\.(jpg|jpeg|png|gif|webp|svg|bmp)$/i,
      handler: 'CacheFirst', // This will cache the images for offline usage
      options: {
        cacheName: 'image-cache',
        expiration: {
          maxEntries: 100, // Max number of images to cache
          maxAgeSeconds: 60 * 60 * 24 * 365, // Cache images for 1 year
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  appDir: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jnvpjaa.org',
      },
      {
        protocol: 'https',
        hostname: 'unsplash.com',
      },
    ],
  },
  pwa: {
    dest: 'public',
    disable: process.env.NEXT_PUBLIC_NODE_ENV === 'development', // Disable in dev mode
  },
  transpilePackages: ['mui-tel-input'],
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

module.exports = withPWA(nextConfig);
