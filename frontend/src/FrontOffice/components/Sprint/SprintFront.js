import React, { useContext, useEffect, useState } from 'react';
import { Box, Text, Input,InputRightElement, InputGroup, Button,AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Tooltip } from '@chakra-ui/react';

import { AiOutlinePlus } from 'react-icons/ai';
import DrawerFormSprint from '../../../Backoffice/components/Sprint/DrawerFormSprint';
import { GlobalContext } from '../../../context/GlobalWrapperSprint';
import NavbarFront from '../../NavbarFront';
import './SprintFront.css';
import { useParams, useNavigate } from 'react-router-dom';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import TicketsBySprint from './TicketsBySprint';
import { DownloadIcon, WarningTwoIcon,ArrowBackIcon } from '@chakra-ui/icons'

function SprintCard({ id, sprintname,description, startdate, enddate }) {
  const { DeleteSprint, onOpen, FindOneSprint } = useContext(GlobalContext);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { sprintId } = useParams();
  const navigate = useNavigate();

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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSprintId, setSelectedSprintId] = useState(null); // État pour stocker l'ID du sprint sélectionné

  const openModal = (sprintId) => { // Prend l'ID du sprint comme argument
    setSelectedSprintId(sprintId); // Met à jour l'ID du sprint sélectionné
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box className="cards">
      <div className="text">
        <span>{sprintname}</span>
        <p className="subtitle">{description}</p>
        <Text className="date">Start Date: {new Date(startdate).toLocaleDateString()}</Text>
      <Text className="date">End Date: {new Date(enddate).toLocaleDateString()}</Text>
        </div>
        <div className="buttonSH-container">
        <Button class="buttonSH" onClick={() => openModal(id)}><span class="buttonSH-content">Show Tickets</span></Button> {/* Passe l'ID du sprint */}
        <TicketsBySprint isOpen={isModalOpen} onClose={closeModal} id={selectedSprintId} /> {/* Passe l'ID du sprint au modal */}
      

<button class="buttonSH" style={{ marginLeft: '10px' }}>
<a href={`/scrum?name=${sprintname}&description=${description}&id=${id}`}>  

  <span class="buttonSH-content"> Show Table </span></a>
</button>
{/* <Button onClick={() => navigate(`/TicketsBySprint/${id}`)}>Show tickets</Button> */}


      </div>
      <button>
      <div className="icons">
      <Tooltip hasArrow label='Update Sprint' bg='green.600' placement='bottom'>

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
  </Tooltip>
  <Tooltip hasArrow label='Delete Sprint' bg='red.600' placement='bottom'>

  <Button className="btn btn-wide decline" onClick={openDialog}>
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-lg" viewBox="0 0 16 16">
      <path d="M12.354 3.646a.5.5 0 0 1 0 .708L8.707 8l3.647 3.646a.5.5 0 0 1-.708.708L8 8.707l-3.646 3.647a.5.5 0 0 1-.708-.708L7.293 8 3.646 4.354a.5.5 0 0 1 .708-.708L8 7.293l3.646-3.647a.5.5 0 0 1 .708 0z"/>
    </svg>
  </Button>
  </Tooltip>
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
  const { FetchSprints, sprints, onOpen,fetchSprintsByProjectId,FetchTickets } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const { projectId } = useParams(); // Obtenir l'ID du projet à partir des paramètres d'URL


  // useEffect(() => {
  //   FetchSprints();
  // }, []);
  useEffect(() => {
    fetchSprintsByProjectId(projectId);
  }, [projectId, fetchSprintsByProjectId]); 

  const filteredSprints = sprints.filter(sprint =>
    sprint.sprintname.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const navigate = useNavigate();

    
const generatePDF = () => {
  html2canvas(document.querySelector("#capture")).then(canvas => {
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF({
      orientation: 'landscape',
    });
    pdf.addImage(imgData, 'JPEG', 0, 0);
    pdf.save("download.pdf");
  });
};

  return (
    <div style={{ marginTop: '140px' }}>
     
      <NavbarFront/> 
     
      <div> 

    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box p="4" display={'flex'} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold"></Text>
      </Box>
      <Button colorScheme='blackAlpha'  leftIcon={<ArrowBackIcon fontSize={'16px'} />}
  onClick={() => navigate(-1)} ml={4} size='sm'>Go Back</Button>
      <Box p="4" display={'flex'} justifyContent="space-between">
          

<Button
  colorScheme='purple'
  borderRadius='md'
  leftIcon={<AiOutlinePlus fontSize={'20px'} />}
  onClick={onOpen}
>
  Add New Sprint
</Button>
<InputGroup className="input__container--variant">
  
      <Input
        className="input__search--variant"
        placeholder="Search Sprint"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </InputGroup>
    
<Button colorScheme="purple" mr={3} onClick={(generatePDF) => window.print()} 
  leftIcon={<DownloadIcon fontSize={'20px'} />}
  >Print details</Button>


</Box>
{filteredSprints.length === 0 ? (
            <Box textAlign="center" p="4">
              <Box>
              <WarningTwoIcon boxSize={40} color='grey'/>
              </Box>
              <Box>
              <Text as='b' fontSize='2xl' color='grey' > You Haven't Added Any Sprint To This Project</Text>
              </Box>
            </Box>
          ) : (
<Box display="flex" justifyContent="space-around" flexWrap="wrap">
{filteredSprints
  .map(({ _id, sprintname,project, description, startdate, enddate}) => (
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
)}
<DrawerFormSprint />
</Box>

</div>
</div>
);
}

export default SprintFront;
