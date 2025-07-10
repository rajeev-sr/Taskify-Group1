import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';

// Example users for cross-checking (Indian names)
const exampleUsers = [
  { email: 'arjun@india.com', password: 'arjun123' },
  { email: 'priya@india.com', password: 'priya456' },
  { email: 'rahul@india.com', password: 'rahul789' },
];

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    // Check against example users
    const user = exampleUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (user) {
      // Store a fake JWT for testing
      localStorage.setItem('token', 'fake-jwt-token-for-' + user.email);
      window.location.href = '/';
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="login-screen">
      <div className="login-container">
        <h1 className="login-title">Taskify</h1>
        <h2 className="login-subtitle">Sign in to your account</h2>
        <div className="login-register">
          Or <Link to="/signup">register for a new account</Link>
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
