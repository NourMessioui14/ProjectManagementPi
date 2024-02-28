import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Container,
  Flex,
  Heading,
  Stack,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
  Select,
} from '@chakra-ui/react';
import { FaUser, FaAddressCard, FaCalendar, FaAt, FaKey } from 'react-icons/fa';
import { Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';




function Register() {
  const [form, setForm] = useState({
    name: '',
    adresse: '',
    age: new Date(), // Utilisez une date par défaut ou une date d'anniversaire par exemple
    email: '',
    password: '',
    role:'',
  });

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Added state for password visibility
  const [successMessage, setSuccessMessage] = useState('');


  

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onAgeChange = (date) => {
    setForm({
      ...form,
      age: date,
    });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    form.age = parseInt(form.age, 10);
  
    try {
      const response = await fetch('http://localhost:3000/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur lors de l\'inscription :', errorData.message);
        setSuccessMessage('');
      } else {
        const responseData = await response.json();
        console.log('Inscription réussie ! Token reçu :', responseData.token);
  
        // Stocker le token dans le localStorage
        localStorage.setItem('token', responseData.token);
  
        setSuccessMessage('Inscription réussie !');
        navigate('/login');
      }
    } catch (error) {
      console.error('Erreur lors de la requête d\'inscription :', error);
      setSuccessMessage('');
    }
  };
  

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  return (
    <Container p={4} mt={4}>
      <Flex direction="column" align="center">
        <Heading mb={4}>Register</Heading>
        <Stack spacing={4} width="100%" maxW="400px">
        {successMessage && (
            <Alert status="success">
              <AlertIcon />
              {successMessage}
            </Alert>
          )}

          <form onSubmit={onSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={onChangeHandler}
                  placeholder="Enter your name"
                  leftIcon={<FaUser />}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Adresse</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  name="adresse"
                  value={form.adresse}
                  onChange={onChangeHandler}
                  placeholder="Enter your address"
                  leftIcon={<FaAddressCard />}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
  <FormLabel>Age</FormLabel>
  <InputGroup>
    {/* Utilisation du composant Select pour la sélection de l'âge */}
    <Select
      name="age"
      value={form.age}
      onChange={onChangeHandler}
      placeholder="Select your age"
    >
      {/* Génération de la liste d'âges de 18 à 65 ans */}
      {Array.from({ length: 48 }, (_, index) => (
        <option key={index + 18} value={index + 18}>
          {index + 18}
        </option>
      ))}
    </Select>
  </InputGroup>
</FormControl>





            <FormControl>
              <FormLabel>Email</FormLabel>
              <InputGroup>
                <Input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={onChangeHandler}
                  placeholder="Enter your email"
                  leftIcon={<FaAt />}
                />
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? 'text' : 'password'} // Toggle visibility based on showPassword state
                  name="password"
                  value={form.password}
                  onChange={onChangeHandler}
                  placeholder="Enter your password"
                  leftIcon={<FaKey />}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <FormControl>
              <FormLabel>Role</FormLabel>
              <Select
                name="role"
                value={form.role}
                onChange={onChangeHandler}
                placeholder="Select a role"
              >
                <option value="admin">Admin</option>
                <option value="scrum_master">Scrum Master</option>
                <option value="product_owner">Product Owner</option>
                <option value="simple_user">Simple User</option>
              </Select>
            </FormControl>

            <Stack direction="row" justify="space-between" mt={4}>
              <Button type="submit" colorScheme="blue">
                Save
              </Button>
              <Link to="/login">I have an account</Link>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Container>
  );
}

export default Register;
