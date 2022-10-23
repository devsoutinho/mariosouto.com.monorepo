import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { Box, useEnv } from '../../index';

interface Scaffold {
  safeArea?: { top: boolean; bottom: boolean; };
  styleSheet?: StyleSheet;
  children?: React.ReactNode;
}
export function Scaffold({ children, styleSheet, safeArea }: Scaffold) {
  return (
    <Box
      styleSheet={{
        flex: 1,
        alignItems: 'stretch',
        flexDirection: {
          xs: 'column',
        },
        ...styleSheet,
      }}
    >
      {children}
    </Box>
  )
}

Scaffold.defaultProps = {
  safeArea: { top: false, bottom: false },
};
