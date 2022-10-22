import React from 'react';
// import { useSafeAreaInsets } from 'external-libs/react-native-safe-area-context/native';
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
  const router = React.useContext(ThemeContext).useRouterHook();

  return {
    push: (routeKey: string) => {
      const isExternalURL = routeKey.startsWith('http');
      if (isExternalURL) {
        (globalThis as any).open(routeKey);
        return;
      }      
      router.push(routeKey)
    },
  }
};

export const useEnv = () => {
  return {
    getCurrentBreakpoint() {
      const theme = useTheme();
      const currentBreakpoint = getCurrentBreakpoint(1000, theme);
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
      <EnvCSS />
      {children}
    </ThemeContext.Provider>
  );
}

SkynexUIProvider.defaultProps = {
  theme: defaultTheme,
};
