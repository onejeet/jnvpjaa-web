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
  images: {
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
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  pwa: {
    dest: 'public',
    disable: process.env.NODE_ENV === 'development', // Disable in dev mode
  },
  transpilePackages: [
    'mui-tel-input',
    '@tiptap/react',
    '@tiptap/extension-color',
    '@tiptap/extension-font-family',
    '@tiptap/extension-heading',
    '@tiptap/extension-link',
    '@tiptap/extension-list-item',
    '@tiptap/extension-ordered-list',
    '@tiptap/extension-paragraph',
    '@tiptap/extension-text-align',
    '@tiptap/extension-text-style',
    '@tiptap/extension-underline',
    '@tiptap/extension-youtube',
    '@tiptap/extension-placeholder',
    '@tiptap/extension-blockquote',
    '@tiptap/starter-kit',
    '@tiptap/extension-bullet-list',
  ],
  webpack: (config, { isServer }) => {
    // config.resolve.alias.canvas = false;
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      canvas: false,
    };

    // Exclude TipTap and related packages from server-side rendering
    if (isServer) {
      // These packages should only be loaded on the client side
      const serverSideExclusions = [
        /@tiptap[/\\].*/, // All TipTap packages
        /prosemirror-.*/, // ProseMirror (used by TipTap)
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
