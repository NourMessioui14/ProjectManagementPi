import { Body, OnModuleInit } from '@nestjs/common';
import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';


@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class SignalingGateway implements OnModuleInit,OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
  
  @WebSocketServer() 
  server: Server;

  
  onModuleInit(){
    this.server.on('connection', (socket) => {
      console.log(socket.id);
      console.log('connected');

    });

  }



  afterInit() {
    console.log(`Signaling gateway initialized.`);
  }

  @SubscribeMessage("malik")
  OnNewMessage(@MessageBody() Body: any){
    console.log(Body);
    this.server.emit('malik', {msg :'message jdid mn ans serveur',content : Body});
  }
  
  
 























  handleConnection(client: WebSocket, ...args: any[]) {
    console.log(`Client connected: ${client}`);
  }

  handleDisconnect(client: WebSocket) {
    console.log(`Client disconnected: ${client}`);
  }

  


 

  /*

  handleOffer(client: WebSocket, offer: any) {
    // Broadcast the offer to other clients
    this.server.clients.forEach((ws: WebSocket) => {
      if (ws !== client && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'offer', data: offer }));
      }
    });
  }

  handleAnswer(client: WebSocket, answer: any) {
    // Broadcast the answer to other clients
    this.server.clients.forEach((ws: WebSocket) => {
      if (ws !== client && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'answer', data: answer }));
      }
    });
  }

  handleIceCandidate(client: WebSocket, iceCandidate: any) {
    // Broadcast the ICE candidate to other clients
    this.server.clients.forEach((ws: WebSocket) => {
      if (ws !== client && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'iceCandidate', data: iceCandidate }));
      }
    });
  } */
}
