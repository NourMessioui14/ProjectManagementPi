// TicketDetailsModal.js
import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button } from '@chakra-ui/react';

function TicketDetailsModal({ isOpen, onClose, ticket }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Details of Ticket</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <p>Project: {ticket.project}</p>
          <p>Sprint: {ticket.sprint}</p>
          <p>Type Of Ticket: {ticket.typeOfticket}</p>
          <p>State: {ticket.etat}</p>
          <p>Description: {ticket.description}</p>
          <p>Owner: {ticket.responsable}</p>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TicketDetailsModal;
