import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  HStack,
  Input,
  Button,
} from '@chakra-ui/react';
import { IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MdMoreVert, MdStarBorder, MdStar } from "react-icons/md";
import { Link } from 'react-router-dom';
import NavbarFront from '../../NavbarFront';

function ProjectListFront() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const projectsPerPage = 4;

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('project');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };
    fetchProjects();
  }, []);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const toggleFavorite = async (projectId) => {
    try {
      await axios.put(`/project/${projectId}/favorite`);
      const updatedProjects = projects.map(project => {
        if (project._id === projectId) {
          return { ...project, isFavorite: !project.isFavorite };
        }
        return project;
      });
      setProjects(updatedProjects);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

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
        wordCount = 1;
      }
    });
    if (currentLine !== '') lines.push(currentLine);
    return lines.map((line, index) => <p key={index}>{line}</p>);
  };

  const filteredProjects = projects.filter(project =>
    project.projectname.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  return (
    <div style={{ marginTop: '140px' }}>
      <NavbarFront/>
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
          <Button key={index} onClick={() => paginate(index + 1)} disabled={currentPage === index + 1}>{index + 1}</Button>
        ))}
      </HStack>
    </div>
  );
}

export default ProjectListFront;
