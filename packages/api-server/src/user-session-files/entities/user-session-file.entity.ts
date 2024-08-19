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
import { Session } from '../../sessions/entities/session.entity';
import { UserSession } from '../../user-sessions/entities/user-session.entity';
import { SessionFile } from '../../session-files/entities/session-file.entity';

@Entity('user_session_files')
export class UserSessionFile {
  @ApiProperty()
  @IsNumber()
  @PrimaryGeneratedColumn()
  userSessionFileId: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  userSessionId: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  sessionFileId: number;

  @ApiProperty()
  @IsString()
  @Column()
  userNoteUrl: string;

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

  @ManyToOne(() => UserSession, (userSession) => userSession.userSessionFiles)
  @JoinColumn({
    name: 'user_session_id',
    referencedColumnName: 'userSessionId',
  })
  userSession: UserSession;

  @ManyToOne(() => SessionFile, (sessionFile) => sessionFile.userSessionFiles)
  @JoinColumn({
    name: 'session_file_id',
    referencedColumnName: 'sessionFileId',
  })
  sessionFile: SessionFile;
}
