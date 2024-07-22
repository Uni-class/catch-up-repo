import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserSessionFile } from './entities/user-session-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserSessionFile])],
})
export class UserSessionFilesModule {}
