// VideoCallRow.js
import React, { useContext } from 'react';
import { Td, Tr, Box, Button, Avatar } from '@chakra-ui/react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { GlobalContext } from '../../../context/GlobalWrapperChat';

const VideoCallRow = ({ id, videocallId, projectId, videocallCreator, subject, estimatedDurationMinutes, date, time }) => {
  const { deleteVideoCall, onOpen,setSelectvideocallHandler } = useContext(GlobalContext);

  const onChangeHandler = () => {
    onOpen(); 
    setSelectvideocallHandler({ });
  };

  return (
    <Tr>
      <Td>{videocallId}</Td>
      <Td>{projectId}</Td>
      
      <Td>{subject}</Td>
      <Td>{estimatedDurationMinutes}</Td>
      <Td>{date}</Td> 
      <Td>{time}</Td> 

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
