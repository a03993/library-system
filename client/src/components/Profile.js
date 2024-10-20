import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UserService from "../services/userService";

const Profile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleChangePassword = async (e) => {
    e.preventDefault();
    const userId = currentUser.user._id;

    try {
      const response = await UserService.changePassword(
        userId,
        currentPassword,
        newPassword
      );
      setCurrentPassword("");
      setNewPassword("");
      UserService.logout();
      navigate("/");
      alert(
        response.data +
          ". You will now be redirected to the homepage and need to login with the new password."
      );
      setCurrentUser(null);
    } catch (error) {
      setMessage(
        error.response.data +
          ". Failed to change the password. Please try again."
      );
    }
  };

  return (
    <div className="container">
      <h2 className="text-center mb-4">User Profile</h2>
      <div className="text-center">
        <p>Name: {currentUser.user.name}</p>
        <p>Email: {currentUser.user.email}</p>
      </div>

      <form onSubmit={handleChangePassword} className="mt-4">
        <div className="mb-3">
          <label htmlFor="currentPassword" className="form-label">
            Current Password
          </label>
          <input
            type="password"
            className="form-control"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="newPassword" className="form-label">
            New Password
          </label>
          <input
            type="password"
            className="form-control"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Change Password
        </button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
};

export default Profile;
