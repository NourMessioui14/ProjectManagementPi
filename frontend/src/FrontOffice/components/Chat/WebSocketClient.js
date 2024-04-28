import React, { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../../../context/websocketContext';

const WebSocketClient = () => {
  const socket = useContext(WebsocketContext);
  const [message, setMessage] = useState('');
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    // Écoute des événements du serveur WebSocket
    socket.on('connect', () => {
      console.log('Connected to WebSocket server!');
    });

    socket.on('malik', (data) => {
      console.log('Message from server:', data);
      if (data && data.content) {
        setReceivedMessages((prevMessages) => [...prevMessages, data.content]);
      } else {
        console.error('Invalid message format:', data);
      }
    });

    return () => {
      // Désinscription des événements lors du démontage du composant
      socket.off('connect');
      socket.off('malik');
    };
  }, [socket]); // Assurez-vous d'inclure socket dans la liste de dépendances pour s'assurer qu'elle est surveillée

  // Fonction pour envoyer un message au serveur
  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('malik', { content: message });
      setMessage(''); // Réinitialiser le champ de texte après l'envoi
    }
  };

  return (
    <div>
      <h1>WebSocket Client Component</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter your message"
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
      <div>
        
        
      </div>
    </div>
  );
};

export default WebSocketClient;
