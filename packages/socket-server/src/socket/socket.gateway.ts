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
import { OneToManyMap } from 'relation-map';

dotenv.config();

interface RPPV {
  [key: number]: {
    [key: number]: OneToManyMap<number, number>;
  };
}

@UseFilters(new WsExceptionFilter())
@WebSocketGateway({
  cors: {
    origin: process.env.CLIENT_DOMAIN,
    credentials: true,
  },
  Transports: ['websocket'],
})
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly socketService: SocketService) {}

  @WebSocketServer()
  server: Server;

  roomUsers: { [key: string]: Set<number> } = {};
  roomHost: { [key: string]: number } = {};
  roomHostSocket: { [key: string]: Socket } = {};
  clientUserId: { [key: string]: number } = {};
  roomPdfPageViewer: RPPV = {};

  private async isValidEvent(client: any, roomId: any) {
    const userId: number = await this.socketService.validateUser(client);
    if (!userId || !roomId) {
      console.log('invalid userId or roomId:', { userId, roomId });
      return false;
    }
    if (!client.rooms.has(roomId) || !this.roomUsers[roomId]) {
      console.log(
        'invalid room for roomId:',
        this.roomUsers,
        client.rooms,
        roomId,
      );
      return false;
    }
    return userId;
  }
  private debugActiveRooms(prefix: string = '') {
    const rooms = this.server.of('/').adapter.rooms;
    const roomInfo = [];

    rooms.forEach((clients, roomName) => {
      // 소켓 ID와 동일한 방은 필터링하고, 실제 방만 확인
      if (!this.server.sockets.sockets.get(roomName)) {
        roomInfo.push({ roomName, clients: Array.from(clients) }); // key와 value 출력
      }
    });

    console.log(prefix, 'debug active rooms:', roomInfo);
  }

  async afterInit(server: Server) {
    server.on('connection', (socket: Socket) => {
      console.log({ socketId: socket.id }, 'afterInit');
    });
  }

  async handleConnection(client: Socket): Promise<void> {
    const userId: number = await this.socketService.validateUser(client);
    if (!userId) client.disconnect(true);
    this.clientUserId[client.id] = userId;
    console.log({ clientId: client.id, userId }, 'handleConnection');
    client.emit('initUser');
    return;
  }

  async handleDisconnect(client: Socket): Promise<any> {
    const userId = await this.socketService.validateUser(client);
    console.log(
      { roomUsers: this.roomUsers, roomHost: this.roomHost, userId },
      'is disconnect',
    );
    for (const roomId of client.rooms) {
      this.roomUsers[roomId].delete(userId);
      if (this.roomUsers[roomId].size === 0) delete this.roomUsers[roomId];
      if (this.roomHost[roomId] === userId) {
        this.server.to(roomId).emit('hostExist', '0');
      }
    }
    client.disconnect(true);
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, fileIds }: any,
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
    if (!this.roomPdfPageViewer[roomId]) {
      this.roomPdfPageViewer[roomId] = {};
      for (const fileId of fileIds) {
        this.roomPdfPageViewer[roomId][fileId] = new OneToManyMap<
          number,
          number
        >();
      }
    }
    this.server.to(roomId).emit('hostExist', '1');
    this.server.to(roomId).emit('userList', {
      roomId,
      userList: Array.from(this.roomUsers[roomId]),
    });
    console.log(
      'createRoomInfo',
      { roomHost: this.roomHost },
      { roomUsers: this.roomUsers },
    );
    this.debugActiveRooms('createRoom');
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId }: any,
  ): Promise<any> {
    const userId: number = await this.socketService.validateUser(client);
    if (!userId || !roomId) {
      console.log(`invalid roomId:${roomId} or userId:${userId} when joinRoom`);
      return;
    }
    if (client.rooms.has(roomId) || !this.roomUsers[roomId]) {
      console.log(
        `client rooms has roomId:${roomId},${[...client.rooms]} or roomUsers for roomId:${[...this.roomUsers[roomId]]} is invalid when joinRoom`,
      );
      return;
    }
    if (!(await this.socketService.checkUserSession(userId, roomId))) {
      console.log(
        `check user session for userId:${userId} & roomId:${roomId} is invalid when joinRoom`,
      );
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
    this.debugActiveRooms('joinRoom');
  }

  @SubscribeMessage('sendPageNumber')
  async onSendPageNumber(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, fileId, index }: any,
  ): Promise<any> {
    const userId = await this.isValidEvent(client, roomId);
    if (!userId) return;
    if (userId === this.roomHost[roomId]) {
      this.server.to(roomId).emit('getPageNumber', { index, userId });
    } else {
      this.roomPdfPageViewer[roomId][fileId].deleteByMany(userId);
      this.roomPdfPageViewer[roomId][fileId].set(index, userId);
      const pdfPageCounts = {};
      for (const key of this.roomPdfPageViewer[roomId][fileId]
        .getOneToMany()
        .keys()) {
        pdfPageCounts[key] =
          this.roomPdfPageViewer[roomId][fileId].getByOne(key).size;
      }
      this.roomHostSocket[roomId].emit('getPageNumber', {
        roomPageViewerCount: pdfPageCounts,
      });
    }
  }

  @SubscribeMessage('sendAddedDraw')
  async onSendAddedDraw(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, fileId, data, index }: any,
  ): Promise<any> {
    const userId = await this.isValidEvent(client, roomId);
    if (!userId) return;
    if (userId !== this.roomHost[roomId]) return;
    this.server.to(roomId).emit('getAddedDraw', { fileId, data, index });
  }

  @SubscribeMessage('sendRemovedDraw')
  async onSendRemovedDraw(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, fileId, data, index }: any,
  ): Promise<any> {
    const userId = await this.isValidEvent(client, roomId);
    if (!userId) return;
    if (userId !== this.roomHost[roomId]) return;
    this.server.to(roomId).emit('getRemovedDraw', { fileId, data, index });
  }

  @SubscribeMessage('sendUpdatedDraw')
  async onSendUpdatedDraw(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomId, fileId, data, index }: any,
  ): Promise<any> {
    const userId = await this.isValidEvent(client, roomId);
    if (!userId) return;
    if (userId !== this.roomHost[roomId]) return;
    this.server.to(roomId).emit('getUpdatedDraw', { fileId, data, index });
  }
}
