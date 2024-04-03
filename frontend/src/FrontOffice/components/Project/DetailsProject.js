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
  Flex // Import Flex component from Chakra UI
} from '@chakra-ui/react';
import NavbarFront from '../../NavbarFront';
import { Text } from '@chakra-ui/react';

function DetailsProject() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [project, setProject] = useState({
    projectname: '',
    description: '',
    chefdeprojet: '',
    startdate: '',
    enddate: '',
  });
  const [tickets, setTickets] = useState([]);
  const [selectedTicket, setSelectedTicket] = useState(null);

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
      navigate('/projects');
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
    setProject(prev => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <Box bg="white" p={10} borderRadius="lg" boxShadow="lg" width="full" mt={8}> {/* Ajoutez un mt={6} pour déplacer les boutons plus bas */}
      <Flex justifyContent="flex-end" mr={6}>
        <Button onClick={() => navigate('/projects')} colorScheme="teal" variant="outline" size="sm" ml={2}>
          Back to Projects
        </Button>
      </Flex>
    
      {/* Ticket section */}
      {tickets.length > 0 ? (
        tickets.map((ticket) => (
          <Box key={ticket._id} p={5} shadow="md" borderWidth="1px" mb={4}>
            <Flex justifyContent="flex-end"> {/* Wrap the button in Flex */}
              <Button onClick={() => handleOpenTicketDetails(ticket)} size="sm" colorScheme="teal">
                View Details of ticket
              </Button>
            </Flex>
          </Box>
        ))
      ) : (
        <Alert status="info" variant="subtle" flexDirection="column" alignItems="center" justifyContent="center" textAlign="center" height="200px">
          <AlertIcon boxSize="40px" mr={0} />
          <AlertDescription maxWidth="sm">
            Aucun ticket lié à ce projet.
          </AlertDescription>
          
        </Alert>
      )}
    </Box>
      <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" width="full">
        <form onSubmit={handleSubmit}>
          <Box bg="white" p={8} borderRadius="lg" boxShadow="lg" width="full">
            <Heading as="h2" size="xl" textAlign="center" mb={6}>Project Details</Heading>
            <VStack spacing={4} as="form" onSubmit={handleSubmit}>
              <FormControl isRequired>
                <FormLabel>Project Name</FormLabel>
                <Input name="projectname" value={project.projectname} onChange={handleChange} placeholder="Enter project name" size="lg" />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea name="description" value={project.description} onChange={handleChange} placeholder="Enter project description" size="lg" />
              </FormControl>
              <FormControl>
                <FormLabel>Chef de projet</FormLabel>
                <Input name="chefdeprojet" value={project.chefdeprojet} onChange={handleChange} placeholder="Enter project manager's name" size="lg" />
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
          <ModalHeader>Details du Ticket</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedTicket && (
              <>
                <Text>Type de ticket: {selectedTicket.typeOfticket}</Text>
                <Text>Description: {selectedTicket.description}</Text>
                <Text>Etat: {selectedTicket.etat}</Text>

                {/* Ici, ajoutez plus de champs selon les détails que vous souhaitez afficher */}
              </>
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

export default DetailsProject;
