
import React, { useContext, useEffect, useState } from 'react'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Checkbox,Input } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { GlobalContext } from '../../../context/GlobalWrapperSprint';
import { v4 as uuidv4 } from 'uuid';

function SelectTicket({ isOpen, onClose, setBoard,id }) { 
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const {FetchTickets, tickets,fetchTicketsBySprintId } = useContext(GlobalContext);
  const [selectedTicket, setSelectedTicket] = useState([]); 
    


  const onSubmit = (data) => {
    onClose(); // Ferme le drawer après la soumission
    
    const selectedTickets = tickets.filter(ticket => data.tickets.includes(ticket.description));
    
    // Créer de nouvelles cartes à partir des tickets sélectionnés
    const newCards = selectedTickets.map(ticket => ({
      id: uuidv4(), // Utilisation de uuidv4() pour générer l'ID unique
      title: `${ticket.description} - ${ticket.responsable.name}`, // Concaténation de la description et du nom du responsable
      description: ticket.description, // Utilisez la description du ticket comme description de la carte
      owner: ticket.responsable.name, // Sauvegarde du nom du responsable
      fromSelection: true // Indique que la carte provient de la sélection de ticket
    }));
  
    // Mettre à jour le tableau Scrum en ajoutant les nouvelles cartes à la colonne appropriée
    setBoard(prevBoard => {
      const updatedBoard = prevBoard.map(column => {
        const cardsToAdd = newCards.filter(card => {
          const ticketState = selectedTickets.find(ticket => ticket.description === card.description)?.etat;
          return ticketState === column.title;
        });
  
        return {
          ...column,
          cards: [...column.cards, ...cardsToAdd]
        };
      });
      return updatedBoard;
    });
  };
  


  useEffect(() => {
    if (isOpen && id) { // Si le modal est ouvert et sprintId est défini
      fetchTicketsBySprintId(id); // Fetch les tickets pour le sprint spécifié
    }
  }, [isOpen, id]); // Réagit aux changements de isOpen et sprintId


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
      {ticket.description} - Owner: {ticket.responsable.name}
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
