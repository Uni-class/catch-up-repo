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
import { User } from '../../users/entities/user.entity';

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
  @IsString()
  @Column()
  hostId: number;

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
}
