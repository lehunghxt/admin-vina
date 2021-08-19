import React from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function FormLogin() {
    const router = useRouter();
    const hanleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/auth/login", {
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then(function (response) {
        if (response) {
          router.push("/");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <form className="user" onSubmit={hanleSubmit}>
        <div className="form-group">
          <input
            type="text"
            className="form-control form-control-user"
            id="username"
            name="username"
            aria-describedby="emailHelp"
            placeholder="Username"
            value="hungadmin"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control form-control-user"
            id="password"
            name="password"
            placeholder="Password"
            value="123456"
          />
        </div>
        <div className="form-group">
          <div className="custom-control custom-checkbox small">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck"
            />
            <label className="custom-control-label" htmlFor="customCheck">
              Remember Me
            </label>
          </div>
        </div>
        <button className="btn btn-primary btn-user btn-block">Login</button>
      </form>
    </>
  );
}
