import React, { useContext, useEffect } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { AiOutlinePlus } from "react-icons/ai";
import RowSprint from './RowSprint';
import { GlobalContext } from '../context/GlobalWrapper';

import DrawerFormSprint from './DrawerFormSprint';


function SprintList({  }) {
  const { FetchSprints,sprints,isOpen,onOpen,onClose } = useContext(GlobalContext);

  useEffect(() => {
    FetchSprints();
  }, []);
  return (
    
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box p="4" display={'flex'} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          List of Sprints
        </Text>
        <Button
          colorScheme="teal"
          variant="outline"
          maxW={'300px'}
          minW="150px"
          leftIcon={<AiOutlinePlus fontSize={'20px'} />}
          onClick={onOpen}
        >
          Add New Sprint
        </Button>
      </Box>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>sprint Name</Th>
              <Th>Description</Th>
              <Th>start date</Th>
              <Th>end date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>

          <Tbody>
      {
        sprints?.map(({ _id,sprintname, description, startdate, enddate })=>(
           <RowSprint
          key={_id}
          id={_id}
          sprintname={sprintname}
          description={description}
          startdate={startdate}
          enddate={enddate}

          />
        ))
      }
    </Tbody>
          
        </Table>
      </TableContainer>
      <DrawerFormSprint/>
    </Box>
    
  );
}

export default SprintList
;
