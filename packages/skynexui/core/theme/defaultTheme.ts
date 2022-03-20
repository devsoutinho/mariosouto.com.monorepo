import { defaultBreakpoints } from './breakpoints/breakpoints';
import { defaultColors } from './colors/colors';
import { defaultTypography } from './typography/typography';


export const defaultTheme = {
  breakpoints: defaultBreakpoints,
  colors: defaultColors,
  typography: defaultTypography,
  components: {
    text: {
      defaultVariant: 'body2',
    },
    textfield: {
      defaultVariant: 'basicBordered',
    },
  }
};

export type Theme = Partial<typeof defaultTheme>;
