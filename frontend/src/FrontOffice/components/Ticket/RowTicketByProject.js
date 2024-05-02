// RowTicket.js
import {Badge, Box, Button,Td, Tooltip, Tr } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import {AiOutlineInfoCircle } from "react-icons/ai";
import TicketDetailsModal from '../../../Backoffice/components/Ticket/TicketDetailsModal';
import TicketDetailsByProject from './TicketDetailsByProject';
function RowTicketByProject({ id, project, sprint, etat, description, typeOfticket, responsable }) {
 
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const getColorForState = (state) => {
      switch (state) {
        case 'To do':
          return 'red';
        case 'In progress':
          return 'blue';
        case 'Done':
          return 'green';
        default:
          return 'gray'; // Couleur par défaut si l'état n'est pas reconnu
      }
    };
  return (
    <Tr>    
      <Td>{typeOfticket}</Td>
      <Td>{description}</Td>
      <Td>{responsable}</Td>
      <Td>
      <Badge colorScheme={getColorForState(etat)}>{etat}</Badge>
      </Td>

      <Td> 
        <Box display="flex" gap="1">
        <Tooltip hasArrow label='Click to Show Details' bg='grey'>
          <Button colorScheme="teal" onClick={() => setShowDetailsModal(true)}>
            <AiOutlineInfoCircle />
          </Button>
          </Tooltip>
        </Box>
      </Td>
      <TicketDetailsByProject isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} ticket={{ id, project, sprint, typeOfticket,etat, description,  responsable }} />


    </Tr>
  );
}

export default RowTicketByProject;
