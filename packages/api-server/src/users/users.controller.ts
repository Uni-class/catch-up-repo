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
import {
  ApiBearerAuth,
  ApiBody,
  ApiCookieAuth,
  ApiExtraModels,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { User } from './entities/user.entity';
import { Session } from '../sessions/entities/session.entity';
import { Role } from './types/role.type';
import { UserSession } from '../user-sessions/entities/user-session.entity';
import { CreateUserSessionDto } from '../user-sessions/dto/create-user-session.dto';
import { UpdateUserSessionDto } from '../user-sessions/dto/update-user-session.dto';
import { UpdateResult } from 'typeorm';
import { UserSessionBodyType } from './types/user-session-body.type';
import { File } from '../files/entities/file.entity';

@ApiTags('user')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async getUserProfile(@UserId(ParseIntPipe) userId: number): Promise<User> {
    return await this.usersService.findOneById(userId);
  }

  @Patch('profile')
  @UseGuards(JwtGuard)
  async updateUserProfile(
    @UserId(ParseIntPipe) userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.usersService.update(userId, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtGuard)
  async deleteUser(@UserId(ParseIntPipe) userId: number): Promise<User> {
    return await this.usersService.remove(userId);
  }

  @Get('sessions')
  @ApiExtraModels(Session, UserSession)
  @ApiQuery({ name: 'role', type: String })
  @ApiResponse({ type: [Session] })
  @UseGuards(JwtGuard)
  async getSessions(
    @UserId(ParseIntPipe) userId: number,
    @Query() query: Role,
  ): Promise<Session[]> {
    if (query.role === 'host')
      return await this.usersService.getSessionsByHost(userId);
    return await this.usersService.getSessionsByParticipant(userId);
  }

  @Post('sessions/:sessionId/join')
  @ApiParam({ name: 'sessionId', type: Number })
  @ApiBody({ type: UserSessionBodyType })
  @ApiResponse({ type: UserSession })
  @UseGuards(JwtGuard)
  async postUserSession(
    @UserId(ParseIntPipe) userId: number,
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Body() body: UserSessionBodyType,
  ): Promise<UserSession> {
    const newCreateUserSession = new CreateUserSessionDto();
    newCreateUserSession.userId = userId;
    newCreateUserSession.displayName = body.displayName;
    newCreateUserSession.sessionId = sessionId;
    return await this.usersService.postUserSession(newCreateUserSession);
  }

  @Patch('sessions/:sessionId/display-name')
  @ApiParam({ name: 'sessionId', type: Number })
  @ApiBody({ type: UserSessionBodyType })
  @ApiResponse({ type: UpdateResult })
  @UseGuards(JwtGuard)
  async patchUserSession(
    @UserId(ParseIntPipe) userId: number,
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Body() body: UserSessionBodyType,
  ): Promise<UpdateResult> {
    const newUpdateUserSession = new UpdateUserSessionDto();
    newUpdateUserSession.userId = userId;
    newUpdateUserSession.displayName = body.displayName;
    newUpdateUserSession.sessionId = sessionId;
    const result: UpdateResult =
      await this.usersService.patchUserSession(newUpdateUserSession);
    return result;
  }

  @Delete('sessions/:sessionId')
  @ApiParam({ name: 'sessionId', type: Number })
  @ApiResponse({ type: UserSession })
  @UseGuards(JwtGuard)
  async deleteUserSession(
    @UserId(ParseIntPipe) userId: number,
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ): Promise<UserSession> {
    const result = await this.usersService.deleteUserSession(userId, sessionId);
    return result;
  }

  @Get('files')
  @ApiResponse({ type: File })
  @UseGuards(JwtGuard)
  async getUserFiles(@UserId(ParseIntPipe) userId: number) {
    const files = await this.usersService.getUserFiles(userId);
    return files;
  }
}
