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
import { ApiCookieAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Session } from '../sessions/entities/session.entity';
import { Role } from './role.type';
import { UpdateSessionDto } from '../sessions/dto/update-session.dto';
import { UserSession } from '../user-sessions/entities/user-session.entity';
import { CreateUserSessionDto } from '../user-sessions/dto/create-user-session.dto';
import { UpdateUserSessionDto } from '../user-sessions/dto/update-user-session.dto';
import { UpdateResult } from 'typeorm';

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
  @ApiQuery({ type: Role })
  @ApiResponse({ type: [Session] })
  @UseGuards(JwtGuard)
  async getSessions(@UserId() userId: number, @Query() query: Role) {
    if (query.role === 'host')
      return await this.usersService.getSessionsByHost(+userId);
    return await this.usersService.getSessionsByParticipant(+userId);
  }

  @Post('sessions')
  @ApiQuery({ name: 'sessionId', type: Number })
  @ApiQuery({ name: 'displayName', type: String })
  @ApiResponse({ type: UserSession })
  @UseGuards(JwtGuard)
  async postUserSession(
    @UserId() userId: number,
    @Query('sessionId') sessionId: number,
    @Query('displayName') displayName: string,
  ): Promise<UserSession> {
    const newCreateUserSession = new CreateUserSessionDto();
    newCreateUserSession.userId = userId;
    newCreateUserSession.displayName = displayName;
    newCreateUserSession.sessionId = sessionId;
    return await this.usersService.postUserSession(newCreateUserSession);
  }

  @Patch('sessions')
  @ApiQuery({ name: 'sessionId', type: Number })
  @ApiQuery({ name: 'displayName', type: String })
  @ApiResponse({ type: UpdateResult })
  @UseGuards(JwtGuard)
  async patchUserSession(
    @UserId() userId: number,
    @Query('sessionId') sessionId: number,
    @Query('displayName') displayName: string,
  ): Promise<UpdateResult> {
    const newUpdateUserSession = new UpdateUserSessionDto();
    newUpdateUserSession.userId = userId;
    newUpdateUserSession.displayName = displayName;
    newUpdateUserSession.sessionId = sessionId;
    const result: UpdateResult =
      await this.usersService.patchUserSession(newUpdateUserSession);
    return result;
  }

  @Delete('sessions')
  @ApiQuery({ name: 'sessionId', type: Number })
  @ApiResponse({ type: UserSession })
  @UseGuards(JwtGuard)
  async deleteUserSession(
    @UserId() userId: number,
    @Query('sessionId') sessionId: number,
  ): Promise<UserSession> {
    const result = await this.usersService.deleteUserSession(userId, sessionId);
    return result;
  }
}
