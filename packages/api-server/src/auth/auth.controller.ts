import {
  Controller,
  Get,
  UseGuards,
  Req,
  Res,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
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

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @UseGuards(NaverAuthGuard)
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
        .redirect('http://localhost:3000/');
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(GoogleAuthGuard)
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
        .redirect('http://localhost:3000/');
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(KakaoAuthGuard)
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
        .redirect('http://localhost:3000/');
    } catch (e) {
      console.log(e);
    }
  }

  @UseGuards(RefreshGuard)
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
      .json({ msg: 'Refresh token successfully.' });
  }
}
