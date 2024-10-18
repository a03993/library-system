import React from "react";

const Login = () => {
  return (
    <div>
      <h1>Login</h1>

      <form>
        <input type="email" placeholder="Email" name="email" required />
        <br />
        <input
          type="password"
          placeholder="Password"
          name="password"
          required
        />
        <br />
        <button type="submit">
          <span>Submit to login</span>
        </button>
      </form>
    </div>
  );
};

export default Login;
