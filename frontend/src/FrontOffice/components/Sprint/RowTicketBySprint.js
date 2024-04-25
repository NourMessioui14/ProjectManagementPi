// RowTicket.js
import React, { useContext, useState } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineInfoCircle } from "react-icons/ai";
import { Box, Button, Td, Tr } from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';

function RowTicketBySprint({ id, project, sprint, etat, description, typeOfticket, responsable }) {
  const { DeleteTicket, onOpen, FindOneProject } = useContext(GlobalContext);
 

  return (
    <Tr>    
      <Td>{typeOfticket}</Td>
      <Td>{etat}</Td>
      <Td>{description}</Td>
      <Td>{responsable}</Td>

    </Tr>
  );
}

export default RowTicketBySprint;
