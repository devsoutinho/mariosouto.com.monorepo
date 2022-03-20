import { StyleSheet, StyleKey, ResponsiveProperty } from '../../../core/stylesheet/stylesheet';
import { Breakpoints } from '../../../core/theme/breakpoints/breakpoints';
import { Theme } from '../../../core/theme/defaultTheme';
import { EnvPlatform } from '../../provider/provider';

function webParser(
  styleSheet: StyleSheet,
  styleKeys: StyleKey[],
  currentBreakpoint: keyof typeof Breakpoints,
  theme: Theme,
) {
  return styleKeys.reduce((acc, styleKey) => {
    const styleKeyFormated = styleKey.split(/(?=[A-Z])/).join('-').toLowerCase();
    const styleValue = styleSheet[styleKey] as ResponsiveProperty<typeof styleKey>;

    if(typeof styleValue === 'object') {
      const styleValueBreakpoints = Object.keys(styleValue);
      return `
        ${acc}
        ${styleValueBreakpoints.map((breakpointName) => {
          const themeBreakpoints = theme?.breakpoints as any;
          const breakpointValue = themeBreakpoints[breakpointName];

          const cssRule = `${styleKeyFormated}: ${styleValue[breakpointName as Breakpoints]};`;

          if(breakpointValue === 0) return cssRule;

          return `
            @media (min-width: ${breakpointValue}px) {
              ${cssRule}
            }
          `;
        }).join('')}
      `;
    }

    // console.log(styleKey);
    return `
      ${acc}
      ${styleKeyFormated}: ${styleValue};
    `;
    // return {
    //   ...acc,
    //   [styleKey]: styleValue,
    // }
  }, '');

}

function mobileParser(
  styleSheet: StyleSheet,
  styleKeys: StyleKey[],
  currentBreakpoint: keyof typeof Breakpoints,
  theme: Theme) {
  return styleKeys.reduce((acc, styleKey) => {    
    const styleValue = styleSheet[styleKey] as ResponsiveProperty<typeof styleKey>;
    return {
      ...acc,
      [styleKey]: styleValue[currentBreakpoint] || styleValue,
    }
  }, {});
}

interface ParseCSSInput {
  theme: Theme;
  styleSheet: StyleSheet;
  currentBreakpoint: keyof typeof Breakpoints;
  currentPlatform: EnvPlatform;
}
export function parseCSS({ styleSheet, currentBreakpoint, currentPlatform, theme }: ParseCSSInput): any {
  const styleKeys = Object.keys(styleSheet) as StyleKey[];

  const result = currentPlatform === 'web'
    ? webParser(styleSheet, styleKeys, currentBreakpoint, theme)
    : mobileParser(styleSheet, styleKeys, currentBreakpoint, theme);
  return result;
}
