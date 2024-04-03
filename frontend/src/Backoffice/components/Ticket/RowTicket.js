// RowTicket.js
import React, { useContext, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineInfoCircle } from "react-icons/ai";
import { Box, Button, Td, Tr } from '@chakra-ui/react';
<<<<<<< HEAD
import TicketDetailsModal from './TicketDetailsModal'; // Importez le composant du modal
import { GlobalContext } from '../../../context/GlobalWrapper';
=======
import { GlobalContext } from '../../../context/GlobalWrapper';
import TicketDetailsModal from './TicketDetailsModal.js';
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920

function RowTicket({ id, project, sprint, etat, description, typeOfticket, responsable }) {
  const { DeleteTicket, onOpen, FindOneProject } = useContext(GlobalContext);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // État pour afficher ou masquer le modal

  const handleEditClick = () => {
    FindOneProject(id);
    onOpen();
  };

<<<<<<< HEAD
  const handleInfoClick = () => {
    setShowDetailsModal(true);
  };
=======
 
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920

  return (
    <Tr>
      <Td>{project}</Td>
      <Td>{sprint}</Td>
      <Td>{etat}</Td>
      <Td>{responsable}</Td>
      <Td> 
        <Box display="flex" gap="1">
          <Button colorScheme="blue" onClick={handleEditClick}>
            <AiFillEdit />
          </Button>
          <Button colorScheme="red" onClick={() => DeleteTicket(id)}>
            <AiFillDelete />
          </Button>
<<<<<<< HEAD
          <Button colorScheme="teal" onClick={handleInfoClick}>
=======
          <Button colorScheme="teal" onClick={() => setShowDetailsModal(true)}>
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
            <AiOutlineInfoCircle />
          </Button>
        </Box>
      </Td>
      <TicketDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} ticket={{ id, project, sprint, etat, description, typeOfticket, responsable }} />
<<<<<<< HEAD
=======

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
    </Tr>
  );
}

export default RowTicket;
