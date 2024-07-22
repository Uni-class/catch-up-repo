import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository, UpdateResult } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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
}
