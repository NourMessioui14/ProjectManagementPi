import React, { useEffect, useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text } from '@chakra-ui/react';

function ReclamationDetails({ isOpen, onClose, reclamation }) {
    const [responseTexts, setResponseTexts] = useState([]); // État pour stocker les textes des réponses

    // Fonction pour récupérer le texte de la réponse par son identifiant
    const getReponseById = async (id) => {
        try {
            const response = await fetch(`/reponses/${id}`);
            const data = await response.json();
            return data.text; // Retourne le texte de la réponse
        } catch (error) {
            console.error('Error fetching response by ID:', error);
            return null;
        }
    };

    // Effet pour charger les textes des réponses lorsque la réclamation change
    useEffect(() => {
        const fetchResponseTexts = async () => {
            const texts = await Promise.all(reclamation.reponses.map(id => getReponseById(id)));
            setResponseTexts(texts);
        };

        fetchResponseTexts();
    }, [reclamation]);

    //console.log(responseTexts); // Affiche les textes des réponses dans la console

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
                    <Text fontSize="lg" fontWeight="bold">Responses:</Text>
                    {responseTexts.length === 0 && (
                     <Text>Aucune réponse</Text>
                            )}
                        {responseTexts.length > 0 && responseTexts.map((text, index) => (
                      <Text key={index}>{text}</Text>
                        ))}

                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='gray' mr={3} onClick={onClose}>Close</Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
}

export default ReclamationDetails;
