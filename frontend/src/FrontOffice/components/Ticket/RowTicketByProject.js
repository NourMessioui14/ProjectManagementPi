// RowTicket.js
import {Box, Button,Td, Tr } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import {AiOutlineInfoCircle } from "react-icons/ai";
import TicketDetailsModal from '../../../Backoffice/components/Ticket/TicketDetailsModal';
import TicketDetailsByProject from './TicketDetailsByProject';
function RowTicketByProject({ id, project, sprint, etat, description, typeOfticket, responsable }) {
 
    const [showDetailsModal, setShowDetailsModal] = useState(false);

  return (
    <Tr>    
      <Td>{typeOfticket}</Td>
      <Td>{etat}</Td>
      <Td>{description}</Td>
      <Td>{responsable}</Td>

      <Td> 
        <Box display="flex" gap="1">
          <Button colorScheme="teal" onClick={() => setShowDetailsModal(true)}>
            <AiOutlineInfoCircle />
          </Button>
        </Box>
      </Td>
      <TicketDetailsByProject isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} ticket={{ id, project, sprint, typeOfticket,etat, description,  responsable }} />


    </Tr>
  );
}

export default RowTicketByProject;
