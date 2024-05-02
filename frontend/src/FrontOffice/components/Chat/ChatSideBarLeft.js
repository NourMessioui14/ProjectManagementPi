import React, { useEffect, useState, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalWrapperChat';
import avatarImage from './avatar.jpg'; // Import the avatar image from your desktop

const ChatSideBarLeft = ({ onSelectChatroom, onchatroomname }) => {
  const { getChatroomsByUserId, getLastMessageByChatroomId, getUserIdFromToken } = useContext(GlobalContext);
  const [chatrooms, setChatrooms] = useState([]);
  const [lastMessages, setLastMessages] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("")

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    console.log("Token from localStorage:", storedToken);
    setToken(storedToken); // Store the token in state
    const getUserId = async () => {
      try {
        const userIdFromToken = await getUserIdFromToken(storedToken);
        setUserId(userIdFromToken.userId)

      } catch (error) {
        console.error('Error getting user ID from token:', error);
      }
    };

    getUserId();

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
  }, [getChatroomsByUserId, getLastMessageByChatroomId, getUserIdFromToken, userId]);

  const handleChatroomClick = (chatroomId, chatroomName) => {
    onSelectChatroom(chatroomId);
    onchatroomname(chatroomName);
  };

  const compareLastMessageDates = (roomA, roomB) => {
    const lastMessageA = lastMessages.find(msg => msg.chatroomId === roomA.chatroomId);
    const lastMessageB = lastMessages.find(msg => msg.chatroomId === roomB.chatroomId);
    if (!lastMessageA || !lastMessageB) return 0;
    return new Date(lastMessageB.dateId) - new Date(lastMessageA.dateId);
  };

  const sortedChatrooms = [...chatrooms].sort(compareLastMessageDates);

  return (
     
   <div className='py-2' style={{ height: '100vh', width: '250px', padding: '15px', overflowY: 'auto', color: '#333', backgroundColor: '#9575cd', borderRadius: '10px', }}>
  
 <h3 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '18px', color: '#fff' }}>
        My last messages
      </h3>
      <div className='mb-2' style={{ display: 'flex', flexDirection: 'column' }}>
        {sortedChatrooms.map((chatroom, index) => (
          <React.Fragment key={chatroom.chatroomId}>
            {index !== 0 && <hr style={{ margin: '5px 0', borderColor: '#ccc' }} />}
            <div
              onClick={() => handleChatroomClick(chatroom.chatroomId, chatroom.chatroomName)}
              style={{
                padding: '10px',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                backgroundColor: '#f3e5f5',
                display: 'flex', // Add flex display ()
                alignItems: 'center', // Align items vertically
                borderBottom: '1px solid #ccc', // Add bottom border
                borderRadius: '8px', // Add border radius
              }}
              title={`Chatroom: ${chatroom.chatroomName}`}
            >
              {/* Avatar placeholder */}
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: '#ccc', marginRight: '10px' }}>
                <img src={avatarImage} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
              </div>
              <div style={{ flex: 1 }}> {/* Adjusting to take remaining space */}
                <div style={{ fontWeight: 'bold', color: '#333', fontSize: '16px', marginBottom: '5px' }}>{chatroom.chatroomName}</div>
                <div style={{ fontSize: '14px', color: '#333', marginBottom: '5px' }}>
                  {lastMessages.find(msg => msg.chatroomId === chatroom.chatroomId)?.messageText}
                </div>
                <div style={{ fontSize: '12px', color: '#555', textAlign: 'right' }}>
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