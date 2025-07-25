import React, { useState } from "react";
import "./style.css";

export default function Profile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleUpdatePassword = () => {
    if (currentPassword && newPassword) {
      alert(`Password updated from "${currentPassword}" to "${newPassword}"`);
      setCurrentPassword("");
      setNewPassword("");
    } else {
      alert("Please enter both current and new password.");
    }
  };

  return (
    <main className="container">
      <h1>My Profile</h1>
      <section className="profile-card">
        <div className="profile-top">
          <div>
            <h2>John Doe</h2>
            <p className="username">@johndoe</p>
            <p className="email">john.doe@example.com</p>
            <span className="badge">User</span>
          </div>
          <button className="edit-btn">Edit Profile</button>
        </div>

        <div className="info-section">
          <h3>Personal Information</h3>
          <div className="info-grid">
            <div>
              <label>Full Name</label>
              <p>John Doe</p>
            </div>
            <div>
              <label>Email</label>
              <p>john.doe@example.com</p>
            </div>
            <div>
              <label>Username</label>
              <p>@johndoe</p>
            </div>
          </div>
        </div>

        <div className="password-section">
          <h3>Change Password</h3>
          <div className="password-inputs">
            <input
              type="password"
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>
          <button className="update-btn" onClick={handleUpdatePassword}>
            Update Password
          </button>
        </div>
      </section>
    </main>
  );
}
