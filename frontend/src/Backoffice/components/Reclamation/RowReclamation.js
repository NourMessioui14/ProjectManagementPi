import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Textarea, Text, Avatar, Flex, Menu, MenuButton, MenuList, Divider, IconButton, MenuItem, ModalFooter } from "@chakra-ui/react";
import axios from 'axios';
import { IoAdd } from "react-icons/io5";
import { GlobalContext } from "../../../context/GlobalWrapperRec";
import { useToast } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import { MdMoreVert, } from "react-icons/md";
import { FaFilePdf } from 'react-icons/fa';
import { ArrowDownIcon, ArrowUpIcon, CheckIcon, DeleteIcon } from "@chakra-ui/icons";
import { Tooltip } from '@chakra-ui/react'
import { Socket, io } from "socket.io-client";

const socket = io('http://localhost:5001'); // Assurez-vous de remplacer l'URL par celle de votre serveur



const Row = ({ id, user, Category, Subject, Description, reponses, createdAt, Response, Status }) => {
  const { FetchReclamations } = useContext(GlobalContext);
  const [responseText, setResponseText] = useState('');
  const [reponsesDetails, setReponsesDetails] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isResponseEmpty, setIsResponseEmpty] = useState(true);
  const [isEditable, setIsEditable] = useState(false);
  const [status, setStatus] = useState('');
  const [isStatusUpdating, setIsStatusUpdating] = useState(false);
  const [statusButtonColor, setStatusButtonColor] = useState('red'); // Couleur initiale du bouton
  const toast = useToast();


  useEffect(() => {
    const fetchReponsesDetails = async () => {
      if (reponses) {
        const responsesData = await Promise.all(
          reponses.map(async (responseId) => {
            const response = await axios.get(`/reponses/${responseId}`);
            return response.data;
          })
        );
        setReponsesDetails(responsesData);
        setStatus(Status);
      }
    };
    fetchReponsesDetails();
  }, [reponses, Status]);

  useEffect(() => {
    // Récupérer l'état du bouton depuis le stockage local lors du montage du composant
    const savedStatus = localStorage.getItem(`status_${id}`);
    if (savedStatus) {
      setStatus(savedStatus);
      // Mettre à jour la couleur du bouton en fonction de l'état récupéré
      setStatusButtonColor(savedStatus === 'In Progress' ? 'green' : 'red');
    }
  }, [id]);

  const handleResponseChange = (event) => {
    const { value } = event.target;
    setResponseText(value);
    setIsResponseEmpty(value.trim() === '');
  };
  const [socket, setSocket] =   useState(null);

  useEffect(() => {
    setSocket(io("http://localhost:5001"));
  }, []);


  
