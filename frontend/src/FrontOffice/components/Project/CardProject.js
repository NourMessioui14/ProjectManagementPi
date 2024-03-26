import React, { useContext, useEffect, useState } from 'react';
import { Card, CardHeader, CardBody, Box, Heading, Text, Stack, StackDivider, Button, Flex } from '@chakra-ui/react';
import { GlobalContext } from '../context/GlobalWrapper';

function CustomCard() {
  const { projects, FetchProjects } = useContext(GlobalContext);
  const [displayedProjects, setDisplayedProjects] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);

  useEffect(() => {
    FetchProjects();
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      const displayed = showAllProjects ? projects : projects.slice(0, 3); // Afficher uniquement 4 projets
      setDisplayedProjects(displayed);
    }
  }, [projects, showAllProjects]);

  const handleShowAllProjects = () => {
    setShowAllProjects(true);
  };

  return (
    <div>
      {/* Vos autres éléments HTML */}
      <section className="section" id="blog">
        <div className="container" mt="4">
          <Heading as="h5" size="lg" textAlign="left" mt="8">Recent Projects</Heading>
          <Flex justifyContent="flex-end" mt="4"> {/* Déplacer le bouton vers la droite */}
            {!showAllProjects && projects.length > 4 && (
              <Button onClick={handleShowAllProjects}>See All Projects</Button>
            )}
          </Flex>
          <Flex flexWrap="wrap" justifyContent="space-between">
            {displayedProjects.map(project => (
              <Box key={project._id} width={{ base: '100%', sm: '48%', md: '30%' }} mt="4">
                <Card borderWidth="1px" borderRadius="lg" p="4">
                  <CardHeader>
                    <Heading size="md">{project.avatar}</Heading>
                    <Heading size="md">{project.projectname} : </Heading>
                  </CardHeader>
                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Text fontWeight="bold">Description:</Text>
                        <Text pt="2" fontSize="sm">{project.description}</Text>
                      </Box>
                      <a href="#" className="main-button">Read More</a>
                    </Stack>
                  </CardBody>
                </Card>
              </Box>
            ))}
          </Flex>
        </div>
      </section>
    </div>
  );
}

export default CustomCard;
