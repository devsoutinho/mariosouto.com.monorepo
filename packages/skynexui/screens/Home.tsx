import { Box, Text, useTheme } from '../index';
import AppScreenHOC from './wrappers/AppScreenHOC';

export function HomeScreen() {
  const theme = useTheme();
  return (
    <Box
      styleSheet={{
        flex: 1,
        backgroundColor: theme.colors?.neutral.x050,
        justifyContent: 'center',
      }}
    >
      <Text
        styleSheet={{
          color: theme.colors?.positive.x900,
          
          // =======

          // color: {
          //   xs: theme.colors?.neutral.x050,
          //   sm: theme.colors?.positive.x050,
          //   md: theme.colors?.negative.x050,
          //   lg: theme.colors?.negative.x050,
          //   xl: theme.colors?.warning.x050,
          // },
        }}
      >
        Home Screen sample!!!
      </Text>
    </Box>
  );
}

export default AppScreenHOC(HomeScreen);
