import React, { useState } from 'react';
import './CreateSchool.css';

const CreateSchool = ({ onClose }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    school_name: ''
  });

  const handleSubmit = async () => {
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append('username', formData.username);
    submissionData.append('email', formData.email);
    submissionData.append('password', formData.password);
    submissionData.append('school_name', formData.school_name);
    if (formData.logo) {
      submissionData.append('logo', formData.logo);
    }

    const res = await fetch('/api/create_school_user.php', {
      method: 'POST',
      body: submissionData
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      alert("Invalid server response");
      return;
    }

    if (data.success) {
      alert("School user created!");
      onClose();
    } else {
      alert("Failed to create school: " + (data.error || "Unknown error"));
    }
  };

  return (
    <div className="overlay" onClick={onClose}>
      <div className="overlay-box" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>X</button>
        <h2>Enter School Details:</h2>
        <input type="text" placeholder="Username" onChange={e => setFormData({ ...formData, username: e.target.value })} />
        <input type="email" placeholder="Email" onChange={e => setFormData({ ...formData, email: e.target.value })} />
        <input type="password" placeholder="Password" onChange={e => setFormData({ ...formData, password: e.target.value })} />
        <input type="password" placeholder="Confirm Password" onChange={e => setFormData({ ...formData, confirmPassword: e.target.value })} />
        <input type="text" placeholder="School Name" onChange={e => setFormData({ ...formData, school_name: e.target.value })} />
        <input type="file" accept="image/*" onChange={e => setFormData({ ...formData, logo: e.target.files[0] })} />
        <button className="submit-button" onClick={handleSubmit}>Create School</button>
      </div>
    </div>
  );
};

export default CreateSchool;
