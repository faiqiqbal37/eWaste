import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom"; // Import Link from react-router-dom
import "./login.css";
import Navbar from "../../components/navbar"; // Import CSS file for component styling
import axios from "axios";
import { useStoreLogin } from "../../stores/store-login"

const Login = () => {
  const [user, setUser] = useState({ email: "", password: "" });

  const { loggedUser, updateLoggedUser } = useStoreLogin();

  const [loginRole, setLoginRole] = useState(loggedUser.role);

  const handleLogin = async (e) => {
    e.preventDefault();
      let url = "http://127.0.0.1:5000/api/session/login";
      let response = await axios.post(url, user);
      let data = response.data;
      if (Object.keys(data).length > 0) {
        updateLoggedUser(data);
        setLoginRole(data.role);
      }

  };

  if (loginRole === "customer") {
    return <Navigate to="/customer/customerdashboard"></Navigate>;
  } else if (loginRole === "admin") {
    return <Navigate to="/admin/dashboard"></Navigate>;
  } else if(loginRole === "staff"){
    return <Navigate to="/sdashboard"></Navigate>;
  }

  return (
    <div>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              E Waste
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  id="email"
                  type="email"
                  placeholder="email"
                  value={user.email}
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={(e) =>
                    setUser({ ...user, password: e.target.value })
                  }
                  id="password"
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  value={user.password}
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button onClick={handleLogin} className="btn btn-primary">
                  Login
                </button>
                <p>
                  Don't have an account?{" "}
                  <Link
                    to="/registration"
                    className="link link-primary link-hover"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
