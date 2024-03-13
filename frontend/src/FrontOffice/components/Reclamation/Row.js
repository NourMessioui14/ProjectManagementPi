import { Avatar, Box, Button, Td, Tr } from '@chakra-ui/react';
import React, { useContext } from 'react'
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { GlobalContext } from '../../../context/GlobalWrapperRec';

const Row = ({ id, UserId, Category, Subject, Description }) => {
 
 
  const { Delete , onOpen, isOpen, onClose, FindOne} = useContext(GlobalContext); 
 

  return (
    <Tr>
         
             
     
      <Td>{Category}</Td>
      <Td>{Subject}</Td>
      <Td> <Box>
                    {Description.length > 25 ? Description.substring(0, 25) + "..." : Description}
                </Box>
        </Td>
      <Td> 
        <Box display="flex" gap="1">
          <Button colorScheme='blue'>
            <CiEdit onClick={() => {
              onOpen();
              FindOne(id);
            }} 
            />
          </Button>

          
          <Button colorScheme={'red'}  onClick={() => Delete(id)}>
               <MdDelete />
          </Button>
        </Box>
       </Td> 
    </Tr>
  );
};

export default Row;