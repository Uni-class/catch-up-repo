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
import { File } from '../../files/entities/file.entity';
import { UserSessionFile } from '../../user-session-files/entities/user-session-file.entity';

@Entity('session_files')
export class SessionFile {
  @ApiProperty()
  @IsNumber()
  @PrimaryGeneratedColumn()
  sessionFileId: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  sessionId: number;

  @ApiProperty()
  @IsNumber()
  @Column()
  fileId: number;

  @ApiProperty()
  @IsString()
  @Column()
  teacherNoteUrl: string;

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
