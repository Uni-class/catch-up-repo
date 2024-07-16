import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @IsNumber()
  @PrimaryGeneratedColumn()
  id: number;

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
  @CreateDateColumn({ default: Date.now() })
  createdAt: Date;

  @ApiProperty()
  @IsDate()
  @UpdateDateColumn()
  updatedAt: Date;

  @ApiProperty()
  @IsDate()
  @DeleteDateColumn()
  deletedAt: Date;
}
