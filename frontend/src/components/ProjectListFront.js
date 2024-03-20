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
  Button, // Importer Button depuis Chakra UI
} from '@chakra-ui/react';
import { IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MdMoreVert, MdStarBorder, MdStar } from "react-icons/md";

function ProjectListFront() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const projectsPerPage = 4;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('api/project');
        setProjects(response.data.map(project => ({ ...project, isFavorite: false })));
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

  // Fonction pour basculer l'état de favori
  const toggleFavorite = (projectId) => {
    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          isFavorite: !project.isFavorite
        };
      }
      return project;
    });
    setProjects(updatedProjects);
  };

  // Filtrer les projets en fonction du terme de recherche
  const filteredProjects = projects.filter(project =>
    project.projectname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Index du dernier projet de la page
  const indexOfLastProject = currentPage * projectsPerPage;
  // Index du premier projet de la page
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  // Projets actuellement affichés sur la page
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div style={{ marginTop: '140px' }}>
      <HStack marginBottom="10px">
        <Input
          placeholder="Search project"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="sm"
          width="200px"
        />
        <Button  className="main-button">Add project</Button>
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
              <Tr key={project.id}>
                <Td>
                  <IconButton
                    aria-label="Toggle favorite"
                    icon={project.isFavorite ? <MdStar color="yellow" /> : <MdStarBorder />}
                    onClick={() => toggleFavorite(project.id)}
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
