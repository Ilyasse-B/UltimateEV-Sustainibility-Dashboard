import React, { useEffect, useState } from 'react';
import './AdministratorDashboard.css';
import logo from './assets/logo.svg';
import { useNavigate } from "react-router-dom";

function AdministratorDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  useEffect(() => {
    fetch('/api/get_users.php')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error("Failed to fetch users", err));
  }, []);

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
        <div className="admin-table-container">
          <h2>Manage Users</h2>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th></th>
                <th>School / Trust</th>
                <th></th>
                <th>Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td><button className="table-button">Manage User</button></td>
                  <td>{user.entity_name}</td>
                  <td>
                    <button className="table-button">
                      {user.entity_type === "Trust" ? "Manage Trust" : "Manage School"}
                    </button>
                  </td>
                  <td>
                    <span className={`role-label ${user.is_admin ? 'admin' : 'user'}`}>
                      {user.is_admin ? 'Admin' : 'User'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}

export default AdministratorDashboard;
