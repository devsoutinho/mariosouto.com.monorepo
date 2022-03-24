const path = require('path');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'styled-components',
  'skynexui',
  '@devsoutinho/site',
  'external-libs',
], {
  resolveSymlinks: true,
});

module.exports = withPlugins([withTM], {
  async redirects() {
    return [
      {
        source: '/install/expo',
        destination: 'https://expo.dev/@devsoutinho_tech/devsoutinho-app?serviceType=classic&distribution=expo-go',
        permanent: true,
      },
    ]
  },
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
      'react-native-web': path.resolve(__dirname, '.', 'node_modules', 'react-native-web'),
    }
    config.resolve.extensions = [
      '.web.js',
      '.web.jsx',
      '.web.ts',
      '.web.tsx',
      ...config.resolve.extensions,
    ]
    return config
  },
});
