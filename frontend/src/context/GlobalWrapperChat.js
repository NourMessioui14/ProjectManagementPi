// GlobalWrapper.js
import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from '@chakra-ui/react';

export const GlobalContext = createContext();

export const WrapperChat = ({ children }) => {
  
  const [chatrooms, setChatrooms] = useState([]); // Add state for chatrooms
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [videoCalls, setVideoCalls] = useState([]); // Add state for video calls

  // chatroom functions
  const FetchChatrooms = async () => {
    try {
      const res = await axios.get('http://localhost:5001/chatrooms');
      setChatrooms(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };


  
  const DeleteChatroom = (id) => {
    axios
      .delete(`http://localhost:5001/chatrooms/${id}`)
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
      .post('http://localhost:5001/chatrooms', form)
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

  const UpdateChatroom = (form, setForm, id) => {
    axios
      .put(`http://localhost:5001/chatrooms/${id}`, form)
      .then((res) => {
        toast({
          title: 'Chatroom Updated',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
        FetchChatrooms();
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };

  // VideoCall functions

  const fetchVideoCalls = async () => {
    try {
      const res = await axios.get('http://localhost:5001/videocalls');
      setVideoCalls(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const deleteVideoCall = (id) => {
    axios
      .delete(`http://localhost:5001/videocalls/${id}`)
      .then((res) => {
        setVideoCalls(videoCalls.filter((u) => u._id !== id));
        toast({
          title: 'Video Call Deleted',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const addVideoCall = (form, setForm) => {
    axios
      .post('http://localhost:5001/videocalls', form)
      .then((res) => {
        setVideoCalls([...videoCalls, res.data]);
        toast({
          title: 'Video Call Added',
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

  const updateVideoCall = (form, setForm, id) => {
    axios
      .put(`http://localhost:5001/videocalls/${id}`, form)
      .then((res) => {
        toast({
          title: 'Video Call Updated',
          status: 'success',
          duration: 4000,
          isClosable: true,
        });
        setErrors({});
        setForm({});
        onClose();
        fetchVideoCalls();
      })
      .catch((err) => {
        setErrors(err.response.data.error);
      });
  };  

  

  return (
    <GlobalContext.Provider value={{
      FetchChatrooms,
      fetchVideoCalls,
      chatrooms,
      videoCalls,
      DeleteChatroom,
      deleteVideoCall,
      AddChatroom,
      addVideoCall,
      UpdateChatroom,
      updateVideoCall,
      isOpen,
      onOpen,
      onClose,
      errors,
      setErrors,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};
