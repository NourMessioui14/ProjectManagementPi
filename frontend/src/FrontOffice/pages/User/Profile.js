import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom'; // Importer Link depuis react-router-dom
import { ChakraProvider, Container, FormControl, FormLabel, Input, Button, VStack,Image ,Link as ChakraLink} from '@chakra-ui/react';
import NavbarFront from '../../NavbarFront';

function Profile() {
  const { id } = useParams();
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    adresse: '',
    age: '',
    role: '',
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/auth/user/${id}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5001/auth/users/update/${id}`, userData);
      alert('User updated successfully!');
    } catch (error) {
      console.error('Server error:', error.response.data);
      alert('An error occurred while updating user. Check console for details.');
    }
  };

  return (
    
    <div className='row'>
    <NavbarFront/>
    <Image src="/logos/edit.png" alt="New Pass Image" position="absolute" top="170" left="150px" width="300px" height="300px" />

    <ChakraProvider>
      
      <Container maxW="xl" centerContent marginTop="160px"> {/* Augmentez la valeur de marginTop pour déplacer le formulaire plus bas */}
        <VStack spacing={6}>
          <form onSubmit={handleSubmit}>
            <FormControl id="name" isRequired>
              <FormLabel>Name:</FormLabel>
              <Input type="text" value={userData.name} onChange={handleChange} name="name" />
            </FormControl>

            <FormControl id="email" isRequired>
              <FormLabel>Email:</FormLabel>
              <Input type="email" value={userData.email} onChange={handleChange} name="email" />
            </FormControl>

            <FormControl id="adresse" isRequired>
              <FormLabel>Adresse:</FormLabel>
              <Input type="text" value={userData.adresse} onChange={handleChange} name="adresse" />
            </FormControl>

            <FormControl id="age" isRequired>
              <FormLabel>Age:</FormLabel>
              <Input type="number" value={userData.age} onChange={handleChange} name="age" />
            </FormControl>

            <FormControl id="role" isRequired>
              <FormLabel>Role:</FormLabel>
              <Input type="text" value={userData.role} onChange={handleChange} name="role" />
            </FormControl>

            <Button mt={4} colorScheme="teal" type="submit">
              Update
            </Button>
            <ChakraLink as={Link} to="/userconnected" color="teal.500" _hover={{ color: 'teal.700', textDecoration: 'underline' }}>
              Retour
            </ChakraLink>
          </form>
        </VStack>
      </Container>
      
    </ChakraProvider>
    </div>
  );
}

export default Profile;