import React from 'react';
import './LoginPage.css';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const username = document.querySelectorAll('.login-input')[0].value;
    const password = document.querySelectorAll('.login-input')[1].value;

    const response = await fetch('/api/login.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (data.success) {
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("isAdmin", data.is_admin ? "true" : "false");
      navigate(data.is_admin ? "/admin-dashboard" : "/dashboard");
    } else {
      alert("Login failed: " + (data.error || "Unknown error"));
    }
  };


  return (
    <div className="login-page-wrapper">
      <div className="login-container">
        <h1 className="login-title">Log in to your Dashboard</h1>
        <p className="login-subtitle">Access your school's EV Charging Sustainability statistics</p>
        <form className="login-form">
          <div>
            <label className="login-label">School / Trust ID:</label>
            <input type="text" className="login-input" />
          </div>
          <div>
            <label className="login-label">Password:</label>
            <input type="password" className="login-input" />
          </div>
          <button type="button" onClick={handleLogin} className="login-button">Log In</button>
          <div className="forgot-password">Forgot your password?</div>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
