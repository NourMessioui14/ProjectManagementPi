// RowTicket.js
import React, { useContext, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineInfoCircle } from "react-icons/ai";
import { Box, Button, Td, Tr } from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapper';
import TicketDetailsModal from './TicketDetailsModal.js';

function RowTicket({ id, project, sprint, etat, description, typeOfticket, responsable }) {
  const { DeleteTicket, onOpen, FindOneProject } = useContext(GlobalContext);
  const [showDetailsModal, setShowDetailsModal] = useState(false); // État pour afficher ou masquer le modal

  const handleEditClick = () => {
    FindOneProject(id);
    onOpen();
  };

 

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
          <Button colorScheme="teal" onClick={() => setShowDetailsModal(true)}>
            <AiOutlineInfoCircle />
          </Button>
        </Box>
      </Td>
      <TicketDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} ticket={{ id, project, sprint, etat, description, typeOfticket, responsable }} />

    </Tr>
  );
}

export default RowTicket;
