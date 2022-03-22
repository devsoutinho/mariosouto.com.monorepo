import styled from 'styled-components/native';
import { useEnv, useTheme } from '../provider/provider';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { parseCSS } from './utils/parseCSS';

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
  }) => parseCSS({
    theme: appTheme,
    styleSheet: styleSheet || {},
    currentBreakpoint,
    currentPlatform,
    removePX: false,
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
  const { getCurrentBreakpoint, getCurrentPlatform, isWeb } = useEnv();
  const currentBreakpoint = getCurrentBreakpoint();
  const currentPlatform = getCurrentPlatform();
  
  // Style Sheet
  const {
    cursor,
    ...commonStyleSheet
  } = styleSheet || {};
  const isScrollBox = styleSheet?.overflow === 'scroll';

  // [Props Object]
  const boxBaseProps = {
    children,
    currentBreakpoint: currentBreakpoint,
    currentPlatform: currentPlatform,
    appTheme: theme,
    styleSheet: {
      ...(isWeb() && { cursor }),
      ...commonStyleSheet,
    },
    ...props,
    ...(isScrollBox && { as: BoxWithScroll }),
    ...(isWeb() && { as: props.tag || props.as }),
  }

  if(isScrollBox && !isWeb()) {
    const {
      alignItems, padding, paddingBottom, paddingTop, paddingLeft, paddingRight,
      ...restOfStyles
    } = boxBaseProps.styleSheet;
    const contentContainerStyleSheet = {
      alignItems, padding, paddingBottom, paddingTop, paddingLeft, paddingRight,
    };
    return (
      <BoxStyled
        {...boxBaseProps}
        styleSheet={restOfStyles}
        contentContainerStyle={parseCSS({
          styleSheet: contentContainerStyleSheet,
          theme,
          currentBreakpoint,
          currentPlatform,
          removePX: true,
        })}
      />
    );
  }

  return <BoxStyled {...boxBaseProps} />;
}

BoxBase.defaultProps = {
  styleSheet: {},
}
