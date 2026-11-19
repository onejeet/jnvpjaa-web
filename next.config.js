/** @type {import('next').NextConfig} */

// Fails the build when TENANT is unset or unknown; never falls back to another association's brand.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tenant = require('./tenants/resolve').resolveTenant();
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { domains } = require(`${tenant.dir}/brand.json`);
// The home page bundles only the layout tenants/<id>/landing.json names; the others never reach the build.
// eslint-disable-next-line @typescript-eslint/no-var-requires
const { layout: landingLayout } = require(`${tenant.dir}/landing.json`);
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');
const landingHome = path.join(__dirname, 'src/containers/Landing/home', `${landingLayout}.tsx`);
// eslint-disable-next-line @typescript-eslint/no-var-requires
if (!require('fs').existsSync(landingHome)) {
  throw new Error(`tenants/${tenant.id}/landing.json: layout "${landingLayout}" has no ${landingHome}.`);
}
const isDev = process.env.NODE_ENV !== 'production';
const STOCK_HOSTS = ['images.unsplash.com', 'cdn.pixabay.com'];
const imagesOn = (...hosts) =>
  new RegExp(
    `^https:\\/\\/(${hosts.map((h) => h.replace(/\./g, '\\.')).join('|')})\\/.*\\.(png|jpg|jpeg|webp|gif|svg)$`,
    'i'
  );

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withPWA = require('next-pwa')({
  dest: 'public',
  // src/components/PWA/ServiceWorkerUpdater registers the worker; letting next-pwa do it too would register it twice.
  register: false,
  disable: process.env.NEXT_PUBLIC_NODE_ENV === 'development', // Disable in dev mode
  // The new worker waits until the user taps "Update", so a deploy never swaps code under a half-filled form.
  skipWaiting: false,
  reloadOnOnline: false,
  buildExcludes: [/middleware-manifest\.json$/, /app-build-manifest\.json$/],
  // Precaching all of public/ downloaded 100MB+ on first visit. Only the app shell is precached; images cache at runtime.
  publicExcludes: [
    '!noprecache/**/*',
    '!assets/**/*',
    '!splashscreens/**/*',
    '!images/**/*',
    '!animations/**/*',
    '!manifest.json',
  ],
  runtimeCaching: [
    {
      urlPattern: ({ url }) => url.pathname === '/animations/doggie-art-v1.json',
      handler: 'CacheFirst',
      options: {
        cacheName: 'empty-view-animation-v1',
        cacheableResponse: { statuses: [200] },
        expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 * 24 * 365 },
      },
    },
    { urlPattern: ({ url }) => url.pathname.startsWith('/auth/google'), handler: 'NetworkOnly' },
    {
      // Workbox matches a RegExp against the full href, so a path regex never matched same-origin requests.
      urlPattern: ({ url }) => url.pathname === '/_next/image',
      handler: 'CacheFirst',
      options: {
        cacheName: 'next-image-optimized',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
          purgeOnQuotaError: true,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },
    // Local branding/images under public/assets, no longer precached.
    {
      urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/assets/'),
      handler: 'StaleWhileRevalidate',
      options: {
        cacheName: 'local-assets',
        expiration: { maxEntries: 150, maxAgeSeconds: 60 * 60 * 24 * 30, purgeOnQuotaError: true },
        cacheableResponse: { statuses: [200] },
      },
    },
    // 2. CDN: the tenant's assets host
    {
      urlPattern: imagesOn(domains.assets),
      handler: 'CacheFirst',
      options: {
        cacheName: 'cdn-assets-images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
          purgeOnQuotaError: true,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },

    // 3. CDN: the tenant's content (uploads) host
    {
      urlPattern: imagesOn(domains.content),
      handler: 'CacheFirst',
      options: {
        cacheName: 'cdn-content-images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
          purgeOnQuotaError: true,
        },
        cacheableResponse: {
          statuses: [0, 200],
        },
      },
    },

    // 4. External: Unsplash, Pixabay
    {
      urlPattern: imagesOn(...STOCK_HOSTS),
      handler: 'CacheFirst',
      options: {
        cacheName: 'external-images',
        expiration: {
          maxEntries: 100,
          maxAgeSeconds: 60 * 60 * 24 * 30,
          purgeOnQuotaError: true,
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
  // Lets a check build (e.g. the tenant leak check) run beside a live dev server.
  distDir: process.env.NEXT_DIST_DIR || '.next',
  env: {
    NEXT_PUBLIC_GRAPHQL_ENDPOINT: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || `https://${domains.api}/client`,
  },
  trailingSlash: true,
  poweredByHeader: false,
  // Next 15 streams metadata into <body> for non-bot UAs on routes with a loading boundary (e.g. /jobs); crawlers and
  // unfurlers read title/canonical/OG from <head>. Matching every UA keeps metadata blocking in <head>, as in Next 14.
  htmlLimitedBots: /.*/,
  // `*.dev.tsx` routes (the landing layout preview) exist under `next dev` only and are never built for production.
  pageExtensions: isDev ? ['dev.tsx', 'tsx', 'ts', 'jsx', 'js'] : ['tsx', 'ts', 'jsx', 'js'],
  async headers() {
    return [
      {
        source: '/animations/doggie-art-v1.json',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/images/auth/alumni-pencil-doodle-v1.png',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          // Directives no page here needs, so they can't break GTM, uploads or embeds. A script/connect allow-list
          // needs a CSP report endpoint and a report-only run in production first.
          {
            key: 'Content-Security-Policy',
            value: "object-src 'none'; base-uri 'self'; frame-ancestors 'none'; form-action 'self'",
          },
        ],
      },
    ];
  },
  images: {
    // Keep in sync with the backend's imageHosts(): pages may only store images next/image can load.
    remotePatterns: [domains.site, domains.assets, domains.content, ...STOCK_HOSTS].map((hostname) => ({
      protocol: 'https',
      hostname,
    })),
  },
  transpilePackages: ['mui-tel-input'],
  webpack: (config, { isServer }) => {
    // config.resolve.alias.canvas = false;
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      canvas: false,
      '@tenant': tenant.dir,
      '@landing/Home': landingHome,
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
