import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  Flex,
  Text,
  VStack,
  Badge,
  useColorModeValue,
  Button,
  Input,
  FormControl,
  FormLabel,
  Select,
  Textarea,
} from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapper';
import { FaInfoCircle } from 'react-icons/fa'; // Utiliser une icône pour "Details"
import NavbarFront from '../../NavbarFront';

const getBadgeColor = (etat) => {
  switch (etat) {
    case 'Done':
      return 'green';
    case 'In Progress':
      return 'blue';
    case 'To Do':
      return 'yellow';
    default:
      return 'gray';
  }
};

function ListTicketFront() {
  const { FetchTickets, tickets, UpdateTicket, projects, sprints } = useContext(GlobalContext);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    project: '',
    sprint: '',
    description: '',
    typeOfticket: '',
    etat: '',
    responsable: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    FetchTickets();
  }, [FetchTickets]);

  useEffect(() => {
    if (selectedTicket) {
      setFormData({
        title: selectedTicket.title || '',
        project: selectedTicket.project?.projectname || '',
        sprint: selectedTicket.sprint?.sprintname || '',
        description: selectedTicket.description || '',
        typeOfticket: selectedTicket.typeOfticket || '',
        etat: selectedTicket.etat || '',
        responsable: selectedTicket.responsable?.name || '',
      });
    }
  }, [selectedTicket]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    UpdateTicket(formData, setFormData, selectedTicket._id);
  };

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  const bg = useColorModeValue("white", "gray.700");

  // Pagination
  const ticketsPerPage = 8;
  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = tickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <NavbarFront />

      <Box mt="100px" padding="4" minH="calc(100vh - 200px)">
        <Flex justifyContent="center" alignItems="flex-start">
          <VStack spacing={4} width="40%">
            {currentTickets.map((ticket) => (
              <Flex
                key={ticket._id}
                p={4}
                shadow="md"
                borderWidth="1px"
                bg={bg}
                alignItems="center"
                justifyContent="space-between"
                width="100%"
                borderRadius="md"
              >
                <Badge colorScheme={getBadgeColor(ticket.etat)}>{ticket.etat}</Badge>
                <Text flex={1} textAlign="left" ml={2}>
                  {ticket.description}
                </Text>
                <Button
  onClick={() => handleSelectTicket(ticket)}
  size="sm"
  variant="outline"
  leftIcon={<FaInfoCircle />} // Utiliser une icône pour "Details"
  colorScheme="pink" // Changer la couleur du bouton en bleu
>
  Details
</Button>

              </Flex>
            ))}
          </VStack>
          {selectedTicket && (
            <Box width="30%" bg="white" p={4} shadow="md" ml={4} borderRadius="md">
              <FormControl mb={2}>
                <FormLabel>Project</FormLabel>
                <Input
                  placeholder="Project"
                  name="project"
                  value={formData.project}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Sprint</FormLabel>
                <Input
                  placeholder="Sprint"
                  name="sprint"
                  value={formData.sprint}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Description</FormLabel>
                <Textarea
                  placeholder="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Type of Ticket</FormLabel>
                <Select
                  placeholder="Type of Ticket"
                  name="typeOfticket"
                  value={formData.typeOfticket}
                  onChange={handleChange}
                >
                  <option value="Story">Story</option>
                  <option value="Task">Task</option>
                  <option value="Bug">Bug</option>
                  <option value="Epic">Epic</option>
                </Select>
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>State</FormLabel>
                <Select
                  placeholder="State"
                  name="etat"
                  value={formData.etat}
                  onChange={handleChange}
                >
                  <option value="To Do">To Do</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Done">Done</option>
                </Select>
              </FormControl>
              <FormControl mb={2}>
                <FormLabel>Responsable</FormLabel>
                <Input
                  placeholder="Responsable"
                  name="responsable"
                  value={formData.responsable}
                  onChange={handleChange}
                />
              </FormControl>
              <button onClick={handleSubmit}  type="button" className="btn btn-gradient-primary btn-icon-text">
                          <i className="mdi mdi-file-check btn-icon-prepend"></i>
              Save Changes
            </button>
            
            </Box>
          )}
        </Flex>
        {/* Pagination */}
        <Box mt={4} display="flex" justifyContent="center">
          {[...Array(Math.ceil(tickets.length / ticketsPerPage)).keys()].map((number) => (
            <Button key={number + 1} onClick={() => paginate(number + 1)} ml={2}>
              {number + 1}
            </Button>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default ListTicketFront;
