
import React, { useContext, useEffect, useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Checkbox,Input } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { GlobalContext } from '../../../context/GlobalWrapperSprint';
import { v4 as uuidv4 } from 'uuid';

function SelectTicket({ isOpen, onClose, setBoard }) { 
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const {FetchTickets, tickets } = useContext(GlobalContext);
  const [selectedTicket, setSelectedTicket] = useState([]); 
    


  const onSubmit = (data) => {
    onClose(); // Ferme le drawer après la soumission
    const selectedTickets = tickets.filter(ticket => data.tickets.includes(ticket.description));
    
    // Créer de nouvelles cartes à partir des tickets sélectionnés
    const newCards = selectedTickets.map(ticket => ({
        id: uuidv4(), // Utilisation de uuidv4() pour générer l'ID unique
        title: ticket.description, // Utilisez la description du ticket comme titre de la carte
      description: ticket.description, // Utilisez également la description du ticket comme description de la carte
      fromSelection: true // Indique que la carte provient de la sélection de ticket
    }));
    
    // Mettre à jour le tableau Scrum en ajoutant les nouvelles cartes à la colonne "To Do"
    setBoard(prevBoard => {
      const updatedBoard = prevBoard.map(column => {
        if (column.title === 'To Do') {
          return {
            ...column,
            cards: [...column.cards, ...newCards]
          };
        }
        return column;
      });
      return updatedBoard;
    });
    
  };


  useEffect(() => {
    FetchTickets();
  }, []);

  return (

    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent borderRadius="md" bg="gray.100">
        <ModalHeader color="teal.500">Select Tickets</ModalHeader>
        <ModalCloseButton color="teal.500" />
        <ModalBody>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div>

                <div>
                {tickets.map(ticket => (
  <div key={ticket._id}>
    <Checkbox
      value={ticket.description}
      {...register("tickets")}
      isInvalid={errors && errors.tickets}
      onChange={() => setSelectedTicket(ticket)}
    >
      {ticket.description} - Owner: {ticket.responsable.name} - state : {ticket.etat}{/* Assurez-vous que "name" est la propriété que vous souhaitez afficher */}
    </Checkbox>
  </div>
))}
                </div>
              </div>
            </div>
          </form>
        </ModalBody>
        <ModalFooter>
        <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" colorScheme="blue" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  


  );
};

export default SelectTicket;
