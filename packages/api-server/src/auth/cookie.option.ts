import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
export const CookieOptions: {
  sameSite: 'lax';
  httpOnly: boolean;
  domain: string;
} = {
  sameSite: 'lax',
  httpOnly: true,
  domain: '.' + configService.get<string>('CLIENT_DOMAIN').split('://')[1],
};
