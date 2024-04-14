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
  Flex
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineSearch, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';
import RowSprint from './RowSprint';
import DrawerFormSprint from './DrawerFormSprint';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';
import Sidebar from '../Sidebar';

function SprintList() {
  const { FetchSprints,sprint, sprints, onOpen, FetchTickets, setShowTickets, showTickets, findTicketsByProjectId } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const [sprintsPerPage] = useState(4);

  useEffect(() => {
    FetchSprints();
  }, []);

  const toggleTickets = (sprintId) => {
    FetchTickets(sprintId);
    setShowTickets(!showTickets);
  };

  const handleShowTickets = async (projectId) => {
    try {
      const tickets = await findTicketsByProjectId(projectId);
      console.log('Tickets for project:', tickets);
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  const filteredSprints = sprints.filter(sprint =>
    sprint.sprintname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    sprint.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // pagination 
  // Index du dernier projet de la page
  const indexOfLastSprint = currentPage * sprintsPerPage;
  // Index du premier projet de la page
  const indexOfFirstSprint = indexOfLastSprint - sprintsPerPage;
  // Projets actuellement affichés sur la page
  const currentSprints = filteredSprints.slice(indexOfFirstSprint, indexOfLastSprint);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <div>
      
     
      <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box display="flex"> {/* Utilisez Box avec display flex pour aligner les composants horizontalement */}
        <Sidebar/>
        <Box flexGrow={1}>
        <Text fontSize="xl" fontWeight="bold">
          List of Sprints
        </Text>
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
          variant="outline"
          maxW={'300px'}
          minW="150px"
          leftIcon={<AiOutlinePlus fontSize={'20px'} />}
          onClick={onOpen}
        >
          Add New Sprint
        </Button>
        </Box>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>sprint Name</Th>
              <Th>Description</Th>
              <Th>start date</Th>
              <Th>end date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
            {sprints
              .filter((sprint) =>
                sprint.sprintname.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(({ _id, sprintname, description, startdate, enddate }) => (
                <RowSprint
                  key={_id}
                  id={_id}
                  sprintname={sprintname}
                  description={description}
                  startdate={startdate}
                  enddate={enddate}
                  onShowTickets={handleShowTickets} 
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent="center" alignItems="center" mt="4">
            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} leftIcon={<AiOutlineArrowLeft />}>
            </Button>
            <Box mx="2" p="2" borderRadius="md" bgColor="teal" color="white">Page {currentPage}</Box>
            <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastSprint >= filteredSprints.length} rightIcon={<AiOutlineArrowRight />}>
            </Button>
          </Flex>
      <DrawerFormSprint />
      </Box>

      </Box>
    </Box>
    </div>
  );
}

export default SprintList;
