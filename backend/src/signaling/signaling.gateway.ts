import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server, WebSocket } from 'ws';

@WebSocketGateway({
  cors: {
    origin: ['http://localhost:3000'],
  },
})
export class SignalingGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() 
  server: Server;

  afterInit() {
    console.log('Signaling gateway initialized.');
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    console.log(`Client connected: ${client}`);
  }

  handleDisconnect(client: WebSocket) {
    console.log(`Client disconnected: ${client}`);
  }

  @SubscribeMessage('malik')
  handleMessageFromClient(@MessageBody() data: any) {
    console.log('Message from client:', data);
    // Envoyer le message reçu à tous les clients connectés
    this.server.emit('malik', data );
  }

  @SubscribeMessage('offer')
  handleOfferFromClient(@MessageBody() data: any) {
    console.log('Offer from client:', data);
    // Envoyer le message reçu à tous les clients connectés
    this.server.emit('offer', data );
  }

  @SubscribeMessage('answer')
  handleAnswerFromClient(@MessageBody() data: any) {
    console.log('Answer from client:', data);
    // Envoyer la réponse reçue à tous les clients connectés
    this.server.emit('answer', data);
  }

  @SubscribeMessage('ice-candidate')
  handleICECandidateFromClient(@MessageBody() data: any) {
    console.log('ICE candidate from client:', data);
    // Forward the ICE candidate to all connected clients
    this.server.emit('ice-candidate', data);
  }
}
