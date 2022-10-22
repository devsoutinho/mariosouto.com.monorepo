import { StatusBar } from 'external-libs/status-bar/native';
import { StatusBarProps } from 'external-libs/status-bar/types';
import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { Box, useEnv } from '../../index';

interface Scaffold {
  safeArea?: { top: boolean; bottom: boolean; };
  styleSheet?: StyleSheet;
  children?: React.ReactNode;
  statusBar?: StatusBarProps;
}
export function Scaffold({ children, styleSheet, safeArea, statusBar }: Scaffold) {
  return (
    <Box
      styleSheet={{
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
        {...statusBar}
      />
      {children}
    </Box>
  )
}

Scaffold.defaultProps = {
  safeArea: { top: false, bottom: false },
};
