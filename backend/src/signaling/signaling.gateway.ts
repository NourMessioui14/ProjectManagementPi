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
    console.log(`Signaling gateway initialized.`);
  }

  handleConnection(client: WebSocket, ...args: any[]) {
    console.log(`Client connected: ${client}`);
  }

  handleDisconnect(client: WebSocket) {
    console.log(`Client disconnected: ${client}`);
  }

  @SubscribeMessage('malik')
  handleMessageFromClient(@MessageBody() data: any) {
    console.log('Message from client:', data.content);
    // Envoyer le message reçu à tous les clients connectés
    this.server.emit('malik', { message: 'Message received on server!', content: data });
  }
}
