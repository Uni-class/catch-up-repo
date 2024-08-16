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
import { User } from './user.entity';
import { File } from './file.entity';

@Entity('user_files')
export class UserFile {
  @IsNumber()
  @PrimaryGeneratedColumn()
  userFileId: number;

  @IsNumber()
  @Column()
  userId: number;

  @IsNumber()
  @Column()
  fileId: number;

  @IsDate()
  @CreateDateColumn()
  createdAt: string;

  @IsDate()
  @UpdateDateColumn()
  updatedAt: string;

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
