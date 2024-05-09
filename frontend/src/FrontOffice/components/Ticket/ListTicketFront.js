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
import { AiFillRobot, AiOutlineClose, AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'; // Import des icônes de flèches
import { FaInfoCircle } from 'react-icons/fa';
import NavbarFront from '../../NavbarFront';
import axios from 'axios';
import TicketModal from '../../ticketPrediction';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    project: '',
    sprint: '',
    description: '',
    typeOfticket: '',
    etat: '',
    responsable: '',
  });

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

  const handleSelectTicket = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleRefreshTicketList = async () => {
    try {
      await FetchTickets();
    } catch (error) {
      // Gérer les erreurs ici
    }
  };

  const handleSubmit = async () => {
    if (selectedTicket) {
      UpdateTicket(formData, setFormData, selectedTicket._id);
    } else {
      try {
        const newTicket = await createTicketFromDescription(formData.description);
        setFormData({
          project: newTicket.project.projectname,
          sprint: newTicket.sprint.sprintname,
          description: newTicket.description,
          typeOfticket: newTicket.typeOfticket,
          etat: newTicket.etat,
          responsable: newTicket.responsable.name,
        });
        handleRefreshTicketList();
      } catch (error) {
        // Gérer les erreurs ici
      }
    }
  };

  const bg = useColorModeValue("white", "gray.700");
  const itemsPerPage = 8;
  const indexOfLastTicketFirstPage = currentPage * itemsPerPage;
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const createTicketFromDescription = async (description) => {
    try {
      const response = await axios.post('https://nestjspi.onrender.com/ticket/create-from-description', { description });
      return response.data;
    } catch (error) {
      console.error('Error creating ticket:', error.response.data);
      throw error;
    }
  };

  const [filteredTickets, setFilteredTickets] = useState([]);
  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = tickets.filter((ticket) => {
      return (
        typeof ticket.project === 'string' && ticket.project.toLowerCase().includes(lowercasedFilter) ||
        typeof ticket.sprint === 'string' && ticket.sprint.toLowerCase().includes(lowercasedFilter) ||
        typeof ticket.description === 'string' && ticket.description.toLowerCase().includes(lowercasedFilter)
      );
    });
    setFilteredTickets(filteredData);
  }, [searchTerm, tickets]);

  return (
    <>
      <NavbarFront />
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleRefreshTicketList} />
      <Box mt="100px" padding="4" minH="calc(100vh - 200px)">
        <Flex justifyContent="flex-start" alignItems="flex-start" mb={4}>
          <Button
            leftIcon={<AiFillRobot />}
            bgGradient="linear-gradient(45deg, #FFC0CB, #FF69B4)"
            color="white"
            onClick={() => setIsModalOpen(true)}
            marginTop={1}
          >
            Create Ticket IA
          </Button>
        </Flex>
        <Input
          size="sm"
          variant="filled"
          borderRadius="full"
          placeholder="Search tickets..."
          width={600}
          marginTop={50}
          marginLeft={400}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Flex justifyContent="center" alignItems="flex-start" mt={4} width="100%">
          <VStack width="100%">
            {filteredTickets.slice(indexOfLastTicketFirstPage - itemsPerPage, indexOfLastTicketFirstPage).map((ticket) => (
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
                marginBottom={4} // Ajoutez cet espace entre chaque carte
              >
                <Badge colorScheme={getBadgeColor(ticket.etat)}>{ticket.etat}</Badge>
                <Text flex={1} textAlign="left" ml={2}>
                  {ticket.description}
                </Text>
                <Button
                  onClick={() => handleSelectTicket(ticket)}
                  size="sm"
                  variant="outline"
                  leftIcon={<FaInfoCircle />}
                  colorScheme="pink"
                >
                  Details
                </Button>
              </Flex>
            ))}
          </VStack>
          {selectedTicket && (
            <Box width="30%" bg="white" p={4} shadow="md" ml={4} borderRadius="md" position="relative">
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
              <Flex justifyContent="flex-end">
                <Button onClick={() => setSelectedTicket(null)} colorScheme="red" mr={2}>
                  <AiOutlineClose /> Close
                </Button>
                <Button onClick={handleSubmit} colorScheme="blue">
                  Save Changes
                </Button>
              </Flex>
            </Box>
          )}
        </Flex>
        {/* Boutons de pagination avec des flèches */}
        <Box mt={4} display="flex" justifyContent="center">
          <Button
            onClick={() => paginate(currentPage - 1)}
            ml={2}
            disabled={currentPage === 1}
            leftIcon={<AiOutlineArrowLeft />}
            variant="ghost"
            colorScheme="pink" // Modifier la couleur du bouton Previous en rose
          >
            Previous
          </Button>
          <Button
            onClick={() => paginate(currentPage + 1)}
            ml={2}
            disabled={currentPage === Math.ceil(filteredTickets.length / itemsPerPage)}
            rightIcon={<AiOutlineArrowRight />}
            variant="ghost"
            colorScheme="pink" // Modifier la couleur du bouton Next en rose
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default ListTicketFront;
