import React, { useState } from 'react';
import './AdministratorDashboard.css';
import logo from './assets/logo.svg';
import { useNavigate } from "react-router-dom";

function AdministratorDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard-wrapper">
      <nav className="dashboard-navbar">
        <div className="navbar-left">
          <img src={logo} alt="UltimateEV Logo" className="navbar-logo" />
          <span className="navbar-school-name">Administrator</span>
        </div>
        <div className="navbar-right">
          <button className="profile-button" onClick={toggleDropdown}>
            Profile
            <span className="arrow-down">▼</span>
          </button>
          {dropdownOpen && (
            <div className="dropdown-menu">
              <button className="dropdown-item" onClick={handleLogout}>Log out</button>
            </div>
          )}
        </div>
      </nav>
      <main className="dashboard-main">
        <h1>Admin dashboard</h1>
      </main>
    </div>
  );
}

export default AdministratorDashboard;
