// Row.js
import React, { useContext } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineInfoCircle } from "react-icons/ai";
import { GlobalContext } from '../context/GlobalWrapper';
import { Td, Tr, Box, Button, Avatar } from '@chakra-ui/react';
import ProjectDetailsModal from './ProjectDetailsModal';

function Row({ id, projectname, chefdeprojet, description, startdate, enddate }) {
  const { DeleteProject, isOpen, onOpen, onClose, FindOneProject, project } = useContext(GlobalContext);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);

  const handleEditClick = () => {
    onOpen();
    FindOneProject(id);
  };

  return (
    <Tr>
      <Td><Avatar name={projectname} /></Td>
      <Td>{projectname}</Td>
      <Td>{chefdeprojet}</Td>
     
      <Td>{startdate}</Td>
      <Td>{enddate}</Td>
      <Td>
        <Box display="flex" gap="1">
          <Button colorScheme="blue" onClick={handleEditClick}>
            <AiFillEdit />
          </Button>
          <Button colorScheme="red" onClick={() => DeleteProject(id)}>
            <AiFillDelete />
          </Button>
          
          <Button colorScheme="teal" onClick={() => setShowDetailsModal(true)}>
            <AiOutlineInfoCircle />
          </Button>
        
        </Box>
      </Td>
      <ProjectDetailsModal isOpen={showDetailsModal} onClose={() => setShowDetailsModal(false)} project={{ projectname, chefdeprojet, description, startdate, enddate }} />
    </Tr>
  );
}

export default Row;
