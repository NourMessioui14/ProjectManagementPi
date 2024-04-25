import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, Textarea, Button } from '@chakra-ui/react';

const TicketModal = ({ isOpen, onClose, onSave }) => {
  const [description, setDescription] = useState('');

  const handleSave = () => {
    onSave(description);
    onClose();
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
