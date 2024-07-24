import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { SessionFile } from '../../session-files/entities/session-file.entity';
import { UserFile } from '../../user-files/entities/user-file.entity';

@Entity('files')
export class File {
  @ApiProperty()
  @IsNumber()
  @PrimaryGeneratedColumn()
  fileId: number;

  @ApiProperty()
  @IsNumber()
  ownerId: number;

  @ApiProperty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty()
  @IsString()
  @Column()
  url: string;

  @ApiProperty()
  @IsDate()
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty()
  @IsDate()
  @UpdateDateColumn()
  updatedAt: string;

  @ApiProperty()
  @IsDate()
  @DeleteDateColumn()
  deletedAt: string;

  @OneToMany(() => SessionFile, (sessionFile) => sessionFile.file)
  sessionFiles: SessionFile;

  @OneToMany(() => UserFile, (userFile) => userFile.file)
  userFiles: UserFile[];
}
