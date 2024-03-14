import React, { useContext, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Table,
  TableContainer,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
  Input,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { GlobalContext } from '../context/GlobalWrapper';
import RowSprint from './RowSprint';
import DrawerFormSprint from './DrawerFormSprint';

function SprintList({}) {
  const { FetchSprints, sprints, isOpen, onOpen } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    FetchSprints();
  }, []);

  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box p="4" display={'flex'} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          List of Sprints
        </Text>
        <InputGroup>
          <Input
            placeholder="Search Sprint"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <InputRightElement>
            <AiOutlineSearch color="gray.500" />
          </InputRightElement>
        </InputGroup>
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
            {sprints
              .filter((sprint) =>
                sprint.sprintname.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map(({ _id, sprintname, description, startdate, enddate }) => (
                <RowSprint
                  key={_id}
                  id={_id}
                  sprintname={sprintname}
                  description={description}
                  startdate={startdate}
                  enddate={enddate}
                />
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DrawerFormSprint />
    </Box>
  );
}

export default SprintList;