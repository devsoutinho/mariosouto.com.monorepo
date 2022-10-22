import { Theme } from '../defaultTheme';

export enum Breakpoints {
  xs = 'xs',
  sm = 'sm',
  md = 'md',
  lg = 'lg',
  xl = 'xl',
}

export const defaultBreakpoints = {
  [Breakpoints.xs]: 0,
  [Breakpoints.sm]: 480,
  [Breakpoints.md]: 768,
  [Breakpoints.lg]: 992,
  [Breakpoints.xl]: 1200,
}

export function getCurrentBreakpoint(screenWidth: number, theme: Theme): Breakpoints {
  if (screenWidth < Number(theme?.breakpoints?.sm)) {
    return Breakpoints.xs;
  }
  if (screenWidth < Number(theme?.breakpoints?.md)) {
    return Breakpoints.sm;
  }

  if (screenWidth < Number(theme?.breakpoints?.lg)) {
    return Breakpoints.md;
  }

  if (screenWidth < Number(theme?.breakpoints?.xl)) {
    return Breakpoints.lg;
  }

  return Breakpoints.xl;
}
