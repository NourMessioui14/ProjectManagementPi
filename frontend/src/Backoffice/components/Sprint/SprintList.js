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
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import RowSprint from './RowSprint';
import DrawerFormSprint from './DrawerFormSprint';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';

<<<<<<< HEAD

function SprintList({}) {
  const { FetchSprints, sprints, onOpen, FetchTickets, setShowTickets, showTickets, findTicketsByProjectId } = useContext(GlobalContext);
=======
function SprintList({}) {
  const { FetchSprints, sprints, isOpen, onOpen } = useContext(GlobalContext);
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    FetchSprints();
  }, []);

<<<<<<< HEAD
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

=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box p="4" display={'flex'} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          List of Sprints
        </Text>
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
<<<<<<< HEAD
              <Th>Project</Th>
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
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
<<<<<<< HEAD
              .map(({ _id, sprintname, project, description, startdate, enddate }) => (
=======
              .map(({ _id, sprintname, description, startdate, enddate }) => (
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
                <RowSprint
                  key={_id}
                  id={_id}
                  sprintname={sprintname}
<<<<<<< HEAD
                  project={project?.projectname}
                  description={description}
                  startdate={startdate}
                  enddate={enddate}
                  onShowTickets={handleShowTickets} 
=======
                  description={description}
                  startdate={startdate}
                  enddate={enddate}
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DrawerFormSprint />
    </Box>
  );
}

export default SprintList;
