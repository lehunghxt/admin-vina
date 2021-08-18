import React from 'react'
import Link from 'next/dist/client/link'
export default function Sidebar() {
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <Link

          href="/" passHref={true}
        >
          <i className="sidebar-brand d-flex align-items-center justify-content-center">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">Admin</div>
          </i>
        </Link>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <Link href="/" passHref={true}>
            <i className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </i>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/users" passHref={true}>
            <i className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Danh sách user</span>
            </i>
          </Link>
        </li>
        <hr className="sidebar-divider" />
      </ul>
    </>
  );
}
