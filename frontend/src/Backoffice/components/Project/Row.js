// Row.js
import React, { useContext } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineInfoCircle } from "react-icons/ai";
import { Td, Tr, Box, Button, Wrap, WrapItem, Avatar } from '@chakra-ui/react';
import ProjectDetailsModal from './ProjectDetailsModal';
import { GlobalContext } from '../../../context/GlobalWrapper';

function Row({ id, projectname, chefdeprojet, description, startdate, enddate }) {
  const { DeleteProject, isOpen, onOpen, onClose, FindOneProject, project } = useContext(GlobalContext);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);

  // Fonction pour sélectionner le logo en fonction du nom du projet
  const selectLogo = (projectname) => {
    // Ici, vous pouvez ajouter la logique pour sélectionner le logo en fonction du nom du projet
    // Par exemple, si le nom du projet est "Projet A", renvoyer l'URL du logo correspondant
    if (projectname === "Projet A") {
      return "/path/to/logoA.png";
    } else if (projectname === "Projet B") {
      return "/path/to/logoB.png";
    } else {
      // Si le nom du projet ne correspond à aucun cas spécifique, renvoyer un logo par défaut
      return "/path/to/defaultLogo.png";
    }
  };

  const handleEditClick = () => {
    onOpen();
    FindOneProject(id);
  };

  return (
    <Tr>
     
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
