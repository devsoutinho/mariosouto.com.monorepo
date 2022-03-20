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
        tag='h3'
        styleSheet={{
          backgroundColor: theme.colors?.positive.x050,

          color: {
            xs: theme.colors?.warning.x500,
            sm: theme.colors?.positive.x500,
            md: theme.colors?.negative.x500,
            lg: theme.colors?.negative.x500,
            xl: theme.colors?.neutral.x500,
          },
        }}
      >
        Home Screen sample!!!
      </Text>
    </Box>
  );
}

export default AppScreenHOC(HomeScreen);
