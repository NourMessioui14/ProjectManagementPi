import React, { useContext, useState } from 'react';
import { Box, Button, Td, Tr } from '@chakra-ui/react';
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { GlobalContext } from '../../../context/GlobalWrapperRec';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import ReclamationDetails from './ReclamationDetails';

const Row = ({ id, Category, Subject, Description, reponses, fullDescription, Status }) => {
  const { Delete, onOpen, isOpen, onClose, FindOne } = useContext(GlobalContext);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);
 

  const handleDelete = () => {
    const confirmDelete = window.confirm("Would you like to delete this claim?");
    if (confirmDelete) {
      Delete(id);
    }
  };

  let statusColor = '';
  if (Status === 'In Progress') {
    statusColor = 'orange';
  } else if (Status === 'Pending') {
    statusColor = 'red';
  } else {
    statusColor = 'green';
  }

  const isPending = Status === 'Pending';

 

  const handleShowDetails = () => {
   
      setShowDetailsModal(true);
    
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
        <Box style={{ fontSize: '12px' }} color={statusColor}>
          {Status}
        </Box>
      </Td>
      <Td>
        <Box display="flex" gap="1">
          <Button colorScheme='blue' disabled={!isPending}>
            <CiEdit
              onClick={() => {
                onOpen();
                FindOne(id);
              }}
            />
          </Button>
          <Button colorScheme='pink' disabled={!isPending} onClick={handleDelete}>
            <MdDelete />
          </Button>
          <Button colorScheme='gray' onClick={handleShowDetails}>
            <AiOutlineInfoCircle />
          </Button>
        </Box>
        {showDetailsModal && (
          <ReclamationDetails
            isOpen={showDetailsModal}
            onClose={() => setShowDetailsModal(false)}
            reclamation={{ Category, Subject, Description, reponses, Status }}
          />
        )}
      </Td>
    </Tr>
  );
};

export default Row;
