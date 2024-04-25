import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Input, Stack, Text, useColorModeValue, Button, HStack, IconButton } from '@chakra-ui/react';
import Row from './RowReclamation';
import AddReclamation from "./AddReclamation";
import { GlobalContext } from "../../../context/GlobalWrapperRec";
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ChartRecComponent from './ChartRec';

function ReclamationsList() {
    const { FetchReclamations, Reclamations } = useContext(GlobalContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [reclamationsPerPage] = useState(5); // Nombre de réclamations par page

    useEffect(() => {
        FetchReclamations();
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };
    

    const filteredReclamations = Reclamations.filter((reclamation) =>
        reclamation.Subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamation.Category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamation.Description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamation.user?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reclamation.reponses.some(response => response.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    // Calculer le nombre total de pages
    const totalPages = Math.ceil(filteredReclamations.length / reclamationsPerPage);

    // Calculer l'index de la première et de la dernière réclamation sur la page actuelle
    const indexOfLastReclamation = currentPage * reclamationsPerPage;
    const indexOfFirstReclamation = indexOfLastReclamation - reclamationsPerPage;
    const currentReclamations = filteredReclamations.slice(indexOfFirstReclamation, indexOfLastReclamation);

    return (
        <Box mt="5" rounded={'lg'} boxShadow="base">
            <Box display="flex">
                <Sidebar position="fixed" />
                <Box flexGrow={1}>
                    <Navbar />
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

                        <Box mt="5" rounded={'lg'} boxShadow="base " p="4">
                            <Box p="4">
                                <AddReclamation />
                                <Text fontSize="xl" fontWeight="bold" mb="4" >
                                    List of claims
                                </Text>
                                {currentReclamations.map(({ _id, user, Category, Subject, Description, reponses,createdAt }) => (
                                    <Row
                                        key={_id}
                                        id={_id}
                                        user={user}
                                        Category={Category}
                                        Subject={Subject}
                                        Description={Description}
                                        reponses={reponses}
                                        createdAt={createdAt}
                                    />
                                ))}
                                <Box mt="4" textAlign="center">
                                    <Text fontFamily="sans-serif">Page {currentPage} of {totalPages}</Text>
                                    <HStack spacing="4" mt="2" justify="center">
                                        <IconButton
                                            colorScheme="teal"
                                            icon={<ChevronLeftIcon />}
                                            onClick={handlePrevPage}
                                            disabled={currentPage === 1}
                                        />
                                        <IconButton
                                            colorScheme="teal"
                                            icon={<ChevronRightIcon />}
                                            onClick={handleNextPage}
                                            disabled={indexOfLastReclamation >= filteredReclamations.length}
                                        />
                                    </HStack>
                                </Box>
                            </Box>
                        </Box>
                    </Container>
                </Box>
            </Box>

       
        </Box>
    );
}

export default ReclamationsList;
