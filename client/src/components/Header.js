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
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Library System
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {!currentUser && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/register">
                      Register
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}
              {currentUser && (
                <>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`/wishlist/${currentUser._id}`}
                    >
                      Wishlist
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to={`/borrowings/${currentUser._id}`}
                    >
                      Borrowing Record
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" onClick={handleLogout} to="/">
                      Logout
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
