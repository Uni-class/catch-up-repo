import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { FilesService } from '../files/files.service';
import { SessionFilesService } from '../session-files/session-files.service';
import { File } from '../files/entities/file.entity';
import { SessionFile } from '../session-files/entities/session-file.entity';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { UserSession } from '../user-sessions/entities/user-session.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Session, File, SessionFile, User, UserSession]),
  ],
  controllers: [SessionsController],
  providers: [SessionsService, FilesService, SessionFilesService, UsersService],
})
export class SessionsModule {}
