import Head from "next/head";
import FormLogin from "../../component/FormLogin";
export default function Login() {
    return (
        <div>
            <Head>
                <title>Login Page</title>
                <link rel="icon" href="/logo.ico" />
            </Head>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-10">
                        <div className="card o-hidden border-0 shadow-lg my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-6 d-none d-lg-block bg-login-image" style={{ backgroundRepeat: "no-repeat", backgroundSize: "80% 50%" }}></div>
                                    <div className="col-lg-6">
                                        <div className="p-5">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">SmartVas - Admin</h1>
                                            </div>
                                            <FormLogin />
                                            <hr />
                                            <div className="text-center">
                                                <a className="small" href="forgot-password.html">Forgot Password?</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export const getStaticProps = async () => {
    return {
        props: {}
    }
}