import React from "react";
import { Link } from "react-router-dom";
import UserService from "../services/userService";

const Header = ({ currentUser, setCurrentUser }) => {
  const handleLogout = () => {
    UserService.logout();
    window.alert(
      "Logout successful! You will now be redirected to the homepage..."
    );
    setCurrentUser(null);
    console.log(currentUser);
  };
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        {!currentUser && <Link to="register">Register</Link>}
        {!currentUser && <Link to="login">Login</Link>}
        {currentUser && (
          <Link onClick={handleLogout} to="/">
            Logout
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
