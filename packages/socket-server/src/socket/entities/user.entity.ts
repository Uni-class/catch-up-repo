import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Session } from './session.entity';
import { UserFile } from './user-file.entity';
import { UserSession } from './user-session.entity';
import { Exclude } from 'class-transformer';
import { File } from './file.entity';

@Entity('users')
export class User {
  @IsNumber()
  @PrimaryGeneratedColumn()
  userId: number;

  @IsString()
  @Column()
  nickname: string;

  @IsString()
  @Exclude()
  @Column({ nullable: true })
  username: string;

  @IsString()
  @Column({ nullable: true })
  email: string;

  @IsString()
  @Column({ nullable: true })
  profileUrl: string;

  @IsString()
  @Column()
  provider: string;

  @IsString()
  @Exclude()
  @Column()
  providerId: string;

  @IsString()
  @Exclude()
  @Column({ nullable: true })
  refreshToken: string;

  @IsString()
  @Exclude()
  @Column()
  status: string;

  @IsDate()
  @CreateDateColumn()
  createdAt: string;

  @IsDate()
  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;

  @IsDate()
  @Exclude()
  @DeleteDateColumn()
  deletedAt: string;

  @OneToMany(() => Session, (session) => session.host)
  sessions: Session[];

  @OneToMany(() => UserFile, (userFile) => userFile.user, {
    cascade: ['soft-remove'],
  })
  userFiles: UserFile[];

  @OneToMany(() => UserSession, (userSession) => userSession.user, {
    cascade: ['soft-remove'],
  })
  userSessions: UserSession[];

  @OneToMany(() => File, (file) => file.owner)
  files: Promise<File[]>;
}
