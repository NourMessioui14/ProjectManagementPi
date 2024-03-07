import React, { useContext } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GlobalContext } from '../context/GlobalWrapper';
import { Box, Button, Td, Tr } from '@chakra-ui/react';

function RowTicket({ id, project, typeOfticket, etat, description, responsable}) {
  const { DeleteTicket, onOpen, FindOneProject } = useContext(GlobalContext);

  const handleEditClick = () => {
    FindOneProject(id); // Appeler FindOneProject avec l'ID lors du clic sur le bouton "Edit"
    onOpen();
  };

  return (
    <Tr>
      <Td>{project}</Td>
      <Td>{typeOfticket}</Td>
      <Td>{etat}</Td>
      <Td>{description}</Td>
      <Td>{responsable}</Td>
      <Td> 
        <Box display="flex" gap="1">
          <Button colorScheme="blue" onClick={handleEditClick}>
            <AiFillEdit />
          </Button>
          <Button colorScheme="red" onClick={() => DeleteTicket(id)}>
            <AiFillDelete />
          </Button>
        </Box>
      </Td>
    </Tr>
  );
}

export default RowTicket;
