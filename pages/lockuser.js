import Head from "next/head";
import { useState } from "react";
import Swal from "sweetalert2";
import { useSocket } from '../Provider/SocketProvider'
import ChangeData from "@Component/lock-user/ChangeData";
import ResetAccount from "@Component/lock-user/ResetAccount";

function LockUser() {
  const { socket } = useSocket();
  const [tab, setTab] = useState(true);
    if(socket){
        socket.on("error", (error) => {
            Swal.fire({
                title: "Thông báo",
                icon: "warning",
                html: `${(error)}`,
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });
        });
    }
  return (
    <>
      <Head>
        <title>Khóa/Reset tài khoản</title>
        <link rel="icon" href="/logo.ico" />
      </Head>
      <div className="col-md-12">
        {!tab ? (
          <button
            type="button"
            className="btn btn-secondary btn-icon-split btn-sm"
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
            className="btn btn-secondary btn-icon-split btn-sm"
            onClick={() => setTab(!tab)}
          >
            <span className="icon text-white-50">
              <i className="fas fa-arrow-right"></i>
            </span>
            <span className="text">Reset tài khoản khách hàng</span>
          </button>
        )}
      </div>
      {tab ? <ChangeData socket={socket} /> : <ResetAccount socket={socket} />}
    </>
  );
}

export const getServerSideProps = function ({ req, res }) {
  if (!req.session.User.Permissions.split(',').includes('lock_user')) {
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
