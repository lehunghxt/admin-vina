import '../styles/globals.css'
import { useRouter } from "next/router";
import '../public/asset/vendor/fontawesome-free/css/all.min.css'
import '../public/asset/css/sb-admin-2.min.css'
import Layout from '../component/Layout'


function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(router.pathname);
  return router.pathname == '/auth/login' ? 
  (<Component {...pageProps} />)
  :
  (<>
    <Layout>
      <Component {...pageProps} />
    </Layout>
  </>)
}

export default MyApp