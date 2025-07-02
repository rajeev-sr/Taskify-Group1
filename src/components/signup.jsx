import React, { useState } from "react";
import "./Signup.css";

let registeredUsers = [];

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (!email.includes("@")|| !email.includes(".")) {
    alert("Please enter a valid email address.");
    return;
  }
    if (password.length < 6) {
    alert("Password must be at least 6 characters long.");
    return;
  }
    const user = { username, email, password };
    registeredUsers.push(user); 
    console.log("Registered Users:", registeredUsers);

    alert("User registered successfully!");

    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="signup-container">
      <h1 className="title">Taskify</h1>
      <h2>Create a new account</h2>
      <p>
        Or <a href="#">sign in to your existing account</a>
      </p>

      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button onClick={handleSignup}>Register</button>
    </div>
  );
};

export default Signup;
