import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

// Example users for cross-checking (Indian names)
// const exampleUsers = [
//   { email: 'arjun@india.com', password: 'arjun123' },
//   { email: 'priya@india.com', password: 'priya456' },
//   { email: 'rahul@india.com', password: 'rahul789' },
// ];


const Login = ({ setIsLoggedIn, setIsSignUp, setUserID }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');


  const handleSignup = () => {
    setIsSignUp(true)
  }


  const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');

  try {
    const response = await fetch('http://localhost:8000/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.message === "Success") {
      setUserID(data.userID)
      setIsLoggedIn(true);
    } else {
      setError(data.message || 'Login failed');
    }
  } catch (err) {
    console.error(err);
    setError('Something went wrong. Try again later.');
  }
};


  return (
    <div className="login-screen">
      <div className="login-container">
        <h1 className="login-title">Taskify</h1>
        <h2 className="login-subtitle">Sign in to your account</h2>
        <div className="login-register">
          Or <a href='#' onClick={handleSignup}>register for a new account</a>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="login-options">
            <label>
              <input
                type="checkbox"
                checked={remember}
                onChange={() => setRemember(!remember)}
              />
              Remember me
            </label>
            <Link className="forgot-link" to="/forgot-password">Forgot your password?</Link>
          </div>
          <button type="submit">Sign in</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Login;
