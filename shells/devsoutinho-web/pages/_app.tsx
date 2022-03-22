import 'raf/polyfill' // add this at the top
import Head from 'next/head'
// import { MainNavigationMenu } from 'skynexui/patterns/MainNavigationMenu/MainNavigationMenu';
import { SkynexUIProvider } from 'skynexui';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SkynexUIProvider
        useRouterHook={useRouter}
      >
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Component {...pageProps} />
        {/* <MainNavigationMenu /> */}
      </SkynexUIProvider>
    </>
  )
}

export default MyApp
