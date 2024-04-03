import React, { useContext, useEffect, useState } from 'react';
import { Box, Text, Input, InputGroup, InputRightElement, Button,AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter } from '@chakra-ui/react';

import { AiOutlinePlus, AiOutlineSearch } from 'react-icons/ai';
import DrawerFormSprint from '../../../Backoffice/components/Sprint/DrawerFormSprint';
import './SprintFront.css';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';

function SprintCard({ id, sprintname,project, description, startdate, enddate }) {
  const { DeleteSprint, onOpen, FindOneSprint } = useContext(GlobalContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

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

  const handleShowTable = () => {
    // Save the project attribute to localStorage
    localStorage.setItem('selectedProjectID', project._id);
    
    // Log the saved value for verification
    console.log("selected ProjectID:", project._id);
    
    // Proceed with other actions...
    // For example, redirecting or opening the table
  };

  return (
    <Box className="card">
      <div className="text">
        <span>{sprintname}</span>
        <p className="subtitle">{description}</p>
        <Text className="date">Start Date: {new Date(startdate).toLocaleDateString()}</Text>
      <Text className="date">End Date: {new Date(enddate).toLocaleDateString()}</Text>
        </div>
        <div className="buttonSH-container">

        {/* <button class="buttontable">
          <a href={`/scrum?name=${sprintname}&description=${description}`}> Show Table </a>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
          <path fill="currentColor" d="M8.29 7.71a.996.996 0 0 0 0 1.41L12.59 12 8.29 16.29a.996.996 0 1 0 1.41 1.41l5.3-5.3a.996.996 0 0 0 0-1.41L9.7 6.29a.996.996 0 0 0-1.41 0z"/>
          </svg>
        </button> */}

<button class="buttonSH">
{/* <a href={`/scrum?name=${sprintname}&description=${description}&id=${id}`} onClick={handleShowTable}>   */}
<a href={`/scrum?name=${sprintname}&description=${description}&id=${id}`} onClick={handleShowTable}>  

  <span class="buttonSH-content"> Show Table </span></a>
</button>

      </div>
      <button>
      <div className="icons">
  <Button className="btn btn-wide update" onClick={() => {
    console.log("Second button clicked");
    onOpen();
    console.log("RowSprint ID:", id);
    FindOneSprint(id);
  }}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-repeat" viewBox="0 0 16 16" >
      <path d="M11.534 7h3.932a.25.25 0 0 1 .192.41l-1.966 2.36a.25.25 0 0 1-.384 0l-1.966-2.36a.25.25 0 0 1 .192-.41zm-11 2h3.932a.25.25 0 0 0 .192-.41L2.692 6.23a.25.25 0 0 0-.384 0L.342 8.59A.25.25 0 0 0 .534 9z"></path>
      <path fill-rule="evenodd" d="M8 3c-1.552 0-2.94.707-3.857 1.818a.5.5 0 1 1-.771-.636A6.002 6.002 0 0 1 13.917 7H12.9A5.002 5.002 0 0 0 8 3zM3.1 9a5.002 5.002 0 0 0 8.757 2.182.5.5 0 1 1 .771.636A6.002 6.002 0 0 1 2.083 9H3.1z"></path>
    </svg>
  </Button>
  <Button className="btn btn-wide decline" onClick={openDialog}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M12.354 3.646a.5.5 0 0 1 0 .708L8.707 8l3.647 3.646a.5.5 0 0 1-.708.708L8 8.707l-3.646 3.647a.5.5 0 0 1-.708-.708L7.293 8 3.646 4.354a.5.5 0 0 1 .708-.708L8 7.293l3.646-3.647a.5.5 0 0 1 .708 0z"/>
    </svg>
  </Button>
</div>
</button>
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
  );
}

function SprintFront() {
  const { FetchSprints, sprints, onOpen } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    FetchSprints();
  }, []);

  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box p="4" display={'flex'} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">List of Sprints</Text>
      </Box>
      <Box p="4"
display={'flex'} justifyContent="space-between">
<Button
  class="buttonAS"
  leftIcon={<AiOutlinePlus fontSize={'20px'} />}
  onClick={onOpen}
>
  Add New Sprint
</Button>
{/* </Box>
<Box p="4" display={'flex'} justifyContent="space-between"> */}

<InputGroup className="input__container--variant">
      <Input
        className="input__search--variant"
        placeholder="Search Sprint"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </InputGroup>
</Box>
<Box display="flex" justifyContent="space-around" flexWrap="wrap">
{sprints
  .filter((sprint) =>
    sprint.sprintname.toLowerCase().includes(searchTerm.toLowerCase())
  )
  .map(({ _id, sprintname,project, description, startdate, enddate }) => (
    <SprintCard
      key={_id}
      id={_id}
      sprintname={sprintname}
      project={project}
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
