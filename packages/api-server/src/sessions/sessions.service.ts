import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateSessionDto } from './dto/create-session.dto';
import { UpdateSessionDto } from './dto/update-session.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Session } from './entities/session.entity';
import { Repository } from 'typeorm';
import { SessionFile } from '../session-files/entities/session-file.entity';
import { FilesService } from '../files/files.service';
import { File } from '../files/entities/file.entity';
import { SessionStatusResponseDto } from './dto/session-status-response.dto';
import bcrypt from 'bcrypt';

@Injectable()
export class SessionsService {
  constructor(
    private readonly filesService: FilesService,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
  ) {}
  async create(createSessionDto: CreateSessionDto) {
    const newUser = this.sessionRepository.create(createSessionDto);
    return await this.sessionRepository.save(newUser);
  }

  async findOne(id: number) {
    return await this.sessionRepository.findOne({
      where: { sessionId: id },
      relations: ['sessionFiles'],
    });
  }

  async update(id: number, updateSessionDto: UpdateSessionDto) {
    return await this.sessionRepository.update(id, updateSessionDto);
  }

  async getSessionAsUser(sessionId: number, userId: number | null = null) {
    const session = await this.findOne(sessionId);
    if (!session || (userId && session.hostId !== userId)) {
      throw new BadRequestException(
        `Session with ID: ${sessionId} does not exist or you do not have permission to access it.`,
      );
    }
    return session;
  }

  async getFileListBySessionFiles(
    sessionFiles: SessionFile[],
  ): Promise<File[]> {
    if (!sessionFiles || !sessionFiles.length) {
      return [];
    }
    const fileList: File[] = await Promise.all(
      sessionFiles.map((sessionFile: SessionFile) => {
        return this.filesService.findOne(sessionFile.fileId);
      }),
    );
    return fileList.filter((file) => {
      return file !== null;
    });
  }

  async changeSessionStatus(
    userId: number,
    sessionId: number,
    status: string,
  ): Promise<SessionStatusResponseDto> {
    if (status === 'open') {
      const sessionCode: string = await this.makeSessionCode(sessionId);
      await this.sessionRepository.update(sessionId, { sessionCode });
      return { sessionCode };
    } else {
      await this.sessionRepository.update(sessionId, { sessionCode: '' });
      return { sessionCode: '' };
    }
  }

  async makeSessionCode(sessionId: number) {
    const session: Session = await this.findOne(sessionId);
    const code: string = bcrypt.hashSync(session.sessionName + Date.now(), 10);
    return code.slice(0, 6);
  }

  async getSessionByCode(sessionCode: string) {
    const session: Session = await this.sessionRepository.findOneBy({
      sessionCode,
    });
    if (!session) {
      throw new BadRequestException(
        `Session with Code: ${sessionCode} does not exist or you do not have permission to access it.`,
      );
    }
    return session;
  }
}
