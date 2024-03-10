// ChatPage.js
import React from 'react';
import ChatSideBarLeft from './ChatSideBarLeft';
import ChatSideBarRight from './ChatSideBarRight';
import InputBar from './InputBar';
import ChatroomHeader from './ChatroomHeader';
import ChatroomBody from './ChatroomBody';
import { chatRooms, sampleMessages } from './constants';

const ChatPage = () => {
  const currentRoom = chatRooms[0]; // Assuming the first room is the active one
  const currentMessages = sampleMessages; // Replace with actual messages for the active room

  return (
    <div className="chat-page" style={{ display: 'flex', flexDirection: 'row', height: '100vh' }}>
      <div className="chat-page-left" style={{ flex: '0 0 20%', backgroundColor: '#f0f0f0' }}>
        <ChatSideBarLeft />
      </div>
      <div className="chat-page-center" style={{ flex: '0 0 60%', display: 'flex', flexDirection: 'column', width: '100%' }}>
        <ChatroomHeader roomName={currentRoom.name} />
        <ChatroomBody messages={currentMessages} />
        <InputBar />
      </div>
      <div className="chat-page-right" style={{ flex: '0 0 20%', padding: '15px', backgroundColor: '#f0f0f0' }}>
        <ChatSideBarRight />
      </div>
    </div>
  );
};

export default ChatPage;
