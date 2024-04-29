import React, { useContext, useEffect, useState } from 'react';
import { WebsocketContext } from '../../../context/websocketContext';

const WebSocketClient = () => {
  const socket = useContext(WebsocketContext);
  const [message, setMessage] = useState('');
  const [receivedOffers, setReceivedOffers] = useState([]);
  const [offer, setOffer] = useState('');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    // Écoute des événements du serveur WebSocket
    socket.on('connect', () => {
      console.log('Connected to WebSocket server!');
    });

    socket.on('malik', (data) => {
      console.log(data.content);
      if (data && data.content) {
        // Ignore messages from 'malik' event
      } else {
        console.error('Invalid message format:', data);
      }
    });

    socket.on('offer', (data) => {
      console.log('Offer received:', data);
      if (data) {
        // Add offer message to receivedOffers
        setReceivedOffers((prevOffers) => [...prevOffers, JSON.stringify(data)]);
        // Send back an answer
        sendAnswer(data);
      }
    });

    // Send offer when the component mounts
    sendOffer();

    return () => {
      // Désinscription des événements lors du démontage du composant
      socket.off('connect');
      socket.off('malik');
      socket.off('offer');
    };
  }, [socket]); // Assurez-vous d'inclure socket dans la liste de dépendances pour s'assurer qu'elle est surveillée

  // Fonction pour envoyer un message au serveur
  const sendMessage = () => {
    if (message.trim() !== '') {
      socket.emit('malik', message);
      console.log('Message sent:', message);
      setMessage(''); // Réinitialiser le champ de texte après l'envoi
    }
  };

  // Fonction pour envoyer une offre au serveur
  const sendOffer = async () => {
    try {
      const createdOffer = await createOffer();
      setOffer(createdOffer);
      socket.emit('offer', createdOffer);
      console.log('Offer sent:', createdOffer);
    } catch (error) {
      console.error('Error creating offer:', error);
    }
  };

  // Fonction pour envoyer une réponse au serveur
  const sendAnswer = async (offer) => {
    try {
      const createdAnswer = await createAnswer(offer);
      setAnswer(createdAnswer);
      socket.emit('answer', createdAnswer);
      console.log('Answer sent:', createdAnswer);
    } catch (error) {
      console.error('Error creating answer:', error);
    }
  };

  // Function to create an SDP offer using RTCPeerConnection
  const createOffer = async () => {
    const peerConnection = new RTCPeerConnection();
    peerConnection.onicecandidate = handleICECandidate;
    const createdOffer = await peerConnection.createOffer();
    await peerConnection.close(); // Close the peer connection after obtaining the offer
    return JSON.stringify(createdOffer);
  };

  // Function to create an SDP answer using RTCPeerConnection
  const createAnswer = async (offer) => {
    const peerConnection = new RTCPeerConnection();
    await peerConnection.setRemoteDescription(JSON.parse(offer));
    peerConnection.onicecandidate = handleICECandidate;
    const createdAnswer = await peerConnection.createAnswer();
    await peerConnection.close(); // Close the peer connection after obtaining the answer
    return JSON.stringify(createdAnswer);
  };

  // Function to handle ICE candidate event
  const handleICECandidate = (event) => {
    if (event.candidate) {
      sendICECandidate(event.candidate);
    }
  };

  // Function to send ICE candidate to the server
  const sendICECandidate = (candidate) => {
    socket.emit('ice-candidate', candidate);
    console.log('ICE candidate sent:', candidate);
  };

  return (
    <div>
      <input type="text" value={offer} readOnly />
      <input type="text" value={answer} readOnly />
    </div>
  );
};

export default WebSocketClient;
