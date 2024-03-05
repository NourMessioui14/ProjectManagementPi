import { Avatar, Box, Button, Td, Tr } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { GlobalContext } from '../context/GlobalWrapper';


function Row ({ id, UserId, Category, Subject, Description })  {
 
 
  const { DeleteRecalamation , onOpen, isOpen, onClose, FindOneRecalamation} = useContext(GlobalContext); 
 

  return (
    <Tr>
         
             
      <Td>{UserId}</Td>
      <Td>{Category}</Td>
      <Td>{Subject}</Td>
      <Td>{Description}</Td>
      <Td> 
        <Box display="flex" gap="1">
          <Button colorScheme='blue'>
            <CiEdit onClick={() => {
              onOpen();
              FindOneRecalamation(id);
            }} 
            />
          </Button>

          
          <Button colorScheme={'red'}  onClick={() => DeleteRecalamation(id)}>
               <MdDelete />
          </Button>
        </Box>
       </Td> 
    </Tr>
  );
};

export default Row;