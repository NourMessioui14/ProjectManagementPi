import { createContext } from 'react';
import { io } from 'socket.io-client';

// Création de la connexion WebSocket
const socket = io('ws://localhost:5001/');

// Création du contexte WebSocket
export const WebsocketContext = createContext(socket);

// Export du fournisseur de contexte WebSocket
export const WebsocketProvider = WebsocketContext.Provider;
