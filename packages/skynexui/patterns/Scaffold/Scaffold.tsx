import styled from 'styled-components/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { Box, useEnv } from '../../index';

interface Scaffold {
  safeArea?: { top: boolean; bottom: boolean; };
  styleSheet?: StyleSheet;
  children?: React.ReactNode;
}
export function Scaffold({ children, styleSheet, safeArea }: Scaffold) {
  const env = useEnv();
  const insets = env.useSafeAreaInsets();
  // TODO: Menu height must be calculated and provided to the Scaffold
  const menuHeight = '80px';

  return (
    <Box
      styleSheet={{
        ...styleSheet,
        paddingTop: safeArea?.top && insets.top,
        paddingBottom: safeArea?.bottom && env.themeCalc('+', insets.bottom, menuHeight),
        flex: 1,
        alignItems: 'stretch',
        flexDirection: {
          xs: 'column',
        },
        overflow: 'scroll'
      }}
    >
      {children}
    </Box>
  )
}

Scaffold.defaultProps = {
  safeArea: { top: false, bottom: false },
};
