import Head from "next/head";
import { useState, useEffect } from "react";
import io from "socket.io-client";
const socket = io();
import Swal from "sweetalert2";

function ChangeData() {
  const [taxcode, setTaxcode] = useState("");
  socket.on("lockcustomer", (taxcode) => {
    Swal.fire({
      title: "Thành công",
      icon: "success",
      html: `Đã thêm mã số thuế ${taxcode} vào danh sách`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    }).then((result) => {
      setTaxcode("");
    });
  });
  const handleOk = () => {
    console.log("Handle ok click !!", taxcode);
    if (!socket) return;
    socket.emit("lockcustomer", taxcode);
  };
  const handleUnlock = () => {
    console.log("Handle Unlock!!", taxcode);
    var res = fetch("/taxcode", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ taxcode: taxcode }),
    })
      .then((res) => {
        if (res.status == 200) {
          Swal.fire({
            title: "Thành công",
            icon: "success",
            html: `Đã mở thành công mã số thuế ${taxcode}`,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then((result) => {
            setTaxcode("");
          });
        } else if (res.status == 202) {
          console.log(res);
          var { message } = res.json();
          Swal.fire({
            title: "Thông báo",
            icon: "warning",
            html: `Không tìm thấy mã số thuế ${taxcode}`,
            confirmButtonColor: "#3085d6",
            confirmButtonText: "Ok",
          }).then((result) => {
            setTaxcode("");
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Lỗi hệ thống",
          icon: "error",
          html: err,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "Ok",
        });
      });
  };
  return (
    <>
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Chuyển dữ liệu khách hàng
            </h6>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>
                <b>Mã số thuế</b>
              </label>
              <input
                type="text"
                name="taxcodeChange"
                id="taxcodeChange"
                className="form-control"
                value={taxcode}
                onChange={(e) => setTaxcode(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-icon-split"
              onClick={handleOk}
            >
              <span className="icon text-white-50">
                <i className="fas fa-arrow-right"></i>
              </span>
              <span className="text">Ok</span>
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-icon-split"
              onClick={handleUnlock}
            >
              <span className="icon text-white-50">
                <i className="fas fa-arrow-right"></i>
              </span>
              <span className="text">Mở khóa</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function ResetAccount() {
  const [taxcode, setTaxcode] = useState("");
  socket.on("lockuser", (taxcode) => {
    Swal.fire({
      title: "Thành công",
      icon: "success",
      html: `Đã thêm mã số thuế ${taxcode} vào danh sách`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    }).then((result) => {
      setTaxcode("");
    });
  });
  const handleResetClick = () => {
    console.log("Handle Reset Clicked");
    if (!socket) return;
    socket.emit("lockuser", taxcode);
  };
  return (
    <>
      <div className="col-lg-6 mb-4">
        <div className="card shadow mb-4">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              Reset tài khoản khách hàng
            </h6>
          </div>
          <div className="card-body">
            <div className="form-group">
              <label>
                <b>Mã số thuế</b>
              </label>
              <input
                type="text"
                name="taxcodeReset"
                id="taxcodeReset"
                className="form-control"
                value={taxcode}
                onChange={(e) => setTaxcode(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-icon-split"
              onClick={handleResetClick}
            >
              <span className="icon text-white-50">
                <i className="fas fa-arrow-right"></i>
              </span>
              <span className="text">Ok</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

function LockUser() {
  const [tab, setTab] = useState(true);
  socket.on("error", (error) => {
    Swal.fire({
      title: "Lỗi hệ thống",
      icon: "error",
      html: `Đã có lỗi xảy ra ${JSON.stringify(error)}`,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Ok",
    });
  });
  return (
    <>
      <Head>
        <title>Lock User</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="col-md-12">
        {!tab ? (
          <button
            type="button"
            className="btn btn-secondary btn-icon-split"
            onClick={() => setTab(!tab)}
          >
            <span className="icon text-white-50">
              <i className="fas fa-arrow-right"></i>
            </span>
            <span className="text">Chuyển dữ liệu khách hàng</span>
          </button>
        ) : (
          <button
            type="button"
            className="btn btn-secondary btn-icon-split"
            onClick={() => setTab(!tab)}
          >
            <span className="icon text-white-50">
              <i className="fas fa-arrow-right"></i>
            </span>
            <span className="text">Reset tài khoản khách hàng</span>
          </button>
        )}
      </div>
      {tab ? <ChangeData /> : <ResetAccount />}
    </>
  );
}

export const getServerSideProps = function ({ req, res }) {
  if (!req.session.User.Roles.includes('khoa_tk')) {
    return {
      redirect: {
        permanent: false,
        destination: "/401",
      }
    }
  }
  return {
    props: {},
  };
};
export default LockUser;
