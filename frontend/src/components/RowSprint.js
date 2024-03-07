import { Td, Tr, Box, Button, Avatar } from '@chakra-ui/react'
import React, { useContext } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GlobalContext } from '../context/GlobalWrapper';

function RowSprint({ id, sprintname, description, startdate, enddate}) {
  const { DeleteSprint,isOpen, onOpen, onClose,FindOneSprint  } = useContext(GlobalContext);


  const onChangeHandler = () => {
    onOpen(); // Ouvre le formulaire lorsqu'on clique sur l'icône d'édition
  };

 
  return (
    <Tr>
      <Td>{sprintname}</Td>
      <Td>{description}</Td>
      <Td>{startdate}</Td>
      <Td>{enddate}</Td>

      <Td> 
        <Box display="flex" gap="1">
          <Button colorScheme="blue">
            <AiFillEdit
            onClick={() => {
              onChangeHandler();
              FindOneSprint(id);
            }}/>
          </Button>

          <Button colorScheme="red"  onClick={() => DeleteSprint(id)}>
            <AiFillDelete  />
          </Button>
        </Box>
      </Td>
    </Tr>
  )
}

export default RowSprint;
