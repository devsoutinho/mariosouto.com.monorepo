const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'external-libs',
], {
  resolveSymlinks: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  async redirects() {
    return require("./redirects.json");
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  trailingSlash: true,
}

module.exports = withPlugins(
  [withTM],
  nextConfig
);
