import { Module } from '@nestjs/common';
import { SocketService } from './socket.service';
import { SocketGateway } from './socket.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { File } from './entities/file.entity';
import { Session } from './entities/session.entity';
import { SessionFile } from './entities/session-file.entity';
import { User } from './entities/user.entity';
import { UserSession } from './entities/user-session.entity';
import { UserSessionFile } from './entities/user-session-file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      File,
      Session,
      SessionFile,
      User,
      UserSession,
      UserSessionFile,
    ]),
  ],
  providers: [SocketGateway, SocketService],
})
export class SocketModule {}
