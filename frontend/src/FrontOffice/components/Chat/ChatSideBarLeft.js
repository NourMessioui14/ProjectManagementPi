import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalWrapperChat';
import avatarImage from './avatar.jpg'; // Importez l'image avatar depuis votre bureau

const ChatSideBarLeft = ({ onSelectChatroom }) => {
  const { getChatroomsByUserId, getLastMessageByChatroomId } = useContext(GlobalContext);
  const [chatrooms, setChatrooms] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);

  useEffect(() => {
    const userId = "60f93b7b70ba471bbcfc25b1";

    const fetchData = async () => {
      try {
        const chatroomsData = await getChatroomsByUserId(userId);
        setChatrooms(chatroomsData);
        const ids = chatroomsData.map(chatroom => chatroom.chatroomId);
        const messages = await Promise.all(ids.map(id => getLastMessageByChatroomId(id)));
        setLastMessages(messages);
        console.log("Data refreshed");
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    const interval = setInterval(fetchData, 1000);
    return () => clearInterval(interval);
  }, [getChatroomsByUserId, getLastMessageByChatroomId]);

  const handleChatroomClick = (chatroomId) => {
    onSelectChatroom(chatroomId);
  };

  const compareLastMessageDates = (roomA, roomB) => {
    const lastMessageA = lastMessages.find(msg => msg.chatroomId === roomA.chatroomId);
    const lastMessageB = lastMessages.find(msg => msg.chatroomId === roomB.chatroomId);
    if (!lastMessageA || !lastMessageB) return 0;
    return new Date(lastMessageB.dateId) - new Date(lastMessageA.dateId);
  };

  const sortedChatrooms = [...chatrooms].sort(compareLastMessageDates);

  return (
    <div className='py-2' style={{ height: '100vh', width: '250px', padding: '15px', overflowY: 'auto', color: '#333', backgroundColor: '#f9f9f9' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '18px' }}>
        My last messages
      </h3>
      <div className='mb-2' style={{ display: 'flex', flexDirection: 'column' }}>
        {sortedChatrooms.map((chatroom, index) => (
          <React.Fragment key={chatroom.chatroomId}>
            {index !== 0 && <hr style={{ margin: '5px 0', borderColor: '#ccc' }} />}
            <div
              onClick={() => handleChatroomClick(chatroom.chatroomId)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                backgroundColor: '#fff',
                display: 'flex', // Add flex display
                alignItems: 'center', // Align items vertically
              }}
              title={`Chatroom: ${chatroom.chatroomName}`}
            >
              {/* Avatar placeholder */}
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ccc', marginRight: '10px' }}>
                <img src={avatarImage} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              </div>
              <div style={{ flex: 1 }}> {/* Adjusting to take remaining space */}
                <div style={{ fontWeight: 'bold', color: '#000' }}>{chatroom.chatroomName}</div>
                <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
                  {lastMessages.find(msg => msg.chatroomId === chatroom.chatroomId)?.messageText}
                </div>
                <div style={{ fontSize: '10px', color: '#888', textAlign: 'right' }}>
                  {new Date(lastMessages.find(msg => msg.chatroomId === chatroom.chatroomId)?.dateId).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBarLeft;
