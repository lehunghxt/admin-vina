import Head from "next/head"
import { useState } from "react";
import { GetAllPermissions } from '@Controller/PermissionController'
import { useUser } from "@Provider/UserProvider";
import { Post } from '@Helper/ApiHelper'
import { useRouter } from 'next/router'
import Swal from "sweetalert2";

const User = ({ Permissions }) => {
    const router = useRouter()
    const { CurrentUser } = useUser();
    const [user, setUser] = useState({ Permissions: Permissions.map(e => e.Code) })
    const [collapse, setCollapse] = useState(false)
    const [hidePass, setHidePass] = useState(true)
    const [hideConfirmPass, setHideConfirmPass] = useState(true)
    const handleInput = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            if (user.Password !== user.ConfirmPassword) {
                Swal.fire({
                    title: "Thông báo",
                    icon: "warning",
                    html: `Xác nhận mật khẩu không đúng`,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                });
                return;
            }
            else {
                var res = await Post('/user', { user: { ...user, Permissions: user.Permissions.join(',') } })
                if (res) Swal.fire({
                    title: "Thành công",
                    icon: "success",
                    html: `Tạo tài khoản thành công`,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                }).then(() => router.back());
                else Swal.fire({
                    title: "Thông báo",
                    icon: "warning",
                    html: `Tạo tài khoản thất bại`,
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "Ok",
                });
            }
        } catch (error) {
            console.log(error)
            Swal.fire({
                title: "Lỗi",
                icon: "error",
                html: `Đã có lỗi xảy ra`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });
        }
    }
    const handleInputChange = e => {
        var code = e.target.value
        var userPermissions;
        if (user.Permissions.some(p => p === code))
            userPermissions = user.Permissions.filter(p => code !== p);
        else userPermissions = [...user.Permissions, code]
        setUser({ ...user, Permissions: userPermissions });
    }
    return (
        <>
            <Head>
                <title>Tạo tài khoản</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="card shadow">
                <div className="card-header">
                    <h3>Tạo mới tài khoản</h3>
                </div>
                <div className="card-body" style={{ pointerEvents: CurrentUser.Permissions.includes("create_account") ? "all" : "none" }}>
                    <form onSubmit={handleSubmit}>
                        <div className='row'>
                            <div className='col-xs-12 col-sm-12 col-md-4'>
                                <div className="form-group">
                                    <label>
                                        <b>Tên đăng nhập</b>
                                    </label>
                                    <input
                                        type="text"
                                        name="UserName"
                                        id="UserName"
                                        className="form-control form-control-sm"
                                        value={user.UserName}
                                        onInput={handleInput}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <b>Họ và tên</b>
                                    </label>
                                    <input
                                        type="text"
                                        name="FullName"
                                        id="FullName"
                                        className="form-control form-control-sm"
                                        value={user.FullName}
                                        onInput={handleInput}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <b>Email</b>
                                    </label>
                                    <input
                                        type="text"
                                        name="Email"
                                        id="Email"
                                        className="form-control form-control-sm"
                                        value={user.Email}
                                        onInput={handleInput}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label>
                                        <b>Mật khẩu</b>
                                    </label>
                                    <div className="input-group">
                                        <input type={hidePass ? "password" : "text"} className="form-control form-control-sm" name="Password" id="Password" value={user.Password} onInput={handleInput} />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary btn-sm" type="button" onClick={() => setHidePass(!hidePass)}>
                                                <i className={hidePass ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label>
                                        <b>Xác nhận mật khẩu</b>
                                    </label>
                                    <div className="input-group">
                                        <input type={hideConfirmPass ? "password" : "text"} value={user.ConfirmPassword} className="form-control form-control-sm" name="ConfirmPassword" id="ConfirmPassword" onInput={handleInput} />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary btn-sm" type="button" onClick={() => setHideConfirmPass(!hideConfirmPass)}>
                                                <i className={hideConfirmPass ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xs-12 col-sm-12 col-md-8" style={{ pointerEvents: CurrentUser.Permissions.includes("grant_permissions") ? "all" : "none" }}>
                                <i className={`d-block pointer ${collapse ? "collapsed" : ""}`} onClick={() => setCollapse(!collapse)}>
                                    <h6 className="m-0 font-weight-bold">Danh sách quyền</h6>
                                </i>
                                <div className={`collapse row ${collapse ? "" : "show"}`}>
                                        {Permissions.map(e =>
                                            <div key={e.Code} className="col-xs-12 col-sm-12 col-md-4">
                                                <table className='table table-sm'>
                                                    <tbody>
                                                        <tr>
                                                            <td className='text-left'>
                                                                <label style={{ cursor:"pointer" }} htmlFor={e.Code}>{e.Description}</label>
                                                            </td>
                                                            <td className='text-right'>
                                                                <input id={e.Code} onChange={handleInputChange} type="checkbox" value={e.Code} />
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        )}
                                </div>
                            </div>
                        </div>
                        <button type="submit" className="btn btn-primary btn-sm mr-2">Lưu</button>
                        <button type="button" className="btn btn-secondary btn-sm" onClick={() => router.back()}>Quay về</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export const getServerSideProps = async function ({ req, res }) {
    if (!req.session.User.Permissions.includes('create_account')) {
        return {
            redirect: {
                permanent: false,
                destination: "/403",
            }
        }
    }
    const Permissions = await GetAllPermissions();
    return {
        props: { Permissions },
    };
};

export default User
