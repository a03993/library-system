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

  const handleRegister = () => {
    // check password and confirm password
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
      .catch((e) => {
        setMessage(e.response.data);
        console.log("message" + message);
      });
  };

  return (
    <div>
      <h1>Register</h1>
      {message && <div>{message}</div>}
      <form>
        <input
          type="text"
          onChange={handleName}
          placeholder="User name"
          name="username"
          required
        />
        <br />
        <input
          type="email"
          onChange={handleEmail}
          placeholder="Email"
          name="email"
          required
        />
        <br />
        <input
          type="password"
          onChange={handlePassword}
          name="password"
          placeholder="Password"
          required
        />
        <br />
        <input
          type="password"
          onChange={handleConfirmPassword}
          name="confirm_password"
          placeholder="check again password"
          required
        />
        <br />
      </form>
      <button type="submit" onClick={handleRegister}>
        <span>Submit to register</span>
      </button>
    </div>
  );
};

export default Register;
