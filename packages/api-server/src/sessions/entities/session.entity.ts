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
import { User } from '../../users/entities/user.entity';
import { SessionFile } from '../../session-files/entities/session-file.entity';
import { UserSession } from '../../user-sessions/entities/user-session.entity';
import { Exclude } from 'class-transformer';

@Entity('sessions')
export class Session {
  @ApiProperty()
  @IsNumber()
  @PrimaryGeneratedColumn()
  sessionId: number;

  @ApiProperty()
  @IsString()
  @Column()
  sessionName: string;

  @ApiProperty()
  @IsNumber()
  @Column()
  hostId: number;

  @ApiProperty()
  @IsString()
  @Exclude()
  @Column()
  sessionCode: string;

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
