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
import { Session } from './session.entity';
import { User } from './user.entity';
import { UserSessionFile } from './user-session-file.entity';

@Entity('user_sessions')
export class UserSession {
  @IsNumber()
  @PrimaryGeneratedColumn()
  userSessionId: number;

  @IsNumber()
  @Column()
  userId: number;

  @IsNumber()
  @Column()
  sessionId: number;

  @IsString()
  @Column()
  displayName: string;

  @IsDate()
  @CreateDateColumn()
  createdAt: string;

  @IsDate()
  @UpdateDateColumn()
  updatedAt: string;

  @IsDate()
  @DeleteDateColumn()
  deletedAt: string;

  @ManyToOne(() => Session, (session) => session.userSessions)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'sessionId' })
  session: Promise<Session>;

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
