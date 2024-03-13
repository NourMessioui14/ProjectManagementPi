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
    <div className="chat-page" style={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden' }}>
      <ChatSideBarLeft />

      <div className="chat-page-center w-full p-2" style={{ flex: '1', display: 'flex', flexDirection: 'column', width: '100%', overflowY: 'auto' }}>
        <ChatroomHeader roomName={currentRoom.name} />
        <ChatroomBody messages={currentMessages} />
        <InputBar style={{ position: 'fixed', bottom: 0, width: '100%' }} />
      </div>
      <ChatSideBarRight />

    </div>
  );
};

export default ChatPage;


/*(
  <div className="chat-page" style={{ display: 'flex', flexDirection: 'row', height: '100vh', overflow: 'hidden' }}>
    <div className="chat-page-left" style={{ width: '250px', backgroundColor: '#f0f0f0', position: 'fixed', top: 0, bottom: 0 }}>
      <ChatSideBarLeft />
    </div>
    <div className="chat-page-center" style={{ marginLeft: '250px', flex: '1', display: 'flex', flexDirection: 'column', width: '100%', overflowY: 'auto' }}>
      <div className="chatroom-header" style={{ backgroundColor: '#f0f0f0', position: 'fixed', top: 0, width: '100%' }}>
        <ChatroomHeader roomName={currentRoom.name} />
      </div>
      <ChatroomBody messages={currentMessages} />
      <InputBar style={{ position: 'fixed', bottom: 0, width: '100%' }} />
    </div>
    <div className="chat-page-right" style={{ width: '250px', backgroundColor: '#f0f0f0', position: 'fixed', top: 0, bottom: 0, right: 0 }}>
      <ChatSideBarRight />
    </div>
  </div>
);*/