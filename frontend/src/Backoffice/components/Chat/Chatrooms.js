import React, { useContext, useEffect } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { AiOutlinePlus } from "react-icons/ai";
import ChatroomRow from './Chatroomrow'; 
import { GlobalContext } from '../../../context/GlobalWrapperChat';
import DrawerFormChatroom from './DrawerFormChatroom';

const Chatrooms = () => {
  const { FetchChatrooms, chatrooms, isOpen, onOpen, onClose } = useContext(GlobalContext);

  useEffect(() => {
    FetchChatrooms();
  }, []);

  return (
    <Box mt="5">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Text fontSize="xl" fontWeight="bold">List Project</Text>
        <Button
          colorScheme="teal"
          variant="outline"
          maxW="300px"
          minW="150px"
          leftIcon={<AiOutlinePlus fontSize="20px" />}
          onClick={onOpen}
        >
          Add New Chatroom
        </Button>
      </Box>

      <TableContainer>
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Chatroom id</Th>
              <Th>Chatroom Name</Th>
              <Th>Project ID</Th>
              <Th>Actions</Th>  
            </Tr>
          </Thead>
          <Tbody>
            {chatrooms?.map(({ _id, projectId, chatroomId, chatroomName }) => (
              <ChatroomRow
                key={_id}
                id={_id}
                chatroomId={chatroomId}
                projectId={projectId}
                chatroomName={chatroomName}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DrawerFormChatroom />
    </Box>
  );
};

export default Chatrooms;
