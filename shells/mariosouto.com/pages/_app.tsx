import { CSSReset } from "@src/ui-system/theme/CSSReset"
import { ApolloProvider } from 'external-libs/apollo-provider/native';
import { ThemeProvider } from "@src/ui-system/theme/ThemeProvider";
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider pageProps={pageProps}>
      <ThemeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  )
}
