import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { NaverAuthGuard } from './guards/naverauth.guard';
import { Request, Response } from 'express';
import { GoogleAuthGuard } from './guards/googleauth.guard';
import { KakaoAuthGuard } from './guards/kakaoauth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(NaverAuthGuard)
  @Get('naver/callback')
  async naverCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response,
  ): Promise<any> {
    try {
      console.log(req.user);
      return res.redirect('http://localhost:3000/');
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
      console.log(req.user);
      return res.redirect('http://localhost:3000/');
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
      console.log(req.user);
      return res.redirect('http://localhost:3000/');
    } catch (e) {
      console.log(e);
    }
  }
}
