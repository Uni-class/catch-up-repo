import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NaverAuthGuard } from './guards/naverauth.guard';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './guards/googleauth.guard';
import { KakaoAuthGuard } from './guards/kakaoauth.guard';
import * as process from 'node:process';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { RefreshGuard } from './guards/refresh.guard';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(NaverAuthGuard)
  @ApiCreatedResponse({ description: 'User logged in!' })
  @HttpCode(HttpStatus.CREATED)
  @Get('naver/callback')
  async naverCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const user: User = req.user as User;
      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);
      await this.userService.update(user.id, { refreshToken });
      return res
        .cookie('access_token', accessToken)
        .cookie('refresh_token', refreshToken)
        .status(HttpStatus.CREATED)
        .redirect('http://localhost:3000/');
    } catch (e) {
      throw new InternalServerErrorException('Server Error', e);
    }
  }

  @UseGuards(GoogleAuthGuard)
  @ApiCreatedResponse({ description: 'User logged in!' })
  @HttpCode(HttpStatus.CREATED)
  @Get('google/callback')
  async googleCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const user: User = req.user as User;
      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);
      await this.userService.update(user.id, { refreshToken });
      return res
        .cookie('access_token', accessToken)
        .cookie('refresh_token', refreshToken)
        .status(HttpStatus.CREATED)
        .redirect('http://localhost:3000/');
    } catch (e) {
      throw new InternalServerErrorException('Server Error', e);
    }
  }

  @UseGuards(KakaoAuthGuard)
  @ApiCreatedResponse({ description: 'User logged in!' })
  @HttpCode(HttpStatus.CREATED)
  @Get('kakao/callback')
  async kakaoCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const user: User = req.user as User;

      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);
      await this.userService.update(user.id, { refreshToken });
      return res
        .cookie('access_token', accessToken)
        .cookie('refresh_token', refreshToken)
        .status(HttpStatus.CREATED)
        .redirect('http://localhost:3000/');
    } catch (e) {
      throw new InternalServerErrorException('Server Error', e);
    }
  }

  @UseGuards(RefreshGuard)
  @ApiCreatedResponse({ description: 'Access token refreshed!' })
  @ApiUnauthorizedResponse({ description: `Refresh token is not user's!` })
  @HttpCode(HttpStatus.CREATED)
  @Get('token-refresh')
  async tokenRefresh(@Req() req: Request, @Res() res): Promise<any> {
    const refreshToken = req.cookies.refresh_token;
    const user: User = req.user as User;
    if (user.refreshToken !== refreshToken) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ msg: `This refresh token is not user's token` });
    }
    const newAccessToken = await this.authService.generateAccessToken(user);
    return res
      .cookie('access_token', newAccessToken)
      .status(HttpStatus.CREATED)
      .json({ msg: 'Refresh token successfully.' });
  }
}
