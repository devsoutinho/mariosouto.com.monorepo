import 'raf/polyfill' // add this at the top
import Head from 'next/head'
// import { MainNavigationMenu } from 'skynexui/patterns/MainNavigationMenu/MainNavigationMenu';
import { SkynexUIProvider } from 'skynexui';
import { ApolloProvider } from 'external-libs/apollo-provider/native';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <ApolloProvider pageProps={pageProps}>
        <SkynexUIProvider
          useRouterHook={useRouter}
        >
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            {/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
            <script async src="https://www.googletagmanager.com/gtag/js?id=G-6WPRBC2XSW"></script>
            <script dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());

                gtag('config', 'G-6WPRBC2XSW');
              `}}
            />
          </Head>
          <Component {...pageProps} />
          {/* <MainNavigationMenu /> */}
        </SkynexUIProvider>
      </ApolloProvider>
    </>
  )
}

export default MyApp
