import React, { useState } from 'react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Button, Text, Grid, VStack } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
function TicketDetailsByProject({ isOpen, onClose, ticket }) {

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

    
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Details of Tasks</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
        
          <VStack spacing={4} align="start"> 
            <Grid templateColumns="150px 1fr" gap={4}> 
          <Text fontSize="lg" fontWeight="bold">Type Of Ticket:</Text>
          <Text>{ticket.typeOfticket}</Text>
          <Text fontSize="lg" fontWeight="bold">State:</Text>
          <Text>{ticket.etat}</Text>
          <Text fontSize="lg" fontWeight="bold">Description:</Text>
          <Text>{ticket.description}</Text>
          <Text fontSize="lg" fontWeight="bold">Owner:</Text>
          <Text>{ticket.responsable}</Text>
            </Grid>
          </VStack>
      </ModalBody>
      
        <ModalFooter>
          {/* Bouton d'impression */}
          <Button colorScheme="teal" mr={3} onClick={(generatePDF) => window.print()}>Imprimer</Button>
          {/* Bouton de fermeture */}
          <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TicketDetailsByProject;
