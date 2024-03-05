import { Td, Tr, Box, Button, Avatar } from '@chakra-ui/react'
import React, { useContext } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GlobalContext } from '../context/GlobalWrapper';

function Row({ id, projectname, chefdeprojet, description, startdate, enddate}) {
  const { Deleteproject,isOpen, onOpen, onClose,FindOneProject  } = useContext(GlobalContext);


  const onChangeHandler = () => {
    onOpen(); // Ouvre le formulaire lorsqu'on clique sur l'icône d'édition
  };

 
  return (
    <Tr>
      <Td> <Avatar name={projectname}></Avatar> </Td>
      <Td>{projectname}</Td>
      <Td>{chefdeprojet}</Td>
      <Td>{description}</Td>
      <Td>{startdate}</Td>
      <Td>{enddate}</Td>

      <Td> 
        <Box display="flex" gap="1">
          <Button colorScheme="blue">
            <AiFillEdit
            onClick={() => {
              onOpen();
              FindOneProject(id);
            }}/>
          </Button>

          <Button colorScheme="red"  onClick={() => Deleteproject(id)}>
            <AiFillDelete  />
          </Button>
        </Box>
      </Td>
    </Tr>
  )
}

export default Row;
