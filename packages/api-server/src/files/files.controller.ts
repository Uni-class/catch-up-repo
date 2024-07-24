import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
  BadRequestException,
  UseGuards,
  UploadedFile,
  UseInterceptors,
  ParseFilePipe,
  FileTypeValidator,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { UpdateFileDto } from './dto/update-file.dto';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UserId } from '../users/decorators/user-id.decorator';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadResponseDto } from './dto/file-upload.response.dto';

@ApiTags('file')
@ApiBearerAuth()
@Controller('file')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiResponse({ type: FileUploadResponseDto })
  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UserId(ParseIntPipe) userId: number,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'pdf' })],
      }),
    )
    file: Express.Multer.File,
  ): Promise<FileUploadResponseDto> {
    return await this.filesService.uploadFile(userId, file);
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
