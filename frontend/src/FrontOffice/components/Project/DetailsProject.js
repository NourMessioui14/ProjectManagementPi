import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Button,
  useToast,
  Heading,
  VStack,
  Alert,
  AlertIcon,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex, // Import Flex component from Chakra UI
  Grid
} from '@chakra-ui/react';
import NavbarFront from '../../NavbarFront';
import { Text } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TicketsByProject from '../Ticket/TicketsByProject';



function DetailsProject(id) {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [project, setProject] = useState({
    projectname: '',
    chefdeprojet: '',
    description: '',
    startdate: '',
    enddate: '',
  });
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null); // État pour stocker l'ID du sprint sélectionné

  const openModal = () => { 
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await axios.get(`/project/${projectId}`);
        setProject(response.data);
        fetchTickets(projectId);
      } catch (error) {
        console.error("Error fetching project details:", error);
        toast({
          title: 'Error fetching project details.',
          description: 'Could not fetch project details. Please try again later.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };

    const fetchTickets = async (projectId) => {
      try {
        const response = await axios.get(`/ticket/byproject/${projectId}`);
        setTickets(response.data);
      } catch (error) {
        console.error("Error fetching tickets:", error);
        toast({
          title: 'Error fetching tickets.',
          description: 'Could not fetch tickets. Please try again later.',
          status: 'error',
          duration: 9000,
          isClosable: true,
        });
      }
    };

    fetchProjectDetails();
  }, [projectId, toast]);

  const handleOpenTicketDetails = (ticket) => {
    setSelectedTicket(ticket);
    onOpen();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/project/${projectId}`, project);
      toast({
        title: 'Project updated successfully.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
      navigate('/ProjectListFront');
    } catch (error) {
      console.error("Error updating project:", error);
      toast({
        title: 'Error updating project.',
        description: 'Could not update project details. Please try again later.',
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject(prev => ({
      ...prev,
      [name]: value
    }));

   
const generatePDF = () => {
  html2canvas(document.querySelector("#capture")).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
    });
    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save("download.pdf");
  });
};
    
    
  };
  

  return (
    <div className="col-12 grid-margin stretch-card" style={{ marginTop: '125px' }}>

    <NavbarFront/>
    <div className="App">
      <div bg="white" p={10} borderRadius="lg" boxShadow="lg" width="full" mt={6}> {/* Ajoutez un mt={6} pour déplacer les boutons plus bas */}
        <Button marginTop="50px" onClick={() => navigate('/ProjectListFront')} colorScheme="teal" variant="outline" size="sm" ml={2}>
          Back to Projects
        </Button>
    
      {/* Ticket section */}
      {/* {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <div key={ticket._id} p={5} shadow="md" borderWidth="1px"  >
          <Flex justifyContent="flex-end">
            <Button   marginTop="30px" marginBottom="20px" onClick={() => handleOpenTicketDetails(ticket)} size="sm" colorScheme="teal">
              View Details of ticket
            </Button>
          </Flex>
        </div>
        
        ))
      ) : (
        <Alert status="info" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertDescription maxWidth="sm">
            Aucun ticket lié à ce projet.
          </AlertDescription>
          
        </Alert>
      )} */}
      <Box p={1} shadow="md" borderWidth="1px" mb={4}>
            <Flex justifyContent="flex-end"> 
            <Button marginTop="30px" marginBottom="20px" colorScheme="teal" onClick={() => navigate(`/SprintFront/${projectId}`)}>Show Sprints</Button>

            </Flex>
          </Box>

          <Box p={1} shadow="md" borderWidth="1px" mb={4}>
            <Flex justifyContent="flex-end"> 
            <Button marginTop="30px" marginBottom="20px" colorScheme="teal" onClick={() => openModal()}>Show Tickets</Button>
            <TicketsByProject isOpen={isModalOpen} onClose={closeModal} id={projectId} /> 
            </Flex>
          </Box>

    </div>
    <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" width="full">
    <form onSubmit={handleSubmit}>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" width="full">
        <Heading as="h2" size="xl" textAlign="center" mb={6}>Project Details</Heading>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Project Name</FormLabel>
            <Input name="projectname" value={project.projectname} onChange={handleChange} placeholder="Enter project name" size="lg" />
          </FormControl>
          <FormControl>
            <FormLabel>Chef de projet</FormLabel>
            <Input name="chefdeprojet" value={project.chefdeprojet} onChange={handleChange} placeholder="Enter project manager's name" size="lg" />
          </FormControl>
          <FormControl>
            <FormLabel>Description</FormLabel>
            <Textarea name="description" value={project.description} onChange={handleChange} placeholder="Enter project description" size="lg" />
          </FormControl>
          <FormControl>
            <FormLabel>Start Date</FormLabel>
            <Input name="startdate" type="date" value={project.startdate} onChange={handleChange} size="lg" />
          </FormControl>
          <FormControl>
            <FormLabel>End Date</FormLabel>
            <Input name="enddate" type="date" value={project.enddate} onChange={handleChange} size="lg" />
          </FormControl>
          <Button colorScheme="teal" type="submit" width="full" size="lg">
            Save Changes
          </Button>
        </VStack>
      </Box>
    </form>
  </Box>
  
  

      {/* Modal for ticket details */}
      <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Details of Tasks</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        {selectedTicket && (
          <VStack spacing={4} align="start"> {/* Utilisation de VStack pour aligner verticalement les éléments */}
            <Grid templateColumns="150px 1fr" gap={4}> {/* Utilisation de Grid pour organiser les champs et les valeurs sur la même ligne */}
              <Text fontWeight="bold">Type de ticket:</Text>
              <Text>{selectedTicket.typeOfticket}</Text>
              <Text fontWeight="bold">Sprint en cours :</Text>
              <Text>{selectedTicket.sprint && selectedTicket.sprint.sprintname}</Text>
              <Text fontWeight="bold">Description:</Text>
              <Text>{selectedTicket.description}</Text>
              <Text fontWeight="bold">Etat:</Text>
              <Text>{selectedTicket.etat}</Text>
              <Text fontWeight="bold">Responsable:</Text>
              <Text>{selectedTicket.responsable && selectedTicket.responsable.name}</Text>
            </Grid>
          </VStack>
        )}
      </ModalBody>
      
        <ModalFooter>
          {/* Bouton d'impression */}
          <Button colorScheme="teal" mr={3} onClick={(generatePDF) => window.print()}>Imprimer</Button>
          {/* Bouton de fermeture */}
          <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </div>
    </div>
  );
}

export default DetailsProject;
