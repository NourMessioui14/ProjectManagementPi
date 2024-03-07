import React, { useContext } from 'react';
import { Td, Tr, Box, Button, Avatar } from '@chakra-ui/react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GlobalContext } from '../context/GlobalWrapper';

const ChatroomRow = ({ id,chatroomId, projectId, chatroomCreatorId, chatroomName }) => {
  const { DeleteChatroom, onOpen } = useContext(GlobalContext);

  const onChangeHandler = () => {
    onOpen(); // Open the form when the edit icon is clicked
  };

  return (
    <Tr>
      <Td>{chatroomId}</Td>
      <Td>{chatroomName}</Td>
      <Td>{projectId}</Td>
      <Td>{chatroomCreatorId}</Td>
      

      <Td>
        <Box display="flex" gap="1">
          <Button colorScheme="blue" onClick={onChangeHandler}>
            <AiFillEdit />
          </Button>

          <Button colorScheme="red" onClick={() => DeleteChatroom(id)}>
            <AiFillDelete />
          </Button>
        </Box>
      </Td>
    </Tr>
  );
};

export default ChatroomRow;