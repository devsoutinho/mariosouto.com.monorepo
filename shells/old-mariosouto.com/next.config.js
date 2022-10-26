const redirects = require("./redirects.json");
const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules')([
  'styled-components',
  'skynexui',
  '@devsoutinho/site',
  '@devsoutinho/app-teleprompter',
  'external-libs',
], {
  resolveSymlinks: true,
});


module.exports = withPlugins([withTM], {
  async redirects() {
    return redirects;
  },
  trailingSlash: true,
});
