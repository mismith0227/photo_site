import Document, { Html, Head, Main, NextScript } from 'next/document'
import { existsGaId, GA_ID } from '../lib/gtag'
import Header from '../components/Header'

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="ja">
        <Head>
          {existsGaId && (
            <>
              <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              />
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', {
                    page_path: window.location.pathname,
                  });`,
                }}
              />
            </>
          )}
        </Head>
        <body>
          <Header />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
