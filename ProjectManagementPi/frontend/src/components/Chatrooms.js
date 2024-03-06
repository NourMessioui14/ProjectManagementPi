import React, { useContext, useEffect } from 'react';
import { Box, Button, Table, TableContainer, Tbody, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { AiOutlinePlus } from "react-icons/ai";
import ChatroomRow from './Chatroomrow'; 
import { GlobalContext } from '../context/GlobalWrapper';

import DrawerForm from './DrawerForm';

const Chatrooms = () => {
  const { FetchChatrooms, chatrooms, isOpen, onOpen, onClose } = useContext(GlobalContext);

  useEffect(() => {
    FetchChatrooms();
  }, []);

  return (
    <Box mt="5" rounded={'lg'} boxShadow="base">
      <Box p="4" display={'flex'} justifyContent="space-between">
        <Text fontSize="xl" fontWeight="bold">
          List Chatrooms
        </Text>
        <Button
          colorScheme="teal"
          variant="outline"
          maxW={'300px'}
          minW="150px"
          leftIcon={<AiOutlinePlus fontSize={'20px'} />}
          onClick={onOpen}
        >
          Add New Chatroom
        </Button>
      </Box>

      <TableContainer>
        <Table variant="simple">
        <Thead>
            <Tr>
              <Th>Chatroom Name</Th>
              <Th>Creator</Th>
              <Th>Description</Th>
              <Th>Creation Date</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {chatrooms?.map(({ _id, chatroomname, creator, description, createdAt }) => (
              <ChatroomRow
                key={_id}
                id={_id}
                chatroomname={chatroomname}
                creator={creator} // Assuming creator is the project name
                description={description} // Assuming description is the members count
                creationDate={createdAt}
              />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      <DrawerForm />
    </Box>
  );
};

export default Chatrooms;
