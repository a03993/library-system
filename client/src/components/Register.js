import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/userService";

const Register = () => {
  const navigate = useNavigate();
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [confirmPassword, setConfirmPassword] = useState("");
  let [message, setMessage] = useState("");

  const handleName = (e) => {
    setName(e.target.value);
    setMessage("");
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setMessage("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setMessage("");
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    setMessage("");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    UserService.register(name, email, password)
      .then(() => {
        window.alert(
          "Registration successful, you will now be redirected to the login page..."
        );
        navigate("/login");
      })
      .catch((err) => {
        setMessage(err.response.data);
        console.log("message" + message);
      });
  };

  return (
    <div className="container">
      <h1 className="text-center mb-4">Register</h1>
      {message && <div className="alert alert-danger">{message}</div>}
      <form>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            User Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={handleName}
            placeholder="Enter your username"
            name="username"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            onChange={handleEmail}
            placeholder="Enter your email"
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
            name="Enter your password"
            placeholder="Password"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirm_password" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            onChange={handleConfirmPassword}
            name="confirm_password"
            placeholder="Check again your password"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleRegister}
          className="btn btn-primary w-100"
        >
          Submit to register
        </button>
      </form>
    </div>
  );
};

export default Register;
