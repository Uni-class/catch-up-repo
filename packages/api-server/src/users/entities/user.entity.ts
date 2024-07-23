import { ApiProperty } from '@nestjs/swagger';
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
import { Session } from '../../sessions/entities/session.entity';
import { UserFile } from '../../user-files/entities/user-file.entity';
import { UserSession } from '../../user-sessions/entities/user-session.entity';
import { Exclude } from 'class-transformer';

@Entity('users')
export class User {
  @ApiProperty()
  @IsNumber()
  @PrimaryGeneratedColumn()
  userId: number;

  @ApiProperty()
  @IsString()
  @Column()
  nickname: string;

  @ApiProperty()
  @IsString()
  @Exclude()
  @Column({ nullable: true })
  username: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true })
  email: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true })
  profileUrl: string;

  @ApiProperty()
  @IsString()
  @Column()
  provider: string;

  @ApiProperty()
  @IsString()
  @Exclude()
  @Column()
  providerId: string;

  @ApiProperty()
  @IsString()
  @Exclude()
  @Column({ nullable: true })
  refreshToken: string;

  @ApiProperty()
  @IsString()
  @Exclude()
  @Column()
  status: string;

  @ApiProperty()
  @IsDate()
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty()
  @IsDate()
  @Exclude()
  @UpdateDateColumn()
  updatedAt: string;

  @ApiProperty()
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
}
