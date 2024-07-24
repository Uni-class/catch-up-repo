import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { File } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
  ) {}

  async create(createFileDto: CreateFileDto) {
    return 'This action adds a new file';
  }

  async findOne(id: number) {
    return await this.fileRepository.findOne({
      where: { fileId: id },
    });
  }

  async update(id: number, updateFileDto: UpdateFileDto) {
    return `This action updates a #${id} file`;
  }

  async remove(id: number) {
    const file = await this.fileRepository.findOne({
      where: { fileId: id },
    });
    return await this.fileRepository.softRemove(file);
  }
}
