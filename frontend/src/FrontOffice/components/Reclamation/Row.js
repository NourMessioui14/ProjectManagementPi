import React, { useContext, useState } from 'react';
import { Box, Button, Td, Tr } from '@chakra-ui/react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { GlobalContext } from '../../../context/GlobalWrapperRec';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import ReclamationDetails from './ReclamationDetails';

const Row = ({ id, Category, Subject, Description , reponses , fullDescription }) => {
  const { Delete, onOpen, isOpen, onClose, FindOne } = useContext(GlobalContext);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
 
 
 

  const handleDelete = () => {
    const confirmDelete = window.confirm("Voulez-vous effacer cette réclamation ?");
    if (confirmDelete) {
      Delete(id);
    }
  };




  return (
    <Tr>
      <Td>{Category}</Td>
      <Td>{Subject}</Td>
      
      <Td>
        <Box>
          {Description.length > 25 ? Description.substring(0, 25) + "..." : Description}
        </Box>
      </Td>
      <Td>
        <Box display="flex" gap="1">
          <Button colorScheme='blue'>
            <CiEdit onClick={() => {
              onOpen();
              FindOne(id);
            }} />
          </Button>
          <Button colorScheme='pink' onClick={handleDelete}>
            <MdDelete />
          </Button>


          
          <Button c colorScheme='gray' onClick={() => setShowDetailsModal(true)}>
            <AiOutlineInfoCircle />
          </Button>
        
        </Box>
      </Td>
      <ReclamationDetails isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} reclamation={{ Category, Subject, Description, reponses}} />
   
    </Tr>
  );
};

export default Row;