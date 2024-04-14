import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalWrapperChat';

const ChatSideBarRight = ({ onSelectChatroom }) => {
  const { getChatroomsByUserId, getMessagesByChatroomId , getUserIdFromToken} = useContext(GlobalContext);
   const [chatrooms, setChatrooms] = useState([]);
  const [currentRoomId, setCurrentRoomId] = useState(""); // Define currentRoomId state
  const [token, setToken] = useState(""); // State to store the token
  const [userId ,setUserId] = useState("")

  useEffect(() => {
 
    const storedToken = localStorage.getItem('token');
      console.log("Token from localStorage:", storedToken);
      setToken(storedToken); // Stocke le token dans l'état
    const getUserId = async () => {
      try {
        const userIdFromToken = await getUserIdFromToken(storedToken);
        setUserId(userIdFromToken.userId)       
    
      } catch (error) {
        console.error('Error getting user ID from token:', error);
      }
    };

    getUserId(); 
  }, []);

  

  const handleChatroomClick = async (chatroomId) => {
    //console.log("Clicked on chatroom ID:", chatroomId); // Display the clicked chatroom ID in the console
    try {
      const messages = await getMessagesByChatroomId(chatroomId);
      onSelectChatroom(chatroomId); // Pass the clicked chatroom ID to the parent component
      setCurrentRoomId(chatroomId); // Update the currentRoomId state with the clicked chatroom ID
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const chatroomsData = await getChatroomsByUserId(userId);
        setChatrooms(chatroomsData);
      } catch (error) {
        console.error("Error fetching chatrooms:", error);
      }
    };

    fetchData();
  }, [getChatroomsByUserId, userId]);

  useEffect(() => {
    const interval = setInterval(() => {
      //console.log("Current room selected:", currentRoomId);
    }, 5000); // Log currentRoomId every 5 seconds

    return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
  }, [currentRoomId]);

  return (
    <div className="sidebar-right" style={{ width: '250px', padding: '15px', backgroundColor: '#fff', borderRadius: '5px', color: '#333', height: '100vh' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '15px', fontSize: '18px', color: '#333' }}>
        Chatrooms
      </h3>
      <div className='p-2' style={{ overflowY: 'auto', maxHeight: 'calc(100vh - 150px)' }}>
        {chatrooms?.map(chatroom => (
          <div
            key={chatroom.chatroomId}
            onClick={() => handleChatroomClick(chatroom.chatroomId)} // Handle click on the chatroom
            style={{
              marginBottom: '8px', // Slightly reduced margin bottom
              padding: '10px', // Increased padding
              cursor: 'pointer',
              transition: 'background-color 0.3s',
              backgroundColor: '#27ae60', // Custom background color
              borderRadius: '8px', // Increased border radius
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: '16px', fontWeight: 'bold', color: '#fff' }}> {/* Increased font size */}
              {chatroom?.chatroomId || ""}
            </div>
            <div style={{ fontSize: '14px', color: '#fff' }}> {/* Increased font size */}
              {chatroom?.chatroomName || ""}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatSideBarRight;