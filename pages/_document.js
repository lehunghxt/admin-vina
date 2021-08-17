import Document, { Head, Main, NextScript } from 'next/document'
import Script from "next/script";
export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
        </Head>
        <body id="page-top">
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}