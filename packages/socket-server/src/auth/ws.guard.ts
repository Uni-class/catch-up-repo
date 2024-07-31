import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';

@Injectable()
export class WsGuard implements CanActivate {
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const token = context.switchToWs().getClient().handshake.headers.cookies;
    console.log(token);
    if (token === undefined) throw new WsException('No token provided');

    try {
      console.log(token);
      return true;
    } catch (ex) {
      throw new WsException(ex.message);
    }
  }
}
