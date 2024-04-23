// VideoCallRow.js
import React, { useContext, useEffect } from 'react';
import { Td, Tr, Box, Button, Avatar } from '@chakra-ui/react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { GlobalContext } from '../../../context/GlobalWrapperChat';

const VideoCallRow = ({ id, invitedUsers, videocallId, projectId, videocallCreator, subject, estimatedDurationMinutes, date, time  }) => {
  const { deleteVideoCall, onOpen,setSelectvideocallHandler, users , findUsers} = useContext(GlobalContext);

  useEffect(()=>{
    findUsers()
  },[])

  useEffect(()=>{
    console.log(users)
  },[users])
  
  const onChangeHandler = () => {
    onOpen(); 
    setSelectvideocallHandler({ id, videocallId,invitedUsers,  projectId, videocallCreator, subject, estimatedDurationMinutes, date, time });
  };

  return (
    <Tr>
      <Td>{videocallId}</Td>
      <Td>{projectId}</Td>
      <Td>{invitedUsers.map((member) => <div>{users?.filter((user) => user?.['_id'] == member)?.[0]?.name }</div>)}</Td>
      
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
