// ProjectDetailsModal.js
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';

function ProjectDetailsModal({ isOpen, onClose, project }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent borderRadius="md" bg="gray.100">
        <ModalHeader color="teal.500">Project Details</ModalHeader>
        <ModalCloseButton color="teal.500" />
        <ModalBody>
          <Text fontSize="lg" fontWeight="bold">Project Name:</Text>
          <Text>{project.projectname}</Text>
          <Text fontSize="lg" fontWeight="bold">Chef de Projet:</Text>
          <Text>{project.chefdeprojet}</Text>
          <Text fontSize="lg" fontWeight="bold">Description:</Text>
          <Text>{project.description}</Text>
          <Text fontSize="lg" fontWeight="bold">Start Date:</Text>
          <Text>{project.startdate}</Text>
          <Text fontSize="lg" fontWeight="bold">End Date:</Text>
          <Text>{project.enddate}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default ProjectDetailsModal;
