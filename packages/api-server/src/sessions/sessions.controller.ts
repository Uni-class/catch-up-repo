import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  BadRequestException,
  NotFoundException,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { FilesService } from '../files/files.service';
import { SessionFilesService } from '../session-files/session-files.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { UserId } from '../users/decorators/user-id.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Sessions')
@ApiBearerAuth()
@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly filesService: FilesService,
    private readonly sessionFilesService: SessionFilesService,
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(
    @UserId() userId: number,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    createSessionDto.hostId = userId;
    const sessionFileIds = createSessionDto.sessionFileIds || [];
    delete createSessionDto.sessionFileIds;
    await this.validateFileIds(userId, sessionFileIds);
    const session = await this.sessionsService.create(createSessionDto);
    for (const fileId of sessionFileIds) {
      await this.sessionFilesService.create(session[0].sessionId, fileId);
    }
    return session;
  }

  @Get()
  @UseGuards(JwtGuard)
  async findOne(@Query('sessionId', ParseIntPipe) sessionId: number) {
    const session = await this.sessionsService.findOne(sessionId);
    if (!session) {
      throw new NotFoundException(
        `Session with ID: ${sessionId} does not exist or you do not have permission to access it.`,
      );
    }
    return session;
  }

  @Patch()
  @UseGuards(JwtGuard)
  async update(
    @Query('sessionId', ParseIntPipe) sessionId: number,
    @UserId() userId: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    const sessionFileIds = updateSessionDto.sessionFileIds || [];
    delete updateSessionDto.sessionFileIds;
    await this.validateFileIds(userId, sessionFileIds);
    for (const sessionFile of await this.sessionFilesService.findAllBySessionId(
      sessionId,
    )) {
      if (sessionFileIds.includes(sessionFile.fileId)) {
        sessionFileIds.splice(sessionFileIds.indexOf(sessionFile.fileId), 1);
      } else {
        await this.sessionFilesService.remove(sessionFile.sessionFileId);
      }
    }
    for (const fileId of sessionFileIds) {
      await this.sessionFilesService.create(sessionId, fileId);
    }
    return this.sessionsService.update(sessionId, updateSessionDto);
  }

  @Delete()
  @UseGuards(JwtGuard)
  remove(@Query('sessionId', ParseIntPipe) sessionId: number) {
    return this.sessionsService.remove(sessionId);
  }

  async validateFileIds(userId: number, fileIds: number[]) {
    for (const fileId of fileIds) {
      const file = await this.filesService.findOne(fileId);
      if (!file || file.ownerId !== userId) {
        throw new BadRequestException(
          `File with ID: ${fileId} does not exist or you do not have permission to access it.`,
        );
      }
    }
  }
}
