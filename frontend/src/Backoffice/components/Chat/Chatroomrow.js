import React, { useContext } from "react";
import { Td, Tr, Box, Button } from "@chakra-ui/react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { GlobalContext } from "../../../context/GlobalWrapperChat";
import Sidebar from "../Sidebar";

const ChatroomRow = ({ id, chatroomId, projectId, chatroomName, members }) => {
  const { DeleteChatroom, onOpen, setSelectChatroomHandler, users , projects } =
    useContext(GlobalContext);

  const onChangeHandler = () => {
    onOpen(); // Ouvre le formulaire lorsque l'icône d'édition est cliquée
    setSelectChatroomHandler({
      id,
      chatroomId,
      projectId,
      chatroomName,
      members,
    });
  };

  console.log(projects)

  return (
    <Tr>
      <Td>{chatroomId}</Td>
      <Td>{chatroomName}</Td>
      <Td>{projects?.filter((project) => project?.['_id'] == projectId)?.[0]?.projectname }</Td>
      <Td>{members.map((member) => <div>{users?.filter((user) => user?.['_id'] == member)?.[0]?.name }</div>)}</Td>
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
