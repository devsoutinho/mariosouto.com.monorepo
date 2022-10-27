import React from 'react';
import theme from './theme';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

interface ThemeProviderProps {
  children: React.ReactNode;
}
export function ThemeProvider({ children }: ThemeProviderProps) {
  return (
    <StyledThemeProvider theme={theme}>
      {children}
    </StyledThemeProvider>
  );
}
