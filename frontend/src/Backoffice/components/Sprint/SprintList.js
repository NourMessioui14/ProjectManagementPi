import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Input,
  InputGroup,
  InputRightElement,
  Flex,
  Center
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineSearch, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import RowSprint from './RowSprint';
import DrawerFormSprint from './DrawerFormSprint';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';


function SprintList() {
  const { FetchSprints, sprints, onOpen} = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [sprintsPerPage] = useState(5);

  
  useEffect(() => {
    FetchSprints();
  }, []);


  const filteredSprints = sprints.filter(sprint =>
    sprint.project?.projectname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sprint.sprintname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sprint.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  const indexOfLastSprint = currentPage * sprintsPerPage;
  const indexOfFirstSprint = indexOfLastSprint - sprintsPerPage;
  const currentSprints = filteredSprints.slice(indexOfFirstSprint, indexOfLastSprint);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
      
     
      <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box display="flex"> 
        <Sidebar/>
        <Box flexGrow={1}>
          <Box>
          <Navbar/>

        <Text fontSize="xl" fontWeight="bold">
          List of Sprints
        </Text>

        </Box>
        <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
        <InputGroup>
          <Input
            placeholder="Search Sprint"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputRightElement>
            <AiOutlineSearch color="gray.500" />
          </InputRightElement>
        </InputGroup>
        </Box>
        
        <Box>
        <Button
          colorScheme="teal"
          maxW={'300px'}
          minW="150px"
          leftIcon={<AiOutlinePlus fontSize={'20px'} />}
          onClick={onOpen}
        >
          Add New Sprint
        </Button>
        </Box>
        </Box>
        <Box>
      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>sprint Name</Th>
              <Th>Project</Th>
              <Th>Description</Th>
              <Th>start date</Th>
              <Th>end date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {currentSprints.map(({ _id, sprintname,project, description, startdate, enddate }) => (
                <RowSprint
                  key={_id}
                  id={_id}
                  sprintname={sprintname}
                  project={project ? project.projectname : 'Unknown'}
                  description={description}
                  startdate={startdate}
                  enddate={enddate}
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      </Box>
      <Flex justifyContent="center" alignItems="center" mt="4">
            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} leftIcon={<AiOutlineArrowLeft />} mr="2"></Button>
            <Center bg='teal.500' color="white" borderRadius="md" w="30px" h="30px">
              {currentPage}
            </Center>            
            <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastSprint >= filteredSprints.length} rightIcon={<AiOutlineArrowRight />}ml="2"></Button>
      </Flex>


      <DrawerFormSprint />
      </Box>

      </Box>
    </Box>
    </div>
  );
}

export default SprintList;
