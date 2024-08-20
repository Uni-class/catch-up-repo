import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UserConverter } from './users/user.converter';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { SessionsModule } from './sessions/sessions.module';
import { FilesModule } from './files/files.module';
import { NotesModule } from './notes/notes.module';
import { UserSessionsModule } from './user-sessions/user-sessions.module';
import { UserFilesModule } from './user-files/user-files.module';
import { SessionFilesModule } from './session-files/session-files.module';
import { UserSessionFilesModule } from './user-session-files/user-session-files.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        ssl: {
          rejectUnauthorized: false,
        },
        namingStrategy: new SnakeNamingStrategy(),
        useUTC: true,
      }),
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
    }),
    AuthModule,
    UsersModule,
    SessionsModule,
    FilesModule,
    NotesModule,
    UserSessionsModule,
    UserFilesModule,
    SessionFilesModule,
    UserSessionFilesModule,
  ],
  controllers: [AppController],
  providers: [AppService, UserConverter],
})
export class AppModule {}
