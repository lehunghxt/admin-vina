import Link from 'next/link'
import { useEffect, useState } from 'react';
import { Get, Patch, Delete } from '@Helper/ApiHelper';
import { useUser } from 'Provider/UserProvider';
import Swal from "sweetalert2";

const ListUser = () => {
  const { CurrentUser } = useUser();
  const [Users, setUsers] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    var data = await Get('/user');
    data && setUsers(data);
  }
  const UpdateStatus = async (id, status) => {
    var res = await Patch('/user', { id, status });
    if (res) Swal.fire({
      title: "Thông báo",
      icon: "warning",
      html: `Cập nhật tài khoản thất bại`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    }).then(() => getData())
    else Swal.fire({
      title: "Thông báo",
      icon: "warning",
      html: `Cập nhật tài khoản thất bại`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    });
  }
  const DeleteAccount = (id) => {
    Swal.fire({
      title: "Thông báo",
      icon: "warning",
      html: `Xóa tài khoản`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    }).then(async result => {
      if (result.isConfirmed) {
        await Delete('/user', { id });
        getData();
      }
    });
  }
  return (
    <>
      <h1 className="h3 mb-2 text-gray-800">Danh sách user</h1>
      <div className="card shadow mb-4">
        <div className="card-header">
          {CurrentUser.Permissions.includes("create_account") ?

            <Link href="/users/user" passHref={true}>
              <button type="button" className="btn btn-primary btn-sm">
                <i className="fa fa-plus pointer"></i>
                Tạo mới
              </button>
            </Link>
            : null}
        </div>
        <div className="card-body">
          <div className="table-responsive">
              <table
                className="table table-bordered table-sm"
                width="100%"
                cellSpacing="0"
                role="grid"
              >
                <thead className='thead-dark'>
                  <tr className='text-center'>
                    <th>Họ và tên</th>
                    <th>Tên đăng nhập</th>
                    <th>Email</th>
                    <th>Trạng thái</th>
                    <th>Chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {Users && Users.length > 0 ? Users.map((e, index) =>
                    <tr key={e.Id} role="row" className={index % 2 == 0 ? "odd" : "even"}>
                      <td>{e.FullName}</td>
                      <td className='text-center'>{e.UserName}</td>
                      <td>{e.Email}</td>
                      <td className='text-center'>{e.Status === 1 ? "Hoạt động" : "Đã khóa"}</td>
                      <td className='d-flex justify-content-center'>
                          {CurrentUser.Permissions.includes("edit_account") || CurrentUser.Permissions.includes("grant_permissions") ?
                            <Link href={`/users/user/${e.Id}`} passHref={true}>
                                <a className='text-warning' title='Edit' >
                                    <i className="fa fa-paint-brush pointer"></i>
                                </a>
                            </Link> 
                            : null}
                        {e.Status === 1 ? 
                            <Link href='#' onClick={() => UpdateStatus(e.Id, 2)}>
                                <a className='text-dark' title='Lock Account' >
                                    <i className="fa fa-lock pointer"></i> 
                                </a>
                            </Link> 
                        : 
                            <Link href='#' onClick={() => UpdateStatus(e.Id, 1)}>
                                <a className='text-success' title='Unlock Account'>
                                    <i title='Unlock Account' className="fa fa-unlock pointer" ></i>
                                </a>
                            </Link> 
                        }
                        {CurrentUser.Permissions.includes("delete_account") ?
                            <Link href='#'onClick={() => DeleteAccount(e.Id)}>
                                <a className='text-danger' title='Delete Account'>
                                    <i className="fa fa-trash pointer" ></i>
                                </a>
                            </Link> 
                        : null}
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
          </div>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = async function ({ req, res }) {
  return {
    props: {},
  };
};

export default ListUser;