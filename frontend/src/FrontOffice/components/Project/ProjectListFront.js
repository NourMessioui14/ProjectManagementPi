import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { IconButton, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { MdMoreVert } from "react-icons/md";

function ProjectListFront() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('api/project');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div style={{ marginTop: '140px' }}>
      <TableContainer>
        <Table variant='striped' style={{ backgroundColor: '#fff', fontSize: '14px' }}>
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Responsible</Th>
              <Th>Description</Th>
              <Th>Action</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects.map((project) => (
              <Tr key={project.id}>
                <Td>{project.projectname}</Td>
                <Td>{project.chefdeprojet}</Td>
                <Td>{project.description}</Td>
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
    </div>
  );
}

export default ProjectListFront;
