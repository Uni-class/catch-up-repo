import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  ParseIntPipe,
  Param,
  Query,
  BadRequestException,
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
import { UsersService } from '../users/users.service';
import { SessionStatusDto } from './dto/session-status.dto';
import { SessionStatusResponseDto } from './dto/session-status-response.dto';
import { GetSessionQueryDto } from './dto/get-session-query.dto';

@ApiTags('Session')
@ApiBearerAuth()
@Controller('session')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly filesService: FilesService,
    private readonly sessionFilesService: SessionFilesService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @ApiResponse({ type: SessionResponseDto })
  @UseGuards(JwtGuard)
  async createSession(
    @UserId() userId: number,
    @Body() createSessionDto: CreateSessionDto,
  ): Promise<SessionResponseDto> {
    createSessionDto.hostId = userId;
    const sessionFileIds = createSessionDto.sessionFileIds || [];
    delete createSessionDto.sessionFileIds;
    for (const fileId of sessionFileIds) {
      await this.filesService.getFileAsUser(fileId, userId);
    }
    const session = await this.sessionsService.create(createSessionDto);
    console.log(session);
    const user = await this.usersService.findOneById(userId);
    await this.usersService.postUserSession({
      userId: userId,
      sessionId: session.sessionId,
      displayName: user.nickname,
    });
    const sessionFiles: SessionFile[] = [];
    for (const fileId of sessionFileIds) {
      const sessionFile: SessionFile = await this.sessionFilesService.create(
        session.sessionId,
        fileId,
      );
      sessionFiles.push(sessionFile);
    }
    const fileList: File[] =
      await this.sessionsService.getFileListBySessionFiles(sessionFiles);
    return new SessionResponseDto(session, fileList);
  }

  @Get()
  @ApiResponse({ type: SessionResponseDto })
  @UseGuards(JwtGuard)
  async getSessionInfo(
    @Query() { id, code }: GetSessionQueryDto,
    @UserId(ParseIntPipe) userId: number,
  ): Promise<SessionResponseDto> {
    await this.sessionsService.validateGetRequest(id, code);
    if (id) {
      return await this.sessionsService.getSessionByid(id);
    } else if (code) {
      return await this.sessionsService.getSessionByCode(code);
    }
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

  @Post(':sessionId')
  @ApiResponse({ type: SessionStatusResponseDto })
  @UseGuards(JwtGuard)
  async changeSessionStatus(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @UserId(ParseIntPipe) userId: number,
    @Query() { status }: SessionStatusDto,
  ): Promise<SessionStatusResponseDto> {
    const sessionCode: SessionStatusResponseDto =
      await this.sessionsService.changeSessionStatus(userId, sessionId, status);
    return sessionCode;
  }
}
