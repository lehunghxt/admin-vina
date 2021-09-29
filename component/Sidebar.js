import React from "react";
import Link from "next/link";
export default function Sidebar({ User }) {
  const pages = [
    { id: 1, href: "/", icon: "fas fa-fw fa-tachometer-alt", title: "Trang chủ", perr: [] },
    { id: 2, href: "/users", icon: "fa fa-users", title: "Danh sách tài khoản", perr: ["create_account", "grant_permissions", "edit_account"] },
    { id: 3, href: "/lockuser", icon: "fa fa-lock", title: "Khóa/Reset khách hàng", perr: ["lock_user"] },
    { id: 4, href: "/taxreport", icon: "fa fa-book", title: "Báo cáo thuế", perr: ["hn_report"] },
    { id: 5, href: "/log", icon: "fa fa-history", title: "Xem lịch sử", perr: [] },
  ]
  return (
    <>
      <ul
        className="navbar-nav bg-gradient-dark sidebar sidebar-dark accordion"
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
        {pages.map(e => (e.perr.some(p => User.Permissions.includes(p)) || e.perr.length < 1) ?
          <li className="nav-item" key={e.id}>
            <Link href={e.href} passHref={false}>
              <a className="nav-link">
                <i className={e.icon}></i>
                <span>{e.title}</span>
              </a>
            </Link>
          </li> : <></>
        )}
        <hr className="sidebar-divider" />
      </ul>
    </>
  );
}
