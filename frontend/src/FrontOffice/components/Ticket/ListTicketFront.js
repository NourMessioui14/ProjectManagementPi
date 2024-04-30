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
import { AiFillRobot } from 'react-icons/ai';
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

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleRefreshTicketList = async () => {
    try {
      await FetchTickets();
    } catch (error) {
      // Gérer les erreurs ici
    }
  };
  
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

  const buttonStyle = {
    background: 'linear-gradient(45deg, #FFC0CB, #FF69B4)',
    color: 'white',
    border: 'none',
    _hover: {
      background: 'linear-gradient(45deg, #FFC0CB, #FF69B4)',
    },
  };

  const bg = useColorModeValue("white", "gray.700");

  // Nombre d'éléments à afficher par page
  const itemsPerPage = 8;
  // Index du dernier ticket pour la première page
  const indexOfLastTicketFirstPage = currentPage * itemsPerPage;

  // Logique de pagination
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Définition de la fonction createTicketFromDescription
  const createTicketFromDescription = async (description) => {
    try {
      const response = await axios.post('/ticket/create-from-description', { description });
      console.log('New ticket created:', response.data);
      return response.data; // Retournez la réponse complète du backend
    } catch (error) {
      console.error('Error creating ticket:', error.response.data);
      throw error;
    }
  };

  // Définition de la fonction refreshTicketList
  const refreshTicketList = () => {
    FetchTickets(); // Actualisation de la liste des tickets
  };
  
  const [filteredTickets, setFilteredTickets] = useState([]);

  // Effet qui met à jour les tickets filtrés lorsque le terme de recherche ou la liste des tickets change
  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    const filteredData = tickets.filter((ticket) => {
      return (
        typeof ticket.project === 'string' && ticket.project.toLowerCase().includes(lowercasedFilter) ||
        typeof ticket.sprint === 'string' && ticket.sprint.toLowerCase().includes(lowercasedFilter) ||
        typeof ticket.description === 'string' && ticket.description.toLowerCase().includes(lowercasedFilter)
        // Ajoutez d'autres champs que vous voulez inclure dans la recherche ici
      );
    });
    setFilteredTickets(filteredData);
  }, [searchTerm, tickets]);
  

  const handleSubmit = async () => {
    if (selectedTicket) {
      UpdateTicket(formData, setFormData, selectedTicket._id);
    } else {
      try {
        // Remplacer par la fonction de création de ticket appropriée
        const newTicket = await createTicketFromDescription(formData.description);
        setFormData({
          project: newTicket.project.projectname,
          sprint: newTicket.sprint.sprintname,
          description: newTicket.description,
          typeOfticket: newTicket.typeOfticket,
          etat: newTicket.etat,
          responsable: newTicket.responsable.name,
        });
        refreshTicketList();
      } catch (error) {
        // Gérer les erreurs ici
      }
    }
  };

  return (
    <>
      <NavbarFront />
      <TicketModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleRefreshTicketList} />
   <Box mt="100px" padding="4" minH="calc(100vh - 200px)">
    <Flex justifyContent="flex-start" alignItems="flex-start" mb={4}>
      <Button
        leftIcon={<AiFillRobot />}
        style={buttonStyle}
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
        <Flex justifyContent="center" alignItems="flex-start" mt={4}>
         
          <VStack >
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
              <Box mt={4} display="flex" justifyContent="center">
                <Button className="main-button" onClick={handleSubmit} type="button">
                  <i className="mdi mdi-file-check btn-icon-prepend"></i>
                  Save Changes
                </Button>
              </Box>
            </Box>
          )}
        </Flex>
        {/* Boutons de pagination */}
        <Box mt={4} display="flex" justifyContent="center">
          {Array.from({ length: Math.ceil(filteredTickets.length / itemsPerPage) }).map((_, index) => (
            <Button key={index + 1} onClick={() => paginate(index + 1)} ml={2}>
              {index + 1}
            </Button>
          ))}
        </Box>
      </Box>
    </>
  );
}

export default ListTicketFront;
