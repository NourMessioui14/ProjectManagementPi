import React, { useEffect, useState, useContext } from 'react';
import ChatSideBarLeft from './ChatSideBarLeft';
import ChatSideBarRight from './ChatSideBarRight';
import InputBar from './InputBar';
import ChatroomHeader from './ChatroomHeader';
import ChatroomBody from './ChatroomBody';
//import { GlobalContext } from '../../context/GlobalWrapperChat';
import { GlobalContext } from '../../../context/GlobalWrapperChat';



const ChatPage = () => {
  const { getMessagesByChatroomId } = useContext(GlobalContext);
  const [currentRoomId, setCurrentRoomId] = useState("1");
  const [currentMessages, setCurrentMessages] = useState([]);

  const updateMessages = async (chatroomId) => {
    try {
      const messages = await getMessagesByChatroomId(chatroomId);
      setCurrentMessages(messages);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    updateMessages(currentRoomId);
  }, [currentRoomId, getMessagesByChatroomId]);

  const handleSelectChatroom = (chatroomId) => {
    setCurrentRoomId(chatroomId);
  };

  return (
    <div className="chat-page" style={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden' }}>
      <ChatSideBarLeft onSelectChatroom={handleSelectChatroom}/>
      <div className="chat-page-center w-full p-2" style={{ flex: '1', display: 'flex', flexDirection: 'column', width: '100%', overflowY: 'auto' }}>
        <ChatroomHeader roomName={`Chatroom ${currentRoomId}`} />
        <ChatroomBody messages={currentMessages} />
        <InputBar style={{ position: 'fixed', bottom: 0, width: '100%' }} currentRoomId={currentRoomId} updateMessages={updateMessages} />
      </div>
      <ChatSideBarRight onSelectChatroom={handleSelectChatroom} />
    </div>
  );
};

export default ChatPage;
