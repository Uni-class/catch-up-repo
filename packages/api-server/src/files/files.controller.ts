import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UserId } from '../users/decorators/user-id.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';

@ApiTags('file')
@ApiBearerAuth()
@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() createFileDto: CreateFileDto) {
    return await this.filesService.create(createFileDto);
  }

  @Get(':fileId/info')
  @UseGuards(JwtGuard)
  async findOne(@Param('fileId', ParseIntPipe) requestedFileId: number) {
    return await this.getFileAsUser(requestedFileId, null);
  }

  @Patch(':fileId/info')
  @UseGuards(JwtGuard)
  async update(
    @Param('fileId', ParseIntPipe) requestedFileId: number,
    @UserId() userId: number,
    @Body() updateFileDto: UpdateFileDto,
  ) {
    const file = await this.getFileAsUser(requestedFileId, userId);
    return this.filesService.update(file.fileId, updateFileDto);
  }

  @Delete(':fileId')
  @UseGuards(JwtGuard)
  async remove(
    @Param('fileId', ParseIntPipe) requestedFileId: number,
    @UserId() userId: number,
  ) {
    const file = await this.getFileAsUser(requestedFileId, userId);
    return this.filesService.remove(file.fileId);
  }

  async getFileAsUser(fileId: number, userId: number | null = null) {
    const file = await this.filesService.findOne(fileId);
    if (!file || (userId && file.ownerId !== userId)) {
      throw new BadRequestException(
        `File with ID: ${fileId} does not exist or you do not have permission to access it.`,
      );
    }
    return file;
  }
}
