import React, { useContext, useState, useEffect } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Box, Button, Td, Tr, Table, Thead, Tbody, Th, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';

function RowSprint({ id, sprintname, description, startdate, enddate, tickets }) {
  const { DeleteSprint, onOpen, FindOneSprint } = useContext(GlobalContext);
  const [showTickets, setShowTickets] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleEditClick = () => {
    onOpen();
    FindOneSprint(id);
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const confirmDelete = () => {
    DeleteSprint(id);
    closeDialog();
  };

  const toggleTickets = () => {
    setShowTickets(!showTickets);
  };

  useEffect(() => {
    if (tickets && tickets.length > 0) {
      setShowTickets(true);
    } else {
      setShowTickets(false);
    }
  }, [tickets]);

  return (
    <>
      <Tr>
        <Td>{sprintname}</Td>
        <Td>{description}</Td>
        <Td>{startdate}</Td>
        <Td>{enddate}</Td>

        <Td>
          <Box display="flex" gap="1">
            <Button colorScheme="blue" onClick={toggleTickets}>
              {showTickets ? 'Hide Tickets' : 'Show Tickets'}
            </Button>

            <Button colorScheme="blue" onClick={handleEditClick}>
              <AiFillEdit />
            </Button>

            <Button colorScheme="red" onClick={openDialog}>
              <AiFillDelete />
            </Button>
          </Box>
        </Td>
      </Tr>

      {showTickets && (
        <Tr>
          <Td colSpan={5}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Tickets</Th>
                </Tr>
              </Thead>
              <Tbody>
                {tickets &&
                  tickets.map((ticket) => (
                    <Tr key={ticket._id}>
                      <Td>{ticket._id}</Td>
                      <Td>{ticket.description}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Td>
        </Tr>
      )}

      <AlertDialog isOpen={isDialogOpen} onClose={closeDialog}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Confirm Delete
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete this sprint? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}

export default RowSprint;