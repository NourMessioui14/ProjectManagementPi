import { Td, Tr, Box, Button } from '@chakra-ui/react'
import React, { useContext } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GlobalContext } from '../context/GlobalWrapper';

function RowTicket({ id, project, typeOfticket, etat, description, responsable}) {
  const { Deleteticket, onOpen, FindOneTicket  } = useContext(GlobalContext);



  const onChangeHandler = () => {
    onOpen(); // Ouvre le formulaire lorsqu'on clique sur l'icône d'édition
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
          <Button colorScheme="blue">
            <AiFillEdit onClick={() => { onOpen();}}/>
          </Button>

          <Button colorScheme="red"  onClick={() => Deleteticket(id)}>
            <AiFillDelete  />
          </Button>
        </Box>
      </Td>
    </Tr>
  )
}

export default RowTicket;
