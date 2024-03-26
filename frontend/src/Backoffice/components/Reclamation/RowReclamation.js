import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Textarea, Text, Avatar, Flex } from "@chakra-ui/react";
import axios from 'axios';
import { IoSearchSharp, IoAdd } from "react-icons/io5";
import { GlobalContext } from "../../../context/GlobalWrapperRec";

const Row = ({ id, UserId, UserName, Category, Subject, Description, reponses, Response }) => {
  const { FetchReclamations } = useContext(GlobalContext);
  const [responseText, setResponseText] = useState('');
  const [reponsesDetails, setReponsesDetails] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isResponseEmpty, setIsResponseEmpty] = useState(true); // State pour suivre si l'input de la réponse est vide ou non


  const handleResponseChange = (event) => {
    const { value } = event.target;
    setResponseText(value);
    setIsResponseEmpty(value.trim() === ''); // Vérifier si le texte de l'input est vide
  };

  const handleAddResponse = () => {
    axios.post(`/reponses/${id}`, { text: responseText })
      .then((res) => {
        console.log(res.data);
        FetchReclamations();
        setResponseText(''); // Reset response text after successful submission
        setIsResponseEmpty(true); // Marquer l'input comme vide après soumission réussie
     
      })
      .catch((err) => {
        console.error(err);
        // Handle errors here
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

  return (
    <Box borderWidth="1px" borderRadius="lg" p="4" mb="4">
      <Flex align="center">
        <Avatar name={UserName} />
        <Box ml="3">
          <Text fontWeight="bold" color="black">{UserName}</Text>
          <Text color="black">{UserId}</Text>
        </Box>
      </Flex>
      <Text fontWeight="bold" color="black">{Subject}</Text>
      <Text color="black">Category: {Category}</Text>
      {/* Afficher les 30 premiers caractères de la description */}
      <Text color="black">Description: {expanded ? Description : `${Description.slice(0, 80)}${Description.length > 50 ? "..." : ""}`}</Text>
      {Description.length > 50 && (
        <Button onClick={() => setExpanded(!expanded)}>{expanded ? "Moins" : "Plus"}</Button>
      )}
      {reponsesDetails.length > 0 && (
        <Box mt="4">
          <Text fontWeight="bold" color="black">Reponses:</Text>
          {reponsesDetails.map((response, index) => (
            <Textarea key={index} value={response.text} readOnly />
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
        <Box mt="4"     >
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
