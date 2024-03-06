// GlobalWrapper.js
import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react';

export const GlobalContext = createContext();

export const Wrapper = ({ children }) => {
  
  const [chatrooms, setChatrooms] = useState([]);
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Define FetchChatrooms function
  const FetchChatrooms = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/chatrooms');
      setChatrooms(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };


  
  const DeleteChatroom = (id) => {
    axios
      .delete(`http://localhost:5000/api/chatrooms/${id}`)
      .then((res) => {
        setChatrooms(chatrooms.filter((u) => u._id !== id));
        toast({
          title: 'Chatroom Deleted',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const AddChatroom = (form, setForm) => {
    axios
      .post('http://localhost:5000/api/chatrooms', form)
      .then((res) => {
        setChatrooms([...chatrooms, res.data]);
        toast({
          title: 'Chatroom Added',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };   

  

  return (
    <GlobalContext.Provider value={{ FetchChatrooms, chatrooms, DeleteChatroom, AddChatroom, isOpen, onOpen, onClose, errors, setErrors }}>
      {children}
    </GlobalContext.Provider>
  );
};
