import { StyleSheet } from '../../core/stylesheet/stylesheet';
import { Box, useEnv } from '../../index';


interface Scaffold {
  safeArea: { top: boolean; bottom: boolean; };
  styleSheet?: StyleSheet;
  children?: React.ReactNode;
}
export function Scaffold({ children, styleSheet, safeArea }: Scaffold) {
  const env = useEnv();
  const insets = env.useSafeAreaInsets();

  return (
    <Box
      styleSheet={{
        ...styleSheet,
        paddingTop: safeArea.top && insets.top,
        paddingBottom: safeArea.bottom && insets.bottom,
        flex: 1,
        alignItems: 'stretch',
        flexDirection: {
          xs: 'column',
          md: 'row'
        },
      }}
    >
      {children}
    </Box>
  )
}
