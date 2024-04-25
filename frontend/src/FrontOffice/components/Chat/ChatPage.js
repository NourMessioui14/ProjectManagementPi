import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalWrapperChat';
import ChatSideBarLeft from './ChatSideBarLeft';
import ChatSideBarRight from './ChatSideBarRight';
import InputBar from './InputBar';
import ChatroomHeader from './ChatroomHeader';
import ChatroomBody from './ChatroomBody';
import Sidebar from '../../../Backoffice/components/Sidebar';
import NavbarFront from '../../NavbarFront'; // Import NavbarFront component

const ChatPage = () => {
  const { getMessagesByChatroomId, getChatroomsByUserId } = useContext(GlobalContext);
  const [currentRoomId, setCurrentRoomId] = useState(null);
  const [currentMessages, setCurrentMessages] = useState([]);
  const [currentRoomName, setCurrentRoomName] = useState("");
  const [currentUserId, setCurrentUserId] = useState(""); 

  const handleSelectUserId = (userId) => {
    setCurrentUserId(userId);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatrooms = await getChatroomsByUserId(currentUserId);
        const currentChatroom = chatrooms.find(room => room.chatroomId === currentRoomId);
         if (currentChatroom) {
          console.log("currentChatroom",currentChatroom)
          setCurrentRoomName(currentChatroom.chatroomName);
        }
        const messages = await getMessagesByChatroomId(currentRoomId);
        setCurrentMessages(messages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000); // Rafraîchit les données toutes les 5 secondes
    return () => clearInterval(interval); // Nettoie l'intervalle lors du démontage du composant
  }, [currentRoomId, currentUserId, getChatroomsByUserId, getMessagesByChatroomId]);

  const handleSelectChatroom = (chatroomId) => {
    setCurrentRoomId(chatroomId);
  };
  const handleSelectChatroomName = (chatroomname) => {
    setCurrentRoomName(chatroomname);
  };

  return (
    <div style={{ marginTop: '140px' }}>
 
     
       {/* Add the NavbarFront component here */}
      <div className="chat-page" style={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden' }}>
        <ChatSideBarLeft onSelectChatroom={handleSelectChatroom} onchatroomname={handleSelectChatroomName} onSelectUserId={handleSelectUserId} />
        <div className="chat-page-center w-full p-2" style={{ flex: '1', display: 'flex', flexDirection: 'column', width: '100%', overflowY: 'auto' }}>
          <ChatroomHeader roomName={`Chatroom ${currentRoomName}`} />
          <ChatroomBody messages={currentMessages} />
          <InputBar style={{ position: 'fixed', bottom: 0, width: '100%' }} currentRoomId={currentRoomId} />
        </div>
        <ChatSideBarRight onSelectChatroom={handleSelectChatroom} />
      </div>
  
    </div>
  );
};

export default ChatPage;