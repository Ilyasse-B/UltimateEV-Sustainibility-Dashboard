import React, { useState } from 'react';
import './Dashboard.css';
import logo from './assets/logo.png';
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <img src={logo} alt="UltimateEV Logo" className="navbar-logo" />
          <span className="navbar-school-name">Your School</span>
        </div>

        <div className="navbar-right">
          <button className="profile-button" onClick={toggleDropdown}>
            Profile
            <span className="arrow-down">▼</span>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item">School Profile</button>
              <button className="dropdown-item">Change Password</button>
              <button className="dropdown-item" onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>
      </nav>

      <main className="dashboard-main">
        <h1>Your school's live sustainability statistics</h1>
      </main>
    </div>
  );
}

export default Dashboard;
