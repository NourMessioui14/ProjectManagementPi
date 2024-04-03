<<<<<<< HEAD
=======
<<<<<<< HEAD
=======
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
/*import { Td, Tr, Box, Button, Avatar } from '@chakra-ui/react'
import React, { useContext } from 'react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GlobalContext } from '../context/GlobalWrapper';

function RowSprint({ id, sprintname, description, startdate, enddate}) {
  const { DeleteSprint,isOpen, onOpen, onClose,FindOneSprint  } = useContext(GlobalContext);


  const onChangeHandler = () => {
    onOpen(); // Ouvre le formulaire lorsqu'on clique sur l'icône d'édition
  };

 
  return (
    <Tr>
      <Td>{sprintname}</Td>
      <Td>{description}</Td>
      <Td>{startdate}</Td>
      <Td>{enddate}</Td>

      <Td> 
        <Box display="flex" gap="1">
          <Button colorScheme="blue">
            <AiFillEdit
            onClick={() => {
              onChangeHandler();
              FindOneSprint(id);
            }}/>
          </Button>

          <Button colorScheme="red"  onClick={() => DeleteSprint(id)}>
            <AiFillDelete  />
          </Button>
        </Box>
      </Td>
    </Tr>
  )
}

export default RowSprint;
*/
<<<<<<< HEAD
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
import React, { useContext, useState, useEffect } from 'react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { Box, Button, Td, Tr, Table, Thead, Tbody, Th,AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';

<<<<<<< HEAD
function RowSprint({ id, sprintname, description, startdate, enddate, tickets }) {
  const { DeleteSprint, onOpen, FindOneSprint } = useContext(GlobalContext);
=======
<<<<<<< HEAD

function RowSprint({ id, sprintname,project, description, startdate, enddate, tickets }) {
  const { DeleteSprint, onOpen, FindOneSprint,FindOneProject } = useContext(GlobalContext);
=======
function RowSprint({ id, sprintname, description, startdate, enddate, tickets }) {
  const { DeleteSprint, onOpen, FindOneSprint } = useContext(GlobalContext);
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
  const [showTickets, setShowTickets] = useState(false);

  const [isDialogOpen, setIsDialogOpen] = useState(false);

<<<<<<< HEAD
=======
<<<<<<< HEAD
  const handleEditClick = () => {
    FindOneProject(id); // Appeler FindOneProject avec l'ID lors du clic sur le bouton "Edit"
    onOpen();
  };

=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    // Fonction pour ouvrir la boîte de dialogue
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // Fonction pour fermer la boîte de dialogue
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  // Fonction pour supprimer le sprint après confirmation
  const confirmDelete = () => {
    DeleteSprint(id);
    closeDialog();
  };



  const toggleTickets = () => {
    setShowTickets(!showTickets);
    console.log("Show Tickets button clicked");
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
<<<<<<< HEAD
=======
<<<<<<< HEAD
        <Td>{project}</Td>
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
        <Td>{description}</Td>
        <Td>{startdate}</Td>
        <Td>{enddate}</Td>

        <Td>
          <Box display="flex" gap="1">
<<<<<<< HEAD
            <Button colorScheme="blue" onClick={toggleTickets}>
              {showTickets ? 'Hide Tickets' : 'Show Tickets'}
            </Button>
=======
<<<<<<< HEAD
          <Button colorScheme="blue" onClick={() => toggleTickets(id)}>
  {showTickets ? 'Hide Tickets' : 'Show Tickets'}
</Button>

=======
            <Button colorScheme="blue" onClick={toggleTickets}>
              {showTickets ? 'Hide Tickets' : 'Show Tickets'}
            </Button>
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7

            <Button colorScheme="blue">
              <AiFillEdit
                onClick={() => {
                  onOpen();
                  FindOneSprint(id);
                }}
              />
            </Button>

            {/* Bouton de suppression avec confirmation */}
          <Button colorScheme="red" onClick={openDialog}>
            <AiFillDelete />
          </Button>

          {/* Boîte de dialogue de confirmation */}
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
                  <Button onClick={closeDialog}>
                    Cancel
                  </Button>
                  <Button colorScheme="red" onClick={confirmDelete} ml={3}>
                    Delete
                  </Button>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialogOverlay>
          </AlertDialog>
          </Box>
        </Td>
      </Tr>

      {showTickets && (
<<<<<<< HEAD
=======
<<<<<<< HEAD
  <Tr>
    <Td colSpan={5}>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Tickets</Th>
            {/* Add more columns as needed */}
          </Tr>
        </Thead>
        <Tbody>
          {tickets &&
            tickets.map((ticket) => (
              <Tr key={ticket._id}>
                <Td>{ticket._id}</Td>
                <Td>{ticket.description}</Td>
                {/* Add more cells as needed */}
              </Tr>
            ))}
        </Tbody>
      </Table>
    </Td>
  </Tr>
)}

=======
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
        <Tr>
          <Td colSpan={5}>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Tickets</Th>
                  {/* Add more columns as needed */}
                </Tr>
              </Thead>
              <Tbody>
                {tickets &&
                  tickets.map((ticket) => (
                    <Tr key={ticket._id}>
                      <Td>{ticket._id}</Td>
                      <Td>{ticket.description}</Td>
                      {/* Add more cells as needed */}
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </Td>
        </Tr>
      )}
<<<<<<< HEAD
=======
>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
    </>
  );
}

export default RowSprint;
<<<<<<< HEAD

=======
<<<<<<< HEAD
=======

>>>>>>> a0d2c943764f0954ae192d7b0270f75320249920
>>>>>>> 36b4c5644c97fd2ae1e25ff21e013e74f27af7d7
