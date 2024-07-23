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
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserId } from './decorators/user-id.decorator';
import { ApiCookieAuth, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Session } from '../sessions/entities/session.entity';
import { Role } from './types/role.type';
import { UserSession } from '../user-sessions/entities/user-session.entity';
import { CreateUserSessionDto } from '../user-sessions/dto/create-user-session.dto';
import { UpdateUserSessionDto } from '../user-sessions/dto/update-user-session.dto';
import { UpdateResult } from 'typeorm';
import { UserSessionQueryType } from './types/user-session-query.type';

@ApiTags('user')
@ApiCookieAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@UserId(ParseIntPipe) userId: number): Promise<User> {
    return await this.usersService.findOneById(userId);
  }

  @Patch()
  @UseGuards(JwtGuard)
  async update(
    @UserId(ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(userId, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtGuard)
  async remove(@UserId(ParseIntPipe) userId: number): Promise<User> {
    return await this.usersService.remove(userId);
  }

  @Get('sessions')
  @ApiQuery({ name: 'role', type: String })
  @ApiResponse({ type: [Session] })
  @UseGuards(JwtGuard)
  async getSessions(
    @UserId(ParseIntPipe) userId: number,
    @Query() query: Role,
  ) {
    if (query.role === 'host')
      return await this.usersService.getSessionsByHost(userId);
    return await this.usersService.getSessionsByParticipant(userId);
  }

  @Post('sessions')
  @ApiQuery({ name: 'sessionId', type: Number })
  @ApiQuery({ name: 'displayName', type: String })
  @ApiResponse({ type: UserSession })
  @UseGuards(JwtGuard)
  async postUserSession(
    @UserId(ParseIntPipe) userId: number,
    @Query() query: UserSessionQueryType,
  ): Promise<UserSession> {
    const newCreateUserSession = new CreateUserSessionDto();
    newCreateUserSession.userId = userId;
    newCreateUserSession.displayName = query.displayName;
    newCreateUserSession.sessionId = query.sessionId;
    return await this.usersService.postUserSession(newCreateUserSession);
  }

  @Patch('sessions')
  @ApiQuery({ name: 'sessionId', type: Number })
  @ApiQuery({ name: 'displayName', type: String })
  @ApiResponse({ type: UpdateResult })
  @UseGuards(JwtGuard)
  async patchUserSession(
    @UserId(ParseIntPipe) userId: number,
    @Query() query: UserSessionQueryType,
  ): Promise<UpdateResult> {
    const newUpdateUserSession = new UpdateUserSessionDto();
    newUpdateUserSession.userId = userId;
    newUpdateUserSession.displayName = query.displayName;
    newUpdateUserSession.sessionId = query.sessionId;
    const result: UpdateResult =
      await this.usersService.patchUserSession(newUpdateUserSession);
    return result;
  }

  @Delete('sessions')
  @ApiQuery({ type: UserSessionQueryType })
  @ApiResponse({ type: UserSession })
  @UseGuards(JwtGuard)
  async deleteUserSession(
    @UserId(ParseIntPipe) userId: number,
    @Query() query: UserSessionQueryType,
  ): Promise<UserSession> {
    const result = await this.usersService.deleteUserSession(
      userId,
      query.sessionId,
    );
    return result;
  }
}
