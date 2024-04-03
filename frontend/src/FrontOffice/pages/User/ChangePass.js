import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const ChangePass = () => {
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    newPass: '',
    confirmNewPass: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem('token');
      console.log('Jeton récupéré:', token);

      if (!token) {
        console.error('Aucun jeton trouvé. Veuillez vous connecter.');
        setError('Aucun jeton trouvé. Veuillez vous connecter.');
        setLoading(false);
        return;
      }
      const decodedToken = jwtDecode(token);
      console.log('Contenu du jeton:', decodedToken);

      const response = await axios.patch('/auth/changePass', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSuccess(response.data.message);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        
        <div>
          <label>New Password</label>
          <input
            type="password"
            name="newPass"
            value={formData.newPass}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirmNewPass"
            value={formData.confirmNewPass}
            onChange={handleChange}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePass;
