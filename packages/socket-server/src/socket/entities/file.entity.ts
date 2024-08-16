import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { SessionFile } from './session-file.entity';
import { UserFile } from './user-file.entity';
import { User } from './user.entity';

@Entity('files')
export class File {
  @IsNumber()
  @PrimaryGeneratedColumn()
  fileId: number;

  @IsNumber()
  @Column()
  ownerId: number;

  @IsString()
  @Column()
  name: string;

  @IsString()
  @Column()
  url: string;

  @IsDate()
  @CreateDateColumn()
  createdAt: string;

  @IsDate()
  @UpdateDateColumn()
  updatedAt: string;

  @IsDate()
  @DeleteDateColumn()
  deletedAt: string;

  @OneToMany(() => SessionFile, (sessionFile) => sessionFile.file)
  sessionFiles: SessionFile;

  @OneToMany(() => UserFile, (userFile) => userFile.file)
  userFiles: UserFile[];

  @ManyToOne(() => User, (user) => user.files)
  @JoinColumn({ name: 'owner_id', referencedColumnName: 'userId' })
  owner: User;
}
