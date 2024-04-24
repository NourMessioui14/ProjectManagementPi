import React, { useContext, useEffect, useState } from 'react'
// import { Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Button } from "@chakra-ui/react";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Checkbox,Input } from '@chakra-ui/react';
import { useForm } from "react-hook-form";
import { GlobalContext } from '../../../context/GlobalWrapperSprint';
import { v4 as uuidv4 } from 'uuid';

function SelectTicket({ isOpen, onClose, board, setBoard }) { // Déstructurez directement les props ici
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { FetchTicketsbyProject,FetchTickets, tickets,AssignTicketsToSprint } = useContext(GlobalContext);
  const [scrum, setScrum] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState([]); 
  const [selectedTickets, setSelectedTickets] = useState([]); 
  const [sprintId, setSprintId] = useState(""); // Assuming you get sprintId from somewhere

  


  const handleTicketSelection = (ticketId) => {
    setSelectedTickets((prevSelectedTickets) =>
      prevSelectedTickets.includes(ticketId)
        ? prevSelectedTickets.filter((id) => id !== ticketId)
        : [...prevSelectedTickets, ticketId]
    );
  };

  


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
    // Call AssignTicketsToSprint with sprintId and selectedTickets
    AssignTicketsToSprint(sprintId, selectedTickets);
  };

  const selectAll = watch('selectAll');

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
              <Input placeholder='Enter project name' />
                {/* <div>
                  <input
                    type="checkbox"
                    value="all"
                    {...register("selectAll")}
                  />
                  <p>Select all</p>
                </div> */}

                <div>
                  {tickets.map(ticket => (
                    <div key={ticket._id}>
                      <Checkbox
                        value={ticket.description}
                        {...register("tickets")}
                        isInvalid={errors && errors.tickets}
                        onChange={() => setSelectedTicket(ticket)}
                        disabled={selectAll === 'all'}
                      >
                        {ticket.description}
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