import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SessionFile } from './entities/session-file.entity';

@Injectable()
export class SessionFilesService {
  constructor(
    @InjectRepository(SessionFile)
    private readonly sessionFileRepository: Repository<SessionFile>,
  ) {}

  async create(sessionId: number, fileId: number) {
    const newSessionFile: SessionFile = this.sessionFileRepository.create({
      sessionId,
      fileId,
    });
    return await this.sessionFileRepository.save(newSessionFile);
  }

  async findOne(id: number) {
    return await this.sessionFileRepository.findOne({
      where: { sessionFileId: id },
    });
  }

  async findAllBySessionId(sessionId: number) {
    return await this.sessionFileRepository.find({
      where: { sessionId: sessionId },
    });
  }

  async remove(id: number) {
    return `This action removes a #${id} session file`;
  }
}
