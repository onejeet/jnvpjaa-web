const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  exportTrailingSlash: true,
  images: {
    unoptimized: true,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
};

module.exports = nextConfig;
