import '../styles/globals.css'

import '../public/asset/vendor/fontawesome-free/css/all.min.css'
import '../public/asset/css/sb-admin-2.min.css'
import Layout from '../component/Layout'
function MyApp({ Component, pageProps }) {
  return <>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>
}

export default MyApp
