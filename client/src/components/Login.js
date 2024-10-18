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

  const handleLogin = async () => {
    try {
      let response = await UserService.login(email, password);
      localStorage.setItem("user", JSON.stringify(response.data));
      window.alert(
        "Login successful! You will now be redirected to the homepage..."
      );
      setCurrentUser(UserService.getCurrentUser());
      console.log("after login:" + setCurrentUser);
      navigate("/");
    } catch (e) {
      setMessage(e.response.data);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      {message && <div>{message}</div>}
      <form>
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
          placeholder="Password"
          name="password"
          required
        />
        <br />
      </form>
      <button type="submit" onClick={handleLogin}>
        <span>Submit to login</span>
      </button>
    </div>
  );
};

export default Login;
