import { defaultBreakpoints } from './breakpoints/breakpoints';
import { defaultColors } from './colors/colors';


export const defaultTheme = {
  breakpoints: defaultBreakpoints,
  colors: defaultColors,
};

export type Theme = Partial<typeof defaultTheme>;
