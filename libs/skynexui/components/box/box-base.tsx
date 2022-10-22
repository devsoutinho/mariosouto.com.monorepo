import styled from 'styled-components/native';
import { useEnv, useTheme } from '../provider/provider';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { parseCSS } from './utils/parseCSS';
import React from 'react';

const StyledScrollView = styled.ScrollView || (styled as any).div;
const BoxWithScroll = StyledScrollView``;
const StyledView = styled.View || (styled as any).div;
const BoxStyled = StyledView<BoxBaseProps>`
  display: flex;
  flex-direction: column;

  ${({
  appTheme,
  styleSheet,
  currentBreakpoint,
  currentPlatform,
  ...rest
}) => parseCSS({
  ...rest,
  theme: appTheme,
  styleSheet: styleSheet || {},
  currentBreakpoint,
  currentPlatform,
  removePX: false,
})}
`;

interface BoxBaseProps {
  children?: React.ReactNode;
  styleSheet?: StyleSheet;
  // TODO: Leave like this: https://github.com/skynexui/components/blob/main/lib/core/stylesheet/stylesheet.ts#L93
  [key: string]: any;
}

export const BoxBase = React.forwardRef(({ children, styleSheet: styleSheetComplete, ...props }: BoxBaseProps, ref) => {
  const boxBaseRef = ref;

  const {
    hover: styleSheetHover,
    focus: styleSheetFocus,
    disabled: styleSheetDisabled,
    ...receivedStyles
  } = styleSheetComplete || {};
  const [extraStyles, setExtraStyles] = React.useState({});

  const styleSheet = {
    ...receivedStyles,
    ...extraStyles,
  };

  const theme = useTheme();

  // Style Sheet
  const {
    cursor,
    ...commonStyleSheet
  } = styleSheet || {};
  const isScrollBox = styleSheet?.overflow === 'scroll';

  // [Props Object]
  const boxBaseProps = {
    children,
    appTheme: theme,
    styleSheet: {
      ...commonStyleSheet,
    },
    ...props,
    ...(isScrollBox && { as: BoxWithScroll }),
  }

  return <BoxStyled ref={boxBaseRef} {...boxBaseProps} />;
});

BoxBase.defaultProps = {
  styleSheet: {},
}
