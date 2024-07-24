import { Module } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { SessionsController } from './sessions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { FilesService } from '../files/files.service';
import { SessionFilesService } from '../session-files/session-files.service';
import { File } from '../files/entities/file.entity';
import { SessionFile } from '../session-files/entities/session-file.entity';
import { FilesController } from '../files/files.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Session, File, SessionFile])],
  controllers: [SessionsController],
  providers: [
    SessionsService,
    FilesService,
    SessionFilesService,
    FilesController,
  ],
})
export class SessionsModule {}
