import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { IsNumber, IsString } from 'class-validator';
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
  @IsString()
  @CreateDateColumn()
  createdAt: string;

  @ApiProperty()
  @IsString()
  @UpdateDateColumn()
  updatedAt: string;

  @ApiProperty()
  @IsString()
  @DeleteDateColumn()
  closedAt: string;
}
