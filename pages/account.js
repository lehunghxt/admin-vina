import Head from "next/head";
import { useState } from 'react'
import { useUser } from '@Provider/UserProvider'
function Account() {
    const { CurrentUser } = useUser();
    const [user, setUser] = useState(CurrentUser)
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
    return (
        <>
            <Head>
                <title>Khóa/Reset tài khoản</title>
                <link rel="icon" href="/logo.ico" />
            </Head>
            <div className="card">
                <div className="card-header">
                    <h5>Thông tin tài khoản</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>
                                <b>Tên đăng nhập</b>
                            </label>
                            <input
                                type="text"
                                name="UserName"
                                id="UserName"
                                className="form-control"
                                value={user.UserName}
                                onInput={handleInput}
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
                                className="form-control"
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
                                className="form-control"
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
                                <input type={hidePass ? "password" : "text"} className="form-control" name="Password" id="Password" value={user.Password} onInput={handleInput} />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button" onClick={() => setHidePass(!hidePass)}>
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
                                <input type={hideConfirmPass ? "password" : "text"} value={user.ConfirmPassword} className="form-control" name="ConfirmPassword" id="ConfirmPassword" onInput={handleInput} />
                                <div className="input-group-append">
                                    <button className="btn btn-primary" type="button" onClick={() => setHideConfirmPass(!hideConfirmPass)}>
                                        <i className={hideConfirmPass ? "fa fa-eye-slash" : "fa fa-eye"}></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-primary">Lưu</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Account
