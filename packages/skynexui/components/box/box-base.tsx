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

export function BoxBase({ children, styleSheet: styleSheetComplete, ...props }: BoxBaseProps) {
  const boxBaseRef = React.useRef();

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

  React.useEffect(() => {
    if (!isWeb()) {
      props.disabled
        ? setExtraStyles(styleSheetDisabled as any)
        : setExtraStyles({});
    }
  }, [props.disabled]);

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

  // State for hover and focus
  function handleFocus() {
    if (!isWeb()) {
      const focusStyles = parseCSS({
        styleSheet: styleSheetFocus || {},
        theme,
        currentBreakpoint,
        currentPlatform,
        removePX: true,
      });
      setExtraStyles(() => (focusStyles));
    }
  }
  function handleBlur() {
    if (!isWeb()) {
      setExtraStyles({});
    }
  }
  // =========================

  // [Props Object]
  const boxBaseProps = {
    children,
    currentBreakpoint: currentBreakpoint,
    currentPlatform: currentPlatform,
    appTheme: theme,
    ...(!isWeb() && {
      onPressIn: handleFocus,
      onPressOut: handleBlur,
    }),
    styleSheet: {
      ...(isWeb() && { cursor }),
      ...commonStyleSheet,
    },
    ...props,
    ...(isScrollBox && { as: BoxWithScroll }),
    ...(isWeb() && {
      as: props.tag || props.as,
      styleSheetHover,
      styleSheetFocus,
      styleSheetDisabled
    }),
  }

  if (isScrollBox && !isWeb()) {
    const {
      alignItems, padding, paddingBottom, paddingTop, paddingLeft, paddingRight,
      ...restOfStyles
    } = boxBaseProps.styleSheet;
    const contentContainerStyleSheet = {
      alignItems, padding, paddingBottom, paddingTop, paddingLeft, paddingRight,
    };
    return (
      <BoxStyled
        ref={boxBaseRef}
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

  return <BoxStyled ref={boxBaseRef} {...boxBaseProps} />;
}

BoxBase.defaultProps = {
  styleSheet: {},
}
