import { StyleSheet, StyleKey, ResponsiveProperty } from '../../../core/stylesheet/stylesheet';
import { Breakpoints } from '../../../core/theme/breakpoints/breakpoints';

interface ParseCSSInput {
  styleSheet: StyleSheet;
  currentBreakpoint: keyof typeof Breakpoints;
}
export function parseCSS({ styleSheet, currentBreakpoint }: ParseCSSInput): any {
  const styleKeys = Object.keys(styleSheet) as StyleKey[];

  const result = styleKeys.reduce((acc, styleKey) => {    
    const styleValue = styleSheet[styleKey] as ResponsiveProperty<typeof styleKey>;
    return {
      ...acc,
      [styleKey]: styleValue[currentBreakpoint] || styleValue,
    }
  }, {});
  console.log(result);
  return result;
}
