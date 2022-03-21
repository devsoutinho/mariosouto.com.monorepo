import React from 'react';
import { Platform, useWindowDimensions } from 'react-native';
import { getCurrentBreakpoint } from '../../core/theme/breakpoints/breakpoints';
import { defaultTheme, Theme } from '../../core/theme/defaultTheme';
import { EnvCSS } from './EnvCSS';

export type EnvPlatform = 'ios' | 'android' | 'windows' | 'macos' | 'web';

// [Context Declaration]
interface ThemeContextValues {
  theme: Theme;
  useRouterHook: any;
}
const ThemeContext = React.createContext<ThemeContextValues>({
  theme: defaultTheme,
  useRouterHook: () => ({}),
});

export const useTheme = () => React.useContext(ThemeContext).theme;
export const useRouter = () => {
  const env = useEnv();
  const router =React.useContext(ThemeContext).useRouterHook();

  return {
    push: (routeKey: string) => {
      env.isWeb()
        ? router.push(routeKey)
        : router.navigate(routeKey);
    },
  }
};

export const useEnv = () => {
  return {
    isWeb() {
      return Platform.OS === 'web';
    },
    isIOS() {
      return Platform.OS === 'ios';
    },
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
  useRouterHook: any;
  theme: Theme;
  children: React.ReactNode;
}
export function SkynexUIProvider({ theme, useRouterHook, children }: SkynexUIProvider) {
  return (
    <ThemeContext.Provider value={{
      theme,
      useRouterHook,
    }}>
      {Platform.OS === 'web' && <EnvCSS />}
      {children}
    </ThemeContext.Provider>
  );
}

SkynexUIProvider.defaultProps = {
  theme: defaultTheme,
};
