import { StyleSheet, StyleKey, ResponsiveProperty } from '../../../core/stylesheet/stylesheet';
import { Breakpoints } from '../../../core/theme/breakpoints/breakpoints';
import { Theme } from '../../../core/theme/defaultTheme';
import { EnvPlatform } from '../../provider/provider';

function parseStyleSheet(styleSheet: StyleSheet): StyleSheet {
  const result = Object.entries(styleSheet || {}).reduce((acc, [key, value]) => {
    const styleKeyFormated = (key as any).split(/(?=[A-Z])/).join('-').toLowerCase();


    if(styleKeyFormated.includes('vertical')) {
      const propName = styleKeyFormated.replace('-vertical', '');
      return {
        ...acc,
        [`${propName}Top`]: value,
        [`${propName}Bottom`]: value,
      }      
    }
    if(styleKeyFormated.includes('horizontal')) {
      const propName = styleKeyFormated.replace('-horizontal', '');
      return {
        ...acc,
        [`${propName}Left`]: value,
        [`${propName}Right`]: value,
      }      
    }

    return {
      ...acc,
      [key]: value,
    }
  }, {});

  return result;
}

function parseToNumber(value: string) {
  const valueConverted = Number(value);
  if(isNaN(valueConverted)) return value;
  return valueConverted;
}

export function resolveValueForBreakpoint(value: any, activeBreakpoint: Breakpoints) {
  const breakpointsOrderByBreakpoint: Record<Breakpoints, number> = {
    [Breakpoints.xs]: 0,
    [Breakpoints.sm]: 1,
    [Breakpoints.md]: 2,
    [Breakpoints.lg]: 3,
    [Breakpoints.xl]: 4,
  };
  const breakpointsOrderByOrder: Record<number, Breakpoints> = {
    0: Breakpoints.xs,
    1: Breakpoints.sm,
    2: Breakpoints.md,
    3: Breakpoints.lg,
    4: Breakpoints.xl,
  };

  const currentBreakpointOrder = breakpointsOrderByBreakpoint[activeBreakpoint];

  // TODO: I know that I can do it better, but not now this is what I can do
  for (let i = currentBreakpointOrder; i! >= 0; i--) {
    var breakpoint = breakpointsOrderByOrder[i];
    if(value[breakpoint]) return value[breakpoint];
  }
}

function webParser(
  styleSheet: StyleSheet,
  styleKeys: StyleKey[],
  _: keyof typeof Breakpoints,
  theme: Theme,
) {
  const statesSet = new Set([
    ':hover',
    ':focus',
    ':disabled',
  ]);
  function parser(styleSheet: StyleSheet) {
    return (acc: string, styleKey: any): any => {
      const styleKeyFormated = (styleKey as any).split(/(?=[A-Z])/).join('-').toLowerCase();
      const styleValue = styleSheet[styleKey] as ResponsiveProperty<typeof styleKey>;

      if(statesSet.has(styleKey)) {
        const stateValue = styleSheet[styleKey.replace(':', '')];
        if(!stateValue) return acc;

        // TODO: Understand here :disabled :hover :focus...
        return `
          ${acc}
          &${styleKey},
          &[disabled] {
            ${styleKey === ':disabled' ? 'cursor: not-allowed;' : ''}
            ${Object.keys(stateValue).reduce(parser(stateValue), '')}
          }
        `;
      }
  
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
  
      return `
        ${acc}
        ${styleKeyFormated}: ${styleValue};
      `;
    }
  }
  return [...styleKeys, ...Array.from(statesSet)]
    .reduce(parser(styleSheet), '');
}

function mobileParser(
  styleSheet: StyleSheet,
  styleKeys: StyleKey[],
  currentBreakpoint: keyof typeof Breakpoints,
  theme: Theme,
  removePX: boolean) {
  const result: any = styleKeys.reduce((acc, styleKey) => {    
    const styleValue = styleSheet[styleKey] as ResponsiveProperty<typeof styleKey>;
    if(!styleValue) return acc;
    
    if(typeof styleValue === 'object') {
      const baseValue = resolveValueForBreakpoint(styleValue, currentBreakpoint as Breakpoints);
      const value = removePX ? parseToNumber(`${baseValue}`.replace(/px/g, '')) : baseValue;
      if(!value) return acc;
      return {
        ...acc,
        [styleKey]: value,
      }
    }
    
    const value = removePX ? parseToNumber(`${styleValue}`.replace(/px/g, '')) : styleValue;
    if(!value) return acc;
    return {
      ...acc,
      [styleKey]: value,
    }
  }, {});



  result.aspectRatio = Boolean(result.aspectRatio)
    ? parseToNumber(`${result.aspectRatio}`.replace('px', ''))
    : result.aspectRatio;

  return result;
}

interface ParseCSSInput {
  theme: Theme;
  styleSheet: StyleSheet;
  currentBreakpoint: keyof typeof Breakpoints;
  currentPlatform: EnvPlatform;
  removePX: boolean;
}
export function parseCSS({ styleSheet, currentBreakpoint, currentPlatform, theme, removePX, ...rest }: ParseCSSInput): any {
  const {
    styleSheetHover: hover,
    styleSheetFocus: focus,
    styleSheetDisabled: disabled,
  } = rest as any;
  const styleSheetParsed = parseStyleSheet(styleSheet);
  const styleKeys = Object.keys(styleSheetParsed) as StyleKey[];

  const result = currentPlatform === 'web'
    ? webParser({...styleSheetParsed, hover: parseStyleSheet(hover), focus: parseStyleSheet(focus), disabled: parseStyleSheet(disabled)}, styleKeys, currentBreakpoint, theme)
    : mobileParser(styleSheetParsed, styleKeys, currentBreakpoint, theme, removePX);

  // TODO: Open issue in Styled Components
  if(result.aspectRatio) result.aspectRatio = `${result.aspectRatio}`;
  return result;
}
