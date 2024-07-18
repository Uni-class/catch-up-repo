import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsDate, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
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
}
