import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Query,
  Delete,
  BadRequestException,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { FilesService } from '../files/files.service';
import { SessionFilesService } from '../session-files/session-files.service';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { UserId } from '../users/decorators/user-id.decorator';

@Controller('sessions')
export class SessionsController {
  constructor(
    private readonly sessionsService: SessionsService,
    private readonly filesService: FilesService,
    private readonly sessionFilesService: SessionFilesService,
  ) {}

  @Post()
  async create(
    @UserId() userId: number,
    @Body() createSessionDto: CreateSessionDto,
  ) {
    createSessionDto.hostId = userId;
    for (const fileId of createSessionDto.sessionFileId) {
      const file = await this.filesService.findOne(fileId);
      if (!file || file.ownerId !== userId) {
        throw new BadRequestException(
          `File with ID ${fileId} is either invalid or you do not have access to it.`,
        );
      }
    }
    const session = await this.sessionsService.create(createSessionDto);
    for (const fileId of createSessionDto.sessionFileId) {
      await this.sessionFilesService.create(session[0].sessionId, fileId);
    }
    return session;
  }

  @Get()
  async findOne(@Query('id') id: string) {
    return await this.sessionsService.findOne(+id);
  }

  @Patch()
  update(@Query('id') id: string, @Body() updateSessionDto: UpdateSessionDto) {
    return this.sessionsService.update(+id, updateSessionDto);
  }

  @Delete()
  remove(@Query('id') id: string) {
    return this.sessionsService.remove(+id);
  }
}
