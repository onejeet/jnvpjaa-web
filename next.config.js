/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NEXT_PUBLIC_NODE_ENV === 'development', // Disable in dev mode
  skipWaiting: true,
  reloadOnOnline: false,
  customWorkerDir: 'public', // Add this line
  buildExcludes: [/middleware-manifest\.json$/, /app-build-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: /^\/_next\/image\?url=/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-image-optimized',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // 2. CDN: assets.jnvpjaa.org
    {
      urlPattern: /^https:\/\/assets\.jnvpjaa\.org\/.*\.(png|jpg|jpeg|webp|gif|svg)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'cdn-assets-images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },

    // 3. CDN: content.jnvpjaa.org
    {
      urlPattern: /^https:\/\/content\.jnvpjaa\.org\/.*\.(png|jpg|jpeg|webp|gif|svg)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'cdn-content-images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },

    // 4. External: Unsplash, Pixabay
    {
      urlPattern: /^https:\/\/(images\.unsplash\.com|cdn\.pixabay\.com)\/.*\.(png|jpg|jpeg|webp|gif|svg)$/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'external-images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'google-fonts-stylesheets',
        expiration: {
          maxEntries: 10,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    // Google Fonts files
    {
      urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
      handler: 'CacheFirst',
      options: {
        cacheName: 'google-fonts-webfonts',
        expiration: {
          maxEntries: 30,
          maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
        },
      },
    },
    // {
    //   urlPattern: /^\/$/, // caches the root page (or adjust for others)
    //   handler: 'NetworkFirst',
    //   options: {
    //     cacheName: 'html-cache',
    //     networkTimeoutSeconds: 10,
    //     expiration: {
    //       maxEntries: 10,
    //       maxAgeSeconds: 60 * 60 * 24,
    //     },
    //     cacheableResponse: {
    //       statuses: [0, 200],
    //     },
    //   },
    // },
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
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
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
