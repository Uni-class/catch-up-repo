import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Session } from '../sessions/entities/session.entity';
import { UserSession } from '../user-sessions/entities/user-session.entity';
import { FilesService } from '../files/files.service';
import { File } from '../files/entities/file.entity';
import { SessionFile } from '../session-files/entities/session-file.entity';
import { UserSessionFile } from '../user-session-files/entities/user-session-file.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { Note, NoteSchema } from './schemas/note.schema';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      User,
      Session,
      UserSession,
      File,
      SessionFile,
      UserSessionFile,
    ]),
    MongooseModule.forFeature([{ name: Note.name, schema: NoteSchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, FilesService],
  exports: [UsersService],
})
export class UsersModule {}
