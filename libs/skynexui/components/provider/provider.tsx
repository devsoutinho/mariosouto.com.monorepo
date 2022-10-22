import React from 'react';
import { useSafeAreaInsets } from 'external-libs/react-native-safe-area-context/native';

import { Platform, useWindowDimensions, Linking } from 'react-native';
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
        env.isWeb()
          ? (globalThis as any).open(routeKey)
          : Linking.openURL(routeKey);;
        return;
      }

      env.isWeb()
        ? router.push(routeKey)
        : router.navigate(routeKey);
    },
  }
};

export const useEnv = () => {
  return {
    themeCalc(operator: '+' | '-' = '+', ...args: any[]) {
      if (this.isWeb()) {
        const values = args.map((arg) => typeof arg === 'number' ? `${arg}px` : arg);
        if (operator === '+') return `calc(${values.join(' + ')})`;
        if (operator === '-') return `calc(${values.join(' - ')})`;
      }

      const total = args.reduce((acc, curr) => {
        const currNormalized = typeof curr === 'string' ? Number(curr.replace('px', '')) : curr;

        if (operator === '+') return acc + currNormalized;
        if (operator === '-') return acc - currNormalized;
      }, 0);

      return `${total}px`;
    },
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
    },
    useSafeAreaInsets() {
      const insets = useSafeAreaInsets();
      return insets;
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