const handleNotification = () => {
  if (socket) {
      console.log(socket);
      const notificationData = {
          senderName: "Admin",
      };
      socket.emit("sendNotification", notificationData);
       console.log("Sending notification:", notificationData);  
  }
};

  const handleAddResponse = async () => {
  if (responseText.trim() === '') {
    toast({
      title: 'Empty Response',
      description: 'Please enter a response before submitting.',
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
    return;
  }

  try {
    const response = await axios.post(`/reponses/${id}`, { text: responseText , senderName: "Admin", description: Description });
    console.log(response.data);

    console.log("add response");
    // Une fois que la réponse est ajoutée avec succès, mettez à jour le statut de la réclamation en "Resolved"
    const updateStatusResponse = await axios.put(`/reclamations/${id}/updateStatus`, { newStatus: "Resolved" });
    FetchReclamations();
    setStatus("Resolved");
    setStatusButtonColor('green'); // Changer la couleur du bouton en vert
    // Enregistrer l'état du bouton mis à jour dans le stockage local
    localStorage.setItem(`status_${id}`, 'Resolved');
    handleNotification();
    console.log('Notification emitted successfully:', 'Votre réclamation a été traitée.');
    // ...
    toast({
      title: 'Response Added and Status Updated',
      description: 'Your response has been added and the status of the claim has been updated to "Resolved".',
      status: 'success',
      duration: 4000,
      isClosable: true,
    });
  } catch (error) {
    console.error(error);
    toast({
      title: 'Error',
      description: 'An error occurred while updating the status.',
      status: 'error',
      duration: 4000,
      isClosable: true,
    });
  }

  setResponseText('');
  setIsResponseEmpty(true);
};


  const handleUpdateStatus = async () => {
    try {
      await axios.put(`/reclamations/${id}/updateStatus`, { newStatus: "In Progress" });
      setStatus("In Progress");
      FetchReclamations();
      setStatusButtonColor('green'); // Changer la couleur du bouton en vert
      toast({
        title: 'Status updated',
        description: 'The claim status has been successfully updated.',
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
      // Enregistrer l'état du bouton mis à jour dans le stockage local
      localStorage.setItem(`status_${id}`, 'In Progress');
    } catch (error) {
      console.error(error);
      toast({
        title: 'Erreur',
        description: 'Une erreur s\'est produite lors de la mise à jour du statut.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.text(`user name: ${user?.name}`, 10, 10);
    doc.text(`Subject: ${Subject}`, 10, 20);
    doc.text(`Category: ${Category}`, 10, 30);
    doc.text(`Description: ${Description}`, 10, 40);
    doc.text(`Created At: ${createdAt}`, 10, 50);
    doc.save(`reclamation_${id}.pdf`);
  };

  const formattedDate = new Date(createdAt).toLocaleString();

  // const handleDeleteResponse = (responseId) => {
  //   axios.delete(`/reponses/${responseId}`)
  //     .then(() => {
  //       FetchReclamations();
  //       toast({
  //         title: 'Response Deleted',
  //         description: 'The response has been deleted successfully.',
  //         status: 'success',
  //         duration: 4000,
  //         isClosable: true,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //       toast({
  //         title: 'Error',
  //         description: 'An error occurred while deleting the response.',
  //         status: 'error',
  //         duration: 4000,
  //         isClosable: true,
  //       });
  //     });
  // };
 

 
  

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" mb="4" bg="AliceBlue" boxShadow="md">
      <Flex align="center" justifyContent="space-between">
        <Flex align="center">
          <Avatar name={user?.name} />
          <Box ml="3">
            <Text fontWeight="bold" color="#2C3E50" fontSize="15">{user?.name}</Text>
            <Box fontSize="15" color="#5D6D7E">
              <Text>{formattedDate}</Text>
            </Box>
          </Box>
        </Flex>

        <Flex>
          <Tooltip placement='bottom-start' label={statusButtonColor === 'red' ? 'Status is pending' : 'Status in progress'} bg="gray" >
            <IconButton
              colorScheme={statusButtonColor}
              onClick={handleUpdateStatus}
              variant="outline"
              maxW="10px"
              minW="40px"
              borderRadius="10px"
              disabled={isResponseEmpty}
              aria-label="Update Status"
              icon={statusButtonColor === 'red' ? <CheckIcon /> : <CheckIcon />}
              style={{ borderColor: 'transparent', borderOpacity: 0 }}
            />
          </Tooltip>


          {/* Bouton du menu */}
          <Menu>
            <MenuButton as={IconButton} aria-label="Options" icon={<MdMoreVert />} />
            <MenuList>
              <MenuItem onClick={generatePDF} icon={<FaFilePdf />}>Download PDF</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      <Divider my="3" />
      <div style={{ marginTop: '10px' }}>
        <Text fontWeight="bold" color="#566573" fontSize="16px">{Subject}</Text>
      </div>
      <Text color="#5D6D7E" fontSize="16px">Category: {Category}</Text>
      <Text color="#5D6D7E" fontSize="16px">Description: {expanded ? Description : `${Description.slice(0, 135)}${Description.length > 135 ? "..." : ""}`}</Text>

      {Description.length > 135 && (
  <>
    <Button
      colorScheme="pink"
      onClick={() => setExpanded(!expanded)}
      mt="3"
      mb="3" // Ajout de la marge inférieure pour créer un espace
      variant="outline"
      maxW="200px"
      minW="70px"
      borderRadius="10px"
      disabled={isResponseEmpty}
      fontSize="14px"
      leftIcon={expanded ? <ArrowUpIcon /> : <ArrowDownIcon />}
    >
      {expanded ? "Moins" : "Plus"}
    </Button>
  </>
)}

{reponsesDetails.map((response, index) => (
  <Box key={index} mt={index === 0 ? "0" : "3"}>
    <Flex align="center">
      <Textarea borderRadius="26px" value={response.text} readOnly bg="Azure" color="#5F9EA0" />
      
    </Flex>
  </Box>
))}



      {!Response && (
        <Box mt="4">
          <Textarea
            placeholder="Enter response here..."
            value={responseText}
            onChange={handleResponseChange}
            bg="white"
            borderRadius="26px"
            borderColor="gray.200"
          />
          <Button
            colorScheme="teal"
            onClick={handleAddResponse}
            mt="3"
            variant="outline"
            maxW="300px"
            minW="150px"
            borderRadius="10px"
            leftIcon={<IoAdd />}
            disabled={isResponseEmpty}
          >
            Add Response
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Row;
