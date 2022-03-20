import React from 'react';
import { useWindowDimensions } from 'react-native';
import { getCurrentBreakpoint } from '../../core/theme/breakpoints/breakpoints';
import { defaultTheme, Theme } from '../../core/theme/defaultTheme';

// [Context Declaration]
interface ThemeContextValues {
  theme: Theme;
}
const ThemeContext = React.createContext<ThemeContextValues>({
  theme: defaultTheme,
});

export const useTheme = () => React.useContext(ThemeContext).theme;

export const usePlatform = () => {
  return {
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
