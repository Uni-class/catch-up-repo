import { ArgumentsHost, Catch } from '@nestjs/common';
import { BaseWsExceptionFilter, WsException } from '@nestjs/websockets';

@Catch(WsException)
export class WsExceptionFilter extends BaseWsExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs();
    const ackCallback = host.getArgByIndex(2);
    ackCallback(exception);
  }
}
