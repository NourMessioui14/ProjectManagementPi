import React, { useContext, useEffect } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import VideoCallRow from './videocallRow'; // Import the VideoCallRow component
import DrawerFormVideocalls from './DrawerFormVideocalls';
import { GlobalContext } from '../../../context/GlobalWrapperChat';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const VideoCalls = () => {
  const { fetchVideoCalls, videoCalls, isOpen, onOpen, onClose } = useContext(GlobalContext);

  useEffect(() => {
    fetchVideoCalls();
  }, []);

  return (
    <Box mt="5" rounded="lg" boxShadow="base">
      <Box display="flex">
        <Sidebar/>
        <Box flexGrow={1}>
          <Navbar/>
          <Box p="4" display="flex" justifyContent="space-between">
            <Text fontSize="xl" fontWeight="bold">
              List Video Calls
            </Text>
            <Button
              colorScheme="teal"
              variant="outline"
              maxW="300px"
              minW="150px"
              leftIcon={<AiOutlinePlus fontSize="20px" />}
              onClick={onOpen}
            >
              Add New Video Call
            </Button>
          </Box>

          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Video Call ID</Th>
                  <Th>Project ID</Th>
                  <Th>Subject</Th>
                  <Th>Estimated Duration (minutes)</Th>
                  <Th>Date</Th> {/* Ajout de la colonne Date */}
                  <Th>Heure</Th> {/* Ajout de la colonne Heure */}
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {videoCalls?.map(({ _id, projectId, videocallId ,subject, estimatedDurationMinutes, date, time }) => (
                  <VideoCallRow
                    key={_id}
                    id={_id}
                    videocallId={videocallId}
                    projectId={projectId}
                    subject={subject}
                    estimatedDurationMinutes={estimatedDurationMinutes}
                    date={date} // Passer la date à VideoCallRow
                    time={time} // Passer l'heure à VideoCallRow
                  />
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <DrawerFormVideocalls />
    </Box>
  );
};

export default VideoCalls;