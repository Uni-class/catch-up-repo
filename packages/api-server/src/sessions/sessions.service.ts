import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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
import { SessionResponseDto } from './dto/session.response.dto';

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
    const session: Session = await this.sessionRepository.findOneBy({
      hostId: userId,
      sessionId,
    });
    if (!session)
      throw new NotFoundException(
        `Session with ID: ${sessionId} does not exist or you do not have permission to control it.`,
      );

    if (status === 'open') {
      if (session.sessionCode !== '')
        throw new BadRequestException(
          `Session with ID: ${sessionId} is already opened.`,
        );
      const sessionCode: string = await this.makeSessionCode(sessionId);
      await this.sessionRepository.update(sessionId, { sessionCode });
      return { sessionCode };
    } else {
      if (session.sessionCode === '')
        throw new BadRequestException(
          `Session with ID: ${sessionId} is already closed.`,
        );
      await this.sessionRepository.update(sessionId, { sessionCode: '' });
      return { sessionCode: '' };
    }
  }

  async makeSessionCode(sessionId: number) {
    const session: Session = await this.findOne(sessionId);
    const code: string = bcrypt.hashSync(session.sessionName + Date.now(), 10);
    return code.slice(7, 13);
  }

  async getSessionByCode(sessionCode: string): Promise<SessionResponseDto> {
    const session: Session = await this.sessionRepository.findOneBy({
      sessionCode,
    });
    if (!session) {
      throw new BadRequestException(
        `Session with Code: ${sessionCode} does not exist or you do not have permission to access it.`,
      );
    }
    const sessionFiles: SessionFile[] = session.sessionFiles;
    const fileList: File[] = await this.getFileListBySessionFiles(sessionFiles);
    return new SessionResponseDto(session, fileList);
  }

  async validateGetRequest(id: number, code: string) {
    if ((id !== undefined && code !== undefined) || !(id || code))
      throw new BadRequestException('Invalid Request.');
  }

  async getSessionByid(id: number): Promise<SessionResponseDto> {
    const session: Session = await this.getSessionAsUser(id, null);
    const sessionFiles: SessionFile[] = session.sessionFiles;
    const fileList: File[] = await this.getFileListBySessionFiles(sessionFiles);
    return new SessionResponseDto(session, fileList);
  }
}
