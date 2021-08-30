import React from "react";
import Link from "next/link";
import { useUser } from "Provider/UserProvider";
export default function Sidebar() {
  const { User } = useUser();
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
        id="accordionSidebar"
      >
        <Link href="/" passHref={true}>
          <a className="sidebar-brand d-flex align-items-center justify-content-center">
            <div className="sidebar-brand-icon rotate-n-15">
              <i className="fas fa-laugh-wink"></i>
            </div>
            <div className="sidebar-brand-text mx-3">{User.UserName}</div>
          </a>
        </Link>
        <hr className="sidebar-divider my-0" />
        <li className="nav-item">
          <Link href="/" passHref={true}>
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Dashboard</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/users" passHref={true}>
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Danh sách user</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/lockuser" passHref={true}>
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Lock User</span>
            </a>
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/taxreport" passHref={true}>
            <a className="nav-link">
              <i className="fas fa-fw fa-tachometer-alt"></i>
              <span>Báo cáo thuế</span>
            </a>
          </Link>
        </li>
        <hr className="sidebar-divider" />
      </ul>
    </>
  );
}
