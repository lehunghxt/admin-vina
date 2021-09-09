import Document, { Html, Head, Main, NextScript } from 'next/document'
import Script from "next/script";
export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
        </Head>
        <body id="page-top">
          <Main style={{position:"relative"}}/>
          <NextScript />
        </body>
      </Html>
    )
  }
}