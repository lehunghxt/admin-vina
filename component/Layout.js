import { useState } from 'react'
import Link from 'next/link'
import Footer from './Footer'
import Sidebar from './Sidebar'
import { useRouter } from 'next/router';
import { useUser } from '../Provider/UserProvider';
import { Delete } from '@Helper/ApiHelper'

export default function Layout({ children }) {
    const [toggle, setToggle] = useState(false)
    const { CurrentUser } = useUser();
    const Router = useRouter();
    const Logout = async () => {
        await Delete('/auth');
        Router.push('/auth')
    }
    return Router.pathname === '/auth' ? (
        <>{children}</>
    ) : (
        <>
            <div id="wrapper">
                <Sidebar User={CurrentUser} />
                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item dropdown no-arrow">
                                    <a className={`nav-link dropdown-toggle ${toggle ? "show" : ""}`} href="/#" onClick={() => setToggle(!toggle)}>
                                        <span className="mr-2 d-none d-lg-inline text-gray-600 small">{CurrentUser.UserName}</span>
                                    </a>
                                    <div className={`dropdown-menu dropdown-menu-right shadow animated--grow-in ${toggle ? "show" : ""}`} aria-labelledby="userDropdown">
                                        {/* <Link href="/" passHref={true}>
                                            <a className="dropdown-item" href="#">
                                                <i className="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                                Tài khoản
                                            </a>
                                        </Link> */}
                                        <div className="dropdown-divider"></div>
                                        <a onClick={Logout} className="dropdown-item" href="/#" data-toggle="modal" data-target="#logoutModal">
                                            <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Đăng xuất
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </nav>
                        <div className="container-fluid">
                            {children}
                        </div>
                    </div>
                    <Footer />
                </div>
            </div>
        </>
    );
}