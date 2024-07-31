import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  WebSocketServer,
  WsException,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SocketService } from './socket.service';
import { UseGuards } from '@nestjs/common';
import { WsGuard } from '../auth/ws.guard';

@UseGuards(WsGuard)
@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly socketService: SocketService) {}

  private clients: Set<Socket> = new Set();

  @WebSocketServer()
  server: Server;

  connectedClients: { [socketId: string]: boolean } = {};
  clientNickname: { [socketId: string]: string } = {};
  roomUsers: { [key: string]: string[] } = {};

  afterInit(server: Server) {
    server.on('connection', (socket: Socket) => {
      console.log(socket.id);
      console.log('WebSocket Gateway initialized');
    });
  }

  handleConnection(client: Socket): void {
    if (this.connectedClients[client.id]) {
      client.disconnect(true);
      return;
    }
    this.connectedClients[client.id] = true;
    return;
  }

  handleDisconnect(client: Socket): any {
    console.log('disconnected');
  }

  @SubscribeMessage('newMessage')
  onNewMessage(client: Socket, @MessageBody() body: any): void {
    console.log(body);
    this.server.emit('onMessage', body);
  }
}