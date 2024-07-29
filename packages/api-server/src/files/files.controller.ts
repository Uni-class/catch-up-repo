import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Param,
  ParseIntPipe,
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
import { File } from './entities/file.entity';
import { DeleteResult, UpdateResult } from 'typeorm';

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

  @Get(':fileId')
  @ApiResponse({ type: File })
  @UseGuards(JwtGuard)
  async getFile(
    @UserId(ParseIntPipe) userId: number,
    @Param('fileId', ParseIntPipe) requestedFileId: number,
  ): Promise<File> {
    return await this.filesService.getFileAsUser(requestedFileId, userId);
  }

  @Patch(':fileId')
  @ApiResponse({ type: UpdateResult })
  @UseGuards(JwtGuard)
  async updateFile(
    @Param('fileId', ParseIntPipe) requestedFileId: number,
    @UserId() userId: number,
    @Body() updateFileDto: UpdateFileDto,
  ): Promise<UpdateResult> {
    const file = await this.filesService.getFileAsUser(requestedFileId, userId);
    return this.filesService.update(file.fileId, updateFileDto);
  }

  @Delete(':fileId')
  @ApiResponse({ type: File })
  @UseGuards(JwtGuard)
  async remove(
    @Param('fileId', ParseIntPipe) requestedFileId: number,
    @UserId() userId: number,
  ): Promise<File> {
    const file: File = await this.filesService.getFileAsUser(
      requestedFileId,
      userId,
    );
    return this.filesService.remove(file.fileId);
  }
}
