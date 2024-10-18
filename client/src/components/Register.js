import React from "react";

const Register = () => {
  return (
    <div>
      <h1>Register</h1>
      <form>
        <input type="text" placeholder="User name" name="username" />
        <br />
        <input type="email" placeholder="Email" name="email" required />
        <br />
        <input type="password" name="password" placeholder="Password" />
        <br />
        <input
          type="password"
          name="confirm_password"
          placeholder="check again password"
        />
        <br />
        <button type="submit">
          <span>Submit to register</span>
        </button>
      </form>
    </div>
  );
};

export default Register;
