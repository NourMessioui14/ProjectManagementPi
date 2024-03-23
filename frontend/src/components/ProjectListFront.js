import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  HStack,
  PinInput,
  PinInputField,
  Input,
  Button,
} from '@chakra-ui/react';
import { IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MdMoreVert, MdStarBorder, MdStar } from "react-icons/md";
import { Link } from 'react-router-dom';

function ProjectListFront() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const projectsPerPage = 4;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('api/project');
        setProjects(response.data); // Assume que `response.data` contient l'état de favori correct pour chaque projet
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
  
    fetchProjects();
  }, []);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const truncateDescription = (description, maxLength) => {
    const words = description.split(' ');
    const lines = [];
    let currentLine = '';
    let wordCount = 0;
    words.forEach(word => {
      if (wordCount < maxLength) {
        currentLine += word + ' ';
        wordCount++;
      } else {
        lines.push(currentLine);
        currentLine = word + ' ';
        wordCount = 1; // Reset word count for new line
      }
    });
    if (currentLine !== '') lines.push(currentLine); // Push the remaining words
    return lines.map((line, index) => <p key={index}>{line}</p>);
  };

 

  // Filtrer les projets en fonction du terme de recherche
  const filteredProjects = projects.filter(project =>
    project.projectname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const toggleFavorite = async (projectId) => {
    try {
        // Envoyer une requête HTTP PUT pour mettre à jour l'état de favori dans la base de données
        await axios.put(`/api/project/${projectId}/favorite`);
        // Mettre à jour l'état de favori dans le state local du composant de manière immuable
        const updatedProjects = projects.map(project => {
            if (project._id === projectId) {
                // Créer une nouvelle copie du projet avec le statut de favori inversé
                return { ...project, isFavorite: !project.isFavorite };
            }
            return project;
        });
        setProjects(updatedProjects); // Mettre à jour l'état avec les nouveaux projets
    } catch (error) {
        console.error('Error toggling favorite:', error);
        // Afficher un message d'erreur ou gérer l'erreur d'une autre manière
    }
};




  // Index du dernier projet de la page
  const indexOfLastProject = currentPage * projectsPerPage;
  // Index du premier projet de la page
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  // Projets actuellement affichés sur la page
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div style={{ marginTop: '140px' }}>
      <HStack justifyContent="space-between" marginBottom="10px">
        <Input
          placeholder="Search project"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="sm"
          width="200px"
        />
        <Link to="/CreateProjectForm">
        <Button className="main-button">Create Project</Button>
      </Link>
      </HStack>
      <TableContainer>
        <Table variant='striped' style={{ backgroundColor: '#fff', fontSize: '14px' }}>
          <Thead>
            <Tr>
              <Th>Favorite</Th>
              <Th>Name</Th>
              <Th>Responsible</Th>
              <Th>Description</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
           {currentProjects.map((project) => (
  <Tr key={project._id}>
    <Td>
    <IconButton
    aria-label="Toggle favorite"
    icon={project.isFavorite ? <MdStar color="yellow" /> : <MdStarBorder />}
    onClick={() => toggleFavorite(project._id)}
  />
  
    
                </Td>
                <Td>{project.projectname}</Td>
                <Td>{project.chefdeprojet}</Td>
                <Td>
                  {truncateDescription(project.description, 15)}
                </Td>
                <Td>
                  <Menu>
                    <MenuButton as={IconButton} aria-label="Options" icon={<MdMoreVert />} />
                    <MenuList>
                      <MenuItem>Archive project</MenuItem>
                      <MenuItem>Move to Trash</MenuItem>
                      <MenuItem>Project Settings</MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {/* Pagination */}
      <HStack marginTop="20px">
        {Array.from({ length: Math.ceil(filteredProjects.length / projectsPerPage) }).map((_, index) => (
          <PinInput key={index} value={currentPage === index + 1 ? currentPage.toString() : ''}>
            <PinInputField onClick={() => paginate(index + 1)} />
          </PinInput>
        ))}
      </HStack>
    </div>
  );
}

export default ProjectListFront;
