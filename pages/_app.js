import "../styles/globals.css";
import { useRouter } from "next/router";
import "../public/asset/vendor/fontawesome-free/css/all.min.css";
import "../public/asset/css/sb-admin-2.min.css";
import Layout from "../component/Layout";
import UserProvider from "../Provider/UserProvider";
import SocketProvider from "../Provider/SocketProvider";
import LoadingProvider from "../Provider/LoadingProvider";


function MyApp({ Component, pageProps, User }) {
  const router = useRouter();
  return router.pathname == "/auth" ? (
    <Component {...pageProps} />
  ) : (
    <>
      <LoadingProvider>
        <UserProvider User={User}>
          <SocketProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SocketProvider>
        </UserProvider>
      </LoadingProvider>
    </>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};
  const { req, res } = ctx;
  if (Component.getInitialProps)
    pageProps = await Component.getInitialProps(ctx);
  if (ctx.req && ctx.req.session && ctx.req.url !== "/auth") {
    let { User } = ctx.req.session;
    if (User) {
      return {
        pageProps,
        User,
      };
    } else if (res) {
      res.writeHead(307, { Location: "/auth" });
      res.end();
    }
  }
  return { pageProps };
};

export default MyApp;
