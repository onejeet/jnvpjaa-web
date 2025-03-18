/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
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
  transpilePackages: ['mui-tel-input'],
  webpack: (config) => {
    config.resolve.alias.canvas = false;

    return config;
  },
};

module.exports = nextConfig;
