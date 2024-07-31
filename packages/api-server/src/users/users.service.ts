import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Session } from '../sessions/entities/session.entity';
import { UserSession } from '../user-sessions/entities/user-session.entity';
import { CreateUserSessionDto } from '../user-sessions/dto/create-user-session.dto';
import { UpdateUserSessionDto } from '../user-sessions/dto/update-user-session.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(UserSession)
    private readonly userSessionRepository: Repository<UserSession>,
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
    const newUserSession =
      this.userSessionRepository.create(createUserSessionDto);
    const userSession = await this.userSessionRepository.save(newUserSession);
    return userSession;
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

  async getUserFiles(userId: number) {
    const user: User = await this.userRepository.findOne({
      where: { userId },
      relations: ['files'],
    });
    const files = await user.files;
    return files;
  }

  async deletdeleteRefreshToken(userId: number) {
    return await this.userRepository.update(userId, { refreshToken: '' });
  }
}
