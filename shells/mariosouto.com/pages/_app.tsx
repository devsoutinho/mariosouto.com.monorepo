import { CSSReset } from "@src/ui-system/theme/CSSReset"
import type { AppProps } from 'next/app'
import { ThemeProvider, DefaultTheme } from 'styled-components'

const theme: DefaultTheme = {
  colors: {
    primary: '#111',
    secondary: '#0070f3',
  },
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
