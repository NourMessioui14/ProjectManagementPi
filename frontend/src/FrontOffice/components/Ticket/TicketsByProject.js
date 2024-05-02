import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, Text, Input, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { AiOutlinePlus, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { GlobalContext } from '../../../context/GlobalWrapper';
import RowTicketByProject from './RowTicketByProject';
import { Flex, Center } from '@chakra-ui/react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { DownloadIcon } from '@chakra-ui/icons'

function TicketsByProject({ isOpen, onClose, id }) { // Prend projectId comme prop
  const { fetchTicketsByProjectId, tickets, FetchTickets } = useContext(GlobalContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [ticketsPerPage] = useState(4);

  useEffect(() => {
    if (isOpen && id) { 
      fetchTicketsByProjectId(id); 
    }
  }, [isOpen, id]); 

  // Logique de pagination et de filtrage
  const filteredTickets = tickets.filter(ticket =>
    ticket.project?.projectname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.typeOfticket?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastTicket = currentPage * ticketsPerPage;
  const indexOfFirstTicket = indexOfLastTicket - ticketsPerPage;
  const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

      
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
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>List of Tickets</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            placeholder="Search ticket"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Table variant="simple">
            <Thead>
              <Tr>
                
                <Th>Type Of Ticket</Th>
                <Th>State</Th>
                <Th>Description</Th>
                <Th>Owner</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentTickets.map(({ _id, typeOfticket, etat, description, responsable }) => (
                <RowTicketByProject
                  key={_id}
                  id={_id}
                  typeOfticket={typeOfticket}
                  etat={etat}
                  description={description}
                  responsable={responsable?.name || 'Unknown'}
                />
              ))}
            </Tbody>
           
          </Table>
          
        </ModalBody>
        <ModalFooter>
        <Button colorScheme="gray" variant='outline' mr={3} onClick={(generatePDF) => window.print()}   leftIcon={<DownloadIcon fontSize={'20px'} />}
>Print tickets details</Button>

          <Button colorScheme="blue" mr={3} onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TicketsByProject;
