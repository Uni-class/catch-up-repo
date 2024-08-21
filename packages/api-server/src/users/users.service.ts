import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { MongoClient, ServerApiVersion } from 'mongodb';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Session } from '../sessions/entities/session.entity';
import { UserSession } from '../user-sessions/entities/user-session.entity';
import { CreateUserSessionDto } from '../user-sessions/dto/create-user-session.dto';
import { UpdateUserSessionDto } from '../user-sessions/dto/update-user-session.dto';
import { File } from '../files/entities/file.entity';
import { SessionFile } from '../session-files/entities/session-file.entity';
import { UserSessionFile } from '../user-session-files/entities/user-session-file.entity';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/mongoose';
import { Note } from './schemas/note.schema';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
    @InjectRepository(File)
    private readonly fileRepository: Repository<File>,
    @InjectRepository(SessionFile)
    private readonly sessionFilesRepository: Repository<SessionFile>,
    @InjectRepository(UserSessionFile)
    private readonly userSessionFilesRepository: Repository<UserSessionFile>,
    @InjectModel(Note.name)
    private readonly noteModel: Model<Note>,
  ) {}
  async create(createUserDto: CreateUserDto) {
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOneByProviderIdAndProvider(
    providerId: string,
    provider: string,
  ): Promise<User> {
    return await this.userRepository.findOne({
      where: { providerId, provider },
    });
  }

  async update(
    userId: number,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userRepository.update(userId, updateUserDto);
  }

  async remove(userId: number) {
    const user = await this.userRepository.findOne({
      where: { userId: userId },
    });
    return await this.userRepository.softRemove(user);
  }

  async findOneById(userId: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { userId: userId },
    });
  }

  async getSessionsByHost(userId: number): Promise<Session[]> {
    const sessions = await this.sessionRepository.find({
      where: { hostId: userId },
      order: { createdAt: 'DESC' },
      take: 10,
    });
    return sessions;
  }

  async getSessionsByParticipant(userId: number): Promise<Session[]> {
    const userSessions: UserSession[] = await this.userSessionRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      relations: ['session'],
      take: 10,
    });
    const sessions = await Promise.all(
      userSessions.map((userSession) => {
        return userSession.session;
      }),
    );
    return sessions.filter((session) => {
      return session.hostId !== userId;
    });
  }

  async postUserSession(
    createUserSessionDto: CreateUserSessionDto,
  ): Promise<UserSession> {
    const session: Session = await this.sessionRepository.findOneBy({
      sessionId: createUserSessionDto.sessionId,
    });
    if (!session) {
      throw new NotFoundException(
        `Session ${createUserSessionDto.sessionId} does not exist`,
      );
    }
    const checkUserSession = await this.userSessionRepository.findOneBy({
      userId: createUserSessionDto.userId,
      sessionId: createUserSessionDto.sessionId,
    });
    if (checkUserSession) {
      return checkUserSession;
    }
    const newUserSession =
      this.userSessionRepository.create(createUserSessionDto);
    const userSession = await this.userSessionRepository.save(newUserSession);

    await this.createUserSessionFile(
      session.sessionId,
      userSession.userSessionId,
    );

    return userSession;
  }

  async createUserSessionFile(sessionId: number, userSessionId: number) {
    const sessionFiles = await this.sessionFilesRepository.findBy({
      sessionId,
    });

    for (const sessionFile of sessionFiles) {
      const newUserSessionFile = this.userSessionFilesRepository.create({
        userSessionId,
        sessionFileId: sessionFile.sessionFileId,
      });
      await this.userSessionFilesRepository.save(newUserSessionFile);
    }
  }

  async patchUserSession(updateUserSessionDto: UpdateUserSessionDto) {
    const userSession = await this.userSessionRepository.findOneBy({
      userId: updateUserSessionDto.userId,
      sessionId: updateUserSessionDto.sessionId,
    });
    if (!userSession) {
      throw new BadRequestException(
        `You did not joined this session. SessionId: ${updateUserSessionDto.sessionId}`,
      );
    }
    return await this.userSessionRepository.update(
      userSession.userSessionId,
      updateUserSessionDto,
    );
  }

  async deleteUserSession(userId: number, sessionId: number) {
    const userSession = await this.userSessionRepository.findOneBy({
      userId,
      sessionId,
    });
    if (!userSession) {
      throw new BadRequestException(
        `You did not joined this session. SessionId: ${sessionId}`,
      );
    }
    return await this.userSessionRepository.softRemove(userSession);
  }

  async getUserFiles(userId: number, last: number = 0): Promise<File[]> {
    const files: File[] = await this.fileRepository.find({
      where: { ownerId: userId },
      order: { createdAt: 'DESC' },
      skip: 10 * last,
      take: 10,
    });
    return files;
  }

  async deletdeleteRefreshToken(userId: number) {
    return await this.userRepository.update(userId, { refreshToken: '' });
  }

  async getFileNotes(userId: number, sessionId: number, fileId: number) {
    const note = this.noteModel.find({
      userId,
      sessionId,
      fileId,
    });
    return note;
  }

  async saveFileNotes(
    userId: number,
    sessionId: number,
    fileId: number,
    data: any,
  ) {
    const note = new this.noteModel({
      userId,
      sessionId,
      fileId,
      data,
    });
    return note.save();
  }
}
