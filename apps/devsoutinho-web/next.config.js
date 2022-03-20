const path = require('path');
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')(['styled-components','skynexui'], {
  resolveSymlinks: true,
});

module.exports = withPlugins([withTM], {
  trailingSlash: true,
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      // Transform all direct `react-native` imports to `react-native-web`
      'react-native$': 'react-native-web',
      'react': path.resolve(__dirname, '.', 'node_modules', 'react'),
      'react-dom': path.resolve(__dirname, '.', 'node_modules', 'react-dom'),
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


// module.exports = {

// }
