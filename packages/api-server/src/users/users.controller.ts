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
} from '@nestjs/common';
import { Request } from 'express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { UserId } from './decorators/user-id.decorator';
import { ApiCookieAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiCookieAuth()
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(JwtGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  async findOne(@UserId() userId: number) {
    return await this.usersService.findOneById(+userId);
  }

  @Patch()
  @UseGuards(JwtGuard)
  update(@UserId() userId: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+userId, updateUserDto);
  }

  @Delete()
  @UseGuards(JwtGuard)
  remove(@UserId() userId: number) {
    return this.usersService.remove(+userId);
  }
}
