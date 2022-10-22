import { Text, useTheme } from '../index';
import { Scaffold } from '../patterns/Scaffold/Scaffold';
import AppScreenHOC from './wrappers/AppScreenHOC';

export function SettingsScreen() {
  const theme = useTheme();
  return (
    <Scaffold
      safeArea={{ top: true, bottom: true }}
      styleSheet={{
        backgroundColor: theme.colors?.negative?.x100,
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
        Settings Screen
      </Text>
    </Scaffold>
  );
}

export default AppScreenHOC(SettingsScreen);
