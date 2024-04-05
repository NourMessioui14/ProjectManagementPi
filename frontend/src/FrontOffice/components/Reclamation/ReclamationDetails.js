import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';

function ReclamationDetails({ isOpen, onClose, reclamation }) {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent borderRadius="md" bg="gray.100">
                <ModalHeader color="teal.500">Reclamation Details</ModalHeader>
                <ModalCloseButton color="teal.500" />
                <ModalBody>
                    <Text fontSize="lg" fontWeight="bold">Category:</Text>
                    <Text>{reclamation.Category}</Text>
                    <Text fontSize="lg" fontWeight="bold">Subject:</Text>
                    <Text>{reclamation.Subject}</Text>
                    <Text fontSize="lg" fontWeight="bold">Description:</Text>
                    <Text>{reclamation.Description}</Text>
                    <Text fontSize="lg" fontWeight="bold">Response:</Text>
                    <Text>{reclamation.reponses}</Text>





                    
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='gray' mr={3} onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ReclamationDetails;
