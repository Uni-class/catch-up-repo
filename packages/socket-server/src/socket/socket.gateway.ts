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

@WebSocketGateway()
export class SocketGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly socketService: SocketService) {}

  private clients: Set<Socket> = new Set();

  @WebSocketServer()
  server: Server;

  connectedClients: { [socketId: string]: boolean } = {};
  roomUsers: { [key: string]: number[] } = {};

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
    console.log('disconnected');
  }

  @SubscribeMessage('newMessage')
  onNewMessage(client: Socket, @MessageBody() body: any): void {
    console.log(body);
    this.server.emit('onMessage', body);
  }

  @SubscribeMessage('createRoom')
  async onCreateRoom(
    client: Socket,
    @MessageBody() { roomId }: any,
  ): Promise<any> {
    const userId: number = await this.socketService.validateUser(client);
    if (client.rooms.has(roomId)) return;
    client.join(roomId);
    if (!this.roomUsers[roomId]) this.roomUsers[roomId] = [];
    this.roomUsers[roomId].push(userId);
    this.server
      .to(roomId)
      .emit('userList', { roomId, userList: this.roomUsers[roomId] });
  }

  @SubscribeMessage('joinRoom')
  async onJoinRoom(
    client: Socket,
    @MessageBody() { roomId }: any,
  ): Promise<any> {
    const userId: number = await this.socketService.validateUser(client);
    if (client.rooms.has(roomId) || !this.roomUsers[roomId]) return;
    client.join(roomId);
    this.roomUsers[roomId].push(userId);
    this.server.to(roomId).emit('joinedUser', { userId: userId });
    this.server
      .to(roomId)
      .emit('userList', { roomId, userList: this.roomUsers[roomId] });
  }
}
