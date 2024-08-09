import { Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../auth/jwt.payload';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class SocketService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}
  async validateUser(socket: Socket): Promise<number> {
    const accessToken = socket.handshake.query?.access_token.toString();
    if (!accessToken) return 0;
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(
        accessToken,
        {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        },
      );
      return payload.id;
    } catch (ex) {
      throw new WsException(ex.message);
    }
  }
}
