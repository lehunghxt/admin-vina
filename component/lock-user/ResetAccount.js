import React from 'react'
import { useState } from "react";
import Swal from "sweetalert2";
import { useUser } from 'Provider/UserProvider';

export default function ResetAccount({ socket }) {
    const { User } = useUser();
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
      socket.emit("lockuser", ({taxcode, User}));
    };
    return (
      <>
        <div className="col-lg-6 mb-4 mt-4">
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
                  required
                />
              </div>
              <button
                type="button"
                className="btn btn-secondary btn-icon-split btn-sm"
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
  