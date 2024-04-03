<<<<<<< HEAD
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
=======
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
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
        <Box display="flex" gap="1">
          <Button colorScheme='blue'>
            <CiEdit onClick={() => {
              onOpen();
              FindOne(id);
<<<<<<< HEAD
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
   
=======
            }} 
            />
          </Button>

          
          <Button colorScheme={'red'}  onClick={() => Delete(id)}>
               <MdDelete />
          </Button>
        </Box>
       </Td> 
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    </Tr>
  );
};

<<<<<<< HEAD
export default Row;
=======
export default Row;
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
