import React from 'react';
import { defaultTheme, Theme } from '../../core/theme/defaultTheme';

// [Context Declaration]
interface ThemeContextValues {
  theme: Theme;
}
const ThemeContext = React.createContext<ThemeContextValues>({
  theme: defaultTheme,
});

export const useTheme = () => React.useContext(ThemeContext).theme;

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
