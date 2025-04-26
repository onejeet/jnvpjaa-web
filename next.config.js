/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NEXT_PUBLIC_NODE_ENV === 'development', // Disable in dev mode
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
          maxAgeSeconds: 60 * 60 * 24 * 30, // Cache images for 1 year
        },
      },
    },
    {
      urlPattern: /^\/_next\/image/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-image-cache',
        expiration: {
          maxEntries: 50,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
      },
    },
  ],
});

const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jnvpjaa.org',
      },
      {
        protocol: 'https',
        hostname: 'assets.jnvpjaa.org',
      },
      {
        protocol: 'https',
        hostname: 'content.jnvpjaa.org',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  transpilePackages: ['mui-tel-input'],
  webpack: (config, { isServer }) => {
    // config.resolve.alias.canvas = false;
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      canvas: false,
    };

    // Exclude browser-specific packages from server-side rendering
    if (isServer) {
      // These packages should only be loaded on the client side
      const serverSideExclusions = [
        /react-easy-crop/, // Image cropping library that uses DOM
        /emoji-picker-react/, // Emoji picker that uses DOM
        /react-colorful/, // Color picker that uses DOM
        /react-canvas-confetti/, // Canvas confetti that uses DOM
        /browser-image-compression/, // Image compression that uses DOM
        /lottie-web/, // Animation library that uses DOM
        /lottie-react/, // React wrapper for lottie-web
      ];

      // Mark these packages as external to prevent them from being bundled on the server
      serverSideExclusions.forEach((pattern) => {
        config.externals.push((context, request, callback) => {
          if (pattern.test(request)) {
            // Externalize to a commonjs module using the request path
            return callback(null, `commonjs ${request}`);
          }
          // Continue for other requests
          callback();
        });
      });
    }

    return config;
  },
};

module.exports = withPWA(nextConfig);
