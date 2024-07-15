import { Injectable } from '@nestjs/common';
import { Profile as KakaoProfile } from 'passport-kakao';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as NaverProfile } from 'passport-naver-v2';
import { UsersService } from '../users/users.service';
import { UserConverter } from '../users/user.converter';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as process from 'node:process';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private userConverter: UserConverter,
    private jwtService: JwtService,
  ) {}

  async validateGoogleUser(profile: GoogleProfile) {
    const user = await this.userService.findOneByProviderId(
      profile.id,
      profile.provider,
    );
    if (!user) {
      const newUser = await this.userService.create(
        await this.userConverter.googleUserConverter(profile),
      );
      return newUser;
    }
    return user;
  }

  async validateNaverUser(profile: NaverProfile) {
    const user = await this.userService.findOneByProviderId(
      profile.id,
      profile.provider,
    );
    if (!user) {
      const newUser = await this.userService.create(
        await this.userConverter.naverUserConverter(profile),
      );
      return newUser;
    }
    return user;
  }

  async validateKakaoUser(profile: KakaoProfile) {
    const user = await this.userService.findOneByProviderId(
      profile.id,
      profile.provider,
    );
    if (!user) {
      const newUser = await this.userService.create(
        await this.userConverter.kakaoUserConverter(profile),
      );
      return newUser;
    }
    return user;
  }

  async generateAccessToken(user: User) {
    const payload: JwtPayload = { id: user.id };
    return await this.jwtService.signAsync(payload);
  }

  async generateRefreshToken(user: User) {
    const payload = { id: user.id };
    return await this.jwtService.signAsync(payload, {
      secret: process.env.REFRESH_TOKEN_SECRET,
      expiresIn: process.env.REFRESH_TOKEN_EXPIRATION,
    });
  }

  async tokenValidateUser(payload: JwtPayload) {
    return await this.userService.findOneById(payload.id);
  }
}
