import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';

const PrivateRoute = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem('isAuthenticated'));

  if (!isAuthenticated) {
    toast.error('You must be logged in to access this page');
    return <Navigate to="/login" />;
  }

  return <Outlet />;
};

export default PrivateRoute;
