import React, { useContext, useEffect } from 'react'
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { GlobalContext } from '../context/GlobalWrapper';
import { AiOutlinePlus } from 'react-icons/ai';
import RowTicket from './RowTicket';
import DrawerFormTicket from './DrawerFormTicket';


function TicketList({})
{
  const { FetchTickets,tickets,isOpen,onOpen,onClose } = useContext(GlobalContext);

  useEffect(() => {
    FetchTickets();
  }, []);


  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box p="4" display={'flex'} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          List of  Ticket
        </Text>
        <Button
          colorScheme="teal"
          variant="outline"
          maxW={'300px'}
          minW="150px"
          leftIcon={<AiOutlinePlus fontSize={'20px'} />}
          onClick={onOpen}
        >
          Add New Ticket
        </Button>
      </Box>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Project</Th>
              <Th>Type Of ticket </Th>
              <Th>State</Th>
              <Th>Description</Th>
              <Th>Owner</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
          {tickets?.map(({ _id, project, typeOfticket, etat, description, responsable }) => (
            <RowTicket
              key={_id}
              id={_id}
              project={project?.projectname} // Utilisez project?.projectname pour accéder au nom du projet s'il est présent
              typeOfticket={typeOfticket}
              etat={etat}
              description={description}
              responsable={responsable}
            />
          ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DrawerFormTicket/>
    </Box>
    
  );
}

export default TicketList;
