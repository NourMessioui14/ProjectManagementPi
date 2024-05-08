// GlobalWrapper.js
import React, { createContext, useState } from "react";
import axios from "axios";
import { useDisclosure, useToast } from "@chakra-ui/react";

export const GlobalContext = createContext();

export const WrapperChat = ({ children }) => {
  const [chatrooms, setChatrooms] = useState([]); // Add state for chatrooms
  const [errors, setErrors] = useState({});
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const [selectedChatroom, setSelectChatroom] = useState(null);
  const [selectedvideocall, setSelectvideocall] = useState(null);

  const [videoCalls, setVideoCalls] = useState([]); // Add state for video calls

  const setSelectChatroomHandler = (chatroom) => setSelectChatroom(chatroom);
  const setSelectvideocallHandler = (videoCall) =>
    setSelectvideocall(videoCall);

  const [users, setUsers] = useState([]);

  const [projects, setProjects] = useState([]);

  const [userID , setUserID] = useState("")


  const getUserIDByToken = async (token) => {
    try {
      const userIdFromToken = await getUserIdFromToken(token) ;
       setUserID(userIdFromToken.userId)
     } catch (error) {
      console.error('Error getting user ID from token:', error);
    }
  };


  ///////////////
  const getvideocallsByUserId = async (userId) => {
    try {
      const res = await axios.get(
        `https://nestjspi.onrender.com/videocalls/invited/${userId}`
      );
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return [];
    }
  };





  // Fonction pour récupérer un utilisateur par son ID
  const findOneUserById = async (id) => {
    try {
      return axios
        .get(`https://nestjspi.onrender.com/auth/users/${id}`)
        .then((res) => res.data);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  const findUsers = async () => {
    try {
      const usersList = await axios
        .get(`https://nestjspi.onrender.com/auth/users`)
        .then((res) => res.data);
      setUsers(usersList);
    } catch (err) {
      console.log(err);
      return null;
    }
  };

  // chatroom functions
  const FetchChatrooms = async () => {
    try {
      const res = await axios.get("https://nestjspi.onrender.com/chatrooms");
      setChatrooms(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const getUserIdFromToken = async (token) => {
    try {
      const res = await axios.get(
        `https://nestjspi.onrender.com/chatrooms/user-id-from-token/${token}`
      );
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return null;
    }
  };

  const getChatroomsByUserId = async (userId) => {
    try {
      const res = await axios.get(
        `https://nestjspi.onrender.com/chatrooms/user/${userId}`
      );
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return [];
    }
  };

  const getMessagesByChatroomId = async (chatroomId) => {
    try {
      const res = await axios.get(
        `https://nestjspi.onrender.com/messages/byChatroom/${chatroomId}`
      );
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return [];
    }
  };

  const getLastMessageByChatroomId = async (chatroomId) => {
    try {
      const res = await axios.get(
        `https://nestjspi.onrender.com/messages/lastMessage/${chatroomId}`
      );
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return null;
    }
  };

  const addMessage = async (messageData) => {
    try {
      const res = await axios.post(
        "https://nestjspi.onrender.com/messages",
        messageData
      );
      return res.data;
    } catch (err) {
      console.log(err.response.data);
      return null;
    }
  };

  const DeleteMessage = (id) => {
    axios
      .delete(`https://nestjspi.onrender.com/messages/${id}`)
      .then((res) => {
        // Handle success if needed
        console.log("Message deleted:", id);
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const DeleteMessageByDate = (dateId) => {
    axios
      .delete(`https://nestjspi.onrender.com/messages/byDate/${dateId}`)
      .then((res) => {
        console.log("Message deleted by date:", dateId);
        // Gérer le succès si nécessaire
      })
      .catch((err) => {
        console.log(err.response.data);
      });
  };

  const DeleteChatroom = (id) => {
    axios
      .delete(`https://nestjspi.onrender.com/chatrooms/${id}`)
      .then((res) => {
        setChatrooms(chatrooms.filter((u) => u._id !== id));
        toast({
          title: "Chatroom Deleted",
          status: "success",
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
      .post("https://nestjspi.onrender.com/chatrooms", form)
      .then((res) => {
        setChatrooms([...chatrooms, res.data]);
        toast({
          title: "Chatroom Added",
          status: "success",
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
      .put(`https://nestjspi.onrender.com/chatrooms/${id}`, form)
      .then((res) => {
        toast({
          title: "Chatroom Updated",
          status: "success",
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
      const res = await axios.get("https://nestjspi.onrender.com/videocalls");
      setVideoCalls(res.data);
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const deleteVideoCall = (id) => {
    axios
      .delete(`https://nestjspi.onrender.com/videocalls/${id}`)
      .then((res) => {
        setVideoCalls(videoCalls.filter((u) => u._id !== id));
        toast({
          title: "Video Call Deleted",
          status: "success",
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
      .post("https://nestjspi.onrender.com/videocalls", form)
      .then((res) => {
        setVideoCalls([...videoCalls, res.data]);
        toast({
          title: "Video Call Added",
          status: "success",
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

  const updateVideoCall = (form, setForm) => {
    axios
      .put(`https://nestjspi.onrender.com/videocalls/${form.id}`, form)
      .then((res) => {
        toast({
          title: "Video Call Updated",
          status: "success",
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
      const projectsList = await axios
        .get("https://nestjspi.onrender.com/project")
        .then((res) => res.data); // Assuming the endpoint is correct

      setProjects(projectsList);
      return projectsList;
    } catch (err) {
      console.log(err.response.data);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        getUserIDByToken,
        getvideocallsByUserId,
        userID, 
        projects,
        FetchChatrooms,
        getUserIdFromToken,
        fetchVideoCalls,
        chatrooms,
        videoCalls,
        findOneUserById,
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
        setSelectChatroomHandler,
        setSelectvideocallHandler,
        selectedvideocall,
        findUsers,
        users,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};