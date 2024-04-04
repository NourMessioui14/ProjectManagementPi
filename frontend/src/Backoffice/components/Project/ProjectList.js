
import { GlobalContext } from '../../../context/GlobalWrapper';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';
import { useContext, useEffect, useState } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Input, Flex, Center } from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import DrawerForm from './DrawerForm';
import Row from './Row';
import Footer from '../Footer';


function ProjectList() {
  const { FetchProjects, projects, isOpen, onOpen, onClose } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(4);

  useEffect(() => {
    FetchProjects();
  }, []);

  // Filtrer les projets en fonction du terme de recherche
  const filteredProjects = projects.filter(project =>
    project.projectname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
// pagination 
  // Index du dernier projet de la page
  const indexOfLastProject = currentPage * projectsPerPage;
  // Index du premier projet de la page
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  // Projets actuellement affichés sur la page
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box display="flex"> {/* Utilisez Box avec display flex pour aligner les composants horizontalement */}
        <Sidebar/>
        <Box flexGrow={1}> {/* Utilisez Box avec flexGrow pour que le tableau prenne l'espace restant */}
          <Navbar/>
          <Box p="4" display={'flex'} justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" fontWeight="bold">
              List Project
            </Text>
            <Button
              colorScheme="teal"
              variant="outline"
              maxW={'300px'}
              minW="150px"
              leftIcon={<AiOutlinePlus fontSize={'20px'} />}
              onClick={onOpen}
            >
              Add New Project
            </Button>
          </Box>

          {/* Champ de recherche */}
          <Box p="4">
            <Input
              placeholder="Search project"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Avatar</Th>
                  <Th>Project Name</Th>
                  <Th>Chef de projet</Th>
                  <Th>Start Date</Th>
                  <Th>End Date</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {currentProjects.map(({ _id, projectname, chefdeprojet, description, startdate, enddate }) => (
                  <Row
                    key={_id}
                    id={_id}
                    projectname={projectname}
                    chefdeprojet={chefdeprojet}
                    description={description}
                    startdate={startdate}
                    enddate={enddate}
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
          <Flex justifyContent="center" alignItems="center" mt="4">
            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} leftIcon={<AiOutlineArrowLeft />}>
            </Button>
            <Box mx="2" p="2" borderRadius="md" bgColor="teal" color="white">Page {currentPage}</Box>
            <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProject >= filteredProjects.length} rightIcon={<AiOutlineArrowRight />}>
            </Button>
          </Flex>
        </Box>
      </Box>

    

   

    
    
      <DrawerForm />

      <Footer/>

    </Box>

    

  );
}

export default ProjectList;
