import React, { useContext, useEffect } from 'react'
import { Box, Button, Container, FormControl, Input, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { IoSearchSharp, IoAdd } from "react-icons/io5";
import Row from './RowReclamation';
import AddReclamation from "./AddReclamation";
import { GlobalContext } from '../context/GlobalWrapper';

function ReclamationsList({  }) {


    
 const {FetchReclamations , Reclamations , isOpen, onOpen, onClose } = useContext(GlobalContext);
        
        
        // kif yetlansa component yetlansa m3ah FetchReclamations
        useEffect(() => {
          FetchReclamations();
        }, []);
      
        return (
          <div className="App">
            <Container maxW={'full'} p="4" fontSize={'18px'}>
              <Box rounded="lg" boxShadow="base " p="4">
                <Box mt="2" gap={'2'} mb="4" display={'flex'}>
                  <FormControl>
                    <Input type='text' />
                  </FormControl>
                  <Button leftIcon={  <IoSearchSharp fontSize={'20px'}/>} colorScheme='teal' variant='outline' maxW="300" minW="150px">
                    Search
                  </Button>
                </Box>
              </Box>
      
      
      
              <Box mt="5" rounded={'lg'} boxShadow="base ">
                <Box p="4" display={'flex'} justifyContent="space-between">
                  <Text fontSize="xl" fontWeight="bold">
                    List of claims
                  </Text>
                  <Button colorScheme="teal" variant="outline" maxW="300px" minW="150px" leftIcon={  <IoAdd/> }
                  onClick={onOpen}>
      
                    Add Claim
                  </Button>
                  </Box> 
      
      
      
           
                <TableContainer>
                  <Table variant='simple'>
                   
                    <Thead>
                      <Tr>
                        
                        <Th>User ID</Th>
                        <Th>Category</Th>
                        <Th>Subject</Th>
                        <Th>Description</Th>
                        <Th>Actions</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                    {/* Reclamations?.map : ken liste reclamations existe jibli les donnees  */}
                       {Reclamations?.map(({_id, UserId, Category, Subject, Description}) => {
                        return (
                          <Row
                          key={_id} // Assurez-vous que _id est une valeur unique pour chaque élément
                          id={_id} // Assurez-vous que l'ID est correctement transmis à Row
                          UserId={UserId}
                            Category={Category}
                            Subject={Subject}
                            Description={Description}
                          />
                        );
                      })} 
                    
                    </Tbody>
                  </Table>
                </TableContainer>
      
      
              </Box>
      
            {/* n3aytou lel component ta3 add */}
              <AddReclamation /> 
            
            </Container>
          </div>
        );




}

export default ReclamationsList