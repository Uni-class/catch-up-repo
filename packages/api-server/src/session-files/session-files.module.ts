import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionFile } from './entities/session-file.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SessionFile])],
})
export class SessionFilesModule {}
