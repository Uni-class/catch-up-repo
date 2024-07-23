import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserSessionDto {
  constructor() {}
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  sessionId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  displayName;
}
