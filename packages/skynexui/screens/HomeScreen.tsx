import { Box, Text, useTheme } from '../index';
import { Scaffold } from '../patterns/Scaffold/Scaffold';
import AppScreenHOC from './wrappers/AppScreenHOC';

export function HomeScreen() {
  const theme = useTheme();
  return (
    <Scaffold
      safeArea={{ top: true, bottom: true }}
      styleSheet={{
        backgroundColor: theme.colors?.positive?.x050,
      }}
    >
      <Box
        tag="header"
        styleSheet={{
          minWidth: '300px',
          backgroundColor: theme.colors?.neutral.x500,
        }}
      >
        <Text>
          Aside Men
        </Text>
      </Box>
      <Text
        tag='h3'
        variant='heading2'
        selectable
        styleSheet={{
          flex: 1,
          color: {
            xs: theme.colors?.warning.x600,
            sm: theme.colors?.positive.x600,
            md: theme.colors?.negative.x600,
            lg: theme.colors?.negative.x600,
            xl: theme.colors?.neutral.x600,
          },
        }}
      >
        DevSoutinho!
      </Text>
    </Scaffold>
  );
}

export default AppScreenHOC(HomeScreen);
