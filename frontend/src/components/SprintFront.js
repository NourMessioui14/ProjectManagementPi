import React, { useContext, useEffect, useState } from 'react';
import { Box, Text, Input, InputGroup, InputRightElement, Button,AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';

import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import { GlobalContext } from '../context/GlobalWrapper';
import DrawerFormSprint from './DrawerFormSprint';
import './SprintFront.css';

function SprintCard({ id, sprintname, description, startdate, enddate }) {
  const { DeleteSprint, onOpen, FindOneSprint } = useContext(GlobalContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

    // Fonction pour ouvrir la boîte de dialogue
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // Fonction pour fermer la boîte de dialogue
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const confirmDelete = () => {
    DeleteSprint(id);
    closeDialog();
  };

  // Fonction pour gérer la suppression du sprint
  const handleDelete = () => {
    DeleteSprint(id);
  };

  return (
    <Box className="card">
      <Text className="title">{sprintname}</Text>
      <Text className="description">{description}</Text>
      <Text className="date">Start Date: {new Date(startdate).toLocaleDateString()}</Text>
      <Text className="date">End Date: {new Date(enddate).toLocaleDateString()}</Text>
      <div>
        <Button className="show"><a href='/scrum'>show table</a></Button>
      </div> 
      <div className="actions">
        <Button className="valid" onClick={() => {
          console.log("Update button clicked");
          onOpen();
          console.log("RowSprint ID:", id);
          FindOneSprint(id);
        }}>update</Button>
        <Button className="decline" onClick={openDialog}>Delete</Button>


        

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
      </div>
    </Box>
  );
}

function SprintFront() {
  const { FetchSprints, sprints, isOpen, onOpen } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    FetchSprints();
  }, []);

  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box p="4" display={'flex'} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">List of Sprints</Text>
      </Box>
      <Box p="4" display={'flex'} justifyContent="space-between">
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
      </Box>
      <Box p="4" display={'flex'} justifyContent="space-between">
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
      <Box display="flex" justifyContent="space-around" flexWrap="wrap">
        {sprints
          .filter((sprint) =>
            sprint.sprintname.toLowerCase().includes(searchTerm.toLowerCase())
          )
          .map(({ _id, sprintname, description, startdate, enddate }) => (
            <SprintCard
              key={_id}
              id={_id}
              sprintname={sprintname}
              description={description}
              startdate={startdate}
              enddate={enddate}
            />
          ))}
      </Box>
      <DrawerFormSprint />
    </Box>
  );
}

export default SprintFront;
