/** @type {import('next').NextConfig} */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  disable: process.env.NEXT_PUBLIC_NODE_ENV === 'development', // Disable in dev mode
  skipWaiting: true,
  reloadOnOnline: false,
  buildExcludes: [/middleware-manifest\.json$/],
  runtimeCaching: [
    {
      urlPattern: ({ request }) => request.destination === 'image',
      handler: 'CacheFirst',
      options: {
        cacheName: 'images-cache',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    {
      urlPattern: /\.(?:js|css|woff2?|eot|ttf|otf)$/,
      handler: 'CacheFirst',
      options: {
        cacheName: 'static-assets',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
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
