import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
export default function FormLogin() {
  const [user, setUser] = useState({ username: '', password: '' });
  const router = useRouter();
  const hanleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("/auth/login", {
        username: event.target.username.value,
        password: event.target.password.value,
      })
      .then(function (response) {
        if (response && typeof response.data === 'object') {
          router.push("/");
        }
        else {
          console.log(response.data)
          //alert(response.data)
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleInputChange = (e) => {
    setUser({
      ...user,
      [e.currentTarget.name]: e.currentTarget.value,
    })
  }
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
            value={user.username}
            onInput={(e) => handleInputChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control form-control-user"
            id="password"
            name="password"
            placeholder="Password"
            onInput={(e) => handleInputChange(e)}
            value={user.password}
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
