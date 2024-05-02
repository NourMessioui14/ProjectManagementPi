import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, Button } from '@chakra-ui/react';
import axios from 'axios';

const TicketModal = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState('');

const createTicketFromDescription = async (description) => {
  try {
    const response = await axios.post('/ticket/create-from-description', { description });
    console.log('New ticket created:', response.data);
    return response.data; // Retournez la réponse complète du backend
  } catch (error) {
    console.error('Error creating ticket:', error.response.data);
    throw error;
  }
};

  

  const handleSave = async () => {
    try {
      const newTicket = await createTicketFromDescription(description);
      onSave(newTicket);
      onClose();
    } catch (error) {
      // Gérer les erreurs ici
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Ticket</ModalHeader>
        <ModalBody>
          <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter ticket description" />
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TicketModal;

export function ticketPrediction() {
  // Contenu de la fonction ticketPrediction
}