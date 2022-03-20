import styled from 'styled-components/native';
import { useEnv, useTheme } from '../../index';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { parseCSS } from './utils/parseCSS';

const StyledView = styled.View || (styled as any).div;
const BoxStyled = StyledView<BoxBaseProps>`
  display: flex;
  flex-direction: column;

  ${({
    appTheme,
    styleSheet,
    currentBreakpoint,
    currentPlatform,
  }) => parseCSS({
    theme: appTheme,
    styleSheet: styleSheet || {},
    currentBreakpoint,
    currentPlatform,
  })}
`;

interface BoxBaseProps {
  children: React.ReactNode;
  styleSheet?: StyleSheet;
  // TODO: Leave like this: https://github.com/skynexui/components/blob/main/lib/core/stylesheet/stylesheet.ts#L93
  [key: string]: any;
}

export function BoxBase({children, styleSheet, ...props}: BoxBaseProps) {
  const theme = useTheme();
  const { getCurrentBreakpoint, getCurrentPlatform } = useEnv();
  const currentBreakpoint = getCurrentBreakpoint();
  const currentPlatform = getCurrentPlatform();

  return (
    <BoxStyled
      currentBreakpoint={currentBreakpoint}
      currentPlatform={currentPlatform}
      styleSheet={styleSheet}
      appTheme={theme}
      {...props}
      {...currentPlatform === 'web' && {
        as: props.tag || props.as,
      }}
    >
      {children}
    </BoxStyled>
  )
}

BoxBase.defaultProps = {
  styleSheet: {},
}
