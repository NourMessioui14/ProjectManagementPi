import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Card, CardHeader, CardBody, Box, Heading, Text, Stack, StackDivider, Button,
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Avatar, Flex, SimpleGrid
} from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapper';
import NavbarFront from '../../NavbarFront';

function CustomCard() {
  const { projects, FetchProjects } = useContext(GlobalContext);
  const navigate = useNavigate(); // Utilisez useNavigate pour obtenir la fonction de navigation
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [recentProjects, setRecentProjects] = useState([]);

  useEffect(() => {
    FetchProjects();
    const recentProjectIds = JSON.parse(localStorage.getItem('recentProjects')) || [];
    const recentProjectsToShow = projects.filter(project => recentProjectIds.includes(project._id));
    setRecentProjects(recentProjectsToShow);
  }, [FetchProjects, projects]);

  const handleReadMore = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setIsModalOpen(false);
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

  const favoriteProjects = projects.filter(project => project.isFavorite);

  return (
    <div>
      <NavbarFront/>
      <section className="section" id="blog">
        <div className="container" mt="4">
          <Heading as="h5" size="lg" textAlign="left" mt="8">Recent Projects</Heading>
          <Flex justifyContent="flex-end" mt="4">
            <Link to="/ProjectListFront">
              <Button>See All Projects</Button>
            </Link>
          </Flex>
          <Flex flexWrap="wrap" justifyContent="space-between">
            {projects.slice(0, 3).map(project => (
              <Box key={project._id} width={{ base: '100%', sm: '48%', md: '30%' }} mt="4">
                <Card borderWidth="1px" borderRadius="lg" p="4">
                  <CardHeader>
                    <Avatar src={getAvatar(project._id)} alt="Avatar" size="md" />
                    <Heading size="md" ml="4">{project.projectname}</Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Text fontWeight="bold">Description:</Text>
                        <Text fontSize="sm">{project.description.length > 80 ? `${project.description.substring(0, 80)}...` : project.description}</Text>
                        {project.description.length > 80 && (
                          <Button onClick={() => handleReadMore(project)} mt="2">Read More</Button>
                        )}
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </Box>
            ))}
          </Flex>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5}>
            <Box>
              <Heading as="h6" size="md" textAlign="left" mt="4">Favorite Projects</Heading>
              <Stack mt="4">
                {favoriteProjects.map(project => (
                  <Box key={project._id} p="2" onClick={() => navigate(`/details/${project._id}`)}>
                    <Flex align="center">
                      <Avatar src={getAvatar(project._id)} alt="Avatar" size="sm" />
                      <Text ml="4" fontSize="sm">{project.projectname}</Text>
                    </Flex>
                  </Box>
                ))}
              </Stack>
            </Box>
            <Box>
              <Heading as="h6" size="md" textAlign="left" mt="4">Recently Viewed</Heading>
              <Stack mt="4">
                {recentProjects.map(project => (
                  <Box key={project._id} p="2">
                    <Flex align="center">
                      <Avatar src={getAvatar(project._id)} alt="Avatar" size="sm" />
                      <Text ml="4" fontSize="sm">{project.projectname}</Text>
                    </Flex>
                  </Box>
                ))}
              </Stack>
            </Box>
            
            
          </SimpleGrid>
        </div>
      </section>
      
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
