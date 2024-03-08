import React, { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../context/GlobalWrapper";
import { Box, Button, Textarea, Text, Avatar, Flex } from "@chakra-ui/react";
import axios from 'axios';

const Row = ({ id, UserId, UserName, Category, Subject, Description, reponses, Response }) => {
  const { FetchReclamations } = useContext(GlobalContext);
  const [responseText, setResponseText] = useState('');
  const [reponsesDetails, setReponsesDetails] = useState([]);
  const [expanded, setExpanded] = useState(false);

  const handleResponseChange = (event) => {
    setResponseText(event.target.value);
  };

  const handleAddResponse = () => {
    axios.post(`/api/reponses/${id}`, { text: responseText })
      .then((res) => {
        console.log(res.data);
        FetchReclamations();
        setResponseText(''); // Reset response text after successful submission
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
            const response = await axios.get(`/api/reponses/${responseId}`);
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
      <Text color="black">Description: {expanded ? Description : `${Description.slice(0, 30)}${Description.length > 30 ? "..." : ""}`}</Text>
      {Description.length > 30 && (
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
        <Box mt="4">
          <Textarea placeholder="Enter response here..." value={responseText} onChange={handleResponseChange} />
          <Button colorScheme="teal" onClick={handleAddResponse}>Add Response</Button>
        </Box>
      )}
    </Box>
  );
};

export default Row;
