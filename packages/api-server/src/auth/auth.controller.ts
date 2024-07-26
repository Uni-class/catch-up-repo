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
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { NaverAuthGuard } from './guards/naverauth.guard';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './guards/googleauth.guard';
import { KakaoAuthGuard } from './guards/kakaoauth.guard';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { RefreshGuard } from './guards/refresh.guard';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Profile as NaverProfile } from 'passport-naver-v2';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as KakaoProfile } from 'passport-kakao';
import { JwtPayload } from './jwt.payload';
import { UpdateResult } from 'typeorm';
import { ConfigService } from '@nestjs/config';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly configService: ConfigService,
  ) {}

  @UseGuards(NaverAuthGuard)
  @ApiCreatedResponse({ description: 'User logged in!' })
  @HttpCode(302)
  @Get('naver/callback')
  async naverCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const profile = req.user as NaverProfile;
      const user = await this.authService.validateNaverUser(profile);
      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);
      await this.userService.update(user.userId, { refreshToken });
      return res
        .cookie('access_token', accessToken)
        .cookie('refresh_token', refreshToken)
        .redirect(
          this.configService.get<string>('CLIENT_DOMAIN') +
            '/dashboard/session',
        );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Server Error', e);
    }
  }

  @UseGuards(GoogleAuthGuard)
  @ApiCreatedResponse({ description: 'User logged in!' })
  @HttpCode(302)
  @Get('google/callback')
  async googleCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const profile = req.user as GoogleProfile;
      const user = await this.authService.validateGoogleUser(profile);
      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);
      await this.userService.update(user.userId, { refreshToken });
      return res
        .cookie('access_token', accessToken)
        .cookie('refresh_token', refreshToken)
        .redirect(
          this.configService.get<string>('CLIENT_DOMAIN') +
            '/dashboard/session',
        );
    } catch (e) {
      throw new InternalServerErrorException('Server Error', e);
    }
  }

  @UseGuards(KakaoAuthGuard)
  @ApiCreatedResponse({ description: 'User logged in!' })
  @HttpCode(302)
  @Get('kakao/callback')
  async kakaoCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      const profile = req.user as KakaoProfile;
      const user = await this.authService.validateKakaoUser(profile);
      const accessToken = await this.authService.generateAccessToken(user);
      const refreshToken = await this.authService.generateRefreshToken(user);
      await this.userService.update(user.userId, { refreshToken });
      return res
        .cookie('access_token', accessToken)
        .cookie('refresh_token', refreshToken)
        .redirect(
          this.configService.get<string>('CLIENT_DOMAIN') +
            '/dashboard/session',
        );
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException('Server Error', e);
    }
  }

  @UseGuards(RefreshGuard)
  @ApiBearerAuth()
  @ApiCreatedResponse({ description: 'Access token refreshed!' })
  @ApiUnauthorizedResponse({ description: `Refresh token is not user's!` })
  @HttpCode(HttpStatus.CREATED)
  @Get('token-refresh')
  async tokenRefresh(@Req() req: Request, @Res() res): Promise<any> {
    const refreshToken = await this.authService.getRefreshTokenFromHeader(req);
    const payload = req.user as JwtPayload;
    const user: User = await this.authService.tokenValidateUser(payload);
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

  @UseGuards(RefreshGuard)
  @ApiBearerAuth()
  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response): Promise<any> {
    const refreshToken = await this.authService.getRefreshTokenFromHeader(req);
    console.log(refreshToken);
    const payload = req.user as JwtPayload;
    console.log(payload);
    const user: User = await this.authService.tokenValidateUser(payload);
    if (user.refreshToken !== refreshToken) {
      throw new UnauthorizedException(`This refresh token is not user's token`);
    }
    const result: UpdateResult =
      await this.authService.deleteRefreshTokenOfUser(payload.id);
    return res
      .cookie('access_token', '', { maxAge: 0 })
      .cookie('refresh_token', '', { maxAge: 0 })
      .redirect(this.configService.get<string>('CLIENT_DOMAIN') + '/login');
  }
}
