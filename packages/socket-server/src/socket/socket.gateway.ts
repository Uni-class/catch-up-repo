import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayInit,
  OnGatewayDisconnect,
  WebSocketServer,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { SocketService } from './socket.service';
import { UseFilters } from '@nestjs/common';
import { WsExceptionFilter } from '../exception/ws-exception.filter';
import dotenv from 'dotenv';
dotenv.config();

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
  },
  Transports: ['websocket', 'polling'],
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly socketService: SocketService) {}

  private clients: Set<Socket> = new Set();

  @WebSocketServer()
  server: Server;

  connectedClients: { [socketId: string]: boolean } = {};
  roomUsers: { [key: string]: Set<number> } = {};

  async afterInit(server: Server) {
    server.on('connection', (socket: Socket) => {
      console.log(socket.id);
      console.log('WebSocket Gateway initialized');
    });
  }

  async handleConnection(client: Socket): Promise<void> {
    const userId = await this.socketService.validateUser(client);
    if (!userId) return;
    if (this.connectedClients[client.id]) {
      client.disconnect(true);
      return;
    }
    this.clients.add(client);
    this.connectedClients[userId] = true;
    return;
  }

  async handleDisconnect(client: Socket): Promise<any> {
    this.connectedClients[client.id] = false;
    client.disconnect(true);
    console.log('disconnected');
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(
    @ConnectedSocket() client: any,
    @MessageBody() { userId, roomId }: any,
  ): Promise<any> {
    //const userId: number = await this.socketService.validateUser(client);
    if (!userId || !roomId) return;
    if (client.rooms.has(roomId)) return;
    client.join(roomId);
    if (!this.roomUsers[roomId]) this.roomUsers[roomId] = new Set();
    this.roomUsers[roomId].add(userId);
    this.server
      .to(roomId)
      .emit('userList', { roomId, userList: this.roomUsers[roomId] });
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(
    @ConnectedSocket() client: any,
    @MessageBody() { userId, roomId }: any,
  ): Promise<any> {
    //const userId: number = await this.socketService.validateUser(client);
    if (!userId || !roomId) return;
    if (client.rooms.has(roomId) || !this.roomUsers[roomId]) return;
    client.join(roomId);
    if (!this.roomUsers[roomId].has(userId)) {
      this.roomUsers[roomId].add(userId);
      this.server.to(roomId).emit('joinedUser', { userId: userId });
    }
    this.server
      .to(roomId)
      .emit('userList', { roomId, userList: this.roomUsers[roomId] });
  }

  @SubscribeMessage('sendMessage')
  async onSendMessage(
    @ConnectedSocket() client: any,
    @MessageBody() { userId, roomId, data }: any,
  ): Promise<any> {
    if (!userId || !roomId) return;
    if (!client.rooms.has(roomId) || !this.roomUsers[roomId]) return;
    if (this.roomUsers[roomId][0] !== userId) return;
    this.server.to(roomId).emit('getData', { data });
  }
}
