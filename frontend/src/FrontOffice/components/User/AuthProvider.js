import React from 'react';
import { Navigate } from 'react-router-dom';

const AuthProvider = ({ isAuthenticated, children }) => {
  // Vérifie si l'utilisateur est authentifié
  if (isAuthenticated) {
    return <>{children}</>;
  } else {
    // Redirige vers la page de connexion si l'utilisateur n'est pas authentifié
    return <Navigate to="/" />;
  }
};

export default AuthProvider;
