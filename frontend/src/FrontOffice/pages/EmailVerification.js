import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import emailjs from '@emailjs/browser';
import {
  Flex,
  Box,
  Heading,
  Input,
  Button,
  Text,
  Link as ChakraLink,
} from '@chakra-ui/react';

function EmailVerification() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!email) {
        toast.error('Please fill in all the fields');
        return;
      }

      // Fetch data from your API
      const response = await axios.get(`http://localhost:5001/auth/usermail/${email}`);
      const responseData = response.data;

      // For debugging, log the response data
      console.log(responseData);

      // Extract data from the response
      const { name, email: emailFromResponse, Verification, id } = responseData;

      if (email === emailFromResponse) {
        // Prepare email data
        const emailData = {
          to_name: name,
          message: Verification,
          from_name: 'Team-Notify',
          to_email: email, // Dynamically set to the email from the form
        };

        // For debugging, log the email data
        console.log(emailData);

        // Use EmailJS to send the email
        await emailjs.send('service_t20b3rv', 'template_ou1e3gd', emailData, 'Z14sqvbqFSCBB7Khq');

        toast.warn('We have sent you a 4-Digit Verification Number on your given Email');
        navigate(`/NewPassword`);
      } else {
        toast.error('This Email Does not Exist');
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <Flex justify="center" align="center" h="100vh" bg="gray.100">
        <Box p="8" bg="white" rounded="lg" shadow="md">
          <Heading mb="6" color="blue.500" textAlign="center">
            Forget Password
          </Heading>
          <form onSubmit={onSubmit}>
            <Box mb="4">
              <Text mb="1" fontWeight="semibold">
                Email
              </Text>
              <Input
                type="email"
                name="email"
                placeholder="Enter Your email"
                value={email}
                onChange={onEmailChange}
                variant="filled"
                bg="white"
                borderColor="gray.300"
                _hover={{ borderColor: 'blue.500' }}
                _focus={{ borderColor: 'blue.500' }}
              />
            </Box>
            <Button type="submit" colorScheme="blue" width="full">
              Submit
            </Button>
          </form>
          <Text mt="4" textAlign="center" fontSize="sm">
            Don't have an Account?{' '}
            <ChakraLink as={Link} to="/login" color="blue.500">
              SignUp
            </ChakraLink>
          </Text>
          <Text textAlign="center" fontSize="sm">
            <ChakraLink as={Link} to="/login" color="blue.500">
              Back to Login
            </ChakraLink>
          </Text>
        </Box>
      </Flex>
      <ToastContainer />
    </>
  );
}

export default EmailVerification;