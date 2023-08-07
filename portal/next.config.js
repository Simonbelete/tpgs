/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config, context) => {
    config.watchOptions = {
      poll: 500,
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = nextConfig;
