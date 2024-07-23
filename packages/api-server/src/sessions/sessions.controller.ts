import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  BadRequestException, UseGuards,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { FilesService } from '../files/files.service';
import { SessionFilesService } from '../session-files/session-files.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { UserId } from '../users/decorators/user-id.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';

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
  async findOne(@Query('id') id: number) {
    return await this.sessionsService.findOne(+id);
  }

  @Patch()
  @UseGuards(JwtGuard)
  async update(
    @Query('id') id: number,
    @UserId() userId: number,
    @Body() updateSessionDto: UpdateSessionDto,
  ) {
    const sessionFileIds = updateSessionDto.sessionFileIds || [];
    delete updateSessionDto.sessionFileIds;
    await this.validateFileIds(userId, sessionFileIds);
    for (const sessionFile of await this.sessionFilesService.findAllBySessionId(id)) {
      if (sessionFileIds.includes(sessionFile.fileId)) {
        sessionFileIds.splice(sessionFileIds.indexOf(sessionFile.fileId), 1);
      }
      else {
        await this.sessionFilesService.remove(sessionFile.sessionFileId);
      }
    }
    for (const fileId of sessionFileIds) {
      await this.sessionFilesService.create(id, fileId);
    }
    return this.sessionsService.update(+id, updateSessionDto);
  }

  @Delete()
  @UseGuards(JwtGuard)
  remove(@Query('id') id: number) {
    return this.sessionsService.remove(+id);
  }

  async validateFileIds(userId: number, fileIds: number[]) {
    for (const fileId of fileIds) {
      const file = await this.filesService.findOne(fileId);
      if (!file || file.ownerId !== userId) {
        throw new BadRequestException(
          `File with ID ${fileId} is either invalid or you do not have access to it.`,
        );
      }
    }
  }
}
