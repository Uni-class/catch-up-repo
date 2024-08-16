import { ConfigService } from '@nestjs/config';

export const CookieOptions = (
  configService: ConfigService,
): {
  sameSite: 'lax';
  httpOnly: boolean;
  domain: string;
} => {
  return {
    sameSite: 'lax',
    httpOnly: true,
    domain: '.' + configService.get<string>('COOKIE_DOMAIN'),
  };
};
