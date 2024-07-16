import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { NaverStrategy } from './strateties/naver.strategy';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from './strateties/kakao.strategy';
import { GoogleStrategy } from './strateties/google.strategy';
import { JwtModule } from '@nestjs/jwt';
import * as process from 'node:process';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.ACCESS_TOKEN_SECRET,
      signOptions: { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION },
    }),
    UsersModule,
    PassportModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, NaverStrategy, KakaoStrategy, GoogleStrategy],
})
export class AuthModule {}
