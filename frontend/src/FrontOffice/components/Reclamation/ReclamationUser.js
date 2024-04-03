<<<<<<< HEAD
import React, { useState } from 'react';
import { useContext, useEffect } from "react";
import { Box, Button, Container, Input, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { FormControl } from '@chakra-ui/react';
import { IoSearchSharp, IoAdd } from "react-icons/io5";
import Row from './Row';
import AddReclamation from './AddReclamation';
import { GlobalContext } from '../../../context/GlobalWrapperRec';
import NavbarFront from '../../NavbarFront';

function ReclamationUser() {
  const { FetchReclamationsUser, Reclamations, isOpen, onOpen, onClose, setClaims } = useContext(GlobalContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    FetchReclamationsUser();
  }, []);

  return (
    <div style={{ marginTop: '140px' }}>
      <NavbarFront />
=======
import React from 'react'
import { useContext, useEffect } from "react";

import { Box, Button, Container, Input, Table, TableCaption, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import {FormControl} from '@chakra-ui/react'
import { IoSearchSharp, IoAdd } from "react-icons/io5";
import Row from './Row';


import AddReclamation from './AddReclamation';
import { GlobalContext } from '../../../context/GlobalWrapperRec';

function ReclamationUser() {
    const {FetchReclamations , Reclamations , isOpen, onOpen, onClose } = useContext(GlobalContext);
    
    
    // kif yetlansa component yetlansa m3ah FetchReclamations
              useEffect(() => {
                FetchReclamations();
              }, []);
  
    return (
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
      <div className="App">
        <Container maxW={'full'} p="4" fontSize={'18px'}>
          <Box rounded="lg" boxShadow="base " p="4">
            <Box mt="2" gap={'2'} mb="4" display={'flex'}>
              <FormControl>
                <Input type='text' />
              </FormControl>
<<<<<<< HEAD
              <Button leftIcon={<IoSearchSharp fontSize={'20px'} />} colorScheme='teal' variant='outline' maxW="300" minW="150px">
=======
              <Button leftIcon={  <IoSearchSharp fontSize={'20px'}/>} colorScheme='teal' variant='outline' maxW="300" minW="150px">
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
                Search
              </Button>
            </Box>
          </Box>
<<<<<<< HEAD
=======
  
  
  
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
          <Box mt="5" rounded={'lg'} boxShadow="base ">
            <Box p="4" display={'flex'} justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bold">
                List of claims
              </Text>
<<<<<<< HEAD
            </Box>
            <TableContainer>
              <Table variant='simple' className="striped-table">
                <Thead>
                  <Tr>
=======
              <Button colorScheme="teal" variant="outline" maxW="300px" minW="150px" leftIcon={  <IoAdd/> }
              onClick={onOpen}>
  
                Add Claim
              </Button>
              </Box> 
  
  
  
       
            <TableContainer>
              <Table variant='simple'>
               
                <Thead>
                  <Tr>
                    
                   
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
                    <Th>Category</Th>
                    <Th>Subject</Th>
                    <Th>Description</Th>
                    <Th>Actions</Th>
                  </Tr>
                </Thead>
                <Tbody>
<<<<<<< HEAD
                {Reclamations?.map(({ _id, Category, Subject, Description, reponses }) => (
    <Row key={_id} id={_id} Category={Category} Subject={Subject} Description={Description}  reponses={reponses}  fullDescription={Description} />
))}

                </Tbody>
              </Table>
            </TableContainer>
          </Box>
          <AddReclamation />
        </Container>
      </div>
    </div>
  );
}

export default ReclamationUser;

// Styles CSS
const styles = `
  .striped-table tbody tr:nth-child(even) {
    background-color: #f3f3f3;
  }

  .striped-table tbody tr:nth-child(odd) {
    background-color: #ffffff;
  }
`;

// Injecter les styles CSS dans le composant
const styleElement = document.createElement('style');
styleElement.innerHTML = styles;
document.head.appendChild(styleElement);
=======
                {/* Reclamations?.map : ken liste reclamations existe jibli les donnees  */}
                   {Reclamations?.map(({_id, UserName, UserId, Category, Subject, Description}) => {
                    return (
                      <Row
                      key={_id} // Assurez-vous que _id est une valeur unique pour chaque élément
                      id={_id} // Assurez-vous que l'ID est correctement transmis à Row
                      UserName={UserName}
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
 
        <AddReclamation/>
        </Container>
      </div>
    );
}

export default ReclamationUser
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
