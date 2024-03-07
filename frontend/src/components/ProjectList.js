// ProjectTable.js

import React, { useContext, useEffect } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { AiOutlinePlus } from "react-icons/ai";
import Row from './Row';
import { GlobalContext } from '../context/GlobalWrapper';

import DrawerForm from './DrawerForm';


function ProjectList({  }) {
  const { FetchProjects,projects,isOpen,onOpen,onClose } = useContext(GlobalContext);

  useEffect(() => {
    FetchProjects();
  }, []);
  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box p="4" display={'flex'} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          List Project
        </Text>
        <Button
          colorScheme="teal"
          variant="outline"
          maxW={'300px'}
          minW="150px"
          leftIcon={<AiOutlinePlus fontSize={'20px'} />}
          onClick={onOpen}
        >
          Add New Project
        </Button>
      </Box>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Avatar</Th>
              <Th>project Name</Th>
              <Th>chef de projet</Th>
              <Th>Description</Th>
              <Th>start date</Th>
              <Th>end date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projects?.map(({ _id, projectname, chefdeprojet, description, startdate, enddate }) => (
              <Row
                key={_id}
                id={_id}
                projectname={projectname}
                chefdeprojet={chefdeprojet}
                description={description}
                startdate={startdate}
                enddate={enddate}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DrawerForm/>
    </Box>
    
  );
}

export default ProjectList
;
