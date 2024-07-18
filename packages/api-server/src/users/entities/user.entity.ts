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
  @Column()
  providerId: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true })
  refreshToken: string;

  @ApiProperty()
  @IsString()
  @Column()
  status: string;

  @ApiProperty()
  @IsDate()
  @Column({ nullable: true })
  createdAt: string;

  @ApiProperty()
  @IsDate()
  @Column({ nullable: true })
  updatedAt: string;

  @ApiProperty()
  @IsDate()
  @Column({ nullable: true })
  deletedAt: string;

  @ApiProperty()
  @OneToMany(() => Session, (session) => session.hostId)
  sessions: Session[];
}
