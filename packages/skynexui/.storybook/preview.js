import { SkynexUIProvider } from '../index';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  (Story) => (
    <SkynexUIProvider>
      <Story />
    </SkynexUIProvider>
  ),
];
