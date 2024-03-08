import React, { useContext, useEffect } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import VideocallRow from './videocallRow'; // Import the VideoCallRow component
import { GlobalContext } from '../context/GlobalWrapper';

import DrawerFormVideocalls from './DrawerFormVideocalls';

const VideoCalls = () => {
  const { fetchVideoCalls, videoCalls, isOpen, onOpen, onClose } = useContext(GlobalContext);

  useEffect(() => {
    fetchVideoCalls();
  }, []);

  return (
    <Box mt="5" rounded="lg" boxShadow="base">
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
              <Th>Video Call Creator</Th>
              <Th>Subject</Th>
              <Th>Estimated Duration (minutes)</Th>
            </Tr>
          </Thead>
          <Tbody>
            {videoCalls?.map(({ _id, projectId, videocallId, videocallCreatorId, subject, estimatedDurationMinutes }) => (
              <VideocallRow
                key={_id}
                id={_id}
                videocallId={videocallId}
                projectId={projectId}
                videocallCreatorId={videocallCreatorId}
                subject={subject}
                estimatedDurationMinutes={estimatedDurationMinutes}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DrawerFormVideocalls />
    </Box>
  );
};

export default VideoCalls;
