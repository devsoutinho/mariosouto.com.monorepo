import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { getCurrentBreakpoint } from '../../core/theme/breakpoints/breakpoints';
import { defaultTheme, Theme } from '../../core/theme/defaultTheme';

export type EnvPlatform = 'ios' | 'android' | 'windows' | 'macos' | 'web';

// [Context Declaration]
interface ThemeContextValues {
  theme: Theme;
}
const ThemeContext = React.createContext<ThemeContextValues>({
  theme: defaultTheme,
});

export const useTheme = () => React.useContext(ThemeContext).theme;

export const useEnv = () => {
  return {
    getCurrentPlatform(): EnvPlatform {
      return Platform.OS;
    },
    getCurrentBreakpoint() {
      const theme = useTheme();
      const { width } = useWindowDimensions();
      const currentBreakpoint = getCurrentBreakpoint(width, theme);
      return currentBreakpoint;
    }
  }
};

// [Provider Declaration]
interface SkynexUIProvider {
  theme: Theme;
  children: React.ReactNode;
}
export function SkynexUIProvider({ theme, children }: SkynexUIProvider) {
  return (
    <ThemeContext.Provider value={{
      theme,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

SkynexUIProvider.defaultProps = {
  theme: defaultTheme,
};
