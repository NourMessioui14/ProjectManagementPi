import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Input, Flex, Center } from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import RowTicket from './RowTicket';
import DrawerFormTicket from './DrawerFormTicket';
import { GlobalContext } from '../../../context/GlobalWrapper';
import Sidebar from '../Sidebar';
import Navbar from '../Navbar';

function TicketList() {
  const { FetchTickets, tickets, isOpen, onOpen, onClose } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(4);

  useEffect(() => {
    FetchTickets();
    console.log(tickets); // Log the tickets to see their structure
  }, []);
  

  // Filtrer les tickets en fonction du terme de recherche
  const filteredTickets = tickets.filter(ticket =>
    ticket.project?.projectname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.typeOfticket?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  

  // Index du dernier ticket de la page
  const indexOfLastTicket = currentPage * ticketsPerPage;
  // Index du premier ticket de la page
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  // Tickets actuellement affichés sur la page
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  // Changer de page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box display="flex">
        <Sidebar/>
        <Box flexGrow={1}>
          <Navbar/>
          <Box p="4" display={'flex'} justifyContent="space-between" alignItems="center">
            <Text fontSize="xl" fontWeight="bold">
              List of Tickets
            </Text>
            <Button
              colorScheme="teal"
              variant="outline"
              maxW="300px"
              minW="150px"
              leftIcon={<AiOutlinePlus fontSize="20px" />}
              onClick={onOpen}
            >
              Add New Ticket
            </Button>
          </Box>

          {/* Champ de recherche */}
          <Box p="4">
            <Input
              placeholder="Search ticket"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Box>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Project</Th>
                  <Th>Sprint</Th>
                  <Th>State</Th>
                  <Th>Owner</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
              {currentTickets.map(({ _id, project, sprint, typeOfticket, etat, description, responsable }) => (
                <RowTicket
                  key={_id}
                  id={_id}
                  project={project ? project.projectname : 'Unknown'}
                  sprint={sprint?.sprintname  || 'Unknown' }
                  typeOfticket={typeOfticket}
                  etat={etat}
                  description={description}
                  responsable={responsable?.name || 'Unknown'}
                />
              ))}
              
              </Tbody>
            </Table>
          </TableContainer>
          <Flex justifyContent="center" alignItems="center" mt="4">
            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} leftIcon={<AiOutlineArrowLeft />} mr="2">
              
            </Button>
            <Center bg="teal" color="white" borderRadius="md" w="30px" h="30px">
              {currentPage}
            </Center>
            <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastTicket >= filteredTickets.length} rightIcon={<AiOutlineArrowRight />} ml="2">
              
            </Button>
          </Flex>
        </Box>
      </Box>
      <DrawerFormTicket />
    </Box>
  );
}

export default TicketList;

