import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children, adminOnly = false }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  if (!isLoggedIn) return <Navigate to="/login" />;

  if (adminOnly && !isAdmin) return <Navigate to="/dashboard" />;

  return children;
}

export default PrivateRoute;
