import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Box, Heading, Text, Stack, Button, Avatar, Flex, Tabs, TabList, Tab, TabPanels, TabPanel,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter
} from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapper';
import NavbarFront from '../../NavbarFront';

function CustomCard() {
  const { projects, FetchProjects } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [showDescriptionModal, setShowDescriptionModal] = useState(false);
  const [selectedProjectDescription, setSelectedProjectDescription] = useState('');
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [recentProjects, setRecentProjects] = useState([]); // Déclaration de recentProjects

  useEffect(() => {
    FetchProjects();
    const recentProjectIds = JSON.parse(localStorage.getItem('recentProjects')) || [];
    const recentProjectsToShow = projects.filter(project => recentProjectIds.includes(project._id));
    setRecentProjects(recentProjectsToShow);
  }, [FetchProjects, projects]);

  const handleFavoriteProjectClick = (projectId) => {
    navigate(`/details/${projectId}`);
  };

  const handleReadMoreClick = (projectId, description) => {
    setSelectedProjectId(projectId);
    setSelectedProjectDescription(description);
    setShowDescriptionModal(true);
  };

  const handleCloseDescriptionModal = () => {
    setShowDescriptionModal(false);
    setSelectedProjectDescription('');
    setSelectedProjectId('');
  };

  const avatarList = [
    '/logos/camera.png', '/logos/main.png', '/logos/homme.png',
    '/logos/lancproj.png', '/logos/energ.png', '/logos/proj.png',
  ];

  const getAvatar = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash % avatarList.length);
    return avatarList[index];
  };

  return (
    <div>
      <NavbarFront />
      <section className="section" id="blog">
        <div className="container" mt="4">
          <Heading as="h5" size="lg" textAlign="left" mt="10">Your Job :</Heading>
          <Flex justifyContent="flex-end" mt="4">
            <Link to="/ProjectListFront">
              <Button className="main-button" variant="outline" colorScheme="teal">See All Projects</Button> {/* Modifier le style du bouton "See All Projects" */}
            </Link>
          </Flex>
          <Flex flexWrap="wrap" justifyContent="space-between">
            {projects.slice(0, 3).map(project => (
              <Box key={project._id} width={{ base: '100%', sm: '48%', md: '30%' }} mt="4">
                <Box borderWidth="1px" borderRadius="lg" p="4">
                  <Flex align="center">
                    <Avatar src={getAvatar(project._id)} alt="Avatar" size="md" />
                    <Heading size="md" ml="4">{project.projectname}</Heading>
                    {project.isFavorite && (
                      <Box ml="2" color="yellow.400">&#9733;</Box> 
                    )}
                  </Flex>
                  <Text fontWeight="bold">Description:</Text>
                  <Text fontSize="sm">{project.description.length > 80 ? `${project.description.substring(0, 80)}...` : project.description}</Text>
                  {project.description.length > 80 && (
                    <Button onClick={() => handleReadMoreClick(project._id, project.description)} mt="2" colorScheme="blue">Read More ..</Button> 
                  )}
                </Box>
              </Box>
            ))}
          </Flex>
          <Tabs mt="4">
            <TabList>
              <Tab>Favorite Projects</Tab>
              <Tab>Recently Viewed</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Stack mt="4">
                  {projects.filter(project => project.isFavorite).map(project => (
                    <Flex key={project._id} p="2" align="center" onClick={() => handleFavoriteProjectClick(project._id)}>
                      <Box ml="2" color="yellow.400">&#9733;</Box> 
                      <Avatar src={getAvatar(project._id)} alt="Avatar" size="sm" />
                      <Text ml="4" fontSize="sm">{project.projectname}</Text>
                    </Flex>
                  ))}
                </Stack>
              </TabPanel>
              <TabPanel>
                <Stack mt="4">
                  {recentProjects.map(project => (
                    <Flex key={project._id} p="2" align="center">
                      <Avatar src={getAvatar(project._id)} alt="Avatar" size="sm" />
                      <Text ml="4" fontSize="sm">{project.projectname}</Text>
                    </Flex>
                  ))}
                </Stack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </div>
      </section>

      {/* Modal pour afficher la description complète */}
      <Modal isOpen={showDescriptionModal} onClose={handleCloseDescriptionModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Description</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>{selectedProjectDescription}</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={handleCloseDescriptionModal}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}

export default CustomCard;
