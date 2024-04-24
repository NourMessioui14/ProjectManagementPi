import React, { useContext } from 'react';
import { Td, Tr, Box, Button } from '@chakra-ui/react';
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GlobalContext } from '../../../context/GlobalWrapperChat';
import Sidebar from '../Sidebar';

const ChatroomRow = ({ id, chatroomId, projectId, chatroomName }) => {
  const { DeleteChatroom, onOpen, setSelectChatroomHandler } = useContext(GlobalContext);

  const onChangeHandler = () => {
    onOpen(); // Ouvre le formulaire lorsque l'icône d'édition est cliquée
    setSelectChatroomHandler({ id, chatroomId, projectId, chatroomName })
  };

  return (

    <Tr>
      <Td>{chatroomId}</Td>
      <Td>{chatroomName}</Td>
      <Td>{projectId}</Td>

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