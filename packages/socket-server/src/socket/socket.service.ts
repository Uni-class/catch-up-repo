import { Injectable, UseFilters } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { JwtPayload } from '../auth/jwt.payload';
import cookie from 'cookie';
import { Socket } from 'socket.io';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { UserSession } from './entities/user-session.entity';

@Injectable()
export class SocketService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
  ) {}

  async validateUser(socket: Socket): Promise<number> {
    try {
      const cookies = socket.handshake.headers.cookie;
      if (!cookies) {
        console.warn(`There is no cookie at header of ${socket.id}`);
        return 0;
      }
      const cookieList = cookie.parse(cookies);
      const accessToken = cookieList['access_token'];
      if (!accessToken) {
        console.warn(`There is no access_token at cookie of ${socket.id}`);
        return 0;
      }
      const userId = await this.jwtService
        .verifyAsync(accessToken, {
          secret: this.configService.get<string>('ACCESS_TOKEN_SECRET'),
        })
        .then((payload: JwtPayload) => {
          return payload.id;
        })
        .catch((error) => {
          console.error('Access token validate error:', error);
          return 0;
        });
      return userId;
    } catch (ex) {
      console.error(ex);
      return 0;
    }
  }

  async checkHostSession(userId: number, sessionId: number): Promise<boolean> {
    const session = await this.sessionRepository.findOneBy({
      sessionId,
      hostId: userId,
    });
    return session !== null;
  }

  async checkUserSession(userId: number, sessionId: number): Promise<boolean> {
    const userSession = await this.userSessionRepository.findOneBy({
      userId,
      sessionId,
    });
    return userSession !== null;
  }
}
