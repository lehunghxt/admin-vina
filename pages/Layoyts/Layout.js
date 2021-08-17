import Image from 'next/image'
import Footer from './Footer'
import Sidebar from './Sidebar'
export default function Layout(props) {
    return (
        <>
        <div id="wrapper">
            <Sidebar/>
            <div id="content-wrapper" className="d-flex flex-column">
                <div id="content">
                    <nav className="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item dropdown no-arrow">
                                <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <span className="mr-2 d-none d-lg-inline text-gray-600 small">Douglas McGee</span>
                                </a>
                               </li>
                        </ul>
                    </nav>
                    <div className="container-fluid">
                        {props.children}
                    </div>
                </div>
                <Footer/>
            </div>
    
        </div>
    </>
    );
  }