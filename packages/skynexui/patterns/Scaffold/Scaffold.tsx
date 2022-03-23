import { StatusBar } from 'external-libs/status-bar/native';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { Box, useEnv } from '../../index';

interface Scaffold {
  safeArea?: { top: boolean; bottom: boolean; };
  styleSheet?: StyleSheet;
  children?: React.ReactNode;
  statusBar?: {
    style?: 'light' | 'dark' | 'auto';
  }
}
export function Scaffold({ children, styleSheet, safeArea, statusBar }: Scaffold) {
  const env = useEnv();
  const insets = env.useSafeAreaInsets();
  // TODO: Menu height must be calculated and provided to the Scaffold
  const menuHeight = '80px';

  return (
    <Box
      styleSheet={{
        paddingTop: safeArea?.top && insets.top,
        paddingBottom: {
          xs: safeArea?.bottom && env.themeCalc('+', insets.bottom, menuHeight),
          md: safeArea?.bottom && env.themeCalc('+', insets.bottom)
        },
        flex: 1,
        alignItems: 'stretch',
        flexDirection: {
          xs: 'column',
        },
        overflow: 'scroll',
        ...styleSheet,
      }}
    >
      <StatusBar
        style={statusBar?.style || 'auto'}
      />
      {children}
    </Box>
  )
}

Scaffold.defaultProps = {
  safeArea: { top: false, bottom: false },
};
