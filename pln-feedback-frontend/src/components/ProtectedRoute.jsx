import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
  
  if (!isLoggedIn) {
    // Redirect ke login jika belum login
    return <Navigate to="/admin/login" replace />;
  }
  
  // Render halaman admin jika sudah login
  return children;
};

export default ProtectedRoute;