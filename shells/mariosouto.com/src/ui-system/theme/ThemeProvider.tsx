import React from 'react';
import theme from './theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

const StyledThemeProviderFix = StyledThemeProvider as any;
interface ThemeProviderProps {
  children: React.ReactNode;
}
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <StyledThemeProviderFix theme={theme}>
      {children}
    </StyledThemeProviderFix>
  );
}
