import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Query,
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserId } from './decorators/user-id.decorator';
import { ApiCookieAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Session } from '../sessions/entities/session.entity';
import { Role } from './role.type';

@ApiTags('user')
@ApiCookieAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@UserId() userId: number): Promise<User> {
    return await this.usersService.findOneById(+userId);
  }

  @Patch()
  @UseGuards(JwtGuard)
  async update(@UserId() userId: number, @Body() updateUserDto: UpdateUserDto) {
    return await this.usersService.update(+userId, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtGuard)
  async remove(@UserId() userId: number): Promise<User> {
    return await this.usersService.remove(+userId);
  }

  @Get('sessions')
  @ApiResponse({ type: [Session] })
  @UseGuards(JwtGuard)
  async getSessions(@UserId() userId: number, @Query() query: Role) {
    if (query.role === 'host')
      return await this.usersService.getSessionsByHost(userId);
    return await this.usersService.getSessionsByParticipant(userId);
  }
}
