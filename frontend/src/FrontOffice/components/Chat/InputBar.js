import React, { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../../../context/GlobalWrapperChat';

const InputBar = ({ currentRoomId, updateMessages }) => {
  const { getChatroomsByUserId, getLastMessageByChatroomId, addMessage } = useContext(GlobalContext);
  const userId = "60f93b7b70ba471bbcfc25b1"; // Constant for senderId

  const [message, setMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // État pour afficher ou masquer la liste d'emoji

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleEmojiClick = (emoji) => {
    setMessage(message + emoji); // Ajouter l'emoji sélectionné au texte du message
    setShowEmojiPicker(false); // Masquer la liste d'emoji après avoir sélectionné un emoji
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

  // Liste d'emojis
  const emojis = ['😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊', '😋', '😎', '😍', '😘', '🥰', '😗', '😙', '😚', '☺️', '🙂', '🤗', '🤩', '🤔', '🤨', '😐', '😑', '😶', '😏', '😒', '🙄', '😬', '🤥', '😌', '😔', '😪', '🤤', '😴', '😷', '🤒', '🤕', '🤢', '🤮', '🤧', '🥵', '🥶', '🥴', '😵', '🤯', '🤠', '🥳', '😎', '🤓', '🧐', '😕', '😟', '🙁', '☹️', '😮', '😯', '😲', '😳', '🥺', '😦', '😧', '😨', '😰', '😥', '😢', '😭', '😱', '😖', '😣', '😞', '😓', '😩', '😫', '🥱', '😤', '😡', '😠', '🤬', '😈', '👿', '💀', '☠️', '💩', '🤡', '👹', '👺', '👻', '👽', '👾', '🤖', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾'];

  return (
    <div className="input-bar" style={styles.inputBar}>
      {/* Bouton Emoji */}
      <button style={styles.buttonLeft} onClick={() => setShowEmojiPicker(!showEmojiPicker)}>😀</button>
      {/* Affichage de la liste d'emoji */}
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
      <button style={styles.buttonRight} onClick={handleSubmit}>Send</button>
    </div>
  );
};

const styles = {
  inputBar: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative', // Position relative pour permettre le positionnement absolu de la liste d'emojis
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
    backgroundColor: '#4CAF50',
    color: '#fff',
    marginRight: '10px',
    border: 'none',
  },
  buttonRight: {
    fontSize: '16px',
    padding: '8px',
    borderRadius: '5px',
    cursor: 'pointer',
    backgroundColor: '#2196F3',
    color: '#fff',
    border: 'none',
  },
  emojiPicker: {
    position: 'absolute',
    top: 'calc(100% + 5px)', // Positionner juste en dessous du bouton emoji
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
