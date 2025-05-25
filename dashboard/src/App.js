import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './LoginPage';
import Dashboard from './Dashboard';
import AdministratorDashboard from './AdministratorDashboard';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<PrivateRoute>
              <Dashboard />
            </PrivateRoute>} />
        <Route path="/admin-dashboard" element={<PrivateRoute adminOnly={true}>
              <AdministratorDashboard />
            </PrivateRoute>} />
        {/* Default route - redirect to login */}
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
