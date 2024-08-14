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
import { IsDate, IsNumber, IsOptional, IsString } from 'class-validator';
import { User } from './user.entity';
import { SessionFile } from './session-file.entity';
import { UserSession } from './user-session.entity';

@Entity('sessions')
export class Session {
  @IsNumber()
  @PrimaryGeneratedColumn()
  sessionId: number;

  @IsString()
  @Column()
  sessionName: string;

  @IsNumber()
  @Column()
  hostId: number;

  @IsString()
  @Column()
  sessionCode: number;

  @IsDate()
  @CreateDateColumn()
  createdAt: string;

  @IsDate()
  @UpdateDateColumn()
  updatedAt: string;

  @IsDate()
  @DeleteDateColumn()
  closedAt: string;

  @ManyToOne(() => User, (user) => user.sessions)
  @JoinColumn({ name: 'host_id', referencedColumnName: 'userId' })
  host: User;

  @OneToMany(() => SessionFile, (sessionFile) => sessionFile.session, {
    cascade: ['soft-remove'],
  })
  sessionFiles: SessionFile[];

  @OneToMany(() => UserSession, (userSession) => userSession.session)
  userSessions: UserSession[];
}
