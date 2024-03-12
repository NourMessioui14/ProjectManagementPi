import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Container, Input, Stack, Text, Textarea, Avatar, useColorModeValue } from '@chakra-ui/react';
import { IoSearchSharp, IoAdd } from "react-icons/io5";
import Row from './RowReclamation';
import AddReclamation from "./AddReclamation";
import { GlobalContext } from '../context/GlobalWrapper';

function ReclamationsList() {
  const { FetchReclamations, Reclamations, isOpen, onOpen, onClose } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const textColor = useColorModeValue("black", "white"); // Récupérer la couleur de texte en fonction du mode de couleur

  useEffect(() => {
    FetchReclamations();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredReclamations = Reclamations.filter((reclamation) =>
    reclamation.Subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    String(reclamation.UserId).toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.UserName && reclamation.UserName.toLowerCase().includes(searchTerm.toLowerCase())
    ||
    reclamation.reponses.some(response => response.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="App">
      <Container maxW={'full'} p="4" fontSize={'18px'} >
        <Box rounded="lg" boxShadow="base " p="4">
          <Stack direction="row" spacing="4" alignItems="center">
            <Input
              type='text'
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearchChange}
              bg="white"
              borderColor="gray.200" 
            />
          </Stack>
        </Box>

        <Box mt="5" rounded={'lg'} boxShadow="base ">
          <Box p="4">
            <Text fontSize="xl" fontWeight="bold" mb="4" color={textColor}>
              List of claims
            </Text>
            {filteredReclamations.map(({ _id, UserId, UserName, Category, Subject, Description, reponses }) => (
              <Row
                key={_id}
                id={_id}
                UserId={UserId}
                UserName={UserName}
                Category={Category}
                Subject={Subject}
                Description={Description}
                reponses={reponses}
              />
            ))}
          </Box>
        </Box>

        <Box mt="5">
          <Button
            colorScheme="teal"
            variant="outline"
            maxW="300px"
            minW="150px"
            leftIcon={<IoAdd />}
            onClick={onOpen}
          >
            Add Claim
          </Button>
        </Box>

        <AddReclamation />
      </Container>
    </div>
  );
}

export default ReclamationsList;
