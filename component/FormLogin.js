import React, { useState } from "react";
import { Post } from '@Helper/ApiHelper'
import { useRouter } from "next/router";
export default function FormLogin() {
  const [user, setUser] = useState({ username: '', password: '' });
  const router = useRouter();
  const hanleSubmit = async (event) => {
    event.preventDefault();
    var res = await Post("/auth", {
      username: user.username,
      password: user.password,
    });
    if (res) return router.push('/');
    alert('Wrong Username or Password');
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
