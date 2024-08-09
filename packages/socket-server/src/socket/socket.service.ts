import { Injectable, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../auth/jwt.payload';
import { WsException } from '@nestjs/websockets';
import { WsExceptionFilter } from '../exception/ws-exception.filter';

@Injectable()
export class SocketService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(socket: any): Promise<number> {
    try {
      const cookies = socket.request.headers.cookie;
      if (!cookies) return 0;
      const accessToken = JSON.parse(cookies).access_token;
      if (!accessToken) return 0;
      const userId = await this.jwtService
        .verifyAsync(accessToken, {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        })
        .then((payload: JwtPayload) => {
          return payload.id;
        });
      return userId;
    } catch (ex) {
      return 0;
    }
  }
}
