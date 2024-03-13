import React, { useContext } from 'react';
import { Td, Tr, Box, Button, Avatar } from '@chakra-ui/react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { GlobalContext } from '../../../context/GlobalWrapperChat';

const VideoCallRow = ({ id, videocallId, projectId, videocallCreatorId, subject, estimatedDurationMinutes }) => {
  const { deleteVideoCall, onOpen } = useContext(GlobalContext);

  const onChangeHandler = () => {
    onOpen(); // Open the form when the edit icon is clicked
  };

  return (
    <Tr>
      <Td>{videocallId}</Td>
      <Td>{projectId}</Td>
      
      <Td>{subject}</Td>
      <Td>{estimatedDurationMinutes}</Td>

      <Td>
        <Box display="flex" gap="1">
          <Button colorScheme="blue" onClick={onChangeHandler}>
            <AiFillEdit />
          </Button>

          <Button colorScheme="red" onClick={() => deleteVideoCall(id)}>
            <AiFillDelete />
          </Button>
        </Box>
      </Td>
    </Tr>
  );
};

export default VideoCallRow;
