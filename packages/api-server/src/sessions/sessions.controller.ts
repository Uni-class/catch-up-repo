import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  UseGuards,
  BadRequestException,
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
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { FilesController } from '../files/files.controller';

@ApiTags('Session')
@ApiBearerAuth()
@Controller('session')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly filesService: FilesService,
    private readonly sessionFilesService: SessionFilesService,
    private readonly filesController: FilesController,
  ) {}

  @Post('create')
  @UseGuards(JwtGuard)
  async createSession(
    @UserId() userId: number,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    createSessionDto.hostId = userId;
    const sessionFileIds = createSessionDto.sessionFileIds || [];
    delete createSessionDto.sessionFileIds;
    await this.validateFileIds(userId, sessionFileIds);
    const session = await this.sessionsService.create(createSessionDto);
    for (const fileId of sessionFileIds) {
      await this.sessionFilesService.create(session.sessionId, fileId);
    }
    return session;
  }

  @Get(':sessionId/info')
  @UseGuards(JwtGuard)
  async getSessionInfo(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @UserId(ParseIntPipe) userId: number,
  ) {
    return await this.getSessionAsUser(sessionId, userId);
  }

  @Patch(':sessionId/info')
  @UseGuards(JwtGuard)
  async update(
    @Param('sessionId', ParseIntPipe) requestedSessionId: number,
    @UserId() userId: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    const sessionFileIds = updateSessionDto.sessionFileIds || [];
    delete updateSessionDto.sessionFileIds;
    const session = await this.getSessionAsUser(requestedSessionId, userId);
    await this.validateFileIds(userId, sessionFileIds);
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

  async getSessionAsUser(sessionId: number, userId: number | null = null) {
    const session = await this.sessionsService.findOne(sessionId);
    if (!session || (userId && session.hostId !== userId)) {
      throw new BadRequestException(
        `Session with ID: ${sessionId} does not exist or you do not have permission to access it.`,
      );
    }
    return session;
  }

  async validateFileIds(userId: number, fileIds: number[]) {
    for (const fileId of fileIds) {
      await this.filesController.getFileAsUser(fileId, userId);
    }
  }
}
