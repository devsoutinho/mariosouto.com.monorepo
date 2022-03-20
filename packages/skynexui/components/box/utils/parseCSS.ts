import { css } from 'styled-components/native';
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
    const styleValue = styleSheet[styleKey];

    if(typeof styleValue === 'object') {
      console.log('Object', styleKey, styleValue);
      const styleValueBreakpoints = Object.keys(styleValue);
      return `
        ${styleValueBreakpoints.map((breakpointName) => {
          const themeBreakpoints = theme?.breakpoints as any;
          const breakpointValue = themeBreakpoints[breakpointName];
          console.log('breakpointName', );
          return css`
            @media (min-width: ${breakpointValue}px) {
              color: black;
            }
          `;
        }).join('')}
      `;
    }

    return {
      ...acc,
      [styleKey]: styleValue,
    }
  }, {});

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
