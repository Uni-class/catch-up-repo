import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionFile } from './entities/session-file.entity';

@Injectable()
export class SessionFilesService {
  constructor(
    @InjectRepository(SessionFile)
    private readonly fileRepository: Repository<SessionFile>,
  ) {}

  async create(sessionId: number, fileId: number) {
    return 'This action adds a new file';
  }

  async findOne(id: number) {
    return await this.fileRepository.findOne({
      where: { sessionFileId: id },
    });
  }

  async findAllBySessionId(sessionId: number) {
    return await this.fileRepository.find({
      where: { sessionId: sessionId },
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} session file`;
  }
}
