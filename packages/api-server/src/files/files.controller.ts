import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('files')
@ApiBearerAuth()
@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post()
  create(@Body() createFileDto: CreateFileDto) {
    return this.filesService.create(createFileDto);
  }

  @Get()
  findOne(@Query('fileId', ParseIntPipe) fileId: number) {
    return this.filesService.findOne(fileId);
  }

  @Patch()
  update(
    @Query('fileId', ParseIntPipe) fileId: number,
    @Body() updateFileDto: UpdateFileDto,
  ) {
    return this.filesService.update(fileId, updateFileDto);
  }

  @Delete()
  remove(@Query('fileId', ParseIntPipe) fileId: number) {
    return this.filesService.remove(fileId);
  }
}
