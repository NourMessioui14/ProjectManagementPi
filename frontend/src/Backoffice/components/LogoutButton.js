import React from 'react';

const LogoutButton = () => {
  const buttonStyle = {
    padding: '10px 15px',
    color: '#ff69b4',
    // Rose color
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <button style={buttonStyle} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
