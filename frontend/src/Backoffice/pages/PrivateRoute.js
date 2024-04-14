import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ element, ...props }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;

  return isAuthenticated ? (
    <Route {...props} element={element} />
  ) : (
    <Navigate to="/" replace />
  );
};

export default PrivateRoute;
