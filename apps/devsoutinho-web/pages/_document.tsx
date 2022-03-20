import { Children } from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { AppRegistry } from 'react-native';
import config from '../app.json';
import { ServerStyleSheet } from 'styled-components'

// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = ``;

export default class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      AppRegistry.registerComponent(config.name, () => Main);
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        })

      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }

  }

  render() {
    return (
      <Html style={{ height: '100%' }}>
        <Head />
        <body style={{ height: '100%', overflow: 'hidden' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
