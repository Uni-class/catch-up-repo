import { Profile as KakaoProfile } from 'passport-kakao';
import { Profile as GoogleProfile } from 'passport-google-oauth20';
import { Profile as NaverProfile } from 'passport-naver-v2';
import { User } from './entities/user.entity';
import { Builder } from 'builder-pattern';
import { generateUsername } from 'unique-username-generator';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserConverter {
  constructor() {}

  async randomNickname(): Promise<string> {
    return generateUsername('', 5, 10);
  }

  async googleUserConverter(profile: GoogleProfile) {
    const userBuilder = Builder<User>();
    userBuilder
      .provider(profile.provider)
      .providerId(profile.id)
      .status('using');
    if (profile.emails.length !== 0) userBuilder.email(profile.emails[0].value);
    if (profile.profileUrl) userBuilder.profileUrl(profile.profileUrl);
    userBuilder.nickname(await this.randomNickname());
    return userBuilder.build();
  }

  async naverUserConverter(profile: NaverProfile) {
    const userBuilder = Builder<User>();
    userBuilder
      .provider(profile.provider)
      .providerId(profile.id)
      .email(profile.email)
      .nickname(profile.nickname)
      .username(profile.nickname)
      .status('using');
    if (profile.profileImage) userBuilder.profileUrl(profile.profileImage);
    return userBuilder.build();
  }

  async kakaoUserConverter(profile: KakaoProfile) {
    const userBuilder = Builder<User>();
    userBuilder
      .provider(profile.provider)
      .providerId(profile.id)
      .status('using');
    if (profile.emails.length !== 0) userBuilder.email(profile.emails[0].value);
    userBuilder.nickname(profile.username).username(profile.username);
    if (profile.photos.length != 0)
      userBuilder.profileUrl(profile.photos[0].value);
    return userBuilder.build();
  }
}
