import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Textarea, Text, Avatar, Flex, Menu, MenuButton, MenuList, Td, MenuItem, IconButton, Divider } from "@chakra-ui/react";
import axios from 'axios';
import { IoAdd } from "react-icons/io5";
import { GlobalContext } from "../../../context/GlobalWrapperRec";
import { useToast } from '@chakra-ui/react';
import jsPDF from 'jspdf';
import { MdMoreVert , } from "react-icons/md";

import { FaFilePdf } from 'react-icons/fa';



const Row = ({ id, user, Category, Subject, Description, reponses,createdAt, Response }) => {
  const { FetchReclamations } = useContext(GlobalContext);
  const [responseText, setResponseText] = useState('');
  const [reponsesDetails, setReponsesDetails] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isResponseEmpty, setIsResponseEmpty] = useState(true);
 

  
 
  const toast = useToast();
  


  const handleResponseChange = (event) => {
    const { value } = event.target;
    setResponseText(value);
    setIsResponseEmpty(value.trim() === '');
  };

  const handleAddResponse = () => {
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
  
    axios.post(`/reponses/${id}`, { text: responseText })
      .then((res) => {
        console.log(res.data);
        FetchReclamations();
        setResponseText('');
        setIsResponseEmpty(true);
      

        toast({
          title: 'Response Added',
          description: 'Your response has been added successfully.',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });

      
    })
      
      .catch((err) => {
        console.error(err);
      });
  };

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
      }
    };
    fetchReponsesDetails();
  }, [reponses]);

  const generatePDF = () => {
    // Créer un nouvel objet jsPDF
    const doc = new jsPDF();

    // Ajouter du contenu au PDF
    doc.text(`user name: ${user?.name}`, 10, 40);
    doc.text(`Subject: ${Subject}`, 10, 10);
    doc.text(`Category: ${Category}`, 10, 20);
    doc.text(`Description: ${Description}`, 10, 30);
    doc.text(`Created At: ${createdAt}`, 10, 50); // Ajoutez la date de création


  
    // Ajouter d'autres détails de la réclamation selon vos besoins

    // Télécharger le PDF
    doc.save(`reclamation_${id}.pdf`);
  };
  const formattedDate = new Date(createdAt).toLocaleString();

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" mb="4" bg="AliceBlue" boxShadow="md">
      <Flex align="center" justifyContent="space-between"> {/* Ajoutez justifyContent="space-between" pour aligner les éléments de manière égale */}
    <Flex align="center">
      <Avatar name={user?.name} />
      <Box ml="3">
        <Text fontWeight="bold" color="#2C3E50">{user?.name}</Text>
        <Box fontSize="sm" color="#5D6D7E"> {/* Utilisez la taille de police "sm" pour une police plus petite */}
        <Text> {formattedDate}</Text> {/* Affichez la date de création */}
    </Box>
      </Box>
    </Flex>
    {/* Déplacez le menu ici */}
    <Menu>
      <MenuButton as={IconButton} aria-label="Options" icon={<MdMoreVert />} />
      <MenuList>
      <MenuItem onClick={generatePDF} icon={<FaFilePdf />}>  Download PDF</MenuItem>
       
      </MenuList>
    </Menu>
  </Flex>
  <Divider my="3" /> 
      <div style={{ marginTop: '10px' }}>
        <Text fontWeight="bold" color="#566573">{Subject}</Text>
      </div>
      <Text color="#5D6D7E">Category: {Category}</Text>
      <Text color="#5D6D7E">Description: {expanded ? Description : `${Description.slice(0, 100)}${Description.length > 100 ? "..." : ""}`}</Text>
      
      {Description.length > 100 && (
        <Button  
          colorScheme="pink"
          onClick={() => setExpanded(!expanded)}
          mt="3"
          variant="outline"
          maxW="200px"
          minW="70px"
          borderRadius="10px"
          disabled={isResponseEmpty}
        >
          {expanded ? "Moins" : "Plus"}
        </Button>
      )}
      {reponsesDetails.length > 0 && (
        <Box mt="4" borderRadius="10px" p="4" mb="4"  >
          <Text fontWeight="bold" color="#5F9EA0">Reponses:</Text>
          {reponsesDetails.map((response, index) => (
            <Textarea borderRadius="26px" key={index} value={response.text} readOnly bg="Azure"   color="#5F9EA0"  mt={index === 0 ? "0" : "3"}/>
          ))}
        </Box>
      )}
      {Response && (
        <Box mt="4">
          <Text fontWeight="bold" color="black">Admin Response:</Text>
          <Textarea value={Response} readOnly />
        </Box>
      )}
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
