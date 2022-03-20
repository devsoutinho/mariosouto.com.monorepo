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
          backgroundColor: theme.colors?.positive.x100,
          
          // =======

          color: {
            xs: theme.colors?.neutral.x900,
            sm: theme.colors?.positive.x900,
            md: theme.colors?.negative.x900,
            lg: theme.colors?.negative.x900,
            xl: theme.colors?.warning.x900,
          },
        }}
      >
        Home Screen sample!!!
      </Text>
    </Box>
  );
}

export default AppScreenHOC(HomeScreen);
