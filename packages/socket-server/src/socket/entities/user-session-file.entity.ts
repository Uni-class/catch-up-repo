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
import { UserSession } from './user-session.entity';
import { SessionFile } from './session-file.entity';

@Entity('user_session_files')
export class UserSessionFile {
  @IsNumber()
  @PrimaryGeneratedColumn()
  userSessionFileId: number;

  @IsNumber()
  @Column()
  userSessionId: number;

  @IsNumber()
  @Column()
  sessionFileId: number;

  @IsString()
  @Column()
  userNoteUrl: string;

  @IsDate()
  @CreateDateColumn()
  createdAt: string;

  @IsDate()
  @UpdateDateColumn()
  updatedAt: string;

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
