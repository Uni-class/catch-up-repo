import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Column } from 'typeorm';

export class CreateFileDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  ownerId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @Column()
  url: string;
}
