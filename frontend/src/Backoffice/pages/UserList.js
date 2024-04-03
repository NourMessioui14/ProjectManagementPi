import React, { useState, useEffect } from 'react';
import { Table, TableCaption, Thead, Tbody, Tr, Th, Td, Box, Button, Alert, AlertIcon, TableContainer, Tfoot, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
<<<<<<< HEAD

=======
<<<<<<< HEAD

=======
import { Link } from 'react-router-dom';
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5001/auth/users');
      if (!response.ok) {
        throw new Error('Error fetching users');
      }
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleDeleteUser = async (_id) => {
    try {
      if (!_id) {
        console.error('Invalid id:', _id);
        return;
      }

      const response = await fetch(`http://localhost:5001/auth/users/${_id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error deleting user');
      }

      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 5000); 

      await fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error.message);
    }
  };

  const handleShowDetails = (user) => {
    setSelectedUser(user);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedUser(null);
  };

  return (
    <Box p={6} borderRadius="lg" boxShadow="md" bg="white">
      <h2>User List</h2>
      <TableContainer>
        <Table variant='striped' colorScheme='teal'>
          <TableCaption>Users</TableCaption>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Email</Th>
              <Th>Address</Th>
              <Th>Age</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((user) => (
              <Tr key={user._id}>
                <Td>{user.name}</Td>
                <Td>{user.email}</Td>
                <Td>{user.address}</Td>
                <Td>{user.age}</Td>
                <Td>{user.role}</Td>
                <Td>
                  <Button colorScheme="red" onClick={() => handleDeleteUser(user._id)}>
                    Delete
                  </Button>
                </Td>
                <Td>
                  <Button colorScheme="teal" onClick={() => handleShowDetails(user)}>
                    Details
                  </Button>
<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

                

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* Affichez l'alerte si showAlert est true */}
      {showAlert && (
        <Alert status="success" variant="solid">
          <AlertIcon />
          User deleted successfully
        </Alert>
      )}
      {/* Afficher la modal de détails si showDetailsModal est true */}
      {selectedUser && (
        <Modal isOpen={showDetailsModal} onClose={handleCloseDetailsModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>User Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <p>Name: {selectedUser.name}</p>
              <p>Email: {selectedUser.email}</p>
              <p>Address: {selectedUser.address}</p>
              <p>Age: {selectedUser.age}</p>
              <p>Role: {selectedUser.role}</p>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleCloseDetailsModal}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Box>
  );
};

export default UserList;
