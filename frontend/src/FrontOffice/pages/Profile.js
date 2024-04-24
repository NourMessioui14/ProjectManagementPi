import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Profile({ userId }) {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    adresse: '',
    age: '',
    password: '',
    role: ''
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/auth/users/update/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5001/auth/users/update/${userId}`, userData);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Error updating user:', error);
      alert('An error occurred while updating user.');
    }
  };

  return (
    <div style={containerStyle}>
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <label>Name:</label>
          <input type="text" name="name" value={userData.name} onChange={handleChange} />
        </div>
        <div style={formGroupStyle}>
          <label>Email:</label>
          <input type="email" name="email" value={userData.email} onChange={handleChange} />
        </div>
        <div style={formGroupStyle}>
          <label>Adresse:</label>
          <input type="text" name="adresse" value={userData.adresse} onChange={handleChange} />
        </div>
        <div style={formGroupStyle}>
          <label>Age:</label>
          <input type="number" name="age" value={userData.age} onChange={handleChange} />
        </div>
        <div style={formGroupStyle}>
          <label>Password:</label>
          <input type="password" name="password" value={userData.password} onChange={handleChange} />
        </div>
        <div style={formGroupStyle}>
          <label>Role:</label>
          <input type="text" name="role" value={userData.role} onChange={handleChange} />
        </div>
        <button type="submit" style={buttonStyle}>Submit</button>
      </form>
    </div>
  );
}

const containerStyle = {
  maxWidth: '400px',
  margin: '0 auto',
  padding: '20px',
  backgroundColor: '#f8f9fa',
  borderRadius: '8px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  bottom: '50px',
  left: '50%',
  transform: 'translateX(-50%)',
};

const formGroupStyle = {
  marginBottom: '20px',
};

const buttonStyle = {
  display: 'block',
  width: '100%',
  padding: '10px',
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '16px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Profile;
