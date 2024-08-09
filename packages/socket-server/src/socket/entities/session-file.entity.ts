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
import { File } from './file.entity';
import { UserSessionFile } from './user-session-file.entity';

@Entity('session_files')
export class SessionFile {
  @IsNumber()
  @PrimaryGeneratedColumn()
  sessionFileId: number;

  @IsNumber()
  @Column()
  sessionId: number;

  @IsNumber()
  @Column()
  fileId: number;

  @IsString()
  @Column()
  teacherNoteUrl: string;

  @IsDate()
  @CreateDateColumn()
  createdAt: string;

  @IsDate()
  @UpdateDateColumn()
  updatedAt: string;

  @IsDate()
  @DeleteDateColumn()
  deletedAt: string;

  @ManyToOne(() => Session, (session) => session.sessionFiles)
  @JoinColumn({ name: 'session_id', referencedColumnName: 'sessionId' })
  session: Session;

  @ManyToOne(() => File, (file) => file.sessionFiles)
  @JoinColumn({ name: 'file_id', referencedColumnName: 'fileId' })
  file: File;

  @OneToMany(
    () => UserSessionFile,
    (userSessionFile) => userSessionFile.sessionFile,
    {
      cascade: ['soft-remove'],
    },
  )
  userSessionFiles: UserSessionFile[];
}
