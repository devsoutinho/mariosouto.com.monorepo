import { defaultColors } from './colors/colors';


export const defaultTheme = {
  colors: defaultColors,
};

export type Theme = Partial<typeof defaultTheme>;
