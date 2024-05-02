import React, { useRef, useEffect, useState, useContext  } from 'react';
import avatarImage from './avatar.jpg'; // Importez l'image avatar depuis votre bureau
import { GlobalContext } from '../../../context/GlobalWrapperChat';


const styles = {
  chatRoomBody: {
    display: 'flex',
    flexDirection: 'column',
    maxHeight: 550,
    overflowY: 'auto',
    backgroundColor: '#f3f3f3',
    padding: '10px',
    borderRadius: '10px',
    scrollbarWidth: 'thin',
    scrollbarColor: '#bbb #f3f3f3',
    marginTop: '20px', // Ajoute une marge en haut du composant
  },
  message: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '10px',
    maxWidth: '70%', // Nouvelle largeur maximale du message
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '15px',
    padding: '10px',
    backgroundColor: '#ffffff',
    transition: 'transform 0.2s',
    position: 'relative',
    cursor: 'pointer',
  },
  messageContent: {
    marginBottom: '5px',
    fontSize: '17px',
    wordWrap: 'break-word',
  },
  messageTimestamp: {
    fontSize: '12px',
    alignSelf: 'flex-end',
    color: '#888888',
  },
  messageRight: {
    alignSelf: 'flex-end',
    marginBottom: '15px',
    marginLeft: 'auto', // Déplace le message vers la droite
    paddingRight: '15px',
  },
  messageLeft: {
    alignSelf: 'flex-start',
    marginBottom: '15px',
    marginLeft: '20px',
    padding: '15px',
    backgroundColor: '#d3d3d3', // Arrière-plan différent pour les messages de gauche
  },
  deleteButton: {
    position: 'absolute',
    bottom: '-40px',
    right: '10px',
    backgroundColor: 'red',
    color: '#fff',
    padding: '5px',
    borderRadius: '5px',
  },
  cancelButton: {
    position: 'absolute',
    bottom: '-40px',
    right: '70px',
    backgroundColor: '#ccc',
    color: '#fff',
    padding: '5px',
    borderRadius: '5px',
  },
};




const ChatroomBody = ({ messages }) => {
  const messagesEndRef = useRef(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const { DeleteMessage,findOneUserById } = useContext(GlobalContext);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    scrollToBottom();
    
  }, [messages]);

  

  const handleDoubleClick = (message) => {
    setSelectedMessage(message);
  };

  const handleDeleteClick = () => {
    console.log('Message deleted:', selectedMessage._id);
    DeleteMessage(selectedMessage._id);
    setSelectedMessage(null);
  };

  const handleCancelClick = () => {
    setSelectedMessage(null);
  };

  const {   getUserIdFromToken} = useContext(GlobalContext);



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

  useEffect(() => {
     findOneUserById(userId)
      .then((user) => {
        console.log('User found:', user);
      })
      .catch((error) => {
        console.log('Error fetching user:', error);
      });
  }, []);

  return (
    <div style={styles.chatRoomBody }   >
      {messages.map((message, index) => (
        <div key={message._id} style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', marginBottom: '15px' }}>
          <div style={{ marginRight: '10px' }}>
            {message.senderId !== userId && <img src={avatarImage} alt="Avatar" style={{ width: '40px', height: '40px', borderRadius: '50%' }} />}
          </div>
          <div
            className="message"
            style={{
              ...styles.message,
              ...(message.senderId === userId ? styles.messageRight : styles.messageLeft),
              ...(selectedMessage && selectedMessage._id === message._id && { marginBottom: '50px' }),
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
            onDoubleClick={() => handleDoubleClick(message)}
          >
            <div style={styles.messageContent}>{message.messageText}</div>
            <div style={styles.messageTimestamp}>{new Date(message.dateId).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
            
            {selectedMessage && selectedMessage._id === message._id && (
              <>
                <button style={styles.deleteButton} onClick={handleDeleteClick}>Supprimer</button>
                <button style={styles.cancelButton} onClick={handleCancelClick}>Annuler</button>
              </>
            )}
            
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default ChatroomBody;