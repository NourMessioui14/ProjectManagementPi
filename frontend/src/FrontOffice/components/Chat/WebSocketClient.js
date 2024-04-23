// WebSocketClient.js

import React, { useContext, useEffect } from 'react';
import { WebsocketContext } from '../../../context/websocketContext';

const WebSocketClient = () => {
  
  
  const socket = useContext(WebsocketContext);

  
  //console.log(socket);
/*
  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected!');
    });
    socket.on('malik', (data) => {
      console.log('malik event received!');
      console.log(data);
    });
    return () => {
      console.log('Unregistering Events...');
      //socket.off('connect');
      //socket.off('onMessage');
    };
  }, []);    */ 

  return (
    <div>
      <div>
        <h1>WebSocket Client Component</h1>
      </div>
    </div>
  );
};

export default WebSocketClient;
