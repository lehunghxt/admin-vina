import React from 'react'
import { useState } from "react";
import Swal from "sweetalert2";

export default function ChangeData({ socket }) {
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
      if(taxcode.trim() == ''){
          Swal.fire({
              title: "Thông báo",
              icon: "warning",
              html: `Mã số thuế không được để trống.`,
              confirmButtonColor: "#3085d6",
              confirmButtonText: "Ok",
          })
          return;
      }
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
        <div className="col-lg-6 mb-4 mt-4">
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
                  required
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-icon-split btn-sm mr-3"
                onClick={handleOk}
              >
                <span className="icon text-white-50">
                  <i className="fas fa-arrow-right"></i>
                </span>
                <span className="text">Ok</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-icon-split btn-sm mr-3"
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