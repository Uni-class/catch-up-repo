import { ConfigService } from '@nestjs/config';

export const CookieOptions = async (
  configService: ConfigService,
  type: 'refreshToken' | 'accessToken' | 'logout',
): Promise<{
  sameSite: 'lax';
  httpOnly: boolean;
  domain: string;
  maxAge: number;
  secure: boolean;
}> => {
  return {
    sameSite: 'lax',
    httpOnly: true,
    domain: configService.get<string>('COOKIE_DOMAIN'),
    maxAge:
      type === 'accessToken'
        ? configService.get<number>('ACCESS_TOKEN_MAX_AGE')
        : type === 'refreshToken'
          ? configService.get<number>('REFRESH_TOKEN_MAX_AGE')
          : 0,
    secure: configService.get<string>('NODE_ENV') === 'production',
  };
};
