import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const cookies = context.switchToWs().getClient().handshake.headers.cookie;
    const access_token = cookies.get('access_token');

    try {
      console.log(access_token);
      context.switchToWs().getClient().handshake.headers.user = access_token;
      return true;
    } catch (ex) {
      throw new WsException(ex.message);
    }
  }
}
