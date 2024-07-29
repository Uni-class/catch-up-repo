import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { FilesService } from '../files/files.service';
import { SessionFilesService } from '../session-files/session-files.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { UserId } from '../users/decorators/user-id.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Session } from './entities/session.entity';
import { SessionFile } from '../session-files/entities/session-file.entity';
import { File } from '../files/entities/file.entity';
import { SessionResponseDto } from './dto/session.response.dto';

@ApiTags('Session')
@ApiBearerAuth()
@Controller('session')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly filesService: FilesService,
    private readonly sessionFilesService: SessionFilesService,
  ) {}

  @Post('create')
  @ApiResponse({ type: Session })
  @UseGuards(JwtGuard)
  async createSession(
    @UserId() userId: number,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    createSessionDto.hostId = userId;
    const sessionFileIds = createSessionDto.sessionFileIds || [];
    delete createSessionDto.sessionFileIds;
    for (const fileId of sessionFileIds) {
      await this.filesService.getFileAsUser(fileId, userId);
    }
    const session = await this.sessionsService.create(createSessionDto);
    for (const fileId of sessionFileIds) {
      await this.sessionFilesService.create(session.sessionId, fileId);
    }
    return session;
  }

  @Get(':sessionId')
  @ApiResponse({ type: SessionResponseDto })
  @UseGuards(JwtGuard)
  async getSessionInfo(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @UserId(ParseIntPipe) userId: number,
  ): Promise<SessionResponseDto> {
    const session: Session = await this.sessionsService.getSessionAsUser(
      sessionId,
      null,
    );
    const sessionFiles: SessionFile[] = session.sessionFiles;
    const fileList: File[] =
      await this.sessionsService.getFileListBySessionFiles(sessionFiles);
    return new SessionResponseDto(session, fileList);
  }

  @Patch(':sessionId')
  @UseGuards(JwtGuard)
  async update(
    @Param('sessionId', ParseIntPipe) requestedSessionId: number,
    @UserId() userId: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    const sessionFileIds = updateSessionDto.sessionFileIds || [];
    delete updateSessionDto.sessionFileIds;
    const session = await this.sessionsService.getSessionAsUser(
      requestedSessionId,
      userId,
    );
    for (const fileId of sessionFileIds) {
      await this.filesService.getFileAsUser(fileId, userId);
    }
    for (const sessionFile of await this.sessionFilesService.findAllBySessionId(
      session.sessionId,
    )) {
      if (sessionFileIds.includes(sessionFile.fileId)) {
        sessionFileIds.splice(sessionFileIds.indexOf(sessionFile.fileId), 1);
      } else {
        await this.sessionFilesService.remove(sessionFile.sessionFileId);
      }
    }
    for (const fileId of sessionFileIds) {
      await this.sessionFilesService.create(session.sessionId, fileId);
    }
    await this.sessionsService.update(session.sessionId, updateSessionDto);
    return null;
  }
}
