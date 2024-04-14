import React, { useContext, useEffect } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { AiOutlinePlus } from "react-icons/ai";
import ChatroomRow from './Chatroomrow'; 
import { GlobalContext } from '../../../context/GlobalWrapperChat';
import DrawerFormChatroom from './DrawerFormChatroom';
import Navbar from '../Navbar';
import Sidebar from '../Sidebar';

const Chatrooms = () => {
  const { FetchChatrooms, chatrooms, isOpen, onOpen, onClose, findUsers, FetchProjects } = useContext(GlobalContext);

  useEffect(() => {
    FetchChatrooms();
    findUsers()
    FetchProjects()
  }, []);
 

  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box display="flex">
        <Sidebar/>
        <Box flexGrow={1}>
          <Navbar/>
          <Box p="4">
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">Chatrooms list</Text>
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
                    <Th>Members</Th>
                    <Th>Actions</Th>  
                  </Tr>
                </Thead>
                <Tbody>
                  {chatrooms?.map(({ _id, projectId, chatroomId, chatroomName, members }) => (
                    <ChatroomRow
                      key={_id}
                      id={_id}
                      chatroomId={chatroomId}
                      projectId={projectId}
                      chatroomName={chatroomName}
                      members={members}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
      <DrawerFormChatroom />
    </Box>
  );
};

export default Chatrooms;