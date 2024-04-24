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

  const [selectedChatroom , setSelectChatroom] = useState(null)

  const [videoCalls, setVideoCalls] = useState([]); // Add state for video calls


const setSelectChatroomHandler = ( chatroom) => setSelectChatroom(chatroom)

  // chatroom functions
  const FetchChatrooms = async () => {
    try {
      const res = await axios.get('http://localhost:5001/chatrooms');
      setChatrooms(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const getUserIdFromToken = async (token) => {
    try {
      const res = await axios.get(`http://localhost:5001/user-id-from-token/${token}`);
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return null;
    }
  };

  
  const getChatroomsByUserId = async (userId) => {
    try {
      const res = await axios.get(`http://localhost:5001/chatrooms/user/${userId}`);
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return [];
    }
  };


  const getMessagesByChatroomId = async (chatroomId) => {
    try {
      const res = await axios.get(`http://localhost:5001/messages/byChatroom/${chatroomId}`);
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return [];
    }
  };

  const getLastMessageByChatroomId = async (chatroomId) => {
    try {
      const res = await axios.get(`http://localhost:5001/messages/lastMessage/${chatroomId}`);
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return null;
    }
  };


  const addMessage = async (messageData) => {
    try {
      const res = await axios.post('http://localhost:5001/messages', messageData);
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return null;
    }
  };

  const DeleteMessage = (id) => {
    axios
      .delete(`http://localhost:5001/messages/${id}`)
      .then((res) => {
        // Handle success if needed
        console.log('Message deleted:', id);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const DeleteMessageByDate = (dateId) => {
    axios
      .delete(`http://localhost:5001/messages/byDate/${dateId}`)
      .then((res) => {
        console.log('Message deleted by date:', dateId);
        // Gérer le succès si nécessaire
      })
      .catch((err) => {
        console.log(err.response.data);
      });
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

  const FetchProjects = async () => {
    try {
  return axios.get('http://localhost:5001/project').then(res => res.data); // Assuming the endpoint is correct

    } catch (err) {
      console.log(err.response.data);
    }
  };



  

  return (
    <GlobalContext.Provider value={{
      FetchChatrooms,
      getUserIdFromToken,
      fetchVideoCalls,
      chatrooms,
      videoCalls,
      FetchProjects,
      DeleteMessageByDate,
      getChatroomsByUserId,
      getMessagesByChatroomId,
      getLastMessageByChatroomId,
      addMessage,
      DeleteChatroom,
      DeleteMessage,
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
      selectedChatroom,
      setSelectChatroomHandler
    }}>
      {children}
    </GlobalContext.Provider>
  );
};