import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserSessionDto {
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
  displayName: string;

  constructor(userId: number, sessionId: number, dispalyName: string) {
    this.userId = userId;
    this.sessionId = sessionId;
    this.displayName = dispalyName;
  }
}
