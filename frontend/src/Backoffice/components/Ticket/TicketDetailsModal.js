import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';

function TicketDetailsModal({ isOpen, onClose, ticket }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent borderRadius="md" bg="gray.100">
        <ModalHeader color="teal.500">Details of Ticket</ModalHeader>
        <ModalCloseButton color="teal.500" />
        <ModalBody>
          <Text fontSize="lg" fontWeight="bold">Project:</Text>
          <Text>{ticket.project}</Text>
          <Text fontSize="lg" fontWeight="bold">Sprint:</Text>
          <Text>{ticket.sprint}</Text>
          <Text fontSize="lg" fontWeight="bold">Type Of Ticket:</Text>
          <Text>{ticket.typeOfticket}</Text>
          <Text fontSize="lg" fontWeight="bold">State:</Text>
          <Text>{ticket.etat}</Text>
          <Text fontSize="lg" fontWeight="bold">Description:</Text>
          <Text>{ticket.description}</Text>
          <Text fontSize="lg" fontWeight="bold">Owner:</Text>
          <Text>{ticket.responsable}</Text>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="teal" mr={3} onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TicketDetailsModal;
