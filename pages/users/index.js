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
              <button type="button" className="btn btn-primary">
                <i className="fa fa-plus pointer">Tạo mới</i>
              </button>
            </Link>
            : null}
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <div
              id="dataTable_wrapper"
              className="dataTables_wrapper dt-bootstrap4"
            >
              <table
                className="table table-bordered table-sm dataTable"
                id="dataTable"
                width="100%"
                cellSpacing="0"
                role="grid"
                aria-describedby="dataTable_info"
              >
                <thead>
                  <tr role="row">
                    <th
                      className="sorting_asc"
                      tabIndex="0"
                      aria-controls="dataTable"
                      rowSpan="1"
                      colSpan="1"
                      aria-sort="ascending"
                      aria-label="Name: activate to sort column descending"
                    >
                      Họ và tên
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="dataTable"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Position: activate to sort column ascending"
                    >
                      Tên đăng nhập
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="dataTable"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Office: activate to sort column ascending"
                    >
                      Email
                    </th>
                    <th
                      className="sorting"
                      tabIndex="0"
                      aria-controls="dataTable"
                      rowSpan="1"
                      colSpan="1"
                      aria-label="Office: activate to sort column ascending"
                    >
                      Trạng thái
                    </th>
                    <th>Chọn</th>
                  </tr>
                </thead>
                <tbody>
                  {Users && Users.length > 0 ? Users.map((e, index) =>
                    <tr key={e.Id} role="row" className={index % 2 == 0 ? "odd" : "even"}>
                      <td>{e.FullName}</td>
                      <td>{e.UserName}</td>
                      <td>{e.Email}</td>
                      <td>{e.Status === 1 ? "Hoạt động" : "Đã khóa"}</td>
                      <td>{CurrentUser.Permissions.includes("edit_account") || CurrentUser.Permissions.includes("grant_permissions") ?
                        <Link href={`/users/user/${e.Id}`} passHref={true}><i className="fa fa-paint-brush pointer"></i></Link>
                        : null}
                        {e.Status === 1 ? <i className="fa fa-lock pointer" onClick={() => UpdateStatus(e.Id, 2)}></i> : <i className="fa fa-unlock pointer" onClick={() => UpdateStatus(e.Id, 1)}></i>}
                        {CurrentUser.Permissions.includes("delete_account") ? <i className="fa fa-trash pointer" onClick={() => DeleteAccount(e.Id)}></i> : null}
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>
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