import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserFile } from './entities/user-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserFile])],
})
export class UserFilesModule {}
