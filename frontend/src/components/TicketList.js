import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr, Input, Flex } from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import RowTicket from './RowTicket';
import DrawerFormTicket from './DrawerFormTicket';
import { GlobalContext } from '../context/GlobalWrapper';

function TicketList() {
  const { FetchTickets, tickets, isOpen, onOpen, onClose } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(4);

  useEffect(() => {
    FetchTickets();
  }, []);

  // Filtrer les tickets en fonction du terme de recherche
  const filteredTickets = tickets.filter(ticket =>
    ticket.project.projectname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.typeOfticket.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
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
      <Box p="4" display={'flex'} justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">
          List of Tickets
        </Text>
        <Button
          colorScheme="teal"
          variant="outline"
          maxW={'300px'}
          minW="150px"
          leftIcon={<AiOutlinePlus fontSize={'20px'} />}
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
                project={project.projectname} // Utilisez project.projectname pour accéder au nom du projet s'il est présent
                sprint={sprint}
                typeOfticket={typeOfticket}
                etat={etat}
                description={description}
                responsable={responsable}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Flex justifyContent="center" alignItems="center" mt="4">
        <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} leftIcon={<AiOutlineArrowLeft />}>
          Previous
        </Button>
        <Text mx="2">Page {currentPage}</Text>
        <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastTicket >= filteredTickets.length} rightIcon={<AiOutlineArrowRight />}>
          Next
        </Button>
      </Flex>
      <DrawerFormTicket />
    </Box>
  );
}

export default TicketList;
