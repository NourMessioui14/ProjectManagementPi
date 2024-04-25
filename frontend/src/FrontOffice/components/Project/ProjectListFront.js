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
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react';
import { IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MdMoreVert, MdStarBorder, MdStar } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import NavbarFront from '../../NavbarFront';

function ProjectListFront() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

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

  const handleDelete = async () => {
    if (selectedProject) {
      try {
        await axios.delete(`/project/${selectedProject._id}`);
        setProjects(prevProjects => prevProjects.filter(project => project._id !== selectedProject._id));
        setIsDeleteDialogOpen(false);
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  const handleOpenDeleteDialog = (project) => {
    setSelectedProject(project);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setSelectedProject(null);
    setIsDeleteDialogOpen(false);
  };

  const saveRecentProject = (projectId) => {
    const recentProjects = JSON.parse(localStorage.getItem('recentProjects')) || [];
    if (!recentProjects.includes(projectId)) {
      recentProjects.push(projectId);
      localStorage.setItem('recentProjects', JSON.stringify(recentProjects));
    }
  };

  const recentProjectIds = JSON.parse(localStorage.getItem('recentProjects')) || [];
  const recentProjectsToShow = projects.filter(project => recentProjectIds.includes(project._id));

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
      <div> 
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
                      <MenuItem onClick={() => handleOpenDeleteDialog(project)}>Move to Trash</MenuItem>
                      <MenuItem onClick={() => {navigate(`/detailsproject/${project._id}`); saveRecentProject(project._id);}}>Project Settings</MenuItem>
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
      {/* Delete Confirmation Dialog */}
      <AlertDialog isOpen={isDeleteDialogOpen} onClose={handleCloseDeleteDialog}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader>Delete Project</AlertDialogHeader>
          <AlertDialogBody>
            Are you sure you want to delete this project?
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button colorScheme="red" onClick={handleDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
    </div>
  );
}

export default ProjectListFront;
