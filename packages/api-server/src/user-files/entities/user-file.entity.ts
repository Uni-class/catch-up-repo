import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '../../users/entities/user.entity';
import { File } from '../../files/entities/file.entity';

@Entity('user_files')
export class UserFile {
  @ApiProperty()
  @IsNumber()
  @PrimaryGeneratedColumn()
  userFileId: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  fileId: number;

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

  @ManyToOne(() => User, (user) => user.userFiles)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;

  @ManyToOne(() => File, (file) => file.userFiles)
  @JoinColumn({ name: 'file_id', referencedColumnName: 'fileId' })
  file: File;
}
