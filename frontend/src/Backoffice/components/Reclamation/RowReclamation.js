import React, { useContext, useState, useEffect } from "react";
import { Box, Button, Textarea, Text, Avatar, Flex } from "@chakra-ui/react";
import axios from 'axios';
import { IoSearchSharp, IoAdd } from "react-icons/io5";
import { GlobalContext } from "../../../context/GlobalWrapperRec";
import { useToast } from '@chakra-ui/react'; // Importez useToast depuis Chakra UI

const Row = ({ id, user,  Category, Subject, Description, reponses, Response }) => {
  const { FetchReclamations } = useContext(GlobalContext);
  const [responseText, setResponseText] = useState('');
  const [reponsesDetails, setReponsesDetails] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [isResponseEmpty, setIsResponseEmpty] = useState(true); // State pour suivre si l'input de la réponse est vide ou non
 
  const toast = useToast(); // Obtenez la fonction toast

  const handleResponseChange = (event) => {
    const { value } = event.target;
    setResponseText(value);
    setIsResponseEmpty(value.trim() === ''); // Vérifier si le texte de l'input est vide
  };
  const handleAddResponse = () => {
    if (responseText.trim() === '') {
      // Afficher un message d'erreur si le champ de réponse est vide
      toast({
        title: 'Empty Response',
        description: 'Please enter a response before submitting.',
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      return; // Ne pas continuer si le champ de réponse est vide
    }
  
    // Envoyer la réponse si le champ n'est pas vide
    axios.post(`/reponses/${id}`, { text: responseText })
      .then((res) => {
        console.log(res.data);
        FetchReclamations();
        setResponseText(''); // Réinitialiser le texte de la réponse après une soumission réussie
        setIsResponseEmpty(true); // Marquer l'input comme vide après une soumission réussie
      })
      .catch((err) => {
        console.error(err);
        // Gérer les erreurs ici
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
    <Box borderWidth="1px" borderRadius="lg" p="4" mb="4" bg="AliceBlue" boxShadow="md">

     
<Flex align="center">
  <Avatar name={user?.name} />
  <Box ml="3">
    <Text fontWeight="bold" color="#2C3E50">{user?.name}</Text>
    {/* <Text color="black">{UserId}</Text> */}
  </Box>
</Flex>
<div style={{ marginTop: '10px' }}>
  <Text fontWeight="bold" color="#566573">{Subject}</Text>
</div>

     
      <Text color="#5D6D7E">Category: {Category}</Text>
     
      {/* Afficher les 30 premiers caractères de la description */}
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