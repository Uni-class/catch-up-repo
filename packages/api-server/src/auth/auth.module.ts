import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { NaverStrategy } from './strateties/naver.strategy';
import { PassportModule } from '@nestjs/passport';
import { KakaoStrategy } from './strateties/kakao.strategy';
import { GoogleStrategy } from './strateties/google.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, NaverStrategy, KakaoStrategy, GoogleStrategy],
})
export class AuthModule {}
