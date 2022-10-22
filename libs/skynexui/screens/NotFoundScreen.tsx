import { Box, Text, useTheme } from '../index';
import { Scaffold } from '../patterns/Scaffold/Scaffold';
import AppScreenHOC from './wrappers/AppScreenHOC';

export function NotFoundScreen() {
  const theme = useTheme();
  return (
    <Scaffold
      styleSheet={{
        flex: 1,
        backgroundColor: theme.colors?.neutral.x050,
        alignItems: 'stretch',
      }}
    >
      <Text
        tag='h3'
        variant='heading2'
        selectable
        styleSheet={{
          backgroundColor: theme.colors?.positive.x050,
          color: {
            xs: theme.colors?.warning.x600,
            sm: theme.colors?.positive.x600,
            md: theme.colors?.negative.x600,
            lg: theme.colors?.negative.x600,
            xl: theme.colors?.neutral.x600,
          },
        }}
      >
        Not Found
      </Text>
    </Scaffold>
  );
}

export default AppScreenHOC(NotFoundScreen);
