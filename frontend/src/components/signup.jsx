import React, { useState } from "react";
import "./Signup.css";

let registeredUsers = [];

const Signup = ({ setIsSignUp }) => {
  // const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("")

  const handleLogin = () => {
    setIsSignUp(false)
  }

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }
    if (!email.includes("@")|| !email.includes(".")) {
      setMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setMessage("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json()
      setMessage(data.message)
    } catch (err) {
        console.error(err);
      }

    // setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  return (
    <div className="signup-container">
      <h1 className="title">Taskify</h1>
      <h2>Create a new account</h2>
      <p>
        Or <a href="#" onClick={handleLogin}>sign in to your existing account</a>
      </p>

      {/* <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      /> */}

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
      <div>{message}</div>
      <button onClick={handleSignup}>Register</button>
    </div>
  );
};

export default Signup;
