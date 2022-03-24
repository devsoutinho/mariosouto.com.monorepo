import { defaultBorderRadius } from './borderRadius/borderRadius';
import { defaultBreakpoints } from './breakpoints/breakpoints';
import { defaultColors } from './colors/colors';
import { defaultSpace } from './space/space';
import { defaultShadow } from './shadow/shadow';
import { defaultTypography } from './typography/typography';


export const defaultTheme = {
  breakpoints: defaultBreakpoints,
  colors: defaultColors,
  space: defaultSpace,
  typography: defaultTypography,
  borderRadius: defaultBorderRadius,
  shadow: defaultShadow,
  components: {
    text: {
      defaultVariant: 'body2',
    },
    textfield: {
      defaultVariant: 'basicBordered',
    },
    button: {
      defaultVariant: 'primary',
      variants: {
        primary: 'filled',
        secondary: 'outlined',
        tertiary: 'ghost',
      },
      colorVariant: 'accent',
      rounded: 'sm' as keyof typeof defaultBorderRadius,
      size: 'sm',
    }
  }
};

export type Theme = Partial<typeof defaultTheme>;
