import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async validateUser(provider: string, id: string) {}
}
