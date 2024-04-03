import React from 'react';

const LogoutButton = () => {
  const buttonStyle = {
    padding: '10px 15px',
    backgroundColor: '#e74c3c', // Red color
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <button style={buttonStyle} onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
