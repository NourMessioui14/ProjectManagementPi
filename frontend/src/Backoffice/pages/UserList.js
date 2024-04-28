import React, { useState, useEffect } from 'react';
import { Table, TableCaption, Thead, Tbody, Tr, Th, Td, Box, Button, Alert, AlertIcon, TableContainer, Tfoot, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Profiler } from 'react';


const UserList = () => {
  const [users, setUsers] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(false); // Nouvel état pour la modalité de confirmation
  const [userToDelete, setUserToDelete] = useState(null); // Nouvel état pour stocker l'ID de l'utilisateur à supprimer


  useEffect(() => {
    fetchUsers();
  }, []);


  const logTimes = (id, phase, actualDuration, baseDuration, startTime, commitTime) => {
    console.table({ id, phase, actualDuration, baseDuration, startTime, commitTime });
  };


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


  const handleDeleteConfirmation = (_id) => {
    setUserToDelete(_id); // Stocker l'ID de l'utilisateur à supprimer
    setDeleteConfirmation(true); // Afficher la modalité de confirmation
  };


  const handleConfirmDelete = async () => {
    await handleDeleteUser(userToDelete); // Supprimer l'utilisateur
    setDeleteConfirmation(false); // Cacher la modalité de confirmation
  };


  const handleCancelDelete = () => {
    setUserToDelete(null); // Réinitialiser l'ID de l'utilisateur à supprimer
    setDeleteConfirmation(false); // Cacher la modalité de confirmation
  };


  return (
    <Profiler id='RegisterForm' onRender={logTimes}>


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
                  <Button colorScheme="red" onClick={() => handleDeleteConfirmation(user._id)}>Delete</Button>
                  <Button colorScheme="teal" onClick={() => handleShowDetails(user)}>Details</Button>
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
              <Button colorScheme="blue" mr={3} onClick={handleCloseDetailsModal}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {/* Modalité de confirmation pour la suppression d'utilisateur */}
      <Modal isOpen={deleteConfirmation} onClose={handleCancelDelete}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirmation</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete this user?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={handleConfirmDelete}>Confirm</Button>
            <Button colorScheme="blue" onClick={handleCancelDelete}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
    </Profiler>
  );
};


export default UserList;
