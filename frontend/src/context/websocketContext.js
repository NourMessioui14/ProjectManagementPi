import { createContext } from 'react';
import {  Socket } from 'ws';
import { io } from 'socket.io-client';


export const socket = io('ws://localhost:5001/');
export const WebsocketContext = createContext<Socket>(socket);
export const WebsocketProvider = WebsocketContext.Provider;