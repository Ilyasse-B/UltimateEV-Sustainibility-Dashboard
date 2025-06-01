import React, { useEffect, useState } from 'react';
import './AdministratorDashboard.css';
import logo from './assets/logo.svg';
import CreateSchool from './CreateSchool';
import { useNavigate } from "react-router-dom";

function AdministratorDashboard() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [showCreateSchool, setShowCreateSchool] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

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

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append('username', formData.username);
    submissionData.append('email', formData.email);
    submissionData.append('password', formData.password);

    const res = await fetch('/api/create_admin.php', {
      method: 'POST',
      body: submissionData
    });
    
    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Invalid JSON response", text);
      alert("Server error");
      return;
    }

    if (data.success) {
      alert("Admin user created successfully");
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } else {
      alert("Failed to create admin: " + (data.error || "Unknown error"));
    }
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
                    <span className={`role-label ${parseInt(user.is_admin) === 1 ? 'admin' : 'user'}`}>
                      {parseInt(user.is_admin) === 1 ? 'Admin' : 'User'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-actions">
          <button className="action-button" onClick={() => setShowCreateSchool(true)}>Create School</button>
          <button className="action-button">Create Trust</button>
        </div>

        <div className="admin-form-container">
          <h2>Create Admin User</h2>
          <input type="text" placeholder="Username" value={formData.username} onChange={e => setFormData({ ...formData, username: e.target.value })} />
          <input type="email" placeholder="Email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} />
          <input type="password" placeholder="Password" value={formData.password} onChange={e => setFormData({ ...formData, password: e.target.value })} />
          <input type="password" placeholder="Confirm Password" value={formData.confirmPassword} onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
          <button className="table-button" onClick={handleSubmit}>Create Admin</button>
        </div>
      </main>
      {showCreateSchool && <CreateSchool onClose={() => setShowCreateSchool(false)} />}
    </div>
  );
}

export default AdministratorDashboard;
