import React, { useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { Box, Text, Input, Button, Alert, AlertIcon, Image } from '@chakra-ui/react';

const ChangePass = () => {
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
      setFormData({ newPass: '', confirmNewPass: '' }); // Clear input fields
      setError(''); // Clear any previous errors
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className='row'>

    <Box
      maxW="400px"
      mx="auto"
      mt="50vh"
      transform="translateY(-50%)"
      p="4"
      bg="white"
      borderRadius="md"
      boxShadow="md"
      textAlign="center"
      position="relative"
    >
      <Text fontSize="xl" mb="4">
        Change Password
      </Text>
      <form onSubmit={handleSubmit}>
        <div style={formGroupStyle}>
          <Text>New Password</Text>
          <Input
            type="password"
            name="newPass"
            value={formData.newPass}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        <div style={formGroupStyle}>
          <Text>Confirm New Password</Text>
          <Input
            type="password"
            name="confirmNewPass"
            value={formData.confirmNewPass}
            onChange={handleChange}
            style={inputStyle}
          />
        </div>
        {error && (
          <Alert status="error" mb="4">
            <AlertIcon />
            {error}
          </Alert>
        )}
        {success && (
          <Alert status="success" mb="4">
            <AlertIcon />
            {success}
          </Alert>
        )}
        <Button type="submit" colorScheme="blue" w="100%">
          Change Password
        </Button>
      </form>
    </Box>

    </div>    
  );
};

export default ChangePass;

const formGroupStyle = {
  marginBottom: '20px',
};

const inputStyle = {
  width: '100%',
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ced4da',
  borderRadius: '4px',
};
