import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsNumber, IsString } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty()
  @IsNumber()
  @PrimaryGeneratedColumn({ name: 'user_id' })
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
  @Column({ nullable: true, name: 'profile_url' })
  profileUrl: string;

  @ApiProperty()
  @IsString()
  @Column()
  provider: string;

  @ApiProperty()
  @IsString()
  @Column({ name: 'provider_id' })
  providerId: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true, name: 'refresh_token' })
  refreshToken: string;

  @ApiProperty()
  @IsString()
  @Column()
  status: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true, name: 'created_at' })
  createdAt: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true, name: 'updated_at' })
  updatedAt: string;

  @ApiProperty()
  @IsString()
  @Column({ nullable: true, name: 'deleted_at' })
  deletedAt: string;
}
