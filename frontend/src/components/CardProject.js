import React from 'react';
import { Card, CardHeader, CardBody, Box, Heading, Text, Stack, StackDivider, Button, Flex, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Avatar } from '@chakra-ui/react';
import { GlobalContext } from '../context/GlobalWrapper';
import { Link } from 'react-router-dom';

function CustomCard() {
  const { projects, FetchProjects } = React.useContext(GlobalContext);
  const [displayedProjects, setDisplayedProjects] = React.useState([]);
  const [showAllProjects, setShowAllProjects] = React.useState(false);
  const [selectedProject, setSelectedProject] = React.useState(null); // State pour stocker le projet sélectionné
  const [isModalOpen, setIsModalOpen] = React.useState(false); // State pour contrôler l'ouverture de la modale

  React.useEffect(() => {
    FetchProjects();
  }, []);

  React.useEffect(() => {
    if (projects.length > 0) {
      const displayed = showAllProjects ? projects : projects.slice(0, 3); // Afficher uniquement 4 projets
      setDisplayedProjects(displayed);
    }
  }, [projects, showAllProjects]);

  const handleShowAllProjects = () => {
    setShowAllProjects(true);
  };

  const handleReadMore = (project) => {
    setSelectedProject(project); // Mettre à jour le projet sélectionné
    setIsModalOpen(true); // Ouvrir la modale
  };

  const handleCloseModal = () => {
    setSelectedProject(null); // Réinitialiser le projet sélectionné
    setIsModalOpen(false); // Fermer la modale
  };

  
  // Liste des chemins d'avatar disponibles
  const avatarList = [
    '/logos/camera.png',
    '/logos/main.png',
    '/logos/homme.png',
    '/logos/lancproj.png',
    '/logos/energ.png',
    '/logos/proj.png',
  ];

  // Fonction pour générer aléatoirement un chemin d'avatar parmi la liste prédéfinie
  const generateRandomAvatar = () => {
    const randomIndex = Math.floor(Math.random() * avatarList.length);
    return avatarList[randomIndex];
  };

  return (
    <div>
      {/* Vos autres éléments HTML */}
      <section className="section" id="blog">
        <div className="container" mt="4">
          <Heading as="h5" size="lg" textAlign="left" mt="8">Recent Projects</Heading>
          <Flex justifyContent="flex-end" mt="4"> {/* Déplacer le bouton vers la droite */}
            {!showAllProjects && projects.length > 4 && (
              <Link to="/ProjectListFront">
                <Button>See All Projects</Button>
              </Link>
            )}
          </Flex>
          <Flex flexWrap="wrap" justifyContent="space-between">
            {displayedProjects.map(project => (
              <Box key={project._id} width={{ base: '100%', sm: '48%', md: '30%' }} mt="4">
                <Card borderWidth="1px" borderRadius="lg" p="4">
                  <CardHeader>
                    <Avatar src={generateRandomAvatar()} alt="Avatar" size="md" />
                    <Heading size="md">{project.projectname} : </Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Text fontWeight="bold">Description:</Text>
                        <Text pt="2" fontSize="sm">{project.description.length > 80 ? `${project.description.substring(0, 80)}...` : project.description}</Text>
                      </Box>
                      {project.description.length > 80 && (
                        <Button onClick={() => handleReadMore(project)} className="main-button">Read More</Button>
                      )}
                    </Stack>
                  </CardBody>
                </Card>
              </Box>
            ))}
          </Flex>
        </div>
      </section>
      
      {/* Modal pour afficher les détails du projet */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{selectedProject && selectedProject.projectname}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedProject && selectedProject.description}</Text>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleCloseModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CustomCard;
