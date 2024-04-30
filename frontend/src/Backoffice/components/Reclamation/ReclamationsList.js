import React, { useContext, useEffect, useState } from 'react';
import { Box, Container, Input, Stack, Text, useColorModeValue, Button, HStack, IconButton, Flex } from '@chakra-ui/react';
import Row from './RowReclamation';
import AddReclamation from "./AddReclamation";
import { GlobalContext } from "../../../context/GlobalWrapperRec";
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import ChartRecComponent from './ChartRec';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai';

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
    const indexOfLastProject = currentPage * reclamationsPerPage;
    // Index du premier projet de la page
    const indexOfFirstProject = indexOfLastProject - reclamationsPerPage;
    // Projets actuellement affichés sur la page
    const currentProjects = filteredReclamations.slice(indexOfFirstProject, indexOfLastProject);

    // Changer de page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);




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

                    <Container maxW={'full'} p="4" fontSize={'18px'} >



                        <Box mt="5" rounded={'lg'} boxShadow="base " p="4">
                            <Box p="4">

                                <Flex align="center" justify="space-between">
                                    <Text fontSize="18" fontWeight="bold" mb="">
                                        List of claims
                                    </Text>
                                    <Box ml="4">
                                        <Stack direction="row" spacing="4" alignItems="center">
                                            <Input maxW="300px"
                                                minW="300px"
                                                borderRadius="20px"
                                                fontSize="14"
                                                type="text"
                                                placeholder="Search"
                                                value={searchTerm}
                                                onChange={handleSearchChange}
                                                bg="white"
                                                borderColor="gray.200"
                                            />
                                        </Stack>
                                    </Box>
                                </Flex>



                                <Box mt="5" rounded={'lg'} boxShadow="base" overflowY="auto" maxH="500px">
                                    {currentReclamations.map(({ _id, user, Category, Subject, Description, reponses, createdAt }) => (
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

                                </Box>
                            </Box>
                        </Box>

                        <Flex justifyContent="center" alignItems="center" mt="4">
                            <Button onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1} leftIcon={<AiOutlineArrowLeft />}>
                            </Button>
                            <Box mx="2" p="2" borderRadius="md" bgColor="teal" color="white" fontSize="16px">Page {currentPage}</Box>
                            <Button onClick={() => paginate(currentPage + 1)} disabled={indexOfLastProject >= filteredReclamations.length} rightIcon={<AiOutlineArrowRight />}>
                            </Button>
                        </Flex>

                        {/* <Box mt="4" textAlign="center">
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
                                </Box> */}


                    </Container>
                </Box>
            </Box>


        </Box>
    );
}

export default ReclamationsList;
