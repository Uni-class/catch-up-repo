import { ConfigService } from '@nestjs/config';

const configService = new ConfigService();
export const CookieOptions: {
  sameSite: 'strict';
  httpOnly: boolean;
  domain: string;
} = {
  sameSite: 'strict',
  httpOnly: true,
  domain: configService.get<string>('CLIENT_DOMAIN'),
};
