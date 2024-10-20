import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/userService";

const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setMessage("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setMessage("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let response = await UserService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert(
        "Login successful! You will now be redirected to the homepage..."
      );
      setCurrentUser(UserService.getCurrentUser());
      console.log("after login:" + setCurrentUser);
      navigate("/");
    } catch (err) {
      setMessage(err.response.data);
    }
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Login</h1>
      {message && <div className="alert alert-danger">{message}</div>}
      <form>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            onChange={handleEmail}
            placeholder="Email"
            name="email"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={handlePassword}
            placeholder="Password"
            name="password"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleLogin}
          className="btn btn-primary w-100"
        >
          Submit to login
        </button>
      </form>
    </div>
  );
};

export default Login;
