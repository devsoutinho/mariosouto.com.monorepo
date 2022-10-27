import { colors } from './defaults/colors';
import { breakpoints } from './defaults/breakpoints';
import { borderRadius } from './defaults/borderRadius';

const theme = {
  colors,
  breakpoints,
  borderRadius,
}

export type Theme = typeof theme;
export default theme;
