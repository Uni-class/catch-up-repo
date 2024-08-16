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

  roomUsers: { [key: string]: Set<number> } = {};
  roomHost: { [key: string]: number } = {};
  clientUserId: { [key: string]: number } = {};

  async afterInit(server: Server) {
    server.on('connection', (socket: Socket) => {
      console.log(socket.id);
    });
  }

  async handleConnection(client: Socket): Promise<void> {
    const userId = await this.socketService.validateUser(client);
    if (!userId) client.disconnect(true);
    client[client.id] = userId;
    this.clients.add(client);
    return;
  }

  async handleDisconnect(client: Socket): Promise<any> {
    const userId = await this.socketService.validateUser(client);
    console.log(userId);
    for (const roomId of client.rooms) {
      this.roomUsers[roomId].delete(userId);
      if (this.roomUsers[roomId].size === 0) delete this.roomUsers[roomId];
      if (this.roomHost[roomId] === userId) {
        this.server.to(roomId).emit('hostExist', '0');
      }
    }
    client.disconnect(true);
    console.log('disconnected');
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(
    @ConnectedSocket() client: any,
    @MessageBody() { roomId }: any,
  ): Promise<any> {
    const userId: number = await this.socketService.validateUser(client);
    if (!userId || !roomId) return;
    if (client.rooms.has(roomId)) return;
    client.join(roomId);
    this.roomHost[roomId] = userId;
    if (!this.roomUsers[roomId]) this.roomUsers[roomId] = new Set();
    this.roomUsers[roomId].add(userId);
    this.server.to(roomId).emit('hostExist', '1');
    this.server.to(roomId).emit('userList', {
      roomId,
      userList: Array.from(this.roomUsers[roomId]),
    });
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(
    @ConnectedSocket() client: any,
    @MessageBody() { roomId }: any,
  ): Promise<any> {
    const userId: number = await this.socketService.validateUser(client);
    if (!userId || !roomId) return;
    if (client.rooms.has(roomId) || !this.roomUsers[roomId]) return;
    client.join(roomId);
    if (!this.roomUsers[roomId].has(userId)) {
      this.roomUsers[roomId].add(userId);
      this.server.to(roomId).emit('joinedUser', { userId: userId });
    }
    this.server.to(roomId).emit('userList', {
      roomId,
      userList: Array.from(this.roomUsers[roomId]),
    });
  }

  @SubscribeMessage('sendMessage')
  async onSendMessage(
    @ConnectedSocket() client: any,
    @MessageBody() { roomId, data }: any,
  ): Promise<any> {
    const userId: number = await this.socketService.validateUser(client);
    if (!userId || !roomId || userId !== this.roomHost[roomId]) return;
    if (!client.rooms.has(roomId) || !this.roomUsers[roomId]) return;
    this.server.to(roomId).emit('getData', { data });
  }
}
