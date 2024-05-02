import { Logger } from '@nestjs/common';
import {
    SubscribeMessage,
    OnGatewayConnection,
    MessageBody,
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayDisconnect,
    ConnectedSocket,
  } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ReponsesService } from './reponses/reponses.service';

@WebSocketGateway({
    cors: {
      origin: '*',
    },
})

export class AppGateway implements OnGatewayConnection, OnGatewayInit, OnGatewayDisconnect {
    constructor() {}
    
    @WebSocketServer() server: Server;

    private logger: Logger = new Logger('AppGateway');

    handleConnection(client: Socket, ...args: any[]) {
        this.logger.log(`Client connected: ${client.id}`);
    }

  

    afterInit() {
        this.logger.log('WebSocket gateway initialized');
    }

    @SubscribeMessage('sendNotification')
    async handleSendNotification(socket: Socket, data: any) {
        try {
            
            this.server.emit('getNotification', {
                senderName: data.senderName,
               
            });
            console.log(data.senderName + ' sendername log backend');
            console.log(data.receiverName + ' receivername log backend');
        
    
            // Log pour vérifier que la notification a été envoyée avec succès au frontend
           // this.logger.log('Notification successfully sent to frontend');
        } catch (error) {
            this.logger.error('Erreur lors de l\'envoi de la notification :', error);
        }
    }
    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    
    
    
}
