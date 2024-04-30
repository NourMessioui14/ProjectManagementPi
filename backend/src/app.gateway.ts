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

    handleDisconnect(client: Socket) {
        this.logger.log(`Client disconnected: ${client.id}`);
    }

    afterInit() {
        this.logger.log('WebSocket gateway initialized');
    }

    @SubscribeMessage('notification')
    async handleSendNotification(@MessageBody() notificationData: any) {
        try {
            // Log message pour vérifier si le backend reçoit la notification de l'admin
            this.logger.log(`Notification received from ${notificationData.senderName}`);
            console.log('Notification received from', notificationData.senderName); // Ajoutez ce message console

            // Émettre la notification à tous les clients connectés avec les données de notification reçues
            this.server.emit('notification', notificationData);
           this.logger.log('Notification successfully sent to frontend',notificationData );
    
            // Log pour vérifier que la notification a été envoyée avec succès au frontend
           // this.logger.log('Notification successfully sent to frontend');
        } catch (error) {
            this.logger.error('Erreur lors de l\'envoi de la notification :', error);
        }
    }
    
    
    
}
