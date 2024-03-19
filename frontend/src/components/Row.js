import React, { useContext } from 'react';
import { AiFillDelete, AiFillEdit, AiOutlineInfoCircle } from "react-icons/ai";
import { GlobalContext } from '../context/GlobalWrapper';
import { Td, Tr, Box, Button, Wrap, WrapItem, Avatar } from '@chakra-ui/react';
import ProjectDetailsModal from './ProjectDetailsModal';

function Row({ id, projectname, chefdeprojet, description, startdate, enddate }) {
  const { DeleteProject, isOpen, onOpen, onClose, FindOneProject, project } = useContext(GlobalContext);
  const [showDetailsModal, setShowDetailsModal] = React.useState(false);

  // Liste des composants Avatar disponibles
  const avatarList = [
    <Avatar src='/logos/camera.png' alt="Avatar 1" size="sm" />,
    <Avatar src="/logos/ours.png" alt="Avatar 2" size="sm" />,
    <Avatar src="/logos/main.png" alt="Avatar 3" size="sm" />,
    <Avatar src="/logos/homme.png" alt="Avatar 4" size="sm" />,
  ];

  // Fonction pour générer aléatoirement un avatar parmi la liste prédéfinie
  const generateRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarList.length);
    return avatarList[randomIndex];
  };

  const handleEditClick = () => {
    onOpen();
    FindOneProject(id);
  };

  return (
    <Tr>
      <Td>
        <Wrap>
          <WrapItem>
            {/* Utilisez la fonction generateRandomAvatar pour afficher l'Avatar */}
            {generateRandomAvatar()}
          </WrapItem>
        </Wrap>
      </Td>
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
