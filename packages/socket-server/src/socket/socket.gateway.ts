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
  roomHostSocket: { [key: string]: Socket } = {};
  clientUserId: { [key: string]: number } = {};
  roomPageViewerCount: { [key: string]: number[] } = {};

  private async isValidEvent(client: any, roomId: any) {
    const userId: number = await this.socketService.validateUser(client);
    if (!userId || !roomId) {
      console.log('invalid userId or roomId:', { userId, roomId });
      return false;
    }
    if (!client.rooms.has(roomId) || !this.roomUsers[roomId]) {
      console.log('invalid room for roomId:', this.roomUsers, client.rooms);
      return false;
    }
    return userId;
  }

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
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId }: any,
  ): Promise<any> {
    const userId: number = await this.socketService.validateUser(client);
    if (!userId || !roomId) return;
    if (client.rooms.has(roomId)) return;
    if (!(await this.socketService.checkHostSession(userId, roomId))) {
      await this.handleDisconnect(client);
      return;
    }
    client.join(roomId);
    this.roomHost[roomId] = userId;
    this.roomHostSocket[roomId] = client;
    if (!this.roomUsers[roomId]) this.roomUsers[roomId] = new Set();
    this.roomUsers[roomId].add(userId);
    if (!this.roomPageViewerCount[roomId])
      this.roomPageViewerCount[roomId] = new Array<number>(100);
    this.server.to(roomId).emit('hostExist', '1');
    this.server.to(roomId).emit('userList', {
      roomId,
      userList: Array.from(this.roomUsers[roomId]),
    });
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId }: any,
  ): Promise<any> {
    const userId: number = await this.socketService.validateUser(client);
    if (!userId || !roomId) return;
    if (client.rooms.has(roomId) || !this.roomUsers[roomId]) return;
    if (!(await this.socketService.checkUserSession(userId, roomId))) {
      await this.handleDisconnect(client);
      return;
    }
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

  @SubscribeMessage('sendPageNumber')
  async onSendPageNumber(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, beforeIndex, currentIndex }: any,
  ): Promise<any> {
    const userId = await this.isValidEvent(client, roomId);
    if (!userId) return;
    if (userId === this.roomHost[roomId]) {
      this.server.to(roomId).emit('getPageNumber', { currentIndex, userId });
    } else {
      this.roomPageViewerCount[roomId][beforeIndex] -= 1;
      this.roomPageViewerCount[roomId][currentIndex] += 1;
      this.roomHostSocket[roomId].emit('getPageNumber', {
        roomPageViewerCount: this.roomPageViewerCount[roomId],
      });
    }
  }

  @SubscribeMessage('sendAddedDraw')
  async onSendAddedDraw(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, data, index }: any,
  ): Promise<any> {
    const userId = await this.isValidEvent(client, roomId);
    if (!userId) return;
    if (userId !== this.roomHost[roomId]) return;
    this.server.to(roomId).emit('getAddedDraw', { data, index });
  }

  @SubscribeMessage('sendRemovedDraw')
  async onSendRemovedDraw(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, data, index }: any,
  ): Promise<any> {
    const userId = await this.isValidEvent(client, roomId);
    if (!userId) return;
    if (userId !== this.roomHost[roomId]) return;
    this.server.to(roomId).emit('getRemovedDraw', { data, index });
  }

  @SubscribeMessage('sendUpdatedDraw')
  async onSendUpdatedDraw(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, data, index }: any,
  ): Promise<any> {
    const userId = await this.isValidEvent(client, roomId);
    if (!userId) return;
    if (userId !== this.roomHost[roomId]) return;
    this.server.to(roomId).emit('getUpdatedDraw', { data, index });
  }
}
