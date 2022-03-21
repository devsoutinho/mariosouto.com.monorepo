const plugin = require('../src/index');
const pluginTester = require('babel-plugin-tester').default;

const tests = [
  {
    title: 'native -> web',
    code: `import { useSafeAreaInsets } from 'external-libs/react-native-safe-area-context/native';`,
    snapshot: true,
    pluginOptions: { devNative: true }
  },
];

pluginTester({
  babelOptions: {
    generatorOpts: {
      jsescOption: {
        quotes: 'single'
      }
    }
  },
  plugin,
  pluginName: 'Rewrite @skynexui/native to: ', // |core
  tests
});
