import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Session } from '../../sessions/entities/session.entity';
import { User } from '../../users/entities/user.entity';
import { UserSessionFile } from '../../user-session-files/entities/user-session-file.entity';

@Entity('user_sessions')
export class UserSession {
  @ApiProperty()
  @IsNumber()
  @PrimaryGeneratedColumn()
  userSessionId: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  userId: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  sessionId: number;

  @ApiProperty()
  @IsString()
  @Column()
  displayName: string;

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

  @ManyToOne(() => Session, (session) => session.userSessions)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'sessionId' })
  session: Session;

  @ManyToOne(() => User, (user) => user.userSessions)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'userId' })
  user: User;

  @OneToMany(
    () => UserSessionFile,
    (userSessionFile) => userSessionFile.userSession,
    { cascade: ['soft-remove'] },
  )
  userSessionFiles: UserSessionFile[];
}
