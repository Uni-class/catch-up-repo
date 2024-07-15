import { Injectable } from '@nestjs/common';
import { Profile as KakaoProfile } from 'passport-kakao';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as NaverProfile } from 'passport-naver-v2';
import { UsersService } from '../users/users.service';
import { UserConverter } from '../users/user.converter';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private userConverter: UserConverter,
  ) {}
  async validateGoogleUser(profile: GoogleProfile) {
    const user = await this.userService.findOne(profile.id, profile.provider);
    if (!user) {
      const newUser = await this.userService.create(
        await this.userConverter.googleUserConverter(profile),
      );
      return newUser;
    }
    return user;
  }
  async validateNaverUser(profile: NaverProfile) {
    const user = await this.userService.findOne(profile.id, profile.provider);
    if (!user) {
      const newUser = await this.userService.create(
        await this.userConverter.naverUserConverter(profile),
      );
      return newUser;
    }
    return user;
  }
  async validateKakaoUser(profile: KakaoProfile) {
    const user = await this.userService.findOne(profile.id, profile.provider);
    if (!user) {
      const newUser = await this.userService.create(
        await this.userConverter.kakaoUserConverter(profile),
      );
      return newUser;
    }
    return user;
  }
}
