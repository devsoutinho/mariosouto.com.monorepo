module.exports = {
  presets: ['next/babel'],
  plugins: [
    ['react-native-web', { commonjs: true }],
    ['babel-plugin-skynexui-styled'],
    ['styled-components', { 'ssr': true }],
  ],
}
