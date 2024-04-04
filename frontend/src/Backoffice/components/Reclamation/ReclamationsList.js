// ReclamationsList component
import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Input, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import Row from './RowReclamation';
import AddReclamation from "./AddReclamation";
import { GlobalContext } from "../../../context/GlobalWrapperRec";
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

function ReclamationsList() {
  const { FetchReclamations, Reclamations } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const textColor = useColorModeValue("black", "white");

  useEffect(() => {
    FetchReclamations();
  }, [searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredReclamations = Reclamations.filter((reclamation) =>
    reclamation.Subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reclamation.reponses.some(response => response.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box display="flex">
      <Sidebar position="fixed" />
        <Box flexGrow={1}>
          <Navbar/>
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
                <AddReclamation/>
                <Text fontSize="xl" fontWeight="bold" mb="4" color={textColor}>
                  List of claims
                </Text>
                {filteredReclamations.map(({ _id, user, Category, Subject, Description, reponses }) => (
                  <Row
                    key={_id}
                    id={_id}
                    user={user}
                    Category={Category}
                    Subject={Subject}
                    Description={Description}
                    reponses={reponses}
                  />
                ))}
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </Box>
  );
}

export default ReclamationsList;
