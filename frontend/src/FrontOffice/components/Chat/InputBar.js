import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalWrapperChat';

const InputBar = ({ currentRoomId, updateMessages }) => {
  const { getChatroomsByUserId, getLastMessageByChatroomId, addMessage, getUserIdFromToken } = useContext(GlobalContext);
 
  const [token, setToken] = useState(""); // State to store the token
  const [userId ,setUserId] = useState("")

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
  }, []);

  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // State to show or hide the emoji picker

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji); // Add the selected emoji to the message text
    setShowEmojiPicker(false); // Hide the emoji picker after selecting an emoji
  };

  const handleSubmit = async () => {
    if (message.trim() === '') return;
    try {
      const dateId = new Date().toISOString();
      const newMessage = {
        messageId: "1",
        chatroomId: currentRoomId,
        dateId: dateId,
        messageText: message,
        senderId: userId
      };
      console.log("New message:", newMessage);
      await addMessage(newMessage);
      setMessage('');

      updateMessages(currentRoomId);

      // Trigger re-fetching of chatrooms
      console.log("Executing getChatroomsByUserId");
      getChatroomsByUserId(userId);

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("Current room selected:", currentRoomId);
    }, 3000); // Log currentRoomId every 3 seconds

    return () => clearInterval(interval); // Cleanup function to clear interval on component unmount
  }, [currentRoomId]);

  // Emoji list
  const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '☺️', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];

  return (
    <div className="input-bar" style={styles.inputBar}>
      {/* Emoji button */}
      <button style={styles.buttonLeft} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
      {/* Display emoji picker */}
      {showEmojiPicker && (
        <div style={styles.emojiPicker}>
          {emojis.map((emoji, index) => (
            <span key={index} style={styles.emoji} onClick={() => handleEmojiClick(emoji)}>
              {emoji}
            </span>
          ))}
        </div>
      )}
      <input
        type="text"
        style={styles.inputField}
        placeholder="Type your message..."
        value={message}
        onChange={handleMessageChange}
        onKeyDown={handleKeyDown} // Add event listener for key down
      />
      <button style={styles.buttonRight} onClick={handleSubmit}>➡️</button> {/* Changed button text to a symbol */}
    </div>
  );
};

const styles = {
  inputBar: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative', // Relative position to allow absolute positioning of emoji picker
    padding: '10px',
    backgroundColor: '#fff',
    borderTop: '1px solid #ccc',
  },
  inputField: {
    flex: 1,
    padding: '8px',
    borderRadius: '5px',
    marginRight: '10px',
    border: '1px solid #ccc',
  },
  buttonLeft: {
    fontSize: '16px',
    padding: '8px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#9575cd', // Changed button color to purple
    color: '#fff',
    marginRight: '10px',
    border: 'none',
  },
  buttonRight: {
    fontSize: '16px',
    padding: '8px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#fff', // Changed button color to white
    color: '#9575cd', // Changed text color to purple
    border: '1px solid #9575cd', // Added border
  },
  emojiPicker: {
    position: 'absolute',
    top: 'calc(100% + 5px)', // Position just below the emoji button
    left: 0,
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '5px',
    zIndex: '999',
  },
  emoji: {
    cursor: 'pointer',
    marginRight: '5px',
  },
};

export default InputBar;
