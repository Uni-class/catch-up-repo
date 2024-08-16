import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as process from 'node:process';
import { ResponseInterceptor } from './interceptor/response.interceptor';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: process.env.CORS_ORIGIN_SITE, credentials: true });
  console.log(process.env.CORS_ORIGIN_SITE);
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalInterceptors(new ResponseInterceptor());
  await app.listen(process.env.PORT);
}
bootstrap();
