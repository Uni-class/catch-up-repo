import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';
import { Session } from '../sessions/entities/session.entity';
import { UserSession } from '../user-sessions/entities/user-session.entity';

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
    const userSessions = await this.userSessionRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
      take: 10,
    });
    const sessions = await Promise.all(
      userSessions.map((userSession) => {
        return this.sessionRepository.findOneBy({
          sessionId: userSession.sessionId,
        });
      }),
    );
    return sessions;
  }

  async postUserSession(userId: number, sessionId: number) {
    const session: Session = await this.sessionRepository.findOneBy({
      sessionId,
    });
    if (!session) {
      throw new NotFoundException(`Session ${sessionId} does not exist`);
    }
    const newUserSession = this.userSessionRepository.create({
      userId,
      sessionId,
    });
    const userSession = await this.userSessionRepository.save(newUserSession);
    return userSession;
  }
}
