import { ConfigService } from '@nestjs/config';

export const CookieOptions = async (
  configService: ConfigService,
  type: number,
): Promise<{
  sameSite: 'lax';
  httpOnly: boolean;
  domain: string;
  maxAge: number;
}> => {
  return {
    sameSite: 'lax',
    httpOnly: true,
    domain: configService.get<string>('COOKIE_DOMAIN'),
    maxAge: type
      ? configService.get<number>('ACCESS_TOKEN_MAX_AGE')
      : configService.get<number>('REFRESH_TOKEN_MAX_AGE'),
  };
};
