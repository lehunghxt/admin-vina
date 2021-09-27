import Head from "next/head"
import { useState } from "react";
import { GetAccountById, GetUserRoleById } from '@Controller/UserController'
import { GetAllPermissions } from '@Controller/PermissionController'
import { useUser } from "@Provider/UserProvider";
import { Put } from '@Helper/ApiHelper'
import { useRouter } from 'next/router'
import Swal from "sweetalert2";

const User = ({ User, Permissions }) => {
    const router = useRouter()
    const { CurrentUser } = useUser();
    const [user, setUser] = useState(User)
    const [collapse, setCollapse] = useState(false)
    const handleInput = e => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            var res = await Put('/user', { user: { ...user, Permissions: user.Permissions.join(',') } })
            if (res) Swal.fire({
                title: "Thành công",
                icon: "success",
                html: `Cập nhật tài khoản thành công`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            }).then(() => router.back());
            else Swal.fire({
                title: "Thông báo",
                icon: "warning",
                html: `Cập nhật tài khoản thất bại`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });
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
                <title>Sửa tài khoản</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className="card shadow">
                <div className="card-header">
                    <h3>Tạo mới tài khoản</h3>
                </div>
                <div className="card-body" style={{ pointerEvents: CurrentUser.Permissions.includes("edit_account") ? "all" : "none" }}>
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
                                        onChange={handleInput}
                                        readOnly={true}
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
                                        onChange={handleInput}
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
                                        onChange={handleInput}
                                        required
                                    />
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
                                                            <input id={e.Code} onChange={handleInputChange} type="checkbox" value={e.Code} checked={user.Permissions.includes(e.Code)} />
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

export const getServerSideProps = async function ({ req, res, query }) {
    if (!req.session.User.Permissions.includes('edit_account') && !req.session.User.Permissions.includes('grant_permissions')) {
        return {
            redirect: {
                permanent: false,
                destination: "/403",
            }
        }
    }
    const { id } = query;
    const User = await GetAccountById(id);
    User.Permissions = await GetUserRoleById(User.Id);
    const Permissions = await GetAllPermissions();
    return {
        props: { User, Permissions },
    };
};

export default User
