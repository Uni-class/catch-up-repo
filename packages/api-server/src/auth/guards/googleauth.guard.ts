import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') {
  constructor(private configService: ConfigService) {
    super();
  }
  handleRequest(err: any, user: any, info: any, context: ExecutionContext) {
    const res = context.switchToHttp().getResponse();

    // 에러가 발생했거나 사용자가 없다면
    if (err || !user) {
      // 실패 시 리다이렉트 URL 설정
      return res.redirect(
        this.configService.get<string>('CLIENT_DOMAIN') + '/login',
      );
    }
    return user;
  }
}
