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
} from '@chakra-ui/react';
import { FaAt, FaKey } from 'react-icons/fa';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();

  const onChangeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erreur lors de la connexion :', errorData.message);
      } else {
        const responseData = await response.json();
        console.log('Connexion réussie ! Token reçu :', responseData.token);

        // Enregistrez le token dans le localStorage
        localStorage.setItem('token', responseData.token);

        // Redirection vers la page souhaitée après la connexion (par exemple, le tableau de bord)
        navigate('/backoffice');
      }
    } catch (error) {
      console.error('Erreur lors de la requête de connexion :', error);
    }
  };

  return (
    <Container p={4} mt={4}>
      <Flex direction="column" align="center">
        <Heading mb={4}>Login</Heading>
        <Stack spacing={4} width="100%" maxW="400px">
          <form onSubmit={onSubmit}>
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
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={onChangeHandler}
                  placeholder="Enter your password"
                  leftIcon={<FaKey />}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={() => {}}>
                    Show
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack direction="row" justify="space-between" mt={4}>
              <Button type="submit" colorScheme="blue">
                Login
              </Button>
              <Link to="/register">Create an account</Link>
            </Stack>
          </form>
        </Stack>
      </Flex>
    </Container>
  );
}

export default Login;
